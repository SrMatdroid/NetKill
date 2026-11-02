# NetKill · corta Internet a nivel kernel

> Autor: **srmatdroid** · temas cyberpunk (verde fósforo + ámbar sutil) y HX (claro, tipo HyperOS/iOS)

Módulo Magisk / KernelSU / APatch que **desconecta por completo el Internet** de las apps que tú elijas — de sistema o de usuario — mediante **netfilter (iptables) con match de UID**, aplicado directamente en el kernel. Sin apps externas, sin VPN, sin reinicios.

## Por qué a nivel kernel y sin parchear el kernel binario

Parchear el binario del kernel por dispositivo es frágil (rompe con cada OTA). En cambio, netfilter vive DENTRO del kernel: cada regla que este módulo inserta se evalúa en el propio stack de red del kernel, paquete a paquete:

```
tabla filter → cadena OUTPUT → cadena NB_OUT
  -m owner --uid-owner <uid de la app>  -j REJECT
```

El kernel de GKI (5.10 en el garnet, y cualquier stock moderno) trae `CONFIG_NETFILTER_XT_MATCH_OWNER=y`, así que funciona sin compilar nada. El resultado es equivalente a "la app no tiene pila de red": TCP, UDP, DNS, ICMP, IPv4 e IPv6 — todo paquete saliente de ese UID muere en el kernel (REJECT, respuesta inmediata: la app no se queda colgada esperando timeouts).

## Estructura

```
netkill/
├ module/
│   ├── module.prop
│   ├── customize.sh     instalación (detecta gestor, crea /data/adb/netkill)
│   ├── service.sh       re-aplica el filtro en cada arranque (integra DNS/Opts)
│   ├── action.sh        botón "Ejecutar acción" del gestor (re-aplicar)
│   ├── uninstall.sh     limpieza de las cadenas netfilter
│   ├── engine.sh        motor: apply/stop/start/block/allow/global/list/status/check/diag/dns/opts
│   └ webroot/           WebUI (index.html · style.css · app.js)
├ build.sh               empaqueta el zip listo para flashear
└ README.md
```

## Instalación

1. Compila el zip: `./build.sh` → `netkill-1.0.0.zip`.
2. Flashea desde tu gestor (KernelSU → Módulos → Instalar).
3. Abre la **WebUI** en la tarjeta del módulo y elige apps.

> **Magisk:** el gestor oficial de Magisk no trae WebUI propia; instala [WebUIX](https://github.com/lswky/webuix) (implementa la API `ksu.exec`) o usa el módulo desde KernelSU. Sin WebUI siempre puedes controlar el motor por ADB:
>
> ```sh
> su -c 'sh /data/adb/modules/netkill/engine.sh block com.whatsapp'
> su -c 'sh /data/adb/modules/netkill/engine.sh status'
> ```

## Uso del motor (shell)

```sh
E=/data/adb/modules/netkill/engine.sh

sh $E block com.whatsapp         # cortar (resuelve y corta TODOS sus uids)
sh $E allow com.whatsapp         # restaurar (si nadie más del uid sigue en la lista)
sh $E check com.whatsapp         # reglas REALES del kernel: pkg=.. uid=.. rule4=N rule6=N
sh $E diag                       # diagnóstico: dispositivo, kernel, iptables, cadenas, reglas
sh $E global on                  # MAESTRO: cortar TODAS las uids 1000-65535
sh $E global off                 # volver al filtrado por lista
sh $E stop                       # bajar el filtro sin borrar la lista
sh $E start                      # volver a subirlo
sh $E status                     # master=0 chain=1 rules=4 pkgs=4
sh $E list                       # apps en la lista negra
sh $E refresh                    # re-escanear apps -> uids
```
### Comandos DNS y privacidad

```sh
sh $E dns set <pkg> <ip>                   # forzar DNS DNAT por app (pkg=ip en dns.list)
sh $E dns del <pkg>                        # quitar DNS forzado de una app
sh $E dns clearall                         # quitar DNS forzado de TODAS las apps
sh $E dns list                             # listar pkg=ip actuales
sh $E dns global <host|off|getglobal>     # Private DNS del sistema (modo hostname/off)
sh $E opts dot=N icmp=N v6=N                # opciones kernel NK_OPT: DoT, ICMP, IPv6
sh $E opts                                 # mostrar estado actual dot/icmp/v6
```

### Diagnóstico extendido (líneas extra en `diag`)

El diagnóstico `diag` muestra el estado del sistema, del filtro y de las opciones activas:

```
device model android sdk kernel arch mgr iptables owner chain4=X chain6=X rules4=Y rules6=Y master=Z pkgs=N pkgmap=M dns=M
opts=dot=N icmp=N v6=N
last=…
```

## Motor completo (engine.sh)

### Cadenas y persistencia

- `CHAIN=NB_OUT` — filter OUTPUT corte por uid (siempre activo).
- `DNS_CHAIN=NK_DNS` / `DNS_CHAIN6=NK_DNS6` — nat OUTPUT (v4/v6) DNAT udp+tcp 53 por uid, persistidos en `dns.list`.
- `OPT_CHAIN=NK_OPT` — filter OUTPUT opciones de privacidad (DoT, ICMP, IPv6) persistida en `opts`.

### Comandos dns

- `dns set <pkg> <ip>` — añade `pkg=ip` a `/data/adb/netkill/dns.list` y reconstruye las cadenas NK_DNS (v4) y NK_DNS6 (v6). Si el paquete aún no está en el mapa pkg→uid, escanea antes.
- `dns del <pkg>` — quita el pkg de dns.list y reconstruye.
- `dns clearall` — vacía dns.list y limpia ambas cadenas.
- `dns list` — muestra `pkg=ip` actuales.
- `dns global <host|off|getglobal>` — configura Private DNS del sistema (TLS). `off` recupera DNS del operador.

**DNS v4 vs v6 (automático):** si el DNS asignado es IPv4, se crea el DNAT en NK_DNS **y además se bloquea (DROP) el puerto 53 IPv6 de ese uid** en NK_DNS6 — forzando al resolver de la app a usar el DNS asignado. Si el DNS asignado es IPv6, el DNAT va en NK_DNS6 y se bloquea el puerto 53 de IPv4 en NK_DNS. Sin ese cruce, el resolver seguiría consultando por el DNS del operador en la otra pila.

### Comandos opts

- `opts` — imprime `dot=N icmp=N v6=N`.
- `opts dot=1` — bloquea DoT (tcp/853) en el kernel.
- `opts icmp=1` — bloquea ICMP echo-request saliente.
- `opts v6=1` — bloquea TODO el tráfico IPv6 de salida.

### Integración en service.sh

Al completar el boot (`sys.boot_completed`):

1. Espera a que el sistema esté listo (`getprop sys.boot_completed`).
2. Ejecuta `refresh` (re-escanea pkg→uid).
3. Ejecuta `apply` (reconstruye NB_OUT, NK_DNS y NK_OPT desde `apps.list`, `dns.list` y `opts`).

## WebUI (dos temas, avanzado)

### Temas intercambiables

- **CB** — cyberpunk: verde fósforo/ámbar sutil, esquinas biseladas, scanlines, glitch.
- **HX** — claro: tipo HyperOS/iOS, tarjetas blancas, switches redondeados, azul iOS.

La elección se recuerda en `data-theme` y `meta theme-color`. Botón ↑↗ en la cabecera.

### Modal "AJUSTES AVANZADOS" (pie de página)

Al pulsar el botón **AJUSTES** (icono de tuercas) abre un modal con tres secciones:

#### 1. DNS global · Private DNS (DoT)

- **Presets**: OFF, Cloudflare (`1.1.1.1`), Google (`8.8.8.8`), Quad9 (`9.9.9.9`), AdGuard (`94.140.14.14`).
- **Personalizado**: host DoT (ej. `security.cloudflare-dns.com`).
- Cifra el DNS de TODO el equipo (TLS del sistema). Si el resolver falla, con `strict` te quedas sin Internet hasta apagarlo.

#### 2. DNS por app · DNAT kernel

- Asigna a una app su propio resolver DNS (redirección DNAT en puerto 53 por UID).
- Las apps con su propio DoT/DoH lo ignoran: usa «BLOQUEAR DoT» en la sección de PRIVACIDAD.
- El bloqueo del firewall tiene prioridad.

#### 3. Privacidad en el kernel · NK_OPT

- **BLOQUEAR DoT (tcp/853)**: cierra el DNS cifrado de apps que se saltan tu DNS forzado o el Private DNS.
- **BLOQUEAR PING SALIENTE**: rechaza ICMP echo-request emitido.
- **BLOQUEAR IPv6**: rechaza TODO el tráfico IPv6 de salida (para redes IPv4 sin fugas).

### Controles del modal

- **REFRESCAR**: actualiza estado DNS / privacidad al instante.
- **CERRAR**: cierra el modal.

## Limitaciones honestas

- El filtrado es **por UID**: si dos apps comparten uid (`sharedUserId`), se cortan juntas. Es exactamente así como funciona Android a nivel kernel.
- Apps bajo **perfiles de trabajo** (uid 10xxxxx) no salen en la lista de `pm list packages -U` del usuario 0; se pueden cortar por uid pasándolo al motor.
- Si cortas `com.google.android.gms`, push de GCM/FCM muere: es lo esperado.
- El tráfico lo bloquea el kernel, no el framework: la app cree que no hay red, que es justo lo que se pide.
- El DNS forzado por app (DNAT en puerto 53) solo redirige las consultas **que la app emite con su propio uid**. En Android 9+ el resolver del framework (netd/libnetd_resolv) hace sus consultas con el uid de netd: esas consultas corresponden al resolver global (usa `dns global` para el resto del sistema, y `opts dot=1` contra el DoT de las apps).

## Build

Ejecuta `./build.sh` en la raíz del repositorio para generar `netkill-1.0.0.zip` listo para flashear.
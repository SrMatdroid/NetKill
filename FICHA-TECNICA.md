# NetKill — Ficha Técnica

## Identificación
- Nombre: NetKill
- ID del módulo: netkill
- Versión: 1.0.4 (versionCode 104)
- Autor: srmatdroid
- Tipo: Módulo Magisk / KernelSU / APatch
- Licencia: (no especificada en el módulo)

## Descripción
Corta el acceso a Internet a nivel de kernel (netfilter OUTPUT IPv4/IPv6 por UID) para las apps que elijas, de usuario o del sistema. Incluye WebUI. Sin reinicios. No usa VPN ni apps externas.

## Compatibilidad
- Gestores soportados: KernelSU, KernelSU Next, APatch, Magisk (+WebUIX en Magisk).
- Arquitectura: probado en aarch64 (Android 15 / SDK 35). Requiere iptables/ip6tables con soporte `-m owner --uid-owner`.
- Kernel: Linux con netfilter (iptables/ip6tables). Recomendado kernel moderno con iptables v1.8.x.

## Requisitos
- Dispositivo rooteado (root).
- Permisos de superusuario para ejecutar engine.sh.
- Acceso a /data/adb/netkill (configuración persistente).

## Estructura del módulo
- module.prop: metadatos del módulo.
- customize.sh: instalación, crea /data/adb/netkill, permisos.
- service.sh: re-aplica el filtro al arrancar el sistema (espera boot_completed).
- action.sh: acción manual "Ejecutar acción" del gestor (re-aplica reglas).
- uninstall.sh: limpia cadenas netfilter al desinstalar.
- engine.sh: motor principal (backend).
- webroot/: WebUI (index.html, app.js, style.css).

## Backend (engine.sh)
- Configuración en /data/adb/netkill:
  - apps.list: lista de paquetes bloqueados.
  - pkgmap.txt: caché paquete → UID.
  - dns.list: DNS forzado por app (pkg=ip).
  - opts: opciones de privacidad (dot, icmp, v6).
  - global: estado de bloqueo global (0/1).
  - engine.log: log de aplicaciones.
- Cadenas netfilter:
  - NB_OUT (filter, OUTPUT): bloqueo por UID (REJECT). v4 y v6.
  - NK_DNS (nat, OUTPUT): DNAT DNS por app (v4).
  - NK_DNS6 (nat, OUTPUT): DNAT DNS por app (v6).
  - NK_OPT (filter, OUTPUT): opciones de privacidad (DoT, ping, IPv6). v4 y v6.
- Comandos principales:
  - apply: reconstruye reglas desde cero.
  - stop/start: baja/sube el filtro.
  - block <pkg>: bloquea una app (todos sus UIDs).
  - allow <pkg>: desbloquea una app.
  - global on/off: bloqueo total (uid 1000:65535).
  - status: estado del filtro.
  - check <pkg>: estado real de reglas de una app.
  - diag: diagnóstico del sistema y del filtro.
  - refresh: refresca caché pkg→UID.
  - dns set/del/list/clearall/global/getglobal: gestión de DNS.
  - opts dot=N icmp=N v6=N: opciones de privacidad.
  - expprobe: sonda experimental de soporte pid/cmd-owner.

## WebUI
- Tecnologías: HTML5, CSS3, JavaScript (vanilla).
- Temas: Cyberpunk (cb) y HyperOS/iOS (hx), conmutables.
- Idiomas: español e inglés, detección automática del sistema.
- Funciones: listado de apps (usuario/sistema), búsqueda, filtros, toggles, bloqueo global, diagnóstico, ajustes avanzados (DNS global/por app, privacidad), modal de UID compartido.
- Comunicación con backend: bridge root (KernelSU/APatch/Magisk WebUIX) vía shell.

## Seguridad / notas
- El bloqueo es por UID: apps que comparten UID (sharedUserId) se bloquean juntas. No es posible aislar una sola app del grupo a nivel de kernel (pid/cmd-owner rotos en SMP y ausentes en Android).
- El modo experimental (expprobe) no altera reglas estables y solo informa de soporte.
- La configuración persiste en /data/adb/netkill y sobrevive a actualizaciones.

## Empaquetado
- ZIP con 10 archivos (sin arneses ni directorios de trabajo).
- Permisos: scripts 0755, resto 0644 (customize.sh).

## Verificación realizada
- sh -n en todos los .sh.
- node --check en app.js.
- Smoke en navegador (viewport móvil, temas, idiomas, modales).
- Prueba en dispositivo real: pendiente (iptables, bridge root).
EOF
echo "written"
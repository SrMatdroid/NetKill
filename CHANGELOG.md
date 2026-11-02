# NetKill — Historial de cambios

## Versión 1.0.0 (primera versión pública)
Fecha: 02/11/2026

### ¿Qué es NetKill?
NetKill es un módulo para tu móvil rooteado que te permite cortar el acceso a Internet de las apps que tú elijas, a nivel de sistema (kernel), sin usar VPN ni apps externas. Todo se controla desde una interfaz web integrada en el gestor root.

### Lo que puedes hacer
- Bloquear Internet a apps de usuario o del sistema con un toque.
- Activar un “Modo Maestro” que corta Internet a todo el dispositivo.
- Forzar un DNS propio para todo el móvil o para apps concretas.
- Opciones de privacidad: bloquear DNS cifrado (DoT), bloquear ping saliente, bloquear IPv6.
- Diagnóstico del sistema para ver si todo funciona.
- Tema claro/oscuro (estilo HyperOS/iOS) y tema oscuro (cyberpunk).
- Idioma español o inglés, detectado automáticamente.

### Novedades de esta versión
- Interfaz renovada y más clara, con dos temas.
- Corregido un error que hacía que el botón de cambio de tema se solapara con el título en pantallas pequeñas.
- Ahora puedes elegir el idioma (español/inglés) y se detecta automáticamente según tu móvil.
- Mejorada la gestión de apps que comparten el mismo identificador (UID): ahora se avisa claramente de que bloquear una bloquea a todas las que comparten ese identificador.
- Añadida una sección experimental (marcada como inestable) para probar si tu móvil soporta aislamiento por app. No afecta a las funciones normales.
- Corregida la limpieza al desinstalar (se eliminan correctamente las reglas del sistema).
- Mejorado el diagnóstico y los mensajes de error.

### Limitaciones importantes
- El bloqueo funciona por “UID” (identificador de app). Si varias apps comparten el mismo UID (por ejemplo, apps del sistema MIUI), bloquear una bloqueará a todas las que compartan ese identificador. Esto es una limitación del sistema Android, no un error del módulo.
- El modo experimental de aislamiento por app no está soportado en la mayoría de móviles y se incluye solo para pruebas.

### Cómo usarlo (básico)
1. Instala el módulo desde tu gestor root (KernelSU/APatch/Magisk).
2. Abre la WebUI del módulo.
3. En la lista, toca el interruptor de una app para cortarle Internet (rojo = bloqueada).
4. Usa “REGENERAR” si algo no se aplica.
5. “MAESTRO” corta Internet a todo el dispositivo (útil para emergencias).
6. En “Ajustes avanzados” puedes configurar DNS y privacidad.

### Seguridad
- No se envía ningún dato a Internet. Todo se ejecuta en tu dispositivo.
- La configuración se guarda en /data/adb/netkill y sobrevive a actualizaciones.

---
Este es el primer lanzamiento público de NetKill. Gracias por probarlo.

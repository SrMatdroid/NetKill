#!/system/bin/sh
SKIPUNZIP=0

ui_print "======================================"
ui_print "  NETKILL · corta internet a nivel    "
ui_print "  kernel (netfilter OUTPUT v4/v6)     "
ui_print "======================================"

if [ -n "$KSU_VER_CODE" ]; then
    ui_print "- Gestor: KernelSU $KSU_VER_CODE"
    ui_print "- WebUI:  disponible en la tarjeta del módulo"
elif [ -n "$APATCH_VER_CODE" ]; then
    ui_print "- Gestor: APatch $APATCH_VER_CODE"
    ui_print "- WebUI:  disponible en la tarjeta del módulo"
elif [ -n "$MAGISK_VER_CODE" ]; then
    ui_print "- Gestor: Magisk $MAGISK_VER_CODE"
    ui_print "- Aviso:  la WebUI necesita WebUIX"
    ui_print "         (o abre la WebUI desde KernelSU)"
else
    ui_print "- Gestor no reconocido; scripts estándar"
fi

mkdir -p /data/adb/netkill
[ -f /data/adb/netkill/apps.list ] || : > /data/adb/netkill/apps.list

set_perm_recursive "$MODDIR" 0 0 0755 0644
set_perm "$MODDIR/service.sh"   0 0 0755
set_perm "$MODDIR/engine.sh"    0 0 0755
set_perm "$MODDIR/action.sh"    0 0 0755
set_perm "$MODDIR/uninstall.sh" 0 0 0755

ui_print "- Config en /data/adb/netkill (sobrevive a actualizaciones)"
ui_print "- Instalado. Abre la WebUI y elige las apps a cortar."

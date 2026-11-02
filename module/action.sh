#!/system/bin/sh
# NetKill · acción manual (botón "Ejecutar acción" del gestor)
MODDIR="${0%/*}"

echo "NetKill · re-aplicando reglas netfilter..."
sh "$MODDIR/engine.sh" apply
echo ""
echo "Estado:"
sh "$MODDIR/engine.sh" status

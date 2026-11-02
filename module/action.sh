#!/system/bin/sh

MODDIR="${0%/*}"

echo "NetKill · re-aplicando reglas netfilter..."
sh "$MODDIR/engine.sh" apply
echo ""
echo "Estado:"
sh "$MODDIR/engine.sh" status

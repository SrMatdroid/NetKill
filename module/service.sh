#!/system/bin/sh
# NetKill · re-aplica el filtro al arrancar el sistema
MODDIR="${0%/*}"
CONF="${NETKILL_CONF:-/data/adb/netkill}"

mkdir -p "$CONF"

(
    n=0
    until [ "$(getprop sys.boot_completed)" = "1" ] || [ "$n" -ge 120 ]; do
        sleep 2
        n=$((n+1))
    done
    sleep 5
    sh "$MODDIR/engine.sh" refresh >/dev/null 2>&1
    sh "$MODDIR/engine.sh" apply   >> "$CONF/engine.log" 2>&1
) &

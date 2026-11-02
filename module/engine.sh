#!/system/bin/sh

MODDIR="${0%/*}"
CONF="${NETKILL_CONF:-/data/adb/netkill}"
LIST="$CONF/apps.list"
MAP="$CONF/pkgmap.txt"
DNS_LIST="$CONF/dns.list"     
OPTS="$CONF/opts"             
CHAIN=NB_OUT                 
DNS_CHAIN=NK_DNS      
DNS_CHAIN6=NK_DNS6       
OPT_CHAIN=NK_OPT           

log() { echo "$(date '+%y-%m-%d %H:%M:%S') netkill: $*" >> "$CONF/engine.log" 2>/dev/null; }

ipt()  { iptables  -w 3 "$@"; }
ipt6() { ip6tables -w 3 "$@"; }

sanitize_pkg() {
    case "$1" in
        *[!A-Za-z0-9._-]*|"") return 1 ;;
        *)                     return 0 ;;
    esac
}

ensure_conf() {
    mkdir -p "$CONF" 2>/dev/null
    [ -f "$LIST" ] || : > "$LIST"
}

refresh_map() {
    ensure_conf
    : > "$MAP.tmp"
    pm list packages -U > "$MAP.tmp" 2>/dev/null
    pm list users 2>/dev/null | sed -n 's/.*UserInfo{\([0-9][0-9]*\):.*/\1/p' | sort -un |
    while IFS= read -r u; do
        [ "$u" = "0" ] && continue
        pm list packages -U --user "$u" >> "$MAP.tmp" 2>/dev/null
    done
    mv "$MAP.tmp" "$MAP"
}

pkg_uids() {
    local pkg="$1" uids=""
    [ -s "$MAP" ] || refresh_map
    uids=$(grep -F "package:$pkg " "$MAP" 2>/dev/null | sed -n 's/.*uid:\([0-9][0-9]*\).*/\1/p' | sort -un)
    if [ -z "$uids" ]; then
        uids=$(stat -c %u "/data/data/$pkg" 2>/dev/null)
    fi
    if [ -z "$uids" ]; then
        refresh_map
        uids=$(grep -F "package:$pkg " "$MAP" 2>/dev/null | sed -n 's/.*uid:\([0-9][0-9]*\).*/\1/p' | sort -un)
    fi
    [ -n "$uids" ] && echo "$uids"
}

ensure_chain() {
    ipt  -N "$CHAIN" 2>/dev/null
    ipt6 -N "$CHAIN" 2>/dev/null
    ipt  -C OUTPUT -j "$CHAIN" 2>/dev/null || ipt  -I OUTPUT 1 -j "$CHAIN"
    ipt6 -C OUTPUT -j "$CHAIN" 2>/dev/null || ipt6 -I OUTPUT 1 -j "$CHAIN"
}

setup_chain() {
    ensure_chain
    ipt  -F "$CHAIN"
    ipt6 -F "$CHAIN"
}

teardown_chain() {
    ipt  -D OUTPUT -j "$CHAIN" 2>/dev/null
    ipt6 -D OUTPUT -j "$CHAIN" 2>/dev/null
    ipt  -F "$CHAIN" 2>/dev/null;  ipt  -X "$CHAIN" 2>/dev/null
    ipt6 -F "$CHAIN" 2>/dev/null;  ipt6 -X "$CHAIN" 2>/dev/null
}

add_rules_uid() {
    ipt  -C "$CHAIN" -m owner --uid-owner "$1" -j REJECT 2>/dev/null || \
         ipt  -A "$CHAIN" -m owner --uid-owner "$1" -j REJECT
    ipt6 -C "$CHAIN" -m owner --uid-owner "$1" -j REJECT 2>/dev/null || \
         ipt6 -A "$CHAIN" -m owner --uid-owner "$1" -j REJECT
}

del_rules_uid() {
    ipt  -D "$CHAIN" -m owner --uid-owner "$1" -j REJECT 2>/dev/null
    ipt6 -D "$CHAIN" -m owner --uid-owner "$1" -j REJECT 2>/dev/null
}

sanitize_ip() {
    case "$1" in
        ""|*[!0-9A-Fa-f.:]*) return 1 ;;
    esac
    if printf '%s\n' "$1" | grep -Eq '^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$'; then
        local IFS='.' o
        for o in $1; do
            [ "$o" -le 255 ] 2>/dev/null || return 1
        done
        return 0
    fi
    if printf '%s\n' "$1" | grep -Eq '^([0-9A-Fa-f]{0,4}:){2,7}[0-9A-Fa-f]{0,4}$'; then
        return 0
    fi
    return 1
}

ensure_dns_chain() {
    ipt -t nat -N "$DNS_CHAIN" 2>/dev/null
    ipt -t nat -C OUTPUT -j "$DNS_CHAIN" 2>/dev/null || \
        ipt -t nat -I OUTPUT 1 -j "$DNS_CHAIN"
}

ensure_dns_chain6() {
    ipt6 -t nat -N "$DNS_CHAIN6" 2>/dev/null
    ipt6 -t nat -C OUTPUT -j "$DNS_CHAIN6" 2>/dev/null || \
        ipt6 -t nat -I OUTPUT 1 -j "$DNS_CHAIN6"
}

ip_is_v6() { case "$1" in *:*) return 0 ;; *) return 1 ;; esac; }

dns_rebuild() {
    ensure_dns_chain
    ensure_dns_chain6
    ipt  -t nat -F "$DNS_CHAIN" 2>/dev/null
    ipt6 -t nat -F "$DNS_CHAIN6" 2>/dev/null
    [ -f "$DNS_LIST" ] || : > "$DNS_LIST"
    local line pkg ip uid
    while IFS= read -r line; do
        case "$line" in ""|\#*) continue ;; esac
        pkg=${line%%=*}
        ip=${line#*=}
        if ip_is_v6 "$ip"; then
            sanitize_pkg "$pkg" && sanitize_ip "$ip" || continue
            for uid in $(pkg_uids "$pkg"); do
                ipt6 -t nat -A "$DNS_CHAIN6" -m owner --uid-owner "$uid" \
                    -p udp --dport 53 -j DNAT --to-destination "$ip"
                ipt6 -t nat -A "$DNS_CHAIN6" -m owner --uid-owner "$uid" \
                    -p tcp --dport 53 -j DNAT --to-destination "$ip"
              
                ipt -t nat -A "$DNS_CHAIN" -m owner --uid-owner "$uid" \
                    -p udp --dport 53 -j DROP 2>/dev/null
                ipt -t nat -A "$DNS_CHAIN" -m owner --uid-owner "$uid" \
                    -p tcp --dport 53 -j DROP 2>/dev/null
            done
        else
            sanitize_pkg "$pkg" && sanitize_ip "$ip" || continue
            for uid in $(pkg_uids "$pkg"); do
                ipt -t nat -A "$DNS_CHAIN" -m owner --uid-owner "$uid" \
                    -p udp --dport 53 -j DNAT --to-destination "$ip"
                ipt -t nat -A "$DNS_CHAIN" -m owner --uid-owner "$uid" \
                    -p tcp --dport 53 -j DNAT --to-destination "$ip"
            
                ipt6 -t nat -A "$DNS_CHAIN6" -m owner --uid-owner "$uid" \
                    -p udp --dport 53 -j DROP 2>/dev/null
                ipt6 -t nat -A "$DNS_CHAIN6" -m owner --uid-owner "$uid" \
                    -p tcp --dport 53 -j DROP 2>/dev/null
            done
        fi
    done < "$DNS_LIST"
    log "dns: $(grep -c . "$DNS_LIST" 2>/dev/null || echo 0) apps con DNS forzado (v4+v6)"
}

cmd_dns() {
    ensure_conf
    local op="${1:-list}"
    case "$op" in
        set)
            local pkg="$2" ip="$3"
            [ -n "$pkg" ] && [ -n "$ip" ] || { echo "uso: engine.sh dns set <pkg> <ip>"; return 1; }
            if ! sanitize_pkg "$pkg"; then echo "err:paquete_invalido"; return 1; fi
            if ! sanitize_ip "$ip";    then echo "err:ip_invalida:$ip";    return 1; fi
           
esc_pkg() { printf '%s' "$1" | sed 's/\./\\./g'; }
local epkg; epkg=$(esc_pkg "$pkg")

grep -v "^${epkg}=" "$DNS_LIST" 2>/dev/null > "$DNS_LIST.tmp"
            [ -s "$DNS_LIST.tmp" ] || : > "$DNS_LIST.tmp"
            echo "$pkg=$ip" >> "$DNS_LIST.tmp"
            mv "$DNS_LIST.tmp" "$DNS_LIST"
           
            grep -qF "package:$pkg " "$MAP" 2>/dev/null || refresh_map
            dns_rebuild
            echo "ok:dns:$pkg=$ip"
            ;;
        del)
            local pkg="$2"
            [ -n "$pkg" ] || { echo "uso: engine.sh dns del <pkg>"; return 1; }
            if ! sanitize_pkg "$pkg"; then echo "err:paquete_invalido"; return 1; fi
            local epkg; epkg=$(esc_pkg "$pkg")
            grep -v "^${epkg}=" "$DNS_LIST" 2>/dev/null > "$DNS_LIST.tmp"
            [ -s "$DNS_LIST.tmp" ] || : > "$DNS_LIST.tmp"
            mv "$DNS_LIST.tmp" "$DNS_LIST"
            dns_rebuild
            echo "ok:dns:del:$pkg"
            ;;
        clearall)
            : > "$DNS_LIST"
            dns_rebuild
            echo "ok:dns:clearall"
            ;;
        global)
            local host="$2"
            command -v settings >/dev/null 2>&1 || { echo "err:sin_settings"; return 1; }
            if [ -z "$host" ] || [ "$host" = "off" ]; then
                settings put global private_dns_mode off 2>/dev/null
                settings delete global private_dns_specifier 2>/dev/null
                echo "ok:dns:global:off"
            else
                case "$host" in *[!0-9A-Za-z.-]*) echo "err:host_invalido"; return 1 ;; esac
                settings put global private_dns_mode hostname 2>/dev/null \
                    || { echo "err:settings"; return 1; }
                settings put global private_dns_specifier "$host" 2>/dev/null
                echo "ok:dns:global:$host"
            fi ;;
        getglobal)
            if command -v settings >/dev/null 2>&1; then
                if [ "$(settings get global private_dns_mode 2>/dev/null)" = "hostname" ]; then
                    local gh=$(settings get global private_dns_specifier 2>/dev/null)
                    [ -n "$gh" ] && echo "$gh" || echo on
                else
                    echo off
                fi
            else
                echo off
            fi ;;
        list)
            cat "$DNS_LIST" 2>/dev/null
            ;;
        *)
            echo "uso: engine.sh dns set|del|list|clearall"; return 1 ;;
    esac
}

ensure_opt_chain() {
    ipt  -N "$OPT_CHAIN" 2>/dev/null
    ipt6 -N "$OPT_CHAIN" 2>/dev/null
    if ipt  -C OUTPUT -j "$OPT_CHAIN" 2>/dev/null; then :; else
        ipt  -I OUTPUT 2 -j "$OPT_CHAIN" 2>/dev/null || ipt -I OUTPUT 1 -j "$OPT_CHAIN"
    fi
    if ipt6 -C OUTPUT -j "$OPT_CHAIN" 2>/dev/null; then :; else
        ipt6 -I OUTPUT 2 -j "$OPT_CHAIN" 2>/dev/null || ipt6 -I OUTPUT 1 -j "$OPT_CHAIN"
    fi
}

opt_value() {
    grep "^$1=" "$OPTS" 2>/dev/null | sed -n 's/^[^=]*=\([01]\)$/\1/p' | head -n 1
}

opt_get() {
    local v=$(opt_value "$1")
    [ -n "$v" ] && echo "$v" || echo 0
}

opts_rebuild() {
    ensure_opt_chain
    [ -f "$OPTS" ] || : > "$OPTS"
    ipt  -F "$OPT_CHAIN" 2>/dev/null
    ipt6 -F "$OPT_CHAIN" 2>/dev/null
    if [ "$(opt_value dot)" = "1" ]; then
        ipt  -A "$OPT_CHAIN" -p tcp --dport 853 -j REJECT
        ipt6 -A "$OPT_CHAIN" -p tcp --dport 853 -j REJECT
    fi
    if [ "$(opt_value icmp)" = "1" ]; then
        ipt  -A "$OPT_CHAIN" -p icmp --icmp-type echo-request -j REJECT
        ipt6 -A "$OPT_CHAIN" -p ipv6-icmp --icmpv6-type echo-request 2>/dev/null \
            || ipt6 -A "$OPT_CHAIN" -p icmpv6 --icmpv6-type echo-request 2>/dev/null \
            || ipt6 -A "$OPT_CHAIN" -p ipv6-icmp -j REJECT
    fi
    if [ "$(opt_value v6)" = "1" ]; then
        ipt6 -A "$OPT_CHAIN" -j REJECT
    fi
    log "opts: dot=$(opt_get dot) icmp=$(opt_get icmp) v6=$(opt_get v6)"
}

cmd_opts() {
    ensure_conf
    if [ $# -eq 0 ]; then
        echo "dot=$(opt_get dot) icmp=$(opt_get icmp) v6=$(opt_get v6)"
        return
    fi
    local k v
    for k in "$@"; do
        case "$k" in
            dot=0|dot=1|icmp=0|icmp=1|v6=0|v6=1) ;;
            *) echo "uso: engine.sh opts dot=N icmp=N v6=N"; rm -f "$OPTS.tmp"; return 1 ;;
        esac
    done
    : > "$OPTS.tmp"
    for k in dot icmp v6; do
        v=""
        for a in "$@"; do
            case "$a" in "$k="*) v=${a#*=} ;; esac
        done
        [ -n "$v" ] || v=$(opt_value "$k")
        [ -n "$v" ] || v=0
        echo "$k=$v" >> "$OPTS.tmp"
    done
    mv "$OPTS.tmp" "$OPTS"
    opts_rebuild
    echo "ok:opts:dot=$(opt_get dot) icmp=$(opt_get icmp) v6=$(opt_get v6)"
}

master_state() {
    [ "$(cat "$CONF/global" 2>/dev/null)" = "1" ] && echo 1 || echo 0
}

cmd_apply() {
    ensure_conf
    setup_chain
    refresh_map
    if [ "$(master_state)" = "1" ]; then
     
        ipt  -A "$CHAIN" -m owner --uid-owner 1000:65535 -j REJECT
        ipt6 -A "$CHAIN" -m owner --uid-owner 1000:65535 -j REJECT
    else
        local pkg uids uid
        while IFS= read -r pkg; do
            [ -n "$pkg" ] || continue
            uids=$(pkg_uids "$pkg")
            if [ -n "$uids" ]; then
                for uid in $uids; do
                    add_rules_uid "$uid"
                done
            else
                log "apply: sin uid para $pkg (¿desinstalada?)"
            fi
        done < "$LIST"
    fi
    log "apply: $(cmd_status)"
    ensure_dns_chain; dns_rebuild
    ensure_opt_chain; opts_rebuild
}

cmd_status() {
    ensure_conf
    local m=0 chain=0 rules4=0 rules6=0 pkgs=0
    [ "$(master_state)" = "1" ] && m=1
    if ipt -S OUTPUT 2>/dev/null | grep -q -- "-j $CHAIN"; then
        chain=1
        rules4=$(ipt -S "$CHAIN" 2>/dev/null | grep -c -- '--uid-owner')
    fi
    if ipt6 -S OUTPUT 2>/dev/null | grep -q -- "-j $CHAIN"; then
        rules6=$(ipt6 -S "$CHAIN" 2>/dev/null | grep -c -- '--uid-owner')
    fi
    pkgs=$(grep -c . "$LIST" 2>/dev/null)
    pkgs=${pkgs:-0}
    
    echo "master=$m chain=$chain rules=$rules4 pkgs=$pkgs rules6=$rules6"
}

cmd_block() {
    ensure_conf
    local pkg="$1" extra="$2" uids uid
    if ! sanitize_pkg "$pkg"; then
        echo "err:paquete_invalido"
        return 1
    fi
    if [ "$(master_state)" != "1" ]; then
        uids=$(pkg_uids "$pkg")
        if [ -n "$extra" ] && ! printf '%s\n' "$uids" | grep -qx "$extra"; then
            uids="$uids $extra"
        fi
        if [ -n "$uids" ]; then
            ensure_chain
            for uid in $uids; do
                add_rules_uid "$uid"
            done
        else
            echo "warn:uid_no_encontrado:$pkg"
        fi
    fi
    grep -qxF "$pkg" "$LIST" 2>/dev/null || echo "$pkg" >> "$LIST"
    echo "ok:$pkg"
}

cmd_allow() {
    ensure_conf
    local pkg="$1" uids uid other ouids keep
    if ! sanitize_pkg "$pkg"; then
        echo "err:paquete_invalido"
        return 1
    fi
    if [ -f "$LIST" ]; then
        grep -vxF "$pkg" "$LIST" > "$LIST.tmp" 2>/dev/null
        mv "$LIST.tmp" "$LIST"
    fi
    if [ "$(master_state)" != "1" ]; then
        uids=$(pkg_uids "$pkg")
        for uid in $uids; do
       
            keep=0
            while IFS= read -r other; do
                [ -n "$other" ] || continue
                [ "$other" = "$pkg" ] && continue
                ouids=$(pkg_uids "$other")
                case " $ouids " in
                    *" $uid "*) keep=1; break ;;
                esac
            done < "$LIST"
            if [ "$keep" = "0" ]; then
                del_rules_uid "$uid"
            fi
        done
    fi
    echo "ok:$pkg"
}

cmd_check() {
    ensure_conf
    local pkg="$1" uids uid r4 r6
    if ! sanitize_pkg "$pkg"; then
        echo "err:paquete_invalido"
        return 1
    fi
    uids=$(pkg_uids "$pkg")
    for uid in $uids; do
        r4=$(ipt  -S "$CHAIN" 2>/dev/null | grep -c -- "--uid-owner $uid -j REJECT")
        r6=$(ipt6 -S "$CHAIN" 2>/dev/null | grep -c -- "--uid-owner $uid -j REJECT")
        echo "pkg=$pkg uid=$uid rule4=$r4 rule6=$r6"
    done
}

cmd_diag() {
    ensure_conf
    local owner="fail" iptv dev model rel sdk kern arch mgr
    local c4=0 c6=0 r4=0 r6=0 m p ml last

    ipt -N NK_PROBE 2>/dev/null
    if ipt -A NK_PROBE -m owner --uid-owner 0 -j RETURN 2>/dev/null; then
        owner="ok"
    fi
    ipt -F NK_PROBE 2>/dev/null; ipt -X NK_PROBE 2>/dev/null

    iptv=$(iptables --version 2>/dev/null | sed -n 's/^iptables v//p')
    dev=$(getprop ro.product.device 2>/dev/null)
    model=$(getprop ro.product.model 2>/dev/null)
    rel=$(getprop ro.build.version.release 2>/dev/null)
    sdk=$(getprop ro.build.version.sdk 2>/dev/null)
    kern=$(uname -r 2>/dev/null)
    arch=$(uname -m 2>/dev/null)

    mgr="desconocido"
    if [ -x /data/adb/ksud ]; then
        mgr="KernelSU"
    elif [ -x /data/adb/apd ]; then
        mgr="APatch"
    elif [ -d /data/adb/magisk ]; then
        mgr="Magisk"
    fi

    ipt -S OUTPUT 2>/dev/null | grep -q -- "-j $CHAIN" && c4=1
    ipt6 -S OUTPUT 2>/dev/null | grep -q -- "-j $CHAIN" && c6=1
    r4=$(ipt  -S "$CHAIN" 2>/dev/null | grep -c -- '--uid-owner')
    r6=$(ipt6 -S "$CHAIN" 2>/dev/null | grep -c -- '--uid-owner')
    m=$(master_state)
    p=$(grep -c . "$LIST" 2>/dev/null)
    ml=$(grep -c . "$MAP" 2>/dev/null)
    dn=$(grep -c . "$DNS_LIST" 2>/dev/null)
    last=$(grep 'apply:' "$CONF/engine.log" 2>/dev/null | tail -n 1)

    echo "device=${dev:-?} model=${model:-?} android=${rel:-?} sdk=${sdk:-?} kernel=${kern:-?} arch=${arch:-?} mgr=$mgr iptables=${iptv:-?} owner=$owner chain4=$c4 chain6=$c6 rules4=$r4 rules6=$r6 master=$m pkgs=${p:-0} pkgmap=${ml:-0} dns=${dn:-0}"
    echo "opts=$(cmd_opts 2>/dev/null)"
    echo "last=${last:-sin registros}"
}

cmd_global() {
    ensure_conf
    case "$1" in
        on)  echo 1 > "$CONF/global" ;;
        off) echo 0 > "$CONF/global" ;;
        *)   echo "uso: engine.sh global on|off"; return 1 ;;
    esac
    cmd_apply
}

cmd_list() {
    ensure_conf
    cat "$LIST" 2>/dev/null
}

cmd_expprobe() {
    ensure_conf
    local r="unsupported"
    ipt -N NK_EXPPROBE 2>/dev/null
    if ipt -A NK_EXPPROBE -m owner --pid-owner 1 -j RETURN 2>/dev/null; then
        r="pid-owner"
    fi
    ipt -F NK_EXPPROBE 2>/dev/null; ipt -X NK_EXPPROBE 2>/dev/null
  
    ipt -N NK_EXPPROBE 2>/dev/null
    if ipt -A NK_EXPPROBE -m owner --cmd-owner sh -j RETURN 2>/dev/null; then
        r="$r+cmd-owner"
    fi
    ipt -F NK_EXPPROBE 2>/dev/null; ipt -X NK_EXPPROBE 2>/dev/null
    echo "exp=$r"
}

usage() {
    echo "uso: engine.sh <comando>"
    echo "  apply           construir / recargar las reglas"
    echo "  stop            bajar el filtro (sin borrar la lista)"
    echo "  start           subir el filtro (= apply)"
    echo "  block <pkg>     cortar una app (todos sus uids)"
    echo "  allow <pkg>     restaurar una app"
    echo "  global on|off   bloqueo total (todas las uids)"
    echo "  list            paquetes en la lista negra"
    echo "  status          estado del filtro"
    echo "  check <pkg>     estado real de reglas de una app"
    echo "  diag            diagnóstico del sistema y del filtro"
    echo "  refresh         refrescar caché pkg -> uid"
    echo "  dns set|del ... forzar DNS por aplicación"
    echo "  opts dot=N ...  opciones de privacidad en el kernel"
}

CMD="${1:-status}"
[ $# -gt 0 ] && shift
case "$CMD" in
    apply)   cmd_apply ;;
    stop)    teardown_chain ;;
    start)   cmd_apply ;;
    block)   cmd_block "$@" ;;
    allow)   cmd_allow "$@" ;;
    global)  cmd_global "$@" ;;
    list)    cmd_list ;;
    status)  cmd_status ;;
    check)   cmd_check "$@" ;;
    diag)    cmd_diag ;;
    refresh) refresh_map ;;
    dns)     cmd_dns "$@" ;;
    opts)    cmd_opts "$@" ;;
    expprobe) cmd_expprobe ;;
    *)       usage; exit 1 ;;
esac

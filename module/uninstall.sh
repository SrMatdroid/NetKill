#!/system/bin/sh

iptables -w -D OUTPUT -j NB_OUT 2>/dev/null
iptables -w -F NB_OUT 2>/dev/null
iptables -w -X NB_OUT 2>/dev/null
ip6tables -w -D OUTPUT -j NB_OUT 2>/dev/null
ip6tables -w -F NB_OUT 2>/dev/null
ip6tables -w -X NB_OUT 2>/dev/null
iptables -t nat -w -D OUTPUT -j NK_DNS 2>/dev/null
iptables -t nat -w -F NK_DNS 2>/dev/null
iptables -t nat -w -X NK_DNS 2>/dev/null
ip6tables -t nat -w -D OUTPUT -j NK_DNS6 2>/dev/null
ip6tables -t nat -w -F NK_DNS6 2>/dev/null
ip6tables -t nat -w -X NK_DNS6 2>/dev/null
iptables -w -D OUTPUT -j NK_OPT 2>/dev/null
iptables -w -F NK_OPT 2>/dev/null
iptables -w -X NK_OPT 2>/dev/null
ip6tables -w -D OUTPUT -j NK_OPT 2>/dev/null
ip6tables -w -F NK_OPT 2>/dev/null
ip6tables -w -X NK_OPT 2>/dev/null

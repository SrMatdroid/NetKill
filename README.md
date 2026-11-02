# NetKill · cut Internet at the kernel level

> Author: **srmatdroid** · themes: cyberpunk (phosphor green + subtle amber) and HX (light, HyperOS/iOS-like)

Magisk / KernelSU / APatch module that **fully disconnects Internet** for the apps you choose — system or user apps — through **netfilter (iptables) with UID matching**, applied directly in the kernel. No external apps, no VPN, no reboots.

## Why at kernel level and without patching the kernel binary

Patching the kernel binary per device is fragile (breaks on every OTA). Netfilter lives INSIDE the kernel instead: every rule this module inserts is evaluated by the kernel's own network stack, packet by packet:

```
table filter → chain OUTPUT → chain NB_OUT
  -m owner --uid-owner <app uid>  -j REJECT
```

The GKI kernel (5.10 on garnet, and any modern stock kernel) ships `CONFIG_NETFILTER_XT_MATCH_OWNER=y`, so it works without compiling anything. The result is equivalent to "the app has no network stack": TCP, UDP, DNS, ICMP, IPv4 and IPv6 — every outbound packet of that UID dies in the kernel (REJECT, immediate reply: the app does not hang waiting for timeouts).

## Table of Contents

- [Requirements](#requirements)
- [Structure](#structure)
- [Installation](#installation)
- [Engine usage (shell)](#engine-usage-shell)
- [DNS and privacy commands](#dns-and-privacy-commands)
- [Extended diagnostics](#extended-diagnostics)
- [Full engine (engine.sh)](#full-engine-enginesh)
- [WebUI (two themes, advanced)](#webui-two-themes-advanced)
- [Honest limitations](#honest-limitations)
- [Build](#build)
- [License](#license)

## Requirements

- Root manager: KernelSU-Next, KernelSU, APatch, or Magisk (WebUI via WebUIX on Magisk).
- Android with a netfilter-capable kernel (iptables/ip6tables with `-m owner --uid-owner`).
- Tested on aarch64 / Android 15 (SDK 35).

## Structure

```
netkill/
├ module/
│   ├── module.prop
│   ├── customize.sh     install (detects manager, creates /data/adb/netkill)
│   ├── service.sh       re-applies the filter on every boot (integrates DNS/Opts)
│   ├── action.sh        "Run action" button of the manager (re-apply)
│   ├── uninstall.sh     cleanup of netfilter chains
│   ├── engine.sh        engine: apply/stop/start/block/allow/global/list/status/check/diag/dns/opts
│   └ webroot/           WebUI (index.html · style.css · app.js)
├ build.sh               packs the flashable zip
└ README.md
```

## Installation

1. Build the zip: `./build.sh` → `netkill-1.0.5.zip`.
2. Flash from your manager (KernelSU → Modules → Install).
3. Open the **WebUI** on the module card and pick apps.

> **Magisk:** the official Magisk manager has no WebUI of its own; install [WebUIX](https://github.com/lswky/webuix) (implements the `ksu.exec` API) or use the module from KernelSU. Without WebUI you can always control the engine over ADB:
>
> ```sh
> su -c 'sh /data/adb/modules/netkill/engine.sh block com.whatsapp'
> su -c 'sh /data/adb/modules/netkill/engine.sh status'
> ```

## Engine usage (shell)

```sh
E=/data/adb/modules/netkill/engine.sh

sh $E block com.whatsapp         # cut (resolves and cuts ALL of its uids)
sh $E allow com.whatsapp         # restore (only if no other uid member stays listed)
sh $E check com.whatsapp         # REAL kernel rules: pkg=.. uid=.. rule4=N rule6=N
sh $E diag                       # diagnostics: device, kernel, iptables, chains, rules
sh $E global on                  # MASTER: cut ALL uids 1000-65535
sh $E global off                 # back to per-app filtering
sh $E stop                       # drop the filter without clearing the list
sh $E start                      # bring it back up
sh $E status                     # master=0 chain=1 rules=4 pkgs=4
sh $E list                       # blacklisted apps
sh $E refresh                    # re-scan apps -> uids
```

## DNS and privacy commands

```sh
sh $E dns set <pkg> <ip>                   # force DNS via DNAT per app (pkg=ip in dns.list)
sh $E dns del <pkg>                        # remove forced DNS from an app
sh $E dns clearall                         # remove forced DNS from ALL apps
sh $E dns list                             # list current pkg=ip
sh $E dns global <host|off|getglobal>      # system Private DNS (TLS hostname / off)
sh $E opts dot=N icmp=N v6=N               # NK_OPT kernel options: DoT, ICMP, IPv6
sh $E opts                                 # show current dot/icmp/v6 state
```

## Extended diagnostics

`diag` prints system, filter and active option state:

```
device model android sdk kernel arch mgr iptables owner chain4=X chain6=X rules4=Y rules6=Y master=Z pkgs=N pkgmap=M dns=M
opts=dot=N icmp=N v6=N
last=…
```

## Full engine (engine.sh)

### Chains and persistence

- `CHAIN=NB_OUT` — filter OUTPUT cut by uid (always active).
- `DNS_CHAIN=NK_DNS` / `DNS_CHAIN6=NK_DNS6` — nat OUTPUT (v4/v6) DNAT udp+tcp 53 per uid, persisted in `dns.list`.
- `OPT_CHAIN=NK_OPT` — filter OUTPUT privacy options (DoT, ICMP, IPv6) persisted in `opts`.

### dns commands

- `dns set <pkg> <ip>` — adds `pkg=ip` to `/data/adb/netkill/dns.list` and rebuilds NK_DNS (v4) and NK_DNS6 (v6). Scans pkg→uid first if the package is not in the map.
- `dns del <pkg>` — removes the pkg from dns.list and rebuilds.
- `dns clearall` — empties dns.list and clears both chains.
- `dns list` — shows current `pkg=ip`.
- `dns global <host|off|getglobal>` — configures system Private DNS (TLS). `off` restores the carrier DNS.

**DNS v4 vs v6 (automatic):** if the assigned DNS is IPv4, the DNAT is created in NK_DNS **and IPv6 port 53 of that uid is also blocked (DROP) in NK_DNS6** — forcing the app resolver to use the assigned DNS. If the assigned DNS is IPv6, the DNAT goes in NK_DNS6 and IPv4 port 53 is blocked in NK_DNS. Without that cross-block the resolver would still query the carrier DNS on the other stack.

### opts commands

- `opts` — prints `dot=N icmp=N v6=N`.
- `opts dot=1` — blocks DoT (tcp/853) in the kernel.
- `opts icmp=1` — blocks outbound ICMP echo-request.
- `opts v6=1` — blocks ALL outbound IPv6 traffic.

### service.sh integration

On boot completion (`sys.boot_completed`):

1. Waits for the system to be ready (`getprop sys.boot_completed`).
2. Runs `refresh` (re-scans pkg→uid).
3. Runs `apply` (rebuilds NB_OUT, NK_DNS and NK_OPT from `apps.list`, `dns.list` and `opts`).

## WebUI (two themes, advanced)

### Swappable themes

- **CB** — cyberpunk: phosphor green / subtle amber, beveled corners, scanlines, glitch.
- **HX** — light: HyperOS/iOS-like, white cards, rounded switches, iOS blue.

Choice is remembered via `data-theme` and `meta theme-color`. Toggle button in the header.

### "ADVANCED SETTINGS" modal (footer)

Pressing the **SETTINGS** button (gear icon) opens a modal with three sections:

#### 1. Global DNS · Private DNS (DoT)

- **Presets**: OFF, Cloudflare (`1.1.1.1`), Google (`8.8.8.8`), Quad9 (`9.9.9.9`), AdGuard (`94.140.14.14`).
- **Custom**: DoT host (e.g. `security.cloudflare-dns.com`).
- Encrypts DNS for the WHOLE device (system TLS). If the resolver fails, with `strict` you lose Internet until you turn it off.

#### 2. Per-app DNS · kernel DNAT

- Assigns an app its own DNS resolver (DNAT redirect on port 53 per UID).
- Apps with their own DoT/DoH ignore it: use "BLOCK DoT" in the PRIVACY section.
- Firewall block takes priority.

#### 3. Kernel privacy · NK_OPT

- **BLOCK DoT (tcp/853)**: closes encrypted DNS of apps that bypass your forced DNS or Private DNS.
- **BLOCK OUTBOUND PING**: rejects outbound ICMP echo-request.
- **BLOCK IPv6**: rejects ALL outbound IPv6 traffic (for IPv4 networks without leaks).

### Modal controls

- **REFRESH**: updates DNS / privacy state instantly.
- **CLOSE**: closes the modal.

## Honest limitations

- Filtering is **by UID**: if two apps share a uid (`sharedUserId`), they are cut together. That is exactly how Android works at kernel level.
- Apps under **work profiles** (uid 10xxxxx) do not show in the user-0 `pm list packages -U` output; they can be cut by passing the uid to the engine.
- If you cut `com.google.android.gms`, GCM/FCM push dies: that is expected.
- Traffic is blocked by the kernel, not the framework: the app thinks there is no network, which is exactly what is requested.
- Per-app forced DNS (DNAT on port 53) only redirects queries the app emits with its own uid. On Android 9+ the framework resolver (netd/libnetd_resolv) makes its queries with netd's uid: those queries correspond to the global resolver (use `dns global` for the rest of the system, and `opts dot=1` against app DoT).

## Build

Run `./build.sh` in the repository root to generate `netkill-1.0.0.zip`, ready to flash.

## License

GNU General Public License v3.0 — see [LICENSE](LICENSE).
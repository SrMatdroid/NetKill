/* lol */
'use strict';

var MODID  = 'netkill';
var ENGINE = '/data/adb/modules/' + MODID + '/engine.sh';
var CONF   = '/data/adb/netkill';

var LABELS = {
  'android':'Sistema Android',
  'com.android.vending':'Play Store',
  'com.google.android.gms':'Servicios Google (GMS)',
  'com.google.android.gsf':'Marco Servicios Google',
  'com.google.android.gm':'Gmail',
  'com.google.android.youtube':'YouTube',
  'com.google.android.apps.youtube.music':'YT Music',
  'com.google.android.apps.maps':'Google Maps',
  'com.google.android.apps.photos':'Google Fotos',
  'com.google.android.apps.docs':'Google Drive',
  'com.google.android.googlequicksearchbox':'Google',
  'com.google.android.tts':'Voz de Google',
  'com.google.android.webview':'Android System WebView',
  'com.android.webview':'WebView',
  'com.google.android.inputmethod.latin':'Gboard',
  'com.google.android.apps.messaging':'Mensajes (Google)',
  'com.google.android.apps.walletnfcrel':'Google Wallet',
  'com.google.android.contacts':'Contactos (Google)',
  'com.google.android.documentsui':'Archivos',
  'com.google.android.apps.nbu.files':'Files de Google',
  'com.google.android.deskclock':'Reloj (Google)',
  'com.google.android.keep':'Google Keep',
  'com.google.android.calendar':'Calendario',
  'com.google.android.videos':'Google TV',
  'com.google.android.apps.recorder':'Grabadora',
  'com.google.android.apps.tachyon':'Google Meet',
  'com.google.android.projection.gearhead':'Android Auto',
  'com.google.android.wearable.app':'Wear OS',
  'com.google.android.apps.play.games':'Play Juegos',
  'com.google.android.feedback':'Feedback Google',
  'com.google.android.partnersetup':'Partner Setup',
  'com.google.android.backuptransport':'Backup Google',
  'com.google.android.configupdater':'Config Updater',
  'com.google.android.ext.services':'Android Services Library',
  'com.google.android.networkstack':'Network Stack',
  'com.google.android.networkstack.tethering':'Tethering',
  'com.google.android.permissioncontroller':'Controlador permisos',
  'com.google.android.printservice.recommendation':'Servicio de impresión',
  'com.android.chrome':'Chrome',
  'com.android.settings':'Ajustes',
  'com.android.systemui':'SystemUI',
  'com.android.providers.media':'Proveedor multimedia',
  'com.android.providers.downloads':'Descargas',
  'com.android.providers.telephony':'Telefonía (datos)',
  'com.android.providers.settings':'Proveedor de ajustes',
  'com.android.incallui':'Llamadas',
  'com.android.dialer':'Teléfono',
  'com.android.mms':'Mensajes',
  'com.android.messaging':'Mensajes',
  'com.android.email':'Email',
  'com.android.deskclock':'Reloj',
  'com.android.calendar':'Calendario',
  'com.android.contacts':'Contactos',
  'com.android.documentsui':'Archivos',
  'com.android.printspooler':'Impresión',
  'com.android.server.telecom':'Telecom',
  'com.android.keychain':'Keychain',
  'com.android.shell':'Shell (ADB)',
  'com.android.location.fused':'Ubicación fusionada',
  'com.android.cellbroadcastreceiver':'Cell Broadcast',
  'com.miui.securitycenter':'Seguridad MIUI',
  'com.miui.home':'Launcher MIUI',
  'com.miui.player':'Música MIUI',
  'com.miui.videoplayer':'Video MIUI',
  'com.miui.weather2':'Clima MIUI',
  'com.miui.cloudservice':'Mi Cloud',
  'com.miui.cleaner':'Limpiador MIUI',
  'com.miui.miservice':'Servicios MIUI',
  'com.miui.mishare.connectivity':'Mi Share',
  'com.xiaomi.mipicks':'GetApps',
  'com.xiaomi.scanner':'Escáner Xiaomi',
  'com.xiaomi.mi_connect_service':'Mi Connect',
  'com.samsung.android.messaging':'Mensajes Samsung',
  'com.sec.android.app.samsungapps':'Galaxy Store',
  'com.samsung.android.spay':'Samsung Pay',
  'com.samsung.android.app.notes':'Samsung Notes',
  'com.samsung.android.game.gamehome':'Game Launcher',
  'com.huawei.appmarket':'AppGallery',
  'com.oppo.market':'Oppo Store',
  'com.vivo.appstore':'V-Appstore',
  'org.mozilla.firefox':'Firefox',
  'com.brave.browser':'Brave',
  'com.opera.browser':'Opera',
  'com.opera.mini.native':'Opera Mini',
  'com.microsoft.emmx':'Edge',
  'com.microsoft.skydrive':'OneDrive',
  'com.microsoft.office.outlook':'Outlook',
  'com.microsoft.teams':'Teams',
  'com.whatsapp':'WhatsApp',
  'com.whatsapp.w4b':'WhatsApp Business',
  'com.instagram.android':'Instagram',
  'com.instagram.lite':'Instagram Lite',
  'com.facebook.katana':'Facebook',
  'com.facebook.lite':'Facebook Lite',
  'com.facebook.orca':'Messenger',
  'com.facebook.mlite':'Messenger Lite',
  'org.telegram.messenger':'Telegram',
  'org.telegram.messenger.web':'Telegram X',
  'org.thoughtcrime.securesms':'Signal',
  'com.snapchat.android':'Snapchat',
  'com.twitter.android':'X (Twitter)',
  'com.reddit.frontpage':'Reddit',
  'com.linkedin.android':'LinkedIn',
  'com.discord':'Discord',
  'com.spotify.music':'Spotify',
  'com.spotify.lite':'Spotify Lite',
  'com.soundcloud.android':'SoundCloud',
  'com.deezer.android.app':'Deezer',
  'com.netflix.mediaclient':'Netflix',
  'com.amazon.avod.thirdpartyclient':'Prime Video',
  'com.disney.disneyplus':'Disney+',
  'tv.twitch.android.app':'Twitch',
  'com.zhiliaoapp.musically':'TikTok',
  'com.pinterest':'Pinterest',
  'com.airbnb.android':'Airbnb',
  'com.booking':'Booking.com',
  'com.ubercab':'Uber',
  'com.ubercab.eats':'Uber Eats',
  'com.grability.rappi':'Rappi',
  'com.waze':'Waze',
  'com.paypal.android.p2p.mobile':'PayPal',
  'com.amazon.mShop.android.shopping':'Amazon',
  'com.ebay.mobile':'eBay',
  'com.alibaba.aliexpresshd':'AliExpress',
  'com.mercadolibre':'MercadoLibre',
  'com.mercadopago.wallet':'Mercado Pago',
  'com.truecaller':'Truecaller',
  'com.shazam.android':'Shazam',
  'com.duolingo':'Duolingo',
  'com.mojang.minecraftpe':'Minecraft',
  'com.supercell.clashofclans':'Clash of Clans',
  'com.supercell.clashroyale':'Clash Royale',
  'com.dts.freefireth':'Free Fire',
  'com.mobile.legends':'Mobile Legends',
  'com.tencent.ig':'PUBG Mobile',
  'com.activision.callofduty.shooter':'COD Mobile',
  'com.roblox.client':'Roblox',
  'com.ea.gp.fifamobile':'FC Mobile',
  'com.king.candycrushsaga':'Candy Crush',
  'com.termux':'Termux',
  'bin.mt.plus':'MT Manager',
  'com.zoom.us':'Zoom',
  'com.skype.raider':'Skype',
  'com.slack':'Slack',
  'com.trello':'Trello',
  'com.crunchyroll.crunchyroid':'Crunchyroll'
};

function prettify(pkg){
  var lbl = LABELS[pkg];
  if (lbl) return lbl;
  var last = (pkg.split('.').pop() || pkg).replace(/[_\-]+/g, ' ').trim();
  if (!last) return pkg;
  return last.charAt(0).toUpperCase() + last.slice(1);
}

function hueOf(s){
  var h = 7;
  for (var i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

var AV_TONES = [
  'hsl(150,32%,62%)',  
  'hsl(38,40%,58%)',    
  'hsl(160,22%,55%)',  
  'hsl(8,38%,60%)'      
];
function avatarTone(pkg){
  if (currentTheme() === 'hx'){
    return 'hsl(' + hueOf(pkg) + ',42%,46%)';
  }
  return AV_TONES[hueOf(pkg) % AV_TONES.length];
}

var I18N = {
  es: {
    'lang.toggle': 'Idioma',
    'theme.toggle': 'Cambiar interfaz',
    'adv.open': 'Ajustes avanzados (DNS / privacidad)',
    'diag.open': 'Diagnóstico del sistema',
    'refresh': 'Reconsultar sistema',
    'state.loading': 'CONSULTANDO…',
    'state.active': 'ACTIVO · {n} REGLA{p}',
    'state.off': 'FILTRO APAGADO',
    'state.global': 'GLOBAL · TODO CORTADO',
    'state.demo': 'DEMO · {n} CORTADAS',
    'demo.bar': 'modo demostración — sin bridge root · abre la WebUI desde el gestor',
    'search.placeholder': 'buscar paquete o nombre…',
    'filter.all': 'TODAS',
    'filter.user': 'USUARIO',
    'filter.sys': 'SISTEMA',
    'filter.cut': 'CORTADAS',
    'empty': 'sin resultados',
    'foot': 'netfilter OUTPUT v4+v6 · REJECT por uid · cadena NB_OUT · sin VPN · sin apps extra',
    'btn.regen': 'REGENERAR',
    'btn.master': 'MAESTRO',
    'btn.master.on': 'MAESTRO: ON',
    'modal.cancel': 'CANCELAR',
    'modal.confirm': 'CONFIRMAR',
    'global.title': 'BLOQUEO GLOBAL',
    'global.body': 'Corta <code>uid 1000:65535</code>: <b>todas</b> las apps, incluidos los servicios de Google y del sistema. La Play Store, el Push de WhatsApp, la sincronización… todo morirá hasta que lo desactives.',
    'global.confirm': 'CORTAR TODO',
    'global.off.title': 'DESACTIVAR GLOBAL',
    'global.off.body': 'Se restaura el filtrado normal por app: solo las apps de tu lista volverán a quedar cortadas.',
    'global.off.confirm': 'RESTAURAR',
    'uid.title': 'UID COMPARTIDO',
    'uid.close': 'CERRAR',
    'uid.note': 'Android asigna el <b>mismo uid</b> a apps firmadas con la misma clave (<code>sharedUserId</code>). El filtro opera <b>por uid</b>, así que cortar una corta <b>a todo el grupo</b> — y liberar una no libera al resto mientras otra siga en tu lista. <b>No es posible aislar una sola app del grupo</b>: el kernel solo distingue por UID (pid/cmd-owner están rotos en SMP y no existen en Android).',
    'uid.note.master': ' Con el <b>MAESTRO</b> activo, todo el uid está cortado por la regla global.',
    'uid.group': 'VER GRUPO DEL UID {id}',
    'uid.banner.master': 'MAESTRO GLOBAL · todo el uid {id} está cortado',
    'uid.banner.rule': 'REGLA ACTIVA · todo el uid {id} está cortado',
    'uid.banner.none': 'SIN REGLA · este uid tiene Internet',
    'uid.banner.unknown': 'no se pudo consultar el kernel — pulsa REGENERAR y reintenta',
    'uid.banner.demo.rule': 'DEMO · REGLA ACTIVA · todo el uid {id} está cortado',
    'uid.banner.demo.none': 'DEMO · SIN REGLA · este uid tiene Internet',
    'diag.title': 'DIAGNÓSTICO',
    'diag.close': 'CERRAR',
    'diag.loading': 'consultando kernel y sistema…',
    'diag.error': 'error: {e} — abre la WebUI desde el gestor root',
    'diag.sec.system': 'SISTEMA',
    'diag.sec.root': 'ENTORNO ROOT',
    'diag.sec.filter': 'FILTRO',
    'diag.sec.priv': 'PRIVACIDAD (NK_OPT)',
    'diag.sec.last': 'ÚLTIMO APPLY',
    'diag.device': 'DISPOSITIVO',
    'diag.model': 'MODELO',
    'diag.android': 'ANDROID',
    'diag.kernel': 'KERNEL',
    'diag.arch': 'ARQUITECTURA',
    'diag.mgr': 'GESTOR',
    'diag.ipt': 'IPTABLES',
    'diag.owner': 'MATCH OWNER',
    'diag.owner.ok': 'disponible',
    'diag.owner.bad': 'NO disponible',
    'diag.chain4': 'CADENA V4',
    'diag.chain4.ok': 'NB_OUT conectada a OUTPUT',
    'diag.chain4.bad': 'no conectada',
    'diag.chain6': 'CADENA V6',
    'diag.chain6.ok': 'NB_OUT conectada a OUTPUT',
    'diag.chain6.bad': 'no conectada',
    'diag.rules': 'REGLAS V4/V6',
    'diag.master': 'MAESTRO',
    'diag.master.on': 'ACTIVO · todo cortado',
    'diag.master.off': 'inactivo',
    'diag.pkgs': 'APPS EN LISTA',
    'diag.pkgmap': 'CACHE PKGMAP',
    'diag.entries': 'entradas',
    'diag.dot': 'BLOQUEAR DoT (853)',
    'diag.ping': 'BLOQUEAR PING',
    'diag.v6': 'BLOQUEAR IPv6',
    'diag.active': 'activo',
    'diag.inactive': 'inactivo',
    'diag.noapply': 'sin registros en engine.log',
    'adv.title': 'AJUSTES AVANZADOS',
    'adv.close': 'CERRAR',
    'adv.refresh': 'REFRESCAR',
    'adv.sec.dnsGlobal': 'DNS GLOBAL · PRIVATE DNS (DoT)',
    'adv.note.dnsGlobal': 'Cifra el DNS de <b>todo el equipo</b> (TLS del sistema). Si el resolver elegido falla puedes quedarte sin Internet hasta apagarlo.',
    'adv.dnsGlobal.off': 'Private DNS: <b>OFF</b> · DNS en claro del operador',
    'adv.dnsGlobal.on': 'Private DNS: <b class="sok">DoT ACTIVO</b> · {host}',
    'adv.sec.dnsPerApp': 'DNS POR APP · DNAT KERNEL',
    'adv.note.dnsPerApp': 'Cada app puede llevar su propio resolver: redireccionado DNAT en el puerto 53 por UID (cadena NK_DNS). Otra app o el sistema mantienen otro DNS. Las apps con DoT/DoH propio lo ignoran: usa «BLOQUEAR DoT» en PRIVACIDAD. El corte del firewall tiene prioridad.',
    'adv.dnsPerApp.count': 'apps con DNS propio: <b>{n}</b>',
    'adv.dns.pkg.placeholder': 'paquete, ej. com.whatsapp',
    'adv.dns.assign': 'ASIGNAR',
    'adv.dns.clearAll': 'QUITAR TODOS',
    'adv.dns.clearAll.confirm': '¿Quitar el DNS forzado de TODAS las apps?',
    'adv.sec.priv': 'PRIVACIDAD EN EL KERNEL · NK_OPT',
    'adv.note.priv': 'Reglas netfilter en la cadena <code>NK_OPT</code> de OUTPUT (v4+v6), reconstruidas en cada BOOT y en REGENERAR. Son bloqueos duros del kernel.',
    'adv.opt.state': 'NK_OPT activa · v4+v6 · cambio inmediato en el kernel',
    'adv.opt.dot': 'BLOQUEAR DoT (tcp/853) — cierra el DNS cifrado de apps que se saltan tu DNS forzado o el Private DNS.',
    'adv.opt.icmp': 'BLOQUEAR PING SALIENTE — rechaza ICMP echo-request emitido (los demás no recibirán ping de este equipo).',
    'adv.opt.v6': 'BLOQUEAR IPv6 — rechaza TODO el tráfico IPv6 de salida (para redes IPv4 sin fugas).',
    'adv.exp.title': 'EXPERIMENTAL · AISLAMIENTO POR APP (UID COMPARTIDO)',
    'adv.exp.warn': '⚠ Inestable y no portable. Intenta distinguir apps que comparten UID usando pid/cmd-owner (rotos en SMP y ausentes en la mayoría de Android). No afecta a las opciones estables. Puede no funcionar o romper el filtrado.',
    'adv.exp.untested': 'sin probar',
    'adv.exp.probe': 'PROBAR SOPORTE',
    'adv.exp.unsupported': 'no soportado en este dispositivo',
    'toast.noSystem': 'No se pudo consultar el sistema: {e}',
    'toast.master.on': 'Bloqueo GLOBAL activo: todo el dispositivo sin Internet',
    'toast.master.off': 'Bloqueo global desactivado',
    'toast.master.err': 'Error: {e}',
    'toast.regen.ok': 'Reglas netfilter regeneradas',
    'toast.regen.err': 'Error al regenerar: {e}',
    'toast.blocked': '{name} sin Internet',
    'toast.allowed': '{name} con Internet de nuevo',
    'toast.nouid': 'Sin UID para {pkg} — pulsa REGENERAR',
    'toast.uidshared': 'uid {uids} compartido: afecta a todas las apps con ese uid',
    'toast.uidshared.err': 'uid {uids} compartido: también afecta a otras apps con ese uid',
    'toast.master.cover': 'MAESTRO activo: la regla global ya la cubre',
    'toast.error': 'Error: {e}',
    'toast.master.confirm': 'MAESTRO activo: la regla global ya corta este uid',
    'toast.cut.uid': 'cortado: ahora TODAS las apps del uid {id} están sin Internet',
    'toast.stillcut': 'sigue cortada: comparte el uid {id} con otra app que sigue en tu lista',
    'toast.nochange': 'sigue cortada: comparte el uid {id} con otra app que sigue en tu lista',
    'modal.master.global': 'GLOBAL · TODO CORTADO',
    'detail.pkg': 'PAQUETE',
    'detail.uids': 'UID(S)',
    'detail.ver': 'VERSIÓN',
    'detail.type': 'TIPO',
    'detail.listed': 'EN LISTA',
    'detail.rules': 'REGLAS NETFILTER',
    'detail.user': 'app de usuario',
    'detail.system': 'app del sistema',
    'detail.listed.cut': 'cortada (está en apps.list)',
    'detail.listed.none': 'sin bloqueo',
    'detail.rules.loading': 'consultando kernel…',
    'detail.rules.demo': 'consultando…',
    'detail.rules.none': 'sin regla para este uid',
    'detail.rules.na': 'no disponible (usa REGENERAR y reintenta)',
    'detail.version.unknown': 'desconocida',
    'detail.version.code': 'versionCode {v}',
    'detail.shared': 'compartido',
    'badge.user': 'USUARIO',
    'badge.system': 'SISTEMA',
    'badge.shared': 'UID COMPARTIDO',
    'check.v4cut': 'v4 corta',
    'check.v4free': 'v4 libre',
    'check.v6cut': 'v6 corta',
    'check.v6free': 'v6 libre',
    'confirm.master': 'CORTAR TODO',
    'confirm.restore': 'RESTAURAR',
    'uid.banner.demo.rule': 'DEMO · REGLA ACTIVA · todo el uid {id} está cortado',
    'uid.banner.demo.none': 'DEMO · SIN REGLA · este uid tiene Internet',
    'uid.banner.unknown': 'no se pudo consultar el kernel — pulsa REGENERAR y reintenta',
    'uid.banner.none': 'SIN REGLA · este uid tiene Internet',
    'uid.banner.rule': 'REGLA ACTIVA · todo el uid {id} está cortado',
    'uid.banner.master': 'MAESTRO GLOBAL · todo el uid {id} está cortado',
    'toast.host.invalid': 'host no válido',
    'toast.host.short': 'host demasiado corto',
    'toast.pkg.required': 'Indica un paquete',
    'toast.dns.invalid': 'DNS IP no válida (usa Personalizado)',
  },
  en: {
    'lang.toggle': 'Language',
    'theme.toggle': 'Change interface',
    'adv.open': 'Advanced settings (DNS / privacy)',
    'diag.open': 'System diagnostics',
    'refresh': 'Refresh system',
    'state.loading': 'LOADING…',
    'state.active': 'ACTIVE · {n} RULE{p}',
    'state.off': 'FILTER OFF',
    'state.global': 'GLOBAL · ALL BLOCKED',
    'state.demo': 'DEMO · {n} BLOCKED',
    'demo.bar': 'demo mode — no root bridge · open the WebUI from the manager',
    'search.placeholder': 'search package or name…',
    'filter.all': 'ALL',
    'filter.user': 'USER',
    'filter.sys': 'SYSTEM',
    'filter.cut': 'BLOCKED',
    'empty': 'no results',
    'foot': 'netfilter OUTPUT v4+v6 · REJECT per uid · chain NB_OUT · no VPN · no extra apps',
    'btn.regen': 'REGENERATE',
    'btn.master': 'MASTER',
    'btn.master.on': 'MASTER: ON',
    'modal.cancel': 'CANCEL',
    'modal.confirm': 'CONFIRM',
    'global.title': 'GLOBAL BLOCK',
    'global.body': 'Blocks <code>uid 1000:65535</code>: <b>all</b> apps, including Google and system services. Play Store, WhatsApp push, sync… everything dies until you turn it off.',
    'global.confirm': 'BLOCK ALL',
    'global.off.title': 'DISABLE GLOBAL',
    'global.off.body': 'Restores normal per-app filtering: only the apps in your list will be blocked again.',
    'global.off.confirm': 'RESTORE',
    'uid.title': 'SHARED UID',
    'uid.close': 'CLOSE',
    'uid.note': 'Android assigns the <b>same uid</b> to apps signed with the same key (<code>sharedUserId</code>). The filter works <b>per uid</b>, so blocking one blocks <b>the whole group</b> — and unblocking one does not unblock the rest while another remains in your list. <b>It is not possible to isolate a single app in the group</b>: the kernel only distinguishes by UID (pid/cmd-owner are broken on SMP and absent on Android).',
    'uid.note.master': ' With <b>MASTER</b> active, the whole uid is blocked by the global rule.',
    'uid.group': 'VIEW GROUP OF UID {id}',
    'uid.banner.master': 'GLOBAL MASTER · whole uid {id} blocked',
    'uid.banner.rule': 'RULE ACTIVE · whole uid {id} blocked',
    'uid.banner.none': 'NO RULE · this uid has Internet',
    'uid.banner.unknown': 'could not query kernel — press REGENERATE and retry',
    'uid.banner.demo.rule': 'DEMO · RULE ACTIVE · whole uid {id} blocked',
    'uid.banner.demo.none': 'DEMO · NO RULE · this uid has Internet',
    'diag.title': 'DIAGNOSTICS',
    'diag.close': 'CLOSE',
    'diag.loading': 'querying kernel and system…',
    'diag.error': 'error: {e} — open the WebUI from the root manager',
    'diag.sec.system': 'SYSTEM',
    'diag.sec.root': 'ROOT ENVIRONMENT',
    'diag.sec.filter': 'FILTER',
    'diag.sec.priv': 'PRIVACY (NK_OPT)',
    'diag.sec.last': 'LAST APPLY',
    'diag.device': 'DEVICE',
    'diag.model': 'MODEL',
    'diag.android': 'ANDROID',
    'diag.kernel': 'KERNEL',
    'diag.arch': 'ARCHITECTURE',
    'diag.mgr': 'MANAGER',
    'diag.ipt': 'IPTABLES',
    'diag.owner': 'MATCH OWNER',
    'diag.owner.ok': 'available',
    'diag.owner.bad': 'NOT available',
    'diag.chain4': 'CHAIN V4',
    'diag.chain4.ok': 'NB_OUT connected to OUTPUT',
    'diag.chain4.bad': 'not connected',
    'diag.chain6': 'CHAIN V6',
    'diag.chain6.ok': 'NB_OUT connected to OUTPUT',
    'diag.chain6.bad': 'not connected',
    'diag.rules': 'RULES V4/V6',
    'diag.master': 'MASTER',
    'diag.master.on': 'ACTIVE · all blocked',
    'diag.master.off': 'inactive',
    'diag.pkgs': 'APPS IN LIST',
    'diag.pkgmap': 'PKGMAP CACHE',
    'diag.entries': 'entries',
    'diag.dot': 'BLOCK DoT (853)',
    'diag.ping': 'BLOCK PING',
    'diag.v6': 'BLOCK IPv6',
    'diag.active': 'active',
    'diag.inactive': 'inactive',
    'diag.noapply': 'no records in engine.log',
    'adv.title': 'ADVANCED SETTINGS',
    'adv.close': 'CLOSE',
    'adv.refresh': 'REFRESH',
    'adv.sec.dnsGlobal': 'GLOBAL DNS · PRIVATE DNS (DoT)',
    'adv.note.dnsGlobal': 'Encrypts DNS for <b>the whole device</b> (system TLS). If the chosen resolver fails you may lose Internet until you turn it off.',
    'adv.dnsGlobal.off': 'Private DNS: <b>OFF</b> · operator plaintext DNS',
    'adv.dnsGlobal.on': 'Private DNS: <b class="sok">DoT ACTIVE</b> · {host}',
    'adv.sec.dnsPerApp': 'PER-APP DNS · KERNEL DNAT',
    'adv.note.dnsPerApp': 'Each app can use its own resolver: DNAT redirection on port 53 by UID (chain NK_DNS). Other apps or the system keep another DNS. Apps with their own DoT/DoH ignore it: use “BLOCK DoT” in PRIVACY. Firewall block takes priority.',
    'adv.dnsPerApp.count': 'apps with own DNS: <b>{n}</b>',
    'adv.dns.pkg.placeholder': 'package, e.g. com.whatsapp',
    'adv.dns.assign': 'ASSIGN',
    'adv.dns.clearAll': 'REMOVE ALL',
    'adv.dns.clearAll.confirm': 'Remove forced DNS from ALL apps?',
    'adv.sec.priv': 'PRIVACY IN KERNEL · NK_OPT',
    'adv.note.priv': 'Netfilter rules in chain <code>NK_OPT</code> of OUTPUT (v4+v6), rebuilt on every BOOT and on REGENERATE. Hard kernel blocks.',
    'adv.opt.state': 'NK_OPT active · v4+v6 · immediate change in kernel',
    'adv.opt.dot': 'BLOCK DoT (tcp/853) — closes encrypted DNS of apps that bypass your forced DNS or Private DNS.',
    'adv.opt.icmp': 'BLOCK OUTGOING PING — rejects ICMP echo-request emitted (others will not receive pings from this device).',
    'adv.opt.v6': 'BLOCK IPv6 — rejects ALL outgoing IPv6 traffic (for IPv4 networks without leaks).',
    'adv.exp.title': 'EXPERIMENTAL · PER-APP ISOLATION (SHARED UID)',
    'adv.exp.warn': '⚠ Unstable and not portable. Tries to distinguish apps sharing a UID using pid/cmd-owner (broken on SMP and absent on most Android). Does not affect stable options. May not work or may break filtering.',
    'adv.exp.untested': 'not tested',
    'adv.exp.probe': 'TEST SUPPORT',
    'adv.exp.unsupported': 'not supported on this device',
    'toast.noSystem': 'Could not query system: {e}',
    'toast.master.on': 'GLOBAL block active: whole device without Internet',
    'toast.master.off': 'Global block disabled',
    'toast.master.err': 'Error: {e}',
    'toast.regen.ok': 'Netfilter rules regenerated',
    'toast.regen.err': 'Error regenerating: {e}',
    'toast.blocked': '{name} without Internet',
    'toast.allowed': '{name} with Internet again',
    'toast.nouid': 'No UID for {pkg} — press REGENERATE',
    'toast.uidshared': 'uid {uids} shared: affects all apps with that uid',
    'toast.uidshared.err': 'uid {uids} shared: also affects other apps with that uid',
    'toast.master.cover': 'MASTER active: global rule already covers it',
    'toast.error': 'Error: {e}',
    'toast.master.confirm': 'MASTER active: global rule already blocks this uid',
    'toast.cut.uid': 'blocked: now ALL apps of uid {id} have no Internet',
    'toast.stillcut': 'still blocked: shares uid {id} with another app still in your list',
    'toast.nochange': 'still blocked: shares uid {id} with another app still in your list',
    'detail.pkg': 'PACKAGE',
    'detail.uids': 'UID(S)',
    'detail.ver': 'VERSION',
    'detail.type': 'TYPE',
    'detail.listed': 'IN LIST',
    'detail.rules': 'NETFILTER RULES',
    'detail.user': 'user app',
    'detail.system': 'system app',
    'detail.listed.cut': 'blocked (in apps.list)',
    'detail.listed.none': 'not blocked',
    'detail.rules.loading': 'querying kernel…',
    'detail.rules.demo': 'querying…',
    'detail.rules.none': 'no rule for this uid',
    'detail.rules.na': 'not available (press REGENERATE and retry)',
    'detail.version.unknown': 'unknown',
    'detail.version.code': 'versionCode {v}',
    'detail.shared': 'shared',
    'badge.user': 'USER',
    'badge.system': 'SYSTEM',
    'badge.shared': 'SHARED UID',
    'check.v4cut': 'v4 blocked',
    'check.v4free': 'v4 free',
    'check.v6cut': 'v6 blocked',
    'check.v6free': 'v6 free',
    'confirm.master': 'BLOCK ALL',
    'confirm.restore': 'RESTORE',
    'toast.uidshared.demo': 'uid {uids} shared: also affects other apps with that uid',
    'toast.host.invalid': 'invalid host',
    'toast.host.short': 'host too short',
    'toast.pkg.required': 'Enter a package',
    'toast.dns.invalid': 'Invalid DNS IP (use Custom)',
  }
};

function currentLang(){
  var l = 'en';
  try { l = localStorage.getItem('nk_lang') || l; } catch (e) {}
  if (l !== 'es' && l !== 'en') l = detectSystemLang();
  return l;
}
function detectSystemLang(){
  var n = '';
  try { n = (navigator.language || navigator.userLanguage || '').toLowerCase(); } catch (e) {}
  return n.indexOf('es') === 0 ? 'es' : 'en';
}
function setLang(l){
  if (l !== 'es' && l !== 'en') l = 'en';
  try { localStorage.setItem('nk_lang', l); } catch (e) {}
  document.documentElement.setAttribute('lang', l);
  applyI18n();
  if (typeof advOpen !== 'undefined' && advOpen){ advRefreshAll(); }
  if (typeof uidCtx !== 'undefined' && uidCtx){ refreshUidStates(); }
  render();
}
function toggleLang(){ setLang(currentLang() === 'es' ? 'en' : 'es'); }
function t(key){
  var l = currentLang();
  var dict = I18N[l] || I18N.en;
  var s = dict[key];
  if (s === undefined){ s = (I18N.es[key] !== undefined ? I18N.es[key] : key); }
  if (arguments.length > 1){
    for (var i = 1; i < arguments.length; i++){
      s = s.replace('{'+(i-1)+'}', arguments[i]);
    }
  }
  // named placeholders {name}
  return s;
}
// helper for {name} style placeholders
function tf(key, vars){
  var s = t(key);
  if (vars){ for (var k in vars){ s = s.replace(new RegExp('\\{'+k+'\\}','g'), vars[k]); } }
  return s;
}
function applyI18n(){
  var nodes = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < nodes.length; i++){
    var el = nodes[i];
    var key = el.getAttribute('data-i18n');
    var val = t(key);
    if (el.hasAttribute('data-i18n-html')) el.innerHTML = val;
    else el.textContent = val;
  }
  var htmlNodes = document.querySelectorAll('[data-i18n-html]');
  for (var h = 0; h < htmlNodes.length; h++){
    var hel = htmlNodes[h];
    // avoid double-processing elements already handled above
    if (!hel.hasAttribute('data-i18n')){
      hel.innerHTML = t(hel.getAttribute('data-i18n-html'));
    }
  }
  var ph = document.querySelectorAll('[data-i18n-placeholder]');
  for (var j = 0; j < ph.length; j++){
    ph[j].setAttribute('placeholder', t(ph[j].getAttribute('data-i18n-placeholder')));
  }
  var titleNodes = document.querySelectorAll('[data-i18n-title]');
  for (var k = 0; k < titleNodes.length; k++){
    titleNodes[k].setAttribute('title', t(titleNodes[k].getAttribute('data-i18n-title')));
  }
  var ariaNodes = document.querySelectorAll('[data-i18n-aria]');
  for (var a = 0; a < ariaNodes.length; a++){
    ariaNodes[a].setAttribute('aria-label', t(ariaNodes[a].getAttribute('data-i18n-aria')));
  }
  var btn = document.getElementById('btnLang');
  if (btn) btn.textContent = currentLang().toUpperCase();
}

function currentTheme(){
  return document.documentElement.getAttribute('data-theme') === 'hx' ? 'hx' : 'cb';
}

function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('nk_theme', t); } catch (e) {}
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'hx' ? '#f2f3f6' : '#050706');
  render();
}

function toggleTheme(){
  applyTheme(currentTheme() === 'cb' ? 'hx' : 'cb');
}

function restoreTheme(){
  var t = 'cb';
  try { t = localStorage.getItem('nk_theme') === 'hx' ? 'hx' : 'cb'; } catch (e) {}
  document.documentElement.setAttribute('data-theme', t);
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', t === 'hx' ? '#f2f3f6' : '#050706');
}

var bridge = null, demo = false, seq = 0;

function findBridge(){
  var names = ['ksu', 'kernelsu', 'apatch', 'magisk', 'kpm'];
  for (var i = 0; i < names.length; i++){
    var o = window[names[i]];
    if (o && typeof o.exec === 'function') return { name: names[i], api: o };
  }
  return null;
}

function shell(cmd){
  return new Promise(function(resolve, reject){
    if (!bridge){ reject(new Error('no-bridge')); return; }
    var api = bridge.api;
    var name = '__nk_cb_' + (++seq);
    var settled = false;
    var timer = setTimeout(function(){
      if (!settled){ settled = true; delete window[name]; reject(new Error('timeout')); }
    }, 90000);
    function settle(fn, val){
      if (settled) return;
      settled = true; clearTimeout(timer); delete window[name];
      fn(val);
    }
    window[name] = function(errno, stdout, stderr){
      if (errno === 0 || errno === '0') settle(resolve, stdout || '');
      else settle(reject, new Error(stderr || ('errno ' + errno)));
    };
    function useThenable(p){
      if (p && typeof p.then === 'function'){
        p.then(function(v){ settle(resolve, typeof v === 'string' ? v : (v && v.stdout) || ''); },
               function(e){ settle(reject, e instanceof Error ? e : new Error(String(e))); });
        return true;
      }
      return false;
    }
    try {
      var r = api.exec(cmd, {}, name);
      useThenable(r); 
      
    } catch (e) {
      try {
        var r2 = api.exec(cmd, name);
        if (!useThenable(r2) && !settled){ 
        }
   
      } catch (e2) {
        settle(reject, e2 instanceof Error ? e2 : new Error(String(e2)));
      }
    }
  });
}

function runEngine(args){
  return shell('sh "' + ENGINE + '" ' + args);
}


var apps = [];
var blocked = new Set();
var curFilter = 'all';
var q = '';
var master = false, chainOn = false, rules = 0;

function $id(x){ return document.getElementById(x); }

function toast(msg, kind){
  var t = $id('toast');
  t.textContent = msg;
  t.className = 'toast' + (kind ? ' ' + kind : '');
  clearTimeout(toast._h);
  toast._h = setTimeout(function(){ t.classList.add('hidden'); }, 2600);
}

function parsePkgs(text){
  var out = [], seen = {};
  (text || '').split(/\r?\n/).forEach(function(line){
    var m = /^package:(\S+).*uid:(\d+)/.exec(line);
    if (m && !seen[m[1]]){
      seen[m[1]] = 1;
      var v = /\bversionCode:(\d+)/.exec(line);
      out.push({ pkg: m[1], uid: parseInt(m[2], 10), ver: v ? v[1] : null });
    }
  });
  return out;
}

function parseStatus(s){
  var m = /master=(\d)/.exec(s || '');
  master = !!(m && m[1] === '1');
  var c = /chain=(\d)/.exec(s || '');
  chainOn = !!(c && c[1] === '1');
  var r = /rules=(\d+)/.exec(s || '');
  rules = r ? parseInt(r[1], 10) : 0;
  updatePill(); updateMasterBtn();
}

function updatePill(){
  var pill = $id('statePill'), txt = $id('stateTxt');
  pill.classList.remove('on', 'off', 'global');
  if (master){
    pill.classList.add('global');
    txt.textContent = t('state.global');
  } else if (chainOn){
    pill.classList.add('on');
    txt.textContent = tf('state.active', { n: rules, p: rules === 1 ? '' : 'S' });
  } else {
    pill.classList.add('off');
    txt.textContent = t('state.off');
  }
}

function updateMasterBtn(){
  $id('btnMaster').classList.toggle('on', master);
  $id('btnMaster').textContent = master ? t('btn.master.on') : t('btn.master');
}

function pmList(args){
  return shell('pm list packages ' + args + ' --show-versioncode')
    .catch(function(){ return shell('pm list packages ' + args); });
}

function load(){
  var btn = $id('btnRefresh');
  btn.classList.add('spin');
  var finish = function(){ btn.classList.remove('spin'); };

  if (demo){ loadDemo(); finish(); return; }

  $id('demoBar').classList.add('hidden'); 
  Promise.resolve()
    .then(function(){ return pmList('-U'); })
    .then(function(allT){
      return pmList('-3 -U').then(function(uT){
        return { allT: allT, userT: uT };
      }, function(){ return { allT: allT, userT: '' }; });
    })
    .then(function(r){
      return shell('cat "' + CONF + '/apps.list" 2>/dev/null').then(function(listT){
        r.listT = listT; return r;
      }, function(){ r.listT = ''; return r; });
    })
    .then(function(r){
      return runEngine('status').then(function(stT){ r.stT = stT; return r; },
                                      function(){ r.stT = ''; return r; });
    })
    .then(function(r){
      var userSet = {};
      parsePkgs(r.userT).forEach(function(a){ userSet[a.pkg] = 1; });

      var byPkg = {}, order = [];
      parsePkgs(r.allT).forEach(function(a){
        var e = byPkg[a.pkg];
        if (!e){
          e = { pkg: a.pkg, uids: [], cat: userSet[a.pkg] ? 'user' : 'system', shared: false, ver: null };
          byPkg[a.pkg] = e;
          order.push(e);
        }
        if (e.uids.indexOf(a.uid) < 0) e.uids.push(a.uid);
        if (!e.ver && a.ver) e.ver = a.ver;
      });

      var appCount = {};
      order.forEach(function(e){
        var id = e.uids[0] % 100000;
        appCount[id] = (appCount[id] || 0) + 1;
      });
      order.forEach(function(e){
        e.shared = (appCount[e.uids[0] % 100000] || 0) > 1;
      });

      apps = order;
      blocked = new Set((r.listT || '').split(/\r?\n/)
        .map(function(s){ return s.trim(); }).filter(Boolean));
      parseStatus(r.stT);
      render();
    })
    .catch(function(e){
      toast(tf('toast.noSystem', { e: e.message || e }), 'err');
    })
    .then(finish);
}

function refreshStatus(){
  if (demo) return;
  runEngine('status').then(parseStatus, function(){});
}

function visibleApps(){
  var qn = q.trim().toLowerCase();
  return apps.filter(function(a){
    if (curFilter === 'user' && a.cat !== 'user') return false;
    if (curFilter === 'sys'  && a.cat !== 'system') return false;
    if (curFilter === 'cut'  && !blocked.has(a.pkg)) return false;
    if (qn){
      var lbl = (LABELS[a.pkg] || prettify(a.pkg)).toLowerCase();
      if (a.pkg.toLowerCase().indexOf(qn) < 0 && lbl.indexOf(qn) < 0) return false;
    }
    return true;
  });
}

function makeRow(a){
  var cut = blocked.has(a.pkg);
  var label = LABELS[a.pkg] || prettify(a.pkg);

  var row = document.createElement('div');
  row.className = 'row' + (cut ? ' cut' : '');

  var av = document.createElement('div');
  av.className = 'av';
  av.textContent = label.charAt(0).toUpperCase();
  av.style.color = avatarTone(a.pkg);

  var meta = document.createElement('div');
  meta.className = 'meta';

  var name = document.createElement('div');
  name.className = 'name';
  name.textContent = label;

  var pkg = document.createElement('div');
  pkg.className = 'pkg';
  pkg.textContent = a.pkg + ' · uid ' + a.uids.join('+');

  var badges = document.createElement('div');
  badges.className = 'badges';
  var b1 = document.createElement('span');
  b1.className = 'badge' + (a.cat === 'system' ? ' sys' : '');
  b1.textContent = a.cat === 'user' ? t('badge.user') : t('badge.system');
  badges.appendChild(b1);
  if (a.shared){
    var b2 = document.createElement('button');
    b2.type = 'button';
    b2.className = 'badge shared';
    b2.textContent = t('badge.shared');
    b2.title = 'ver apps que comparten este uid';
    b2.addEventListener('click', function(ev){
      ev.stopPropagation();
      openUidModal(a);
    });
    badges.appendChild(b2);
  }

  meta.appendChild(name);
  meta.appendChild(pkg);
  meta.appendChild(badges);

  var sw = document.createElement('button');
  sw.className = 'sw' + (cut ? ' on' : '');
  sw.setAttribute('aria-label', (cut ? 'restaurar ' : 'cortar ') + a.pkg);
  sw.addEventListener('click', function(ev){
    ev.stopPropagation();
    toggleApp(a, row, sw);
  });

  var chev = document.createElement('span');
  chev.className = 'chev';
  chev.setAttribute('aria-hidden', 'true');
  chev.textContent = '▾';

  row.appendChild(av);
  row.appendChild(meta);
  row.appendChild(sw);
  row.appendChild(chev);
  row.appendChild(buildDetails(a));

  row.addEventListener('click', function(ev){
    var t = ev.target;
    if (inSel(t, '.sw', row) || inSel(t, '.badge', row) || inSel(t, '.details', row)) return;
    toggleExpand(a, row);
  });
  return row;
}

function inSel(el, sel, root){
  while (el && el !== root){
    if (el.matches && el.matches(sel)) return true;
    el = el.parentNode;
  }
  return false;
}

function kvRow(parent, k, v, cls){
  var r = document.createElement('div');
  r.className = 'kv';
  var b = document.createElement('b');
  b.textContent = k;
  var s = document.createElement('span');
  s.textContent = v;
  if (cls) s.className = cls;
  r.appendChild(b);
  r.appendChild(s);
  parent.appendChild(r);
  return s;
}

function buildDetails(a){
  var d = document.createElement('div');
  d.className = 'details';
  return d;
}

function fillDetails(a, d){
  d.innerHTML = '';
  kvRow(d, t('detail.pkg'), a.pkg);
  kvRow(d, t('detail.uids'), a.uids.join(' + ') + (a.shared ? ' · ' + t('detail.shared') : ''));
  kvRow(d, t('detail.ver'), a.ver ? (t('detail.version.code').replace('{v}', a.ver)) : t('detail.version.unknown'));
  kvRow(d, t('detail.type'), a.cat === 'user' ? t('detail.user') : t('detail.system'));
  kvRow(d, t('detail.listed'), blocked.has(a.pkg) ? t('detail.listed.cut') : t('detail.listed.none'));
  var kr = kvRow(d, t('detail.rules'), demo ? t('detail.rules.demo') : t('detail.rules.loading'));
  if (demo){
    kr.textContent = blocked.has(a.pkg) ? 'uid ' + a.uids[0] + ': v4 ✓ · v6 ✓' : t('detail.rules.none');
  } else {
    runEngine('check "' + a.pkg + '"').then(function(out){
      kr.textContent = rulesText(out);
    }, function(){
      kr.textContent = t('detail.rules.na');
    });
  }
  if (a.shared){
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'dbtn';
    btn.textContent = tf('uid.group', { id: (a.uids[0] % 100000) });
    btn.addEventListener('click', function(ev){
      ev.stopPropagation();
      openUidModal(a);
    });
    d.appendChild(btn);
  }
}

function rulesText(out){
  var lines = (out || '').trim().split(/\r?\n/).filter(Boolean);
  if (!lines.length) return t('detail.rules.none');
  return lines.map(function(l){
    var u  = /uid=(\d+)/.exec(l);
    var r4 = /rule4=(\d+)/.exec(l);
    var r6 = /rule6=(\d+)/.exec(l);
    var on4 = r4 && parseInt(r4[1], 10) > 0;
    var on6 = r6 && parseInt(r6[1], 10) > 0;
    return 'uid ' + (u ? u[1] : '?') + ': ' +
      (on4 ? t('check.v4cut') : t('check.v4free')) + ' · ' +
      (on6 ? t('check.v6cut') : t('check.v6free'));
  }).join('  ·  ');
}

function toggleExpand(a, row){
  var open = !row.classList.contains('open');
  row.classList.toggle('open', open);
  if (open){
    var d = row.querySelector('.details');
    if (d) fillDetails(a, d); 
  }
}

function refreshDetails(a, row){
  if (!row.classList.contains('open')) return;
  var d = row.querySelector('.details');
  if (d) fillDetails(a, d);
}

function render(){
  var list = $id('list');
  list.innerHTML = '';
  var vis = visibleApps();
  vis.sort(function(a, b){
    var ba = blocked.has(a.pkg) ? 0 : 1;
    var bb = blocked.has(b.pkg) ? 0 : 1;
    if (ba !== bb) return ba - bb;
    return (LABELS[a.pkg] || a.pkg).localeCompare(LABELS[b.pkg] || b.pkg);
  });
  vis.forEach(function(a){ list.appendChild(makeRow(a)); });

  $id('empty').classList.toggle('hidden', vis.length > 0);

  var nU = 0, nS = 0;
  apps.forEach(function(a){ if (a.cat === 'user') nU++; else nS++; });
  $id('cAll').textContent  = apps.length;
  $id('cUser').textContent = nU;
  $id('cSys').textContent  = nS;
  $id('cCut').textContent  = blocked.size;
}

function toggleApp(a, row, sw){
  var want = !blocked.has(a.pkg);

  if (demo){
    if (want) blocked.add(a.pkg); else blocked.delete(a.pkg);
    sw.classList.toggle('on', want);
    row.classList.toggle('cut', want);
    sw.setAttribute('aria-label', (want ? 'restaurar ' : 'cortar ') + a.pkg);
    $id('cCut').textContent = blocked.size;
    if (want && a.shared){
      toast(tf('toast.uidshared.demo', { uids: a.uids.join('+') }), 'err');
    }
    refreshCountsPillDemo();
    refreshDetails(a, row);
    return;
  }

  sw.classList.add('busy');
  var verb = want ? 'block' : 'allow';
  runEngine(verb + ' ' + a.pkg)
    .then(function(out){
      if (want) blocked.add(a.pkg); else blocked.delete(a.pkg);
      sw.classList.toggle('on', want);
      row.classList.toggle('cut', want);
      sw.setAttribute('aria-label', (want ? 'restaurar ' : 'cortar ') + a.pkg);
      $id('cCut').textContent = blocked.size;
      if (want){
        if (master){
          toast(t('toast.master.cover'), 'ok');
        } else if (out.indexOf('warn') === 0){
          toast(tf('toast.nouid', { pkg: a.pkg }), 'err');
        } else {
          toast(tf('toast.blocked', { name: prettify(a.pkg) }), 'ok');
        }
        if (a.shared){
          toast(tf('toast.uidshared', { uids: a.uids.join('+') }), 'err');
        }
      } else {
        toast(tf('toast.allowed', { name: prettify(a.pkg) }), 'ok');
      }
      refreshStatus();
      refreshDetails(a, row);
    })
    .catch(function(e){
      toast(tf('toast.error', { e: e.message || e }), 'err');
    })
    .then(function(){ sw.classList.remove('busy'); });
}

function refreshCountsPillDemo(){
  var pill = $id('statePill'), txt = $id('stateTxt');
  pill.classList.remove('on', 'off', 'global');
  if (master){ pill.classList.add('global'); txt.textContent = t('state.global'); }
  else if (blocked.size > 0){ pill.classList.add('on'); txt.textContent = tf('state.demo', { n: blocked.size }); }
  else { pill.classList.add('off'); txt.textContent = t('state.off'); }
}

var uidCtx = null; 
function uidGroup(a){
  var id = a.uids[0] % 100000;
  return apps.filter(function(x){ return (x.uids[0] % 100000) === id; });
}

function openUidModal(a){
  var grp = uidGroup(a);
  if (!grp.length) return;
  var id = a.uids[0] % 100000;
  uidCtx = { appId: id, apps: grp, sws: {} };

  $id('uidTitle').textContent =
    'UID ' + id + ' · ' + grp.length + ' APP' + (grp.length === 1 ? '' : 'S') + ' COMPARTEN';

  var note = $id('uidNote');
  note.innerHTML = t('uid.note') + (master ? t('uid.note.master') : '');

  renderUidModal();
  $id('uidModal').classList.remove('hidden');
  refreshUidStates();
}

function renderUidModal(){
  var list = $id('uidList');
  list.innerHTML = '';
  uidCtx.sws = {};
  uidCtx.apps.forEach(function(a){
    var label = LABELS[a.pkg] || prettify(a.pkg);

    var r = document.createElement('div');
    r.className = 'urow';

    var av = document.createElement('div');
    av.className = 'uav';
    av.textContent = label.charAt(0).toUpperCase();
    av.style.color = avatarTone(a.pkg);

    var meta = document.createElement('div');
    meta.className = 'umeta';

    var name = document.createElement('div');
    name.className = 'uname';
    name.textContent = label;

    var pkg = document.createElement('div');
    pkg.className = 'upkg';
    pkg.textContent = a.pkg + ' · uid ' + a.uids.join('+') + (a.ver ? ' · v' + a.ver : '');

    meta.appendChild(name);
    meta.appendChild(pkg);

    var sw = document.createElement('button');
    sw.type = 'button';
    sw.className = 'sw';
    sw.setAttribute('aria-label', (blocked.has(a.pkg) ? 'restaurar ' : 'cortar ') + a.pkg);
    sw.addEventListener('click', function(){
      uidToggle(a, sw);
    });
    uidCtx.sws[a.pkg] = sw;

    r.appendChild(av);
    r.appendChild(meta);
    r.appendChild(sw);
    list.appendChild(r);
  });
  setUidBanner(demo ? tf('uid.banner.demo.rule', { id: uidCtx.appId }) : t('detail.rules.loading'), '');
}

function uidCutFromCheck(out){
  var cut = false;
  (out || '').split(/\r?\n/).forEach(function(l){
    var r4 = /rule4=(\d+)/.exec(l);
    var r6 = /rule6=(\d+)/.exec(l);
    if ((r4 && parseInt(r4[1], 10) > 0) || (r6 && parseInt(r6[1], 10) > 0)) cut = true;
  });
  return cut;
}

function setUrowState(a, cut){
  var sw = uidCtx.sws[a.pkg];
  if (!sw) return;
  sw.classList.toggle('on', cut === true);
  sw.setAttribute('aria-label', (cut ? 'restaurar ' : 'cortar ') + a.pkg);
}

function setUidBanner(text, cls){
  var b = $id('uidBanner');
  b.textContent = text;
  b.className = 'ukbanner' + (cls ? ' ' + cls : '');
}

function refreshUidStates(){
  if (!uidCtx) return;
  if (demo){
  
    var anyDemo = uidCtx.apps.some(function(a){ return blocked.has(a.pkg); });
    uidCtx.apps.forEach(function(a){ setUrowState(a, anyDemo); });
    setUidBanner(anyDemo
      ? tf('uid.banner.demo.rule', { id: uidCtx.appId })
      : t('uid.banner.demo.none'), anyDemo ? 'on' : 'off');
    return;
  }

  var res = [];
  var chainJobs = Promise.resolve();
  uidCtx.apps.forEach(function(a){
    chainJobs = chainJobs.then(function(){
      return runEngine('check "' + a.pkg + '"').then(function(out){
        res.push({ a: a, cut: uidCutFromCheck(out) });
      }, function(){
        res.push({ a: a, cut: null });
      });
    });
  });
  chainJobs.then(function(){
    if (!uidCtx) return;
    res.forEach(function(r){ setUrowState(r.a, r.cut); });
    var anyRule = res.some(function(r){ return r.cut === true; });
    var unknown = res.every(function(r){ return r.cut === null; });
    if (master){
      setUidBanner(tf('uid.banner.master', { id: uidCtx.appId }), 'on');
    } else if (unknown){
      setUidBanner(t('uid.banner.unknown'), '');
    } else if (anyRule){
      setUidBanner(tf('uid.banner.rule', { id: uidCtx.appId }), 'on');
    } else {
      setUidBanner(t('uid.banner.none'), 'off');
    }
  });
}

function uidToggle(a, sw){
  if (!uidCtx || sw.classList.contains('busy')) return;
  var want = !sw.classList.contains('on'); 
  if (demo){
    if (want) blocked.add(a.pkg); else blocked.delete(a.pkg);
    sw.classList.add('busy');
    setTimeout(function(){
      sw.classList.remove('busy');
      if (!want){
        var still = uidCtx.apps.some(function(x){ return blocked.has(x.pkg); });
        if (still){
          toast(tf('toast.stillcut', { id: uidCtx.appId }), 'err');
        } else {
          toast(tf('toast.allowed', { name: prettify(a.pkg) }), 'ok');
        }
      } else {
        toast(tf('toast.cut.uid', { id: uidCtx.appId }), 'err');
      }
      refreshUidStates();
      render();
    }, 250);
    return;
  }

  sw.classList.add('busy');
  runEngine((want ? 'block ' : 'allow ') + '"' + a.pkg + '"')
    .then(function(){
      if (want) blocked.add(a.pkg); else blocked.delete(a.pkg);
      if (want){
        setUrowState(a, true);
        toast(master
          ? t('toast.master.confirm')
          : tf('toast.cut.uid', { id: (a.uids[0] % 100000) }), 'err');
      } else {
  
        return runEngine('check "' + a.pkg + '"').then(function(out){
          if (uidCutFromCheck(out)){
            setUrowState(a, true);
            toast(tf('toast.stillcut', { id: (a.uids[0] % 100000) }), 'err');
          } else {
            setUrowState(a, false);
            toast(tf('toast.allowed', { name: prettify(a.pkg) }), 'ok');
          }
        });
      }
    })
    .catch(function(e){
      toast(tf('toast.error', { e: e.message || e }), 'err');
    })
    .then(function(){
      if (uidCtx){
        sw.classList.remove('busy');
        refreshUidStates();
      }
      render();
    });
}

function closeUidModal(){
  $id('uidModal').classList.add('hidden');
  uidCtx = null;
}

var DEMO_DIAG = [
  'device=garnet model=Redmi_Note_13_Pro_5G android=15 sdk=35 kernel=5.10.209-android13 ' +
  'arch=aarch64 mgr=KernelSU iptables=v1.8.10 owner=ok chain4=1 chain6=1 rules4=3 rules6=3 master=0 pkgs=3 pkgmap=3',
  'last=[2026-10-28 12:00:00] apply: 3 apps · 3 uids · 6 reglas (demo)'
];

function diagSec(parent, title){
  var h = document.createElement('h4');
  h.textContent = title;
  parent.appendChild(h);
}

function renderDiag(l1, l2, l3){
  var kv = {};
  (l1 || '').split(/\s+/).forEach(function(t){
    var m = /^([a-z0-9]+)=(.*)$/.exec(t);
    if (m) kv[m[1]] = m[2];
  });
  var last = /^last=(.*)$/.exec(l3 || l2 || '');

  var b = $id('diagBody');
  b.innerHTML = '';

  diagSec(b, t('diag.sec.system'));
  kvRow(b, t('diag.device'), kv.device || '?');
  kvRow(b, t('diag.model'), (kv.model || '?').replace(/_/g, ' '));
  kvRow(b, t('diag.android'), (kv.android || '?') + ' · SDK ' + (kv.sdk || '?'));
  kvRow(b, t('diag.kernel'), kv.kernel || '?');
  kvRow(b, t('diag.arch'), kv.arch || '?');

  diagSec(b, t('diag.sec.root'));
  kvRow(b, t('diag.mgr'), kv.mgr || '?', kv.mgr && kv.mgr !== 'desconocido' ? 'good' : 'bad');
  kvRow(b, t('diag.ipt'), kv.iptables || '?', kv.iptables && kv.iptables !== '?' ? 'good' : 'bad');
  kvRow(b, t('diag.owner'), kv.owner === 'ok' ? t('diag.owner.ok') : t('diag.owner.bad'),
        kv.owner === 'ok' ? 'good' : 'bad');

  diagSec(b, t('diag.sec.filter'));
  kvRow(b, t('diag.chain4'), kv.chain4 === '1' ? t('diag.chain4.ok') : t('diag.chain4.bad'),
        kv.chain4 === '1' ? 'good' : 'bad');
  kvRow(b, t('diag.chain6'), kv.chain6 === '1' ? t('diag.chain6.ok') : t('diag.chain6.bad'),
        kv.chain6 === '1' ? 'good' : 'bad');
  kvRow(b, t('diag.rules'), (kv.rules4 || '0') + ' / ' + (kv.rules6 || '0'));
  kvRow(b, t('diag.master'), kv.master === '1' ? t('diag.master.on') : t('diag.master.off'),
        kv.master === '1' ? 'bad' : 'good');
  kvRow(b, t('diag.pkgs'), kv.pkgs || '0');
  kvRow(b, t('diag.pkgmap'), (kv.pkgmap || '0') + ' ' + t('diag.entries'));

  var optsLine = (l2 || '').replace(/^opts=/, '').trim();
  if (optsLine){
    diagSec(b, t('diag.sec.priv'));
    var o = parseOpts(optsLine);
    kvRow(b, t('diag.dot'), o.dot === '1' ? t('diag.active') : t('diag.inactive'), o.dot === '1' ? 'bad' : 'good');
    kvRow(b, t('diag.ping'), o.icmp === '1' ? t('diag.active') : t('diag.inactive'), o.icmp === '1' ? 'bad' : 'good');
    kvRow(b, t('diag.v6'), o.v6 === '1' ? t('diag.active') : t('diag.inactive'), o.v6 === '1' ? 'bad' : 'good');
  }

  diagSec(b, t('diag.sec.last'));
  var p = document.createElement('p');
  p.className = 'diag-last';
  p.textContent = (last && last[1]) || t('diag.noapply');
  b.appendChild(p);
}

function openDiag(){
  var body = $id('diagBody');
  body.innerHTML = '<p class="diag-load">' + t('diag.loading') + '</p>';
  $id('diagModal').classList.remove('hidden');
  if (demo){
    renderDiag(DEMO_DIAG[0], '', DEMO_DIAG[1]);
    return;
  }
  runEngine('diag').then(function(out){
    var lines = (out || '').split(/\r?\n/).filter(Boolean);
    renderDiag(lines[0] || '', lines[1] || '', lines[2] || '');
  }, function(e){
    body.innerHTML = '';
    var p = document.createElement('p');
    p.className = 'diag-load err';
    p.textContent = tf('diag.error', { e: e.message || e });
    body.appendChild(p);
  });
}

function closeDiagModal(){
  $id('diagModal').classList.add('hidden');
}

function askMaster(){
  var modal = $id('modal'), title = $id('modalTitle'), body = $id('modalBody');
  var ok = $id('modalOk');
  if (!master){
    title.textContent = t('global.title');
    title.classList.remove('ok');
    ok.classList.remove('ghost');
    body.innerHTML = t('global.body');
    ok.textContent = t('global.confirm');
  } else {
    title.textContent = t('global.off.title');
    title.classList.add('ok');
    body.innerHTML = t('global.off.body');
    ok.textContent = t('global.off.confirm');
    ok.classList.add('ghost');
  }
  modal.classList.remove('hidden');
}

function closeModal(){ $id('modal').classList.add('hidden'); }

function applyMaster(){
  var next = !master;
  var run = demo ? Promise.resolve() : runEngine('global ' + (next ? 'on' : 'off'));
  run.then(function(){
    master = next;
    updatePill(); updateMasterBtn(); closeModal();
    toast(next ? t('toast.master.on') : t('toast.master.off'), next ? 'err' : 'ok');
    if (demo) refreshCountsPillDemo(); else refreshStatus();
  }).catch(function(e){
    closeModal();
    toast(tf('toast.master.err', { e: e.message || e }), 'err');
  });
}

function regen(){
  var btn = $id('btnApply');
  if (btn.disabled) return;
  btn.disabled = true;
  var run = demo ? Promise.resolve() : runEngine('apply');
  run.then(function(){
    toast(t('toast.regen.ok'), 'ok');
    if (demo) refreshCountsPillDemo(); else refreshStatus();
  }).catch(function(e){
    toast(tf('toast.regen.err', { e: e.message || e }), 'err');
  }).then(function(){ btn.disabled = false; });
}


var DEMO = [
  { pkg:'com.whatsapp',                    uids:[10234],        cat:'user',   shared:false, ver:230483061 },
  { pkg:'com.instagram.android',           uids:[10257],        cat:'user',   shared:false, ver:371020282 },
  { pkg:'org.telegram.messenger',          uids:[10248],        cat:'user',   shared:false, ver:41844 },
  { pkg:'com.spotify.music',               uids:[10266],        cat:'user',   shared:false, ver:920040101 },
  { pkg:'com.zhiliaoapp.musically',        uids:[10335,110335], cat:'user',   shared:false, ver:320504 },
  { pkg:'com.reddit.frontpage',            uids:[10322],        cat:'user',   shared:false, ver:2024370 },
  { pkg:'com.android.chrome',              uids:[10311],        cat:'user',   shared:false, ver:710013933 },
  { pkg:'com.supercell.clashofclans',      uids:[10344],        cat:'user',   shared:false, ver:568 },
  { pkg:'com.mobile.legends',              uids:[10351],        cat:'user',   shared:false, ver:3829 },
  { pkg:'com.google.android.youtube',      uids:[10205],        cat:'user',   shared:false, ver:194260380 },
  { pkg:'com.google.android.gms',          uids:[10091],        cat:'system', shared:false, ver:244733060 },
  { pkg:'com.android.vending',             uids:[10090],        cat:'system', shared:false, ver:84042180 },
  { pkg:'com.google.android.tts',          uids:[10281],        cat:'system', shared:false, ver:513080200 },
  { pkg:'com.google.android.webview',      uids:[10287],        cat:'system', shared:false, ver:710013933 },
  { pkg:'android',                         uids:[1000],         cat:'system', shared:true,  ver:35 },
  { pkg:'com.android.settings',            uids:[1000],         cat:'system', shared:true,  ver:35 },
  { pkg:'com.android.providers.settings',  uids:[1000],         cat:'system', shared:true,  ver:35 },
  { pkg:'com.android.systemui',            uids:[10157],        cat:'system', shared:false, ver:35 },
  { pkg:'com.android.providers.media',     uids:[1065],         cat:'system', shared:false, ver:35 },
  { pkg:'com.android.providers.downloads', uids:[10103],        cat:'system', shared:false, ver:35 },
  { pkg:'com.miui.securitycenter',         uids:[10013],        cat:'system', shared:false, ver:40000537 },
  { pkg:'com.xiaomi.mipicks',              uids:[10111],        cat:'system', shared:false, ver:1000125 }
];

function loadDemo(){
  apps = DEMO.slice();
  blocked = new Set(['com.whatsapp', 'com.zhiliaoapp.musically', 'com.google.android.tts']);
  master = false; chainOn = false; rules = 0;
  $id('demoBar').classList.remove('hidden');
  refreshCountsPillDemo();
  render();
}

function isIPv46(s){
  s = (s||'').trim();
  if (/^[0-9]{1,3}(\.[0-9]{1,3}){3}$/.test(s)) return true;
  if (/^([0-9A-Fa-f]{0,4}:){2,7}[0-9A-Fa-f]{0,4}$/.test(s)) return true;
  return false;
}

var advOpen = false;

function advFillDatalist(){
  var dl = $id('pkgList');
  if (!dl) return;
  var seen = {}, opts = '';
  apps.forEach(function(a){ if(!seen[a.pkg]){ seen[a.pkg]=1; opts += '<option value="'+a.pkg+'">'; } });
  dl.innerHTML = opts;
}

function renderDnsGlobal(host){
  host = (host||'').trim();
  var st = $id('dnsGlobalState');
  if (!host || host==='off'){ st.innerHTML = t('adv.dnsGlobal.off'); }
  else { st.innerHTML = tf('adv.dnsGlobal.on', { host: host }); }
  var chips = $id('dotPresets').querySelectorAll('.chip');
  chips.forEach(function(c){ c.classList.toggle('active', c.getAttribute('data-dot')===host); });
}
function advDotSet(host){
  if (!host){ return; }
  if (host !== 'off'){
    if (!/^[0-9A-Za-z.-]+$/.test(host)){ toast(t('toast.host.invalid'),'err'); return; }
    if (host.length < 4){ toast(t('toast.host.short'),'err'); return; }
  }
  runEngine('dns global ' + host).then(function(out){
    toast(out, /^ok/.test(out)?'ok':'err');
    refreshDnsGlobal();
  }, function(e){ toast(tf('toast.error', { e: e.message || e }), 'err'); });
}
function refreshDnsGlobal(){ runEngine('dns getglobal').then(function(s){
  renderDnsGlobal((s||'').trim());
}, function(){}); }

function dnsResolveIp(){
  var sel = $id('dnsPreset'), v = sel.value;
  if (v==='custom'){ return $id('dnsCustom').value.trim(); }
  return v;
}
function advDnsAdd(){
  var pkg = $id('dnsPkg').value.trim();
  var ip = dnsResolveIp();
  if (!pkg){ toast(t('toast.pkg.required'),'err'); return; }
  if (!isIPv46(ip)){ toast(t('toast.dns.invalid'),'err'); return; }
  runEngine('dns set ' + pkg + ' ' + ip).then(function(out){
    if (/^ok/.test(out)){ $id('dnsPkg').value=''; refreshDnsList(); }
    toast(out, /^ok/.test(out)?'ok':'err');
  }, function(e){ toast(tf('toast.error', { e: e.message || e }), 'err'); });
}
function advDnsClearAll(){
  if (!window.confirm(t('adv.dns.clearAll.confirm'))) return;
  runEngine('dns clearall').then(function(out){ toast(out,'ok'); refreshDnsList(); },
    function(e){ toast(tf('toast.error', { e: e.message || e }), 'err'); });
}
function advDnsDel(pkg){
  runEngine('dns del ' + pkg).then(function(out){ toast(out,'ok'); refreshDnsList(); },
    function(e){ toast(tf('toast.error', { e: e.message || e }), 'err'); });
}
function renderDnsList(text){
  var box = $id('dnsList'); box.innerHTML='';
  var lines=(text||'').split(/\r?\n/).filter(Boolean);
  $id('dnsPerAppState').innerHTML = tf('adv.dnsPerApp.count', { n: lines.length });
  lines.forEach(function(l){
    var m = /^([^=]+)=(.+)$/.exec(l.trim());
    if (!m) return;
    var pkg=m[1], dns=m[2];
    var r=document.createElement('div'); r.className='drow';
    var k=document.createElement('div'); k.className='dpkg';
    k.innerHTML=(LABELS[pkg]||prettify(pkg))+' <span style="opacity:.5">'+pkg+'</span>';
    var d=document.createElement('div'); d.className='ddns'; d.textContent=dns||'';
    var x=document.createElement('button'); x.type='button'; x.className='ddel';
    x.textContent='✕'; x.setAttribute('aria-label','quitar dns de '+pkg);
    x.addEventListener('click',function(){ advDnsDel(pkg); });
    r.appendChild(k); r.appendChild(d); r.appendChild(x); box.appendChild(r);
  });
}
function refreshDnsList(){ runEngine('dns list').then(renderDnsList, function(){ renderDnsList(''); }); }

function parseOpts(s){
  var o = { dot:'0', icmp:'0', v6:'0' };
  var m = /dot=(\d)/.exec(s||'');   if (m) o.dot  = m[1];
  var i = /icmp=(\d)/.exec(s||'');  if (i) o.icmp = i[1];
  var v = /v6=(\d)/.exec(s||'');    if (v) o.v6   = v[1];
  return o;
}
function renderOpts(o){
  $id('optState').innerHTML = t('adv.opt.state');
  $id('optDot').checked  = o.dot  === '1';
  $id('optIcmp').checked = o.icmp === '1';
  $id('optV6').checked   = o.v6   === '1';
}
function refreshOpts(){
  runEngine('opts').then(function(s){ renderOpts(parseOpts(s)); }, function(){});
}
function advOpt(key, on){
  runEngine('opts ' + key + '=' + (on ? '1' : '0')).then(function(out){
    if (!/^ok/.test(out)){ toast(out, 'err'); }
    refreshOpts();
  }, function(e){ toast(tf('toast.error', { e: e.message || e }), 'err'); refreshOpts(); });
}

function expProbe(){
  var st = $id('expState');
  if (!st) return;
  st.textContent = t('diag.loading');
  runEngine('expprobe').then(function(out){
    var m = /exp=(.*)/.exec(out || '');
    var r = m ? m[1].trim() : 'unsupported';
    if (r === 'unsupported' || r.indexOf('pid-owner') < 0){
      st.textContent = t('adv.exp.unsupported');
    } else {
      st.textContent = r;
    }
  }, function(e){
    st.textContent = t('adv.exp.unsupported');
  });
}
function advRefreshAll(){
  refreshDnsGlobal(); refreshDnsList(); refreshOpts();
}
function openAdv(){
  advOpen=true;
  advFillDatalist();
  $id('dnsCustom').hidden = $id('dnsPreset').value !== 'custom';
  $id('advModal').classList.remove('hidden');
  advRefreshAll();
}
function closeAdv(){ advOpen=false; $id('advModal').classList.add('hidden'); }

function init(){
  bridge = findBridge();
  demo = !bridge;
  restoreTheme();
  document.documentElement.setAttribute('lang', currentLang());

  $id('q').addEventListener('input', function(){
    q = this.value;
    render();
  });

  $id('btnTheme').addEventListener('click', toggleTheme);
  $id('btnLang').addEventListener('click', toggleLang);

  var chips = document.querySelectorAll('.chips .chip');
  for (var i = 0; i < chips.length; i++){
    chips[i].addEventListener('click', function(){
      var old = document.querySelector('.chips .chip.active');
      if (old) old.classList.remove('active');
      this.classList.add('active');
      curFilter = this.getAttribute('data-f');
      render();
    });
  }

  $id('btnRefresh').addEventListener('click', function(){ load(); });
  $id('btnDiag').addEventListener('click', openDiag);
  $id('btnApply').addEventListener('click', regen);
  $id('btnMaster').addEventListener('click', askMaster);
  $id('modalCancel').addEventListener('click', closeModal);
  $id('modalOk').addEventListener('click', applyMaster);
  $id('modal').addEventListener('click', function(ev){
    if (ev.target === this) closeModal();
  });
  $id('uidClose').addEventListener('click', closeUidModal);
  $id('uidModal').addEventListener('click', function(ev){
    if (ev.target === this) closeUidModal();
  });
  $id('diagClose').addEventListener('click', closeDiagModal);
  $id('diagModal').addEventListener('click', function(ev){
    if (ev.target === this) closeDiagModal();
  });

  $id('btnAdv').addEventListener('click', openAdv);
  $id('advClose').addEventListener('click', closeAdv);
  $id('advRefresh').addEventListener('click', advRefreshAll);
  $id('expProbe').addEventListener('click', expProbe);
  $id('advModal').addEventListener('click', function(ev){
    if (ev.target === this) closeAdv();
  });
  var dotChips = $id('dotPresets').querySelectorAll('.chip');
  for (var di=0; di<dotChips.length; di++){
    dotChips[di].addEventListener('click', function(){ advDotSet(this.getAttribute('data-dot')); });
  }
  $id('dotSet').addEventListener('click', function(){ advDotSet($id('dotCustom').value.trim()); });
  $id('dnsPreset').addEventListener('change', function(){
    $id('dnsCustom').hidden = this.value !== 'custom';
  });
  $id('dnsAdd').addEventListener('click', advDnsAdd);
  $id('dnsClearAll').addEventListener('click', advDnsClearAll);
  $id('optDot').addEventListener('change', function(){ advOpt('dot', this.checked); });
  $id('optIcmp').addEventListener('change', function(){ advOpt('icmp', this.checked); });
  $id('optV6').addEventListener('change', function(){ advOpt('v6', this.checked); });

  applyI18n();
  load();
}

init();

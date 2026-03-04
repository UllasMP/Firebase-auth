export const STARK_CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden}
:root{
  --red:#b30000;--red-b:#ff1a1a;
  --gold:#ffd700;--gold-d:#b8a000;
  --cyan:#00eaff;--cyan-d:#00a8b8;
  --bg:#020202;--glass:rgba(8,8,12,.88);
  --border:rgba(0,234,255,.13);--borderact:rgba(0,234,255,.65);
  --txt:#e8f4ff;--dim:rgba(200,220,240,.45);
  --F1:'Orbitron',monospace;--F2:'Rajdhani',sans-serif;--F3:'Share Tech Mono',monospace;
  --ease-out-expo:cubic-bezier(0.16,1,0.3,1);
  --ease-in-out-quart:cubic-bezier(0.76,0,0.24,1);
  --ease-out-back:cubic-bezier(0.34,1.56,0.64,1);
}
.stark-root{position:fixed;inset:0;overflow:hidden;font-family:var(--F2);background:var(--bg);color:var(--txt)}

@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes glowCyan{0%,100%{text-shadow:0 0 8px var(--cyan),0 0 22px var(--cyan),0 0 45px rgba(0,234,255,.4)}50%{text-shadow:0 0 4px var(--cyan),0 0 10px var(--cyan)}}
@keyframes glowGold{0%,100%{text-shadow:0 0 8px var(--gold),0 0 22px var(--gold)}50%{text-shadow:0 0 3px var(--gold)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes spinR{to{transform:rotate(-360deg)}}
@keyframes reactorPulse{0%,100%{box-shadow:0 0 18px var(--cyan),0 0 36px var(--cyan),0 0 70px var(--cyan-d)}50%{box-shadow:0 0 8px var(--cyan),0 0 16px var(--cyan)}}
@keyframes energyRing{0%{transform:translate(-50%,-50%) scale(.5);opacity:.7}100%{transform:translate(-50%,-50%) scale(3);opacity:0}}
@keyframes hexFloat{0%,100%{transform:translateY(0) rotate(0deg);opacity:.04}50%{transform:translateY(-20px) rotate(4deg);opacity:.11}}
@keyframes bgPart{0%{transform:translateY(100vh) translateX(0);opacity:0}8%{opacity:.55}88%{opacity:.2}100%{transform:translateY(-8vh) translateX(var(--px));opacity:0}}
@keyframes loadArc{to{transform:rotate(360deg)}}
@keyframes sweepShine{0%{left:-120%}100%{left:220%}}
@keyframes statusBlink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes scanFull{0%{top:-3%;opacity:0}4%{opacity:1}96%{opacity:1}100%{top:104%;opacity:0}}
@keyframes borderPulse{0%,100%{border-color:var(--borderact)}50%{border-color:var(--red-b)}}
@keyframes revealUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes reactorIgnite{0%{box-shadow:none;background:radial-gradient(circle,rgba(0,234,255,.1) 0%,transparent 70%)}40%{box-shadow:0 0 6px var(--cyan),0 0 12px var(--cyan)}100%{box-shadow:0 0 14px var(--cyan),0 0 28px rgba(0,234,255,.48),inset 0 0 14px rgba(0,234,255,.28);background:radial-gradient(circle,rgba(0,234,255,.92) 0%,rgba(0,150,200,.5) 42%,transparent 70%)}}
@keyframes progGlow{0%,100%{box-shadow:0 0 6px var(--cyan),0 0 14px rgba(0,234,255,.4)}50%{box-shadow:0 0 12px var(--cyan),0 0 28px rgba(0,234,255,.7)}}
@keyframes bootScan{0%{top:-2%;opacity:0;height:3px}5%{opacity:1}48%{height:3px}50%{height:6px;opacity:.9}52%{height:3px}95%{opacity:1}100%{top:103%;opacity:0;height:3px}}
@keyframes alertIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
@keyframes divPulse{0%,100%{box-shadow:0 0 8px rgba(0,234,255,.4)}50%{box-shadow:0 0 25px rgba(0,234,255,.9),0 0 50px rgba(0,234,255,.5)}}
@keyframes cornerGrow{from{width:0;height:0}to{width:18px;height:18px}}
@keyframes suitFloat{0%,100%{transform:translateY(0) rotateY(0deg)}30%{transform:translateY(-7px) rotateY(5deg)}70%{transform:translateY(-3px) rotateY(-4deg)}}
@keyframes arrowPulse{0%,100%{opacity:.3;transform:translateX(0)}50%{opacity:1;transform:translateX(3px)}}
@keyframes chipPulse{0%,100%{opacity:.7}50%{opacity:1}}
@keyframes redSweep{0%{left:-100%;opacity:0}20%{opacity:.7}80%{opacity:.4}100%{left:200%;opacity:0}}
@keyframes btnGlowPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,26,26,0)}50%{box-shadow:0 0 20px 4px rgba(255,26,26,.35)}}

/* ── BACKGROUND ─────────────────────────────── */
.stark-bg{position:fixed;inset:0;background:var(--bg);overflow:hidden;z-index:0}
.stark-bg::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 75% 55% at 50% 50%,rgba(0,55,85,.28) 0%,transparent 70%),radial-gradient(ellipse 45% 35% at 18% 82%,rgba(140,0,0,.14) 0%,transparent 62%),radial-gradient(ellipse 60% 60% at 50% 50%,rgba(0,8,18,.75) 0%,transparent 100%);opacity:0;transition:opacity 1.6s ease}
.stark-bg::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(0,234,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(0,234,255,.022) 1px,transparent 1px);background-size:65px 65px;opacity:0;transition:opacity 1.8s ease .6s}
.stark-bg.bg-on::before{opacity:1}
.stark-bg.bg-on::after{opacity:1}
.arc-bg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:650px;height:650px;border-radius:50%;background:radial-gradient(circle,rgba(0,160,210,.07) 0%,transparent 68%);animation:reactorPulse 4.5s ease-in-out infinite;pointer-events:none;opacity:0;transition:opacity 1.2s ease}
.arc-bg.on{opacity:1}
.e-ring{position:absolute;top:50%;left:50%;border-radius:50%;border:1px solid rgba(0,234,255,.13);width:220px;height:220px;animation:energyRing 7s ease-out infinite;pointer-events:none;opacity:0;transition:opacity .8s ease}
.e-ring.on{opacity:1}
.e-ring:nth-child(3){animation-delay:2.3s}
.e-ring:nth-child(4){animation-delay:4.6s}
.hex{position:absolute;border:1px solid rgba(0,234,255,.055);clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);animation:hexFloat 9s ease-in-out infinite;pointer-events:none;opacity:0;transition:opacity 1s ease}
.hex.on{opacity:1}
.scan-ov{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(0,234,255,.55),rgba(0,234,255,.75),rgba(0,234,255,.55),transparent);box-shadow:0 0 10px rgba(0,234,255,.45),0 0 22px rgba(0,234,255,.25);animation:scanFull 9s linear infinite;pointer-events:none;z-index:100;opacity:0;transition:opacity .8s ease}
.scan-ov.on{opacity:1}

/* ── INTRO ──────────────────────────────────── */
.si-intro{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:1000;opacity:0;transition:opacity 1s ease}
.si-intro.boot-in{opacity:1}
.si-intro.hide{opacity:0;transform:scale(1.04);pointer-events:none;transition:opacity .9s var(--ease-in-out-quart),transform .9s var(--ease-in-out-quart)}
.intro-scan{position:absolute;left:0;right:0;pointer-events:none;background:linear-gradient(90deg,transparent,var(--cyan),var(--red-b),var(--cyan),transparent);box-shadow:0 0 16px var(--cyan),0 0 35px rgba(0,234,255,.35);animation:bootScan 2.2s ease-in-out 1 forwards}
.intro-logo{opacity:0;margin-bottom:44px;text-align:center;transform:translateY(20px) scale(.9);transition:opacity .9s var(--ease-out-expo),transform .9s var(--ease-out-expo);will-change:opacity,transform}
.intro-logo.vis{opacity:1;transform:translateY(0) scale(1)}
.reactor-wrap{position:relative;width:104px;height:104px;margin:0 auto 18px}
.r-outer{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(0,234,255,.38);box-shadow:0 0 22px rgba(0,234,255,.28);opacity:0;transition:opacity .5s ease}
.r-outer.on{opacity:1;animation:spin 9s linear infinite}
.r-outer::before{content:'';position:absolute;top:6px;left:6px;right:6px;bottom:6px;border-radius:50%;border:1px solid rgba(0,234,255,.18);animation:spinR 5.5s linear infinite}
.r-mid{position:absolute;inset:16px;border-radius:50%;border:2px solid rgba(0,234,255,.58);opacity:0;transition:opacity .5s ease .18s}
.r-mid.on{opacity:1;animation:spinR 4.2s linear infinite}
.r-inner{position:absolute;inset:31px;border-radius:50%;background:transparent;box-shadow:none;opacity:0;transition:opacity .4s ease .35s}
.r-inner.on{opacity:1;background:radial-gradient(circle,rgba(0,234,255,.92) 0%,rgba(0,150,200,.5) 42%,transparent 70%);animation:reactorIgnite .9s var(--ease-out-expo) forwards,reactorPulse 2.2s ease-in-out 1s infinite}
.stark-label{font-family:var(--F1);font-size:10px;letter-spacing:14px;color:var(--gold);text-align:center;margin-bottom:6px;opacity:0;transition:opacity .7s ease,letter-spacing .7s ease}
.stark-label.vis{opacity:1;letter-spacing:6px;animation:glowGold 3.5s ease-in-out .7s infinite}
.intro-title{font-family:var(--F1);font-size:clamp(18px,5vw,40px);font-weight:700;letter-spacing:8px;animation:glowCyan 3s ease-in-out infinite;margin-bottom:16px;opacity:0;transform:translateY(16px);transition:opacity .65s ease,transform .65s var(--ease-out-expo);text-align:center}
.intro-title.vis{opacity:1;transform:translateY(0)}
.cursor{display:inline-block;animation:blink .65s step-end infinite;color:var(--cyan)}
.intro-sub{font-family:var(--F3);font-size:clamp(8px,2vw,12px);color:var(--cyan-d);letter-spacing:3px;line-height:1.8;opacity:0;transform:translateY(10px);transition:opacity .55s ease .1s,transform .55s var(--ease-out-expo) .1s;text-align:center;padding:0 20px}
.intro-sub.vis{opacity:1;transform:translateY(0)}
.access-ready{margin-top:38px;font-family:var(--F1);font-size:clamp(10px,2.5vw,13px);letter-spacing:6px;color:var(--gold);display:flex;align-items:center;gap:12px;opacity:0;transform:translateY(12px) scale(.97);transition:opacity .6s ease,transform .6s var(--ease-out-expo)}
.access-ready.vis{opacity:1;transform:translateY(0) scale(1)}
.a-dot{width:8px;height:8px;border-radius:50%;background:var(--gold);animation:statusBlink 1.1s ease-in-out infinite;box-shadow:0 0 8px var(--gold),0 0 16px var(--gold-d)}
.progress-wrap{width:clamp(240px,60vw,300px);height:3px;margin-top:30px;background:rgba(0,234,255,.07);border:1px solid rgba(0,234,255,.16);overflow:visible;position:relative;opacity:0;transform:scaleX(.85);transition:opacity .5s ease,transform .5s var(--ease-out-expo)}
.progress-wrap.vis{opacity:1;transform:scaleX(1)}
.progress-fill{height:100%;width:0%;background:linear-gradient(90deg,var(--cyan),var(--red-b),var(--gold));box-shadow:0 0 8px var(--cyan),0 0 18px rgba(0,234,255,.45);transition:width .07s linear;position:relative}
.progress-fill::after{content:'';position:absolute;right:-3px;top:50%;transform:translateY(-50%);width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 8px var(--cyan),0 0 16px var(--cyan)}
.prog-label{position:absolute;right:0;top:-18px;font-family:var(--F3);font-size:9px;letter-spacing:2px;color:var(--cyan-d)}

/* ── AUTH CARD ──────────────────────────────── */
.si-auth{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:10;padding:20px;perspective:1400px;opacity:0;pointer-events:none;transition:opacity .85s var(--ease-out-expo);will-change:opacity}
.si-auth.vis{opacity:1;pointer-events:all}
.auth-card{position:relative;width:100%;max-width:900px;height:580px;transform-style:preserve-3d;opacity:0;transform:scale(.9) translateY(18px);transition:opacity .8s var(--ease-out-expo),transform .8s var(--ease-out-expo);will-change:opacity,transform}
.auth-card.vis{opacity:1;transform:scale(1) translateY(0)}
.panel{position:absolute;top:0;height:100%;width:50%;background:var(--glass);border:1px solid var(--border);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);overflow:hidden;transition:transform .75s var(--ease-in-out-quart),opacity .75s var(--ease-in-out-quart),filter .75s var(--ease-in-out-quart),box-shadow .75s ease,border-color .75s ease;will-change:transform,opacity,filter;transform-origin:center center}
.panel::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,234,255,.045) 0%,transparent 55%,rgba(255,26,26,.025) 100%);pointer-events:none}
.panel::after{content:'';position:absolute;top:0;bottom:0;width:55%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.018),transparent);animation:sweepShine 7s linear infinite;pointer-events:none}
.panel .red-sweep{position:absolute;top:0;bottom:0;width:50%;background:linear-gradient(90deg,transparent,rgba(255,26,26,.12),transparent);pointer-events:none;animation:redSweep .7s ease forwards}
.login-p{left:0;border-right:none;z-index:2;border-radius:12px 0 0 12px;transform-origin:right center}
.signup-p{right:0;border-left:1px solid rgba(0,234,255,.28);z-index:3;border-radius:0 12px 12px 0;transform-origin:left center}
.auth-card.login-active .login-p{z-index:3;opacity:1;transform:translateX(0) scale(1);filter:blur(0);border-color:var(--borderact);box-shadow:0 0 28px rgba(0,234,255,.18),inset 0 0 28px rgba(0,234,255,.03),-5px 0 38px rgba(0,234,255,.12);animation:borderPulse .7s ease}
.auth-card.login-active .signup-p{z-index:1;opacity:.5;transform:translateX(3%) scale(.975);filter:blur(1.2px);border-color:rgba(0,234,255,.07);box-shadow:none}
.auth-card.signup-active .signup-p{z-index:3;opacity:1;transform:translateX(0) scale(1);filter:blur(0);border-color:var(--borderact);box-shadow:0 0 28px rgba(0,234,255,.18),inset 0 0 28px rgba(0,234,255,.03),5px 0 38px rgba(0,234,255,.12);animation:borderPulse .7s ease}
.auth-card.signup-active .login-p{z-index:1;opacity:.5;transform:translateX(-3%) scale(.975);filter:blur(1.2px);border-color:rgba(0,234,255,.07);box-shadow:none}
.divider{position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);width:2px;background:linear-gradient(180deg,transparent,var(--cyan),var(--red-b),var(--cyan),transparent);z-index:10;box-shadow:0 0 10px rgba(0,234,255,.45);transition:box-shadow .4s ease}
.divider.pulse{animation:divPulse .7s ease}
.div-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:36px;height:36px;background:var(--bg);border:2px solid var(--cyan);border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:11;box-shadow:0 0 14px var(--cyan),0 0 28px rgba(0,234,255,.28);animation:reactorPulse 3.2s ease-in-out infinite;transition:transform .3s var(--ease-out-back);cursor:pointer}
.div-icon:hover{transform:translate(-50%,-50%) scale(1.15)}
.div-inner{width:14px;height:14px;background:radial-gradient(circle,var(--cyan),var(--cyan-d));border-radius:50%;animation:reactorPulse 1.6s ease-in-out infinite}
.c-tl,.c-tr,.c-bl,.c-br{position:absolute;z-index:5;animation:cornerGrow .5s var(--ease-out-expo) .2s forwards;width:0;height:0}
.c-tl{top:10px;left:10px;border-top:2px solid var(--cyan);border-left:2px solid var(--cyan)}
.c-tr{top:10px;right:10px;border-top:2px solid var(--cyan);border-right:2px solid var(--cyan)}
.c-bl{bottom:10px;left:10px;border-bottom:2px solid var(--cyan);border-left:2px solid var(--cyan)}
.c-br{bottom:10px;right:10px;border-bottom:2px solid var(--cyan);border-right:2px solid var(--cyan)}
.p-inner{padding:clamp(22px,4vw,36px) clamp(16px,3vw,32px);height:100%;display:flex;flex-direction:column;position:relative}
.p-header{margin-bottom:20px}
.sys-label{font-family:var(--F3);font-size:9px;letter-spacing:4px;color:var(--cyan-d);margin-bottom:8px;display:flex;align-items:center;gap:8px}
.sdot{width:5px;height:5px;border-radius:50%;background:var(--cyan);animation:statusBlink 1.6s ease-in-out infinite;box-shadow:0 0 5px var(--cyan)}
.p-title{font-family:var(--F1);font-size:clamp(15px,2.5vw,24px);font-weight:700;letter-spacing:4px;animation:glowCyan 4.5s ease-in-out infinite;margin-bottom:5px}
.p-sub{font-family:var(--F3);font-size:10px;letter-spacing:2px;color:var(--dim)}
.hex-d{position:absolute;right:15px;top:15px;width:48px;height:48px;opacity:.13}
.hex-d svg{width:100%;height:100%;stroke:var(--cyan);fill:none;animation:spin 16s linear infinite}
.tline{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,234,255,.1),transparent)}
.sb{position:absolute;top:28%;bottom:28%;width:2px;background:linear-gradient(180deg,transparent,var(--red-b),transparent);opacity:.22}
.fg{position:relative;margin-bottom:17px}
.fi{width:100%;background:rgba(0,0,0,.55);border:none;border-bottom:1px solid rgba(0,234,255,.22);padding:17px 14px 8px;font-family:var(--F3);font-size:13px;color:var(--txt);letter-spacing:2px;outline:none;transition:background .35s ease,border-color .35s ease,box-shadow .35s ease;caret-color:var(--cyan)}
.fi:focus{border-bottom-color:var(--cyan);background:rgba(0,234,255,.025);box-shadow:0 3px 18px -6px rgba(0,234,255,.28)}
.fl{position:absolute;top:14px;left:14px;font-family:var(--F3);font-size:11px;letter-spacing:3px;color:var(--dim);transition:top .28s ease,font-size .28s ease,color .28s ease,letter-spacing .28s ease;pointer-events:none}
.fi:focus+.fl,.fi:not(:placeholder-shown)+.fl{top:3px;font-size:9px;color:var(--cyan);letter-spacing:4px}
.ul{position:absolute;bottom:0;left:0;height:2px;width:100%;background:var(--cyan);box-shadow:0 0 8px var(--cyan);transform:scaleX(0);transform-origin:left;transition:transform .38s var(--ease-out-expo)}
.fi:focus~.ul{transform:scaleX(1)}
.ia{position:absolute;top:0;left:0;height:100%;width:2px;background:var(--red-b);transform:scaleY(0);transform-origin:top;transition:transform .3s ease .05s}
.fi:focus~.ia{transform:scaleY(1)}
.sbtn{position:relative;width:100%;padding:14px 20px;background:transparent;border:1px solid var(--red);font-family:var(--F1);font-size:11px;font-weight:600;letter-spacing:5px;color:var(--txt);cursor:pointer;overflow:hidden;clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);margin-top:8px;transition:border-color .35s ease,box-shadow .35s ease,transform .18s ease,color .25s ease;will-change:transform}
.sbtn::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--red),var(--red-b));transform:translateX(-101%);transition:transform .42s var(--ease-in-out-quart)}
.sbtn:hover{border-color:var(--red-b);color:#fff;box-shadow:0 0 22px rgba(255,26,26,.48),inset 0 0 18px rgba(255,26,26,.06)}
.sbtn:hover::before{transform:translateX(0)}
.sbtn:active{transform:scale(.97)}
.sbtn:disabled{cursor:not-allowed;opacity:.65}
.btn-t{position:relative;z-index:1;transition:opacity .22s ease}
.btn-ld{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2;opacity:0;transition:opacity .22s ease}
.sbtn.ld .btn-t{opacity:0}
.sbtn.ld .btn-ld{opacity:1}
.sbtn.ld{animation:btnGlowPulse 1.4s ease-in-out infinite;border-color:var(--cyan) !important}
.larc{width:22px;height:22px;border-radius:50%;border:2px solid rgba(0,234,255,.18);border-top-color:var(--cyan);border-right-color:var(--red-b);animation:loadArc .75s linear infinite}
@keyframes loadArc{to{transform:rotate(360deg)}}
.salert{padding:9px 13px;border-left:2px solid var(--red-b);background:rgba(179,0,0,.1);font-family:var(--F3);font-size:10px;letter-spacing:2px;color:rgba(255,155,155,.9);margin-bottom:10px;animation:alertIn .35s var(--ease-out-expo) forwards}
.ssuccess{border-left-color:var(--cyan);background:rgba(0,234,255,.07);color:var(--cyan)}
.sw-link{text-align:center;margin-top:11px;font-family:var(--F3);font-size:10px;letter-spacing:2px;color:var(--dim)}
.sw-btn{background:none;border:none;color:var(--cyan);cursor:pointer;font-family:var(--F3);font-size:10px;letter-spacing:2px;text-decoration:underline;transition:color .3s ease,text-shadow .3s ease}
.sw-btn:hover{color:var(--gold);text-shadow:0 0 10px var(--gold)}
.sbar{display:flex;align-items:center;gap:8px;margin-top:auto;padding-top:13px;border-top:1px solid rgba(0,234,255,.07)}
.sind{width:6px;height:6px;border-radius:50%;background:var(--cyan);animation:statusBlink 2.2s ease-in-out infinite;box-shadow:0 0 6px var(--cyan)}
.sind.r{background:var(--red-b);animation-delay:.55s;box-shadow:0 0 6px var(--red-b)}
.sind.g{background:var(--gold);animation-delay:1.1s;box-shadow:0 0 6px var(--gold)}
.stxt{font-family:var(--F3);font-size:8px;letter-spacing:3px;color:var(--dim)}

/* ── VIDEO SCENE ────────────────────────────── */
.si-video{position:fixed;inset:0;z-index:500;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .7s var(--ease-in-out-quart)}
.si-video.vis{opacity:1;pointer-events:all}
.si-video.hide{opacity:0;pointer-events:none}
.vid-flash{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(255,26,26,.35) 0%,transparent 70%);opacity:0;pointer-events:none;transition:opacity .4s ease}
.vid-flash.on{opacity:1}
.vid-wrap{position:relative;width:min(900px,92vw);aspect-ratio:16/9;border:1px solid rgba(255,26,26,.5);box-shadow:0 0 0 1px rgba(255,26,26,.2),0 0 40px rgba(255,26,26,.3),inset 0 0 40px rgba(0,0,0,.8);opacity:0;transform:scale(.94) translateY(18px);transition:opacity .6s var(--ease-out-expo) .2s,transform .6s var(--ease-out-expo) .2s;overflow:hidden}
.vid-wrap.vis{opacity:1;transform:scale(1) translateY(0);box-shadow:0 0 0 1px rgba(255,26,26,.4),0 0 60px rgba(255,26,26,.45),0 0 120px rgba(255,26,26,.2),inset 0 0 40px rgba(0,0,0,.8)}
.vid-wrap canvas{display:block;width:100%;height:100%}
.vid-hud{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .5s ease}
.vid-hud.vis{opacity:1}
.hud-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,234,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,234,255,.04) 1px,transparent 1px);background-size:40px 40px}
.hud-scan{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(0,234,255,.4),transparent);animation:scanFull 3.5s linear infinite}
.hud-tl,.hud-tr,.hud-bl,.hud-br{position:absolute;font-family:var(--F3);font-size:9px;letter-spacing:3px;color:rgba(0,234,255,.6)}
.hud-tl{top:12px;left:14px}
.hud-tr{top:12px;right:14px}
.hud-bl{bottom:12px;left:14px}
.hud-br{bottom:12px;right:14px}
.vid-progress-wrap{width:min(900px,92vw);height:3px;background:rgba(255,26,26,.15);margin-top:2px}
.vid-progress-fill{height:100%;width:0%;background:linear-gradient(90deg,var(--red),var(--gold));transition:width .1s linear}
.vid-label{margin-top:18px;font-family:var(--F1);font-size:11px;letter-spacing:6px;color:var(--gold);animation:glowGold 2s ease-in-out infinite;opacity:0;transform:translateY(8px);transition:opacity .5s ease .5s,transform .5s ease .5s}
.vid-label.vis{opacity:1;transform:translateY(0)}
.vid-skip{position:absolute;bottom:60px;right:30px;font-family:var(--F3);font-size:9px;letter-spacing:3px;color:var(--dim);background:none;border:1px solid rgba(0,234,255,.2);padding:6px 14px;cursor:pointer;opacity:0;transition:opacity .5s ease 1s,color .3s ease,border-color .3s ease}
.vid-skip.vis{opacity:1}
.vid-skip:hover{color:var(--cyan);border-color:var(--cyan);box-shadow:0 0 10px rgba(0,234,255,.3)}

/* ── SUIT GALLERY ───────────────────────────── */
.si-gallery{position:fixed;inset:0;z-index:400;background:var(--bg);opacity:0;pointer-events:none;transition:opacity .8s var(--ease-in-out-quart);overflow:hidden;display:flex;flex-direction:column}
.si-gallery.vis{opacity:1;pointer-events:all}
.gal-header{flex:0 0 auto;padding:clamp(12px,2.5vw,18px) clamp(16px,3vw,32px) 12px;background:linear-gradient(180deg,rgba(2,2,2,.98) 70%,transparent);z-index:10;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(0,234,255,.07);opacity:0;transform:translateY(-16px);transition:opacity .6s ease .3s,transform .6s var(--ease-out-expo) .3s}
.gal-header.vis{opacity:1;transform:translateY(0)}
.gal-title{font-family:var(--F1);font-size:clamp(10px,1.8vw,17px);letter-spacing:5px;animation:glowCyan 4s ease-in-out infinite}
.gal-sub{font-family:var(--F3);font-size:8px;letter-spacing:4px;color:var(--dim);margin-top:3px}
.gal-counter{font-family:var(--F3);font-size:10px;letter-spacing:3px;color:var(--cyan-d);text-align:right;white-space:nowrap}
.gal-counter b{color:var(--gold);font-size:clamp(14px,2vw,16px);font-family:var(--F1);font-weight:700}
.gal-body{flex:1 1 0;display:flex;overflow:hidden;min-height:0}
.gal-suits-side{flex:1 1 0;display:flex;flex-direction:column;overflow:hidden;position:relative}
.gal-viewport{flex:1 1 0;overflow:hidden;position:relative;cursor:grab}
.gal-viewport:active{cursor:grabbing}
.gal-track{display:flex;align-items:center;height:100%;padding:16px clamp(16px,4vw,40px);gap:clamp(12px,2vw,24px);will-change:transform;user-select:none}
.gal-controls{flex:0 0 auto;display:flex;align-items:center;justify-content:center;gap:clamp(8px,2vw,20px);padding:8px 0 12px;opacity:0;transition:opacity .5s ease 1.2s;flex-wrap:wrap}
.gal-controls.vis{opacity:1}
.gal-arrow{width:36px;height:36px;background:rgba(0,234,255,.06);border:1px solid rgba(0,234,255,.18);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;color:var(--cyan);transition:background .25s ease,box-shadow .25s ease,transform .15s ease;flex:0 0 auto}
.gal-arrow:hover{background:rgba(0,234,255,.14);box-shadow:0 0 16px rgba(0,234,255,.3)}
.gal-arrow:active{transform:scale(.92)}
.gal-dots{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;max-width:200px}
.gal-dot{width:16px;height:3px;background:rgba(255,255,255,.13);cursor:pointer;transition:all .35s var(--ease-out-expo);border-radius:2px}
.gal-dot.on{background:var(--cyan);box-shadow:0 0 7px var(--cyan);width:28px}
.gal-dot:hover:not(.on){background:rgba(0,234,255,.4)}
.scroll-hint{font-family:var(--F3);font-size:7px;letter-spacing:3px;color:rgba(0,234,255,.3);display:flex;align-items:center;gap:6px}
.hint-arrow{display:flex;gap:3px}
.hint-arrow span{display:inline-block;width:18px;height:2px;background:linear-gradient(90deg,var(--cyan),transparent);animation:arrowPulse 1.5s ease-in-out infinite}
.hint-arrow span:nth-child(2){animation-delay:.18s;width:12px}
.hint-arrow span:nth-child(3){animation-delay:.36s;width:6px}
.suit-card{flex:0 0 auto;width:clamp(160px,22vw,260px);height:clamp(280px,58vh,440px);position:relative;border:1px solid rgba(255,255,255,.07);background:rgba(6,6,10,.92);backdrop-filter:blur(10px);cursor:pointer;overflow:hidden;opacity:0;transform:translateX(50px) scale(.95);transition:opacity .55s var(--ease-out-expo),transform .55s var(--ease-out-expo),border-color .35s ease,box-shadow .35s ease}
.suit-card.in{opacity:1;transform:translateX(0) scale(1)}
.suit-card:hover{border-color:var(--card-glow,rgba(0,234,255,.45));box-shadow:0 0 28px var(--card-glow,rgba(0,234,255,.18)),inset 0 0 24px rgba(0,0,0,.4);transform:translateY(-5px) scale(1.018) !important}
.suit-card::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 50% 105%,var(--card-glow,rgba(0,234,255,.07)) 0%,transparent 65%);opacity:0;transition:opacity .35s ease;pointer-events:none;z-index:0}
.suit-card:hover::before{opacity:1}
.suit-card.active-card{border-color:var(--card-glow,rgba(0,234,255,.55)) !important;box-shadow:0 0 0 1px var(--card-glow,rgba(0,234,255,.18)),0 0 35px var(--card-glow,rgba(0,234,255,.22)),inset 0 0 16px rgba(0,0,0,.4) !important}
.suit-visual{position:relative;height:62%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:rgba(0,0,0,.3)}
.suit-3d{width:clamp(90px,12vw,120px);height:clamp(130px,17vw,172px);animation:suitFloat 4.5s ease-in-out infinite;transition:transform .5s var(--ease-out-expo)}
.suit-card:hover .suit-3d{animation:none;transform:translateY(-8px) rotateY(16deg) rotateX(4deg)}
.suit-svg{width:100%;height:100%;overflow:visible;filter:drop-shadow(0 0 10px var(--card-glow,rgba(0,234,255,.45)))}
.card-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--card-glow,rgba(0,234,255,.55)),transparent);animation:scanFull 4s linear infinite;pointer-events:none}
.suit-info{padding:clamp(8px,1.5vw,12px) clamp(10px,2vw,16px);border-top:1px solid rgba(255,255,255,.05);position:relative;z-index:1}
.suit-mark{font-family:var(--F1);font-size:clamp(10px,1.6vw,15px);letter-spacing:3px;font-weight:700;color:var(--card-color,var(--cyan));margin-bottom:3px}
.suit-subname{font-family:var(--F3);font-size:7px;letter-spacing:2px;color:var(--dim);margin-bottom:6px}
.suit-year{font-family:var(--F3);font-size:7px;letter-spacing:2px;color:rgba(255,215,0,.55);position:absolute;top:10px;right:12px}
.suit-parts{display:flex;flex-wrap:wrap;gap:3px;margin-top:5px}
.suit-part-tag{font-family:var(--F3);font-size:6px;letter-spacing:1px;padding:2px 5px;border:1px solid rgba(255,255,255,.06);color:var(--dim);background:rgba(255,255,255,.02);transition:all .28s ease}
.suit-card:hover .suit-part-tag{border-color:var(--card-glow,rgba(0,234,255,.28));color:var(--card-color,var(--cyan))}
.suit-status{display:flex;align-items:center;gap:6px;margin-top:6px;padding-top:5px;border-top:1px solid rgba(255,255,255,.04)}
.suit-status-dot{width:5px;height:5px;border-radius:50%;background:var(--card-color,var(--cyan));animation:statusBlink 2.2s ease-in-out infinite;box-shadow:0 0 5px var(--card-glow,rgba(0,234,255,.6))}
.suit-status-txt{font-family:var(--F3);font-size:6px;letter-spacing:2px;color:var(--card-color,var(--cyan))}
.gal-boot-scan{position:absolute;left:0;right:0;height:3px;z-index:20;background:linear-gradient(90deg,transparent,var(--cyan),var(--gold),var(--cyan),transparent);box-shadow:0 0 20px var(--cyan),0 0 40px rgba(0,234,255,.4);animation:bootScan 1.4s ease-in-out 1 forwards;pointer-events:none}

/* ── OWNER PANEL ────────────────────────────── */
.gal-owner-side{flex:0 0 clamp(220px,28vw,360px);border-left:1px solid rgba(0,234,255,.08);background:rgba(4,6,12,.96);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateX(30px);transition:opacity .7s ease .6s,transform .7s var(--ease-out-expo) .6s;position:relative}
.gal-owner-side.vis{opacity:1;transform:translateX(0)}
.own-corner{position:absolute;width:14px;height:14px;pointer-events:none}
.own-corner.tl{top:8px;left:8px;border-top:1px solid var(--cyan);border-left:1px solid var(--cyan)}
.own-corner.tr{top:8px;right:8px;border-top:1px solid var(--cyan);border-right:1px solid var(--cyan)}
.own-corner.bl{bottom:8px;left:8px;border-bottom:1px solid var(--cyan);border-left:1px solid var(--cyan)}
.own-corner.br{bottom:8px;right:8px;border-bottom:1px solid var(--cyan);border-right:1px solid var(--cyan)}
.own-scan{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,234,255,.35),transparent);animation:scanFull 6s linear infinite;pointer-events:none;z-index:2}
.own-sys-label{padding:12px 16px 0;font-family:var(--F3);font-size:7px;letter-spacing:4px;color:var(--cyan-d);display:flex;align-items:center;gap:8px;flex:0 0 auto}
.own-sys-dot{width:5px;height:5px;border-radius:50%;background:var(--cyan);animation:statusBlink 1.8s ease-in-out infinite;box-shadow:0 0 5px var(--cyan)}
.own-photo-wrap{flex:0 0 auto;margin:10px 16px 0}
.own-photo-frame{width:100%;aspect-ratio:3/4;max-height:clamp(140px,28vh,240px);position:relative;overflow:hidden;border:1px solid rgba(0,234,255,.2);background:rgba(0,10,20,.8)}
.own-photo-frame::before,.own-photo-frame::after{content:'';position:absolute;width:20px;height:20px;z-index:3;border-color:var(--cyan);border-style:solid}
.own-photo-frame::before{top:0;left:0;border-width:2px 0 0 2px}
.own-photo-frame::after{bottom:0;right:0;border-width:0 2px 2px 0}
.own-photo-img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block;transition:transform .6s var(--ease-out-expo),filter .4s ease;filter:grayscale(20%) contrast(1.05) brightness(.95)}
.own-photo-frame:hover .own-photo-img{transform:scale(1.04);filter:grayscale(0%) contrast(1.1) brightness(1.05)}
.own-photo-placeholder{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,rgba(0,20,40,.9),rgba(4,4,12,.95))}
.own-ph-icon{width:52px;height:52px;border-radius:50%;border:2px solid rgba(0,234,255,.2);display:flex;align-items:center;justify-content:center;font-size:24px;color:rgba(0,234,255,.3);background:rgba(0,234,255,.04)}
.own-ph-txt{font-family:var(--F3);font-size:7px;letter-spacing:2px;color:rgba(0,234,255,.25);text-align:center;line-height:1.8}
.own-photo-hud{position:absolute;inset:0;pointer-events:none;z-index:2;background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.7) 100%)}
.own-photo-hud-tl{position:absolute;top:8px;left:10px;font-family:var(--F3);font-size:6px;letter-spacing:2px;color:rgba(0,234,255,.5)}
.own-photo-hud-br{position:absolute;bottom:8px;right:10px;font-family:var(--F3);font-size:6px;letter-spacing:2px;color:rgba(255,215,0,.45)}
.own-photo-scan{position:absolute;left:0;right:0;height:1px;z-index:3;background:linear-gradient(90deg,transparent,rgba(255,26,26,.4),transparent);animation:scanFull 5s linear infinite;pointer-events:none}
.own-details{flex:1 1 0;padding:10px 16px 14px;overflow-y:auto;overflow-x:hidden}
.own-details::-webkit-scrollbar{width:3px}
.own-details::-webkit-scrollbar-track{background:rgba(0,234,255,.04)}
.own-details::-webkit-scrollbar-thumb{background:rgba(0,234,255,.2);border-radius:2px}
.own-name{font-family:var(--F1);font-size:clamp(13px,1.8vw,18px);font-weight:700;letter-spacing:4px;animation:glowGold 4s ease-in-out infinite;margin-bottom:3px}
.own-title{font-family:var(--F3);font-size:7px;letter-spacing:3px;color:var(--cyan-d);margin-bottom:12px}
.own-divider{width:100%;height:1px;background:linear-gradient(90deg,var(--cyan),transparent);margin-bottom:10px;opacity:.2}
.own-stats{display:flex;flex-direction:column;gap:7px;margin-bottom:12px}
.own-stat{display:flex;align-items:baseline;justify-content:space-between;gap:6px}
.own-stat-label{font-family:var(--F3);font-size:6px;letter-spacing:3px;color:var(--dim);flex:0 0 auto;white-space:nowrap}
.own-stat-bar-wrap{flex:1 1 0;height:2px;background:rgba(0,234,255,.07);position:relative;overflow:visible}
.own-stat-bar{height:100%;background:linear-gradient(90deg,var(--cyan),var(--gold));transition:width 1.2s var(--ease-out-expo) .8s;width:0%}
.own-stat-bar-wrap.ready .own-stat-bar{width:var(--w,70%)}
.own-stat-val{font-family:var(--F1);font-size:9px;color:var(--gold);flex:0 0 auto;letter-spacing:1px}
.own-tags{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px}
.own-tag{font-family:var(--F3);font-size:6px;letter-spacing:2px;padding:3px 7px;border:1px solid rgba(0,234,255,.15);color:rgba(0,234,255,.55);background:rgba(0,234,255,.03);transition:all .3s ease}
.own-tag:hover{border-color:var(--cyan);color:var(--cyan);box-shadow:0 0 8px rgba(0,234,255,.2)}
.own-status-row{display:flex;align-items:center;gap:7px;padding-top:8px;border-top:1px solid rgba(0,234,255,.07)}
.own-status-led{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:statusBlink 2s ease-in-out infinite;box-shadow:0 0 7px var(--gold)}
.own-status-text{font-family:var(--F3);font-size:6px;letter-spacing:3px;color:rgba(255,215,0,.6)}
.gal-bg-glow{position:absolute;border-radius:50%;pointer-events:none;transition:all 1.4s ease;filter:blur(90px)}

/* ── RESPONSIVE ─────────────────────────────── */
@media(max-width:900px){
  .auth-card{height:auto;min-height:530px}
  .panel{position:relative;width:100%;height:auto;min-height:500px;left:auto;right:auto;border-radius:12px;transition:opacity .5s ease,transform .5s var(--ease-out-expo)}
  .login-p{border-radius:12px;border-right:1px solid var(--border)}
  .signup-p{border-radius:12px;border-left:1px solid var(--border)}
  .auth-card.login-active .signup-p{opacity:0;transform:scale(.95);pointer-events:none;position:absolute;top:0}
  .auth-card.signup-active .login-p{opacity:0;transform:scale(.95);pointer-events:none;position:absolute;top:0}
  .auth-card.login-active .login-p,.auth-card.signup-active .signup-p{opacity:1;transform:none;filter:none;border-color:var(--borderact);box-shadow:0 0 28px rgba(0,234,255,.18)}
  .auth-card:not(.login-active):not(.signup-active) .login-p{opacity:0;pointer-events:none;position:absolute;top:0}
  .auth-card:not(.login-active):not(.signup-active) .signup-p{opacity:1;border-color:var(--borderact)}
  .divider{display:none}
  .gal-owner-side{flex:0 0 clamp(180px,35vw,260px)}
}
@media(max-width:640px){
  .si-auth{padding:8px}
  .auth-card{height:auto;min-height:460px}
  .p-inner{padding:18px 14px}
  .p-title{font-size:16px}
  .fg{margin-bottom:12px}
  .fi{padding:14px 12px 7px;font-size:12px}
  .gal-body{flex-direction:column}
  .gal-owner-side{flex:0 0 auto;max-height:180px;border-left:none;border-top:1px solid rgba(0,234,255,.08);flex-direction:row;transform:translateX(0)}
  .own-photo-wrap{margin:8px;flex:0 0 80px}
  .own-photo-frame{max-height:164px;aspect-ratio:3/4}
  .own-details{padding:8px 10px}
  .own-name{font-size:13px}
  .own-stats{gap:5px}
  .own-tags{display:none}
  .gal-suits-side{min-height:0;flex:1 1 0}
  .suit-card{width:clamp(140px,45vw,200px);height:clamp(240px,55vw,340px)}
  .gal-controls{padding:6px 0 10px}
  .scroll-hint{display:none}
}
@media(max-width:400px){
  .reactor-wrap{width:80px;height:80px}
  .intro-title{font-size:18px;letter-spacing:4px}
  .access-ready{font-size:10px;letter-spacing:3px}
  .suit-card{width:clamp(130px,48vw,180px)}
}
`;

/* ══════════════════════════════════════════════════════════════
   BACKGROUND
══════════════════════════════════════════════════════════════ */


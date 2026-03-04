import { useMemo } from "react";

function Background({ bgOn, arcOn, ringsOn, hexOn, scanOn }) {
  const hexData = useMemo(() => [
    { top:"10%",  left:"5%",   w:78, delay:0    },
    { top:"18%",  right:"7%",  w:58, delay:1.4  },
    { bottom:"14%",left:"9%",  w:98, delay:2.8  },
    { bottom:"9%", right:"5%", w:68, delay:4.2  },
    { top:"50%",  left:"2%",   w:48, delay:5.6  },
    { top:"62%",  right:"3%",  w:88, delay:7.0  },
  ], []);

  const particles = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: (Math.random() * 100).toFixed(1),
    dur:  (11 + Math.random() * 11).toFixed(1),
    dl:   (Math.random() * 14).toFixed(1),
    px:   ((Math.random() - .5) * 90).toFixed(1),
    sz:   Math.random() > .72 ? 3 : 2,
    c:    Math.random() > .8 ? "var(--red-b)" : Math.random() > .62 ? "var(--gold)" : "var(--cyan)",
  })), []);

  return (
    <div className={`stark-bg${bgOn ? " bg-on" : ""}`} id="stark-bg">
      <div className={`arc-bg${arcOn ? " on" : ""}`} />
      <div className={`e-ring${ringsOn ? " on" : ""}`} />
      <div className={`e-ring${ringsOn ? " on" : ""}`} />
      <div className={`e-ring${ringsOn ? " on" : ""}`} />
      {hexData.map((h, i) => {
        const pos = {};
        if (h.top)    pos.top    = h.top;
        if (h.bottom) pos.bottom = h.bottom;
        if (h.left)   pos.left   = h.left;
        if (h.right)  pos.right  = h.right;
        return (
          <div key={i} className={`hex${hexOn ? " on" : ""}`}
            style={{ ...pos, width: h.w, height: h.w, animationDelay: `${h.delay}s`, transitionDelay: `${0.05 + i * 0.08}s` }} />
        );
      })}
      {particles.map(p => (
        <div key={p.id} style={{
          position:"absolute", width:p.sz, height:p.sz, borderRadius:"50%",
          background:p.c, boxShadow:`0 0 4px ${p.c}`, left:`${p.left}%`,
          opacity:0, animation:`bgPart ${p.dur}s linear ${p.dl}s infinite`, "--px":`${p.px}px`,
        }} />
      ))}
      <div className={`scan-ov${scanOn ? " on" : ""}`} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   INTRO SCREEN
══════════════════════════════════════════════════════════════ */

export default Background;


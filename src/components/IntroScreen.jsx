import { useEffect, useRef, useState } from "react";
import { delay } from "../utils/delay";

function IntroScreen({ onDone, onBg }) {
  const [s, setS] = useState({
    visible: false, exiting: false,
    logo: false, rOuter: false, rMid: false, rInner: false, starkLabel: false,
    title: false, sub: false, ready: false, prog: false, scanning: false,
  });
  const [titleText, setTitleText] = useState("");
  const [subText, setSubText]     = useState("");
  const [progress, setProgress]   = useState(0);
  const progRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const set = (patch) => { if (!cancelled) setS(p => ({ ...p, ...patch })); };

    async function run() {
      await delay(60);
      set({ visible: true });
      await delay(120);
      onBg("bgOn");
      set({ prog: true });
      await delay(260);
      set({ logo: true });
      await delay(90);
      set({ rOuter: true });
      await delay(160);
      set({ rMid: true });
      await delay(180);
      set({ rInner: true });
      await delay(160);
      set({ starkLabel: true });
      await delay(220);
      onBg("arcOn");
      onBg("ringsOn");
      await delay(150);
      onBg("hexOn");
      onBg("scanOn");

      // Progress ticker
      let prog = 0;
      progRef.current = setInterval(() => {
        prog = Math.min(prog + (100 / (5200 / 50)), 98);
        if (!cancelled) setProgress(prog);
      }, 50);

      await delay(200);
      set({ title: true });
      await delay(100);
      const l1 = "WELCOME, USER";
      for (let i = 0; i <= l1.length; i++) {
        if (cancelled) return;
        setTitleText(l1.slice(0, i) + "|");
        await delay(68);
      }
      setTitleText(l1);
      await delay(320);
      set({ sub: true });
      await delay(80);
      const l2 = "INITIALIZING STARK INDUSTRIES SECURE ACCESS";
      for (let i = 0; i <= l2.length; i++) {
        if (cancelled) return;
        setSubText(l2.slice(0, i) + "_");
        await delay(28);
      }
      setSubText(l2);
      await delay(280);
      set({ scanning: true });
      await delay(2200);
      set({ scanning: false });
      set({ ready: true });
      await delay(900);
      clearInterval(progRef.current);
      setProgress(100);
      await delay(450);
      set({ exiting: true });
      await delay(600);
      if (!cancelled) onDone();
    }

    run();
    return () => {
      cancelled = true;
      clearInterval(progRef.current);
    };
  }, []);

  return (
    <div className={`si-intro${s.visible ? " boot-in" : ""}${s.exiting ? " hide" : ""}`}>
      {s.scanning && <div className="intro-scan" />}
      <div className={`intro-logo${s.logo ? " vis" : ""}`}>
        <div className="reactor-wrap">
          <div className={`r-outer${s.rOuter ? " on" : ""}`} />
          <div className={`r-mid${s.rMid ? " on" : ""}`} />
          <div className={`r-inner${s.rInner ? " on" : ""}`} />
        </div>
        <div className={`stark-label${s.starkLabel ? " vis" : ""}`}>◆ STARK INDUSTRIES ◆</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div className={`intro-title${s.title ? " vis" : ""}`}>
          {titleText}
        </div>
        <div className={`intro-sub${s.sub ? " vis" : ""}`}>{subText}</div>
      </div>
      <div className={`access-ready${s.ready ? " vis" : ""}`}>
        <span className="a-dot" />&nbsp;ACCESS PANEL READY&nbsp;<span className="a-dot" />
      </div>
      <div className={`progress-wrap${s.prog ? " vis" : ""}`}>
        <div className="progress-fill" style={{ width: `${progress.toFixed(1)}%`, transition: progress >= 100 ? "width .4s var(--ease-out-expo)" : "width .07s linear" }} />
        <span className="prog-label">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   AUTH CARD
══════════════════════════════════════════════════════════════ */

export default IntroScreen;


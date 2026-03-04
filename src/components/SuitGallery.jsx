import { useCallback, useEffect, useRef, useState } from "react";
import { SUITS } from "../data/suits";
import { delay } from "../utils/delay";
import { buildSuitSVG } from "../utils/buildSuitSvg";
import OwnerPanel from "./OwnerPanel";

function SuitGallery() {
  const [galCur, setGalCur]           = useState(0);
  const [cardsIn, setCardsIn]         = useState(Array(SUITS.length).fill(false));
  const [headerVis, setHeaderVis]     = useState(false);
  const [controlsVis, setControlsVis] = useState(false);
  const [ownerVis, setOwnerVis]       = useState(false);
  const [statsReady, setStatsReady]   = useState(false);
  const [bootScan, setBootScan]       = useState(true);
  const [galVis, setGalVis]           = useState(false);

  // Scroll state as ref (no re-renders during scroll)
  const g = useRef({ cur: 0, x: 0, target: 0, dragging: false, dragStartX: 0, dragStartTarget: 0, velocity: 0, lastDragX: 0, lastDragT: 0, wheelCooldown: false, raf: null });
  const trackRef    = useRef(null);
  const viewportRef = useRef(null);

  // ── SCROLL HELPERS ──
  const getCardW = useCallback(() => {
    const c = viewportRef.current?.querySelector(".suit-card");
    return c ? c.offsetWidth : 200;
  }, []);
  const GAP = 24;

  const clampX = useCallback((x) => {
    const vp = viewportRef.current;
    if (!vp) return x;
    const vpW = vp.offsetWidth;
    const n = SUITS.length;
    const cW = getCardW();
    const minX = -(n * (cW + GAP) - GAP - vpW + 40);
    return Math.max(minX, Math.min(40, x));
  }, [getCardW]);

  const targetForIdx = useCallback((idx) => {
    const vp = viewportRef.current;
    if (!vp) return 0;
    const vpW = vp.offsetWidth;
    const cW = getCardW();
    const raw = -(idx * (cW + GAP)) + (vpW - cW) / 2;
    return clampX(raw);
  }, [getCardW, clampX]);

  const applyTrack = useCallback(() => {
    if (trackRef.current) trackRef.current.style.transform = `translateX(${g.current.x}px)`;
  }, []);

  const startRaf = useCallback(() => {
    if (g.current.raf) return;
    const tick = () => {
      const diff = g.current.target - g.current.x;
      const lerp = g.current.dragging ? 0.22 : 0.07;
      if (!g.current.dragging && Math.abs(diff) < 0.15) {
        g.current.x = g.current.target;
        applyTrack();
        g.current.raf = null;
        return;
      }
      g.current.x += diff * lerp;
      applyTrack();
      g.current.raf = requestAnimationFrame(tick);
    };
    g.current.raf = requestAnimationFrame(tick);
  }, [applyTrack]);

  const scrollTo = useCallback((idx, animate = true) => {
    const i = Math.max(0, Math.min(SUITS.length - 1, idx));
    g.current.cur = i;
    g.current.target = targetForIdx(i);
    if (!animate) { g.current.x = g.current.target; applyTrack(); }
    else startRaf();
    setGalCur(i);
  }, [targetForIdx, applyTrack, startRaf]);

  const nearestIdx = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return 0;
    const vpW = vp.offsetWidth;
    const cW = getCardW();
    const idx = Math.round((-g.current.x + (vpW - cW) / 2) / (cW + GAP));
    return Math.max(0, Math.min(SUITS.length - 1, idx));
  }, [getCardW]);

  // ── ENTRANCE ANIMATION ──
  useEffect(() => {
    let cancelled = false;
    async function enter() {
      setGalVis(true);
      await delay(1400);
      if (cancelled) return;
      setBootScan(false);
      setHeaderVis(true);
      await delay(180);
      if (cancelled) return;
      setControlsVis(true);
      setOwnerVis(true);
      await delay(150);
      for (let i = 0; i < SUITS.length; i++) {
        if (cancelled) return;
        await delay(60);
        setCardsIn(p => { const n = [...p]; n[i] = true; return n; });
      }
      await delay(200);
      if (!cancelled) setStatsReady(true);
    }
    enter();
    return () => { cancelled = true; };
  }, []);

  // ── INITIAL SCROLL POSITION ──
  useEffect(() => {
    const t = setTimeout(() => {
      scrollTo(0, false);
    }, 50);
    return () => clearTimeout(t);
  }, [scrollTo]);

  // ── EVENT LISTENERS ──
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    // Wheel
    const onWheel = (e) => {
      e.preventDefault();
      if (g.current.wheelCooldown) return;
      g.current.wheelCooldown = true;
      scrollTo(g.current.cur + ((e.deltaY || e.deltaX) > 0 ? 1 : -1));
      setTimeout(() => { g.current.wheelCooldown = false; }, 650);
    };

    // Mouse
    const onMouseDown = (e) => {
      if (e.button !== 0) return;
      g.current.dragging = true;
      g.current.dragStartX = e.clientX;
      g.current.dragStartTarget = g.current.x;
      g.current.velocity = 0;
      g.current.lastDragX = e.clientX;
      g.current.lastDragT = performance.now();
      startRaf();
      e.preventDefault();
    };
    const onMouseMove = (e) => {
      if (!g.current.dragging) return;
      const now = performance.now();
      g.current.velocity = (e.clientX - g.current.lastDragX) / Math.max(1, now - g.current.lastDragT);
      g.current.lastDragX = e.clientX;
      g.current.lastDragT = now;
      g.current.target = clampX(g.current.dragStartTarget + (e.clientX - g.current.dragStartX));
    };
    const onMouseUp = () => {
      if (!g.current.dragging) return;
      g.current.dragging = false;
      g.current.target = clampX(g.current.target + g.current.velocity * 120);
      scrollTo(nearestIdx());
    };

    // Touch
    let tStartX = 0, tStartTarget = 0, tLastX = 0, tLastT = 0, tVel = 0;
    const onTouchStart = (e) => {
      tStartX = e.touches[0].clientX; tStartTarget = g.current.x;
      tLastX = tStartX; tLastT = performance.now(); tVel = 0;
      g.current.dragging = true;
      startRaf();
    };
    const onTouchMove = (e) => {
      const now = performance.now();
      tVel = (e.touches[0].clientX - tLastX) / Math.max(1, now - tLastT);
      tLastX = e.touches[0].clientX; tLastT = now;
      g.current.target = clampX(tStartTarget + (e.touches[0].clientX - tStartX));
    };
    const onTouchEnd = () => {
      g.current.dragging = false;
      g.current.target = clampX(g.current.target + tVel * 100);
      scrollTo(nearestIdx());
    };

    // Keyboard
    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") scrollTo(g.current.cur + 1);
      if (e.key === "ArrowLeft")  scrollTo(g.current.cur - 1);
    };

    // Resize
    const onResize = () => { scrollTo(g.current.cur, false); };

    vp.addEventListener("wheel", onWheel, { passive: false });
    vp.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    vp.addEventListener("touchstart", onTouchStart, { passive: true });
    vp.addEventListener("touchmove", onTouchMove, { passive: true });
    vp.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      vp.removeEventListener("wheel", onWheel);
      vp.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      vp.removeEventListener("touchstart", onTouchStart);
      vp.removeEventListener("touchmove", onTouchMove);
      vp.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      if (g.current.raf) cancelAnimationFrame(g.current.raf);
    };
  }, [scrollTo, clampX, nearestIdx, startRaf]);

  const suit = SUITS[galCur];

  return (
    <div className={`si-gallery${galVis ? " vis" : ""}`}>
      {bootScan && <div className="gal-boot-scan" />}
      <div className="gal-bg-glow" style={{
        width: 600, height: 600, left: "8%", top: "5%",
        background: `radial-gradient(circle,${suit.glow.replace(/[\d.]+\)$/, "0.07)")},transparent)`
      }} />
      {/* HEADER */}
      <div className={`gal-header${headerVis ? " vis" : ""}`}>
        <div>
          <div className="gal-title">STARK INDUSTRIES — ARMOR ARCHIVE</div>
          <div className="gal-sub">AUTHORIZED ACCESS · ALL MARKS DISPLAYED</div>
        </div>
        <div className="gal-counter">
          <b>{String(galCur + 1).padStart(2, "0")}</b>
          <span style={{ fontSize: 10, color: "var(--dim)", margin: "0 4px" }}>/</span>
          {String(SUITS.length).padStart(2, "0")}
        </div>
      </div>

      {/* BODY */}
      <div className="gal-body">
        {/* SUITS SIDE */}
        <div className="gal-suits-side">
          <div className="gal-viewport" ref={viewportRef}>
            <div className="gal-track" ref={trackRef}>
              {SUITS.map((s, idx) => (
                <div key={s.id} className={`suit-card${cardsIn[idx] ? " in" : ""}${idx === galCur ? " active-card" : ""}`}
                  style={{ "--card-glow": s.glow, "--card-color": s.color }}
                  onClick={() => { if (Math.abs(g.current.x - g.current.target) < 4) scrollTo(idx); }}>
                  <div className="card-scan" />
                  <div className="suit-visual">
                    {/* ── REPLACE SUIT IMAGE ───────────────────────────────
                        Replace the SVG div below with your image:
                        <img className="own-photo-img" src="SUIT_URL" alt={s.name}
                          style={{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",filter:`drop-shadow(0 0 18px ${s.glow})`}} />
                    ─────────────────────────────────────────────────────── */}
                    <div className="suit-3d" dangerouslySetInnerHTML={{ __html: buildSuitSVG(s, idx) }} />
                  </div>
                  <div className="suit-info">
                    <div className="suit-year">{s.year}</div>
                    <div className="suit-mark">{s.name}</div>
                    <div className="suit-subname">{s.sub}</div>
                    <div className="suit-parts">
                      {s.parts.map(p => <div key={p} className="suit-part-tag">{p}</div>)}
                    </div>
                    <div className="suit-status">
                      <div className="suit-status-dot" /><div className="suit-status-txt">SYSTEMS ONLINE</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* CONTROLS */}
          <div className={`gal-controls${controlsVis ? " vis" : ""}`}>
            <div className="gal-arrow" onClick={() => scrollTo(galCur - 1)}>←</div>
            <div className="gal-dots">
              {SUITS.map((_, i) => (
                <div key={i} className={`gal-dot${i === galCur ? " on" : ""}`} onClick={() => scrollTo(i)} />
              ))}
            </div>
            <div className="gal-arrow" onClick={() => scrollTo(galCur + 1)}>→</div>
            <div className="scroll-hint">
              <div className="hint-arrow"><span /><span /><span /></div>
              DRAG
              <div className="hint-arrow" style={{ transform: "scaleX(-1)" }}><span /><span /><span /></div>
            </div>
          </div>
        </div>

        {/* OWNER SIDE */}
        <OwnerPanel visible={ownerVis} statBarsReady={statsReady} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   APP — PHASE MANAGEMENT
══════════════════════════════════════════════════════════════ */

export default SuitGallery;


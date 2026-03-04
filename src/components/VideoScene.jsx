import { useEffect, useRef, useState } from "react";
import { delay } from "../utils/delay";

function VideoScene({ onDone }) {
  const [s, setS] = useState({ vis: false, flash: false, wrap: false, hud: false, skip: false, hide: false });
  const canvasRef = useRef(null);
  const hudPctRef = useRef(null);
  const hudTimeRef = useRef(null);
  const progFillRef = useRef(null);
  const skipRef = useRef(false);
  const rafRef = useRef(null);
  const endRef = useRef(() => {});

  useEffect(() => {
    let cancelled = false;
    let finished = false;

    const set = (p) => {
      if (!cancelled) setS((prev) => ({ ...prev, ...p }));
    };

    async function finishSequence() {
      if (finished || cancelled) return;
      finished = true;
      set({ hide: true });
      await delay(700);
      if (!cancelled) onDone();
    }

    endRef.current = finishSequence;

    async function run() {
      set({ vis: true });
      await delay(80);
      set({ flash: true });
      await delay(150);
      set({ flash: false });
      await delay(100);
      set({ wrap: true });
      await delay(400);
      set({ hud: true, skip: true });

      await new Promise((resolve) => runCanvas(resolve));
      if (cancelled) return;
      await finishSequence();
    }

    function rr(ctx, x, y, w, h, r = 0) {
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(x, y, w, h, r);
        return;
      }
      const radius = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2));
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
    }

    function runCanvas(onEnd) {
      const canvas = canvasRef.current;
      if (!canvas) {
        onEnd();
        return;
      }
      const wrap = canvas.parentElement;
      if (!wrap) {
        onEnd();
        return;
      }

      canvas.width = wrap.clientWidth;
      canvas.height = wrap.clientHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        onEnd();
        return;
      }

      const W = () => canvas.width;
      const H = () => canvas.height;
      const DURATION = 5500;
      let start = null;

      // Hard fallback so the phase cannot get stuck.
      const hardTimeout = setTimeout(() => {
        cancelAnimationFrame(rafRef.current);
        onEnd();
      }, DURATION + 1200);

      function eio(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      }

      function draw(ts) {
        try {
          if (!start) start = ts;
          const elapsed = ts - start;
          const t = Math.min(elapsed / DURATION, 1);
          const prog = eio(t);
          const pct = Math.floor(t * 100);

          if (hudPctRef.current) hudPctRef.current.textContent = `${pct}%`;
          if (hudTimeRef.current) {
            hudTimeRef.current.textContent = `00:0${Math.floor(elapsed / 1000)}:${String(
              Math.floor((elapsed % 1000) / 10)
            ).padStart(2, "0")}`;
          }
          if (progFillRef.current) progFillRef.current.style.width = `${t * 100}%`;

          ctx.clearRect(0, 0, W(), H());
          const bg = ctx.createRadialGradient(W() / 2, H() / 2, 0, W() / 2, H() / 2, Math.max(W(), H()) * 0.7);
          bg.addColorStop(0, "rgba(4,8,20,1)");
          bg.addColorStop(1, "rgba(2,2,4,1)");
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, W(), H());

          ctx.save();
          ctx.strokeStyle = `rgba(0,234,255,${0.04 + prog * 0.06})`;
          ctx.lineWidth = 0.5;
          const gSize = 40;
          const vX = W() / 2;
          const vY = H() * (0.35 + prog * 0.1);
          for (let gx = 0; gx <= W(); gx += gSize) {
            ctx.beginPath();
            ctx.moveTo(gx, H());
            ctx.lineTo(vX + (gx - vX) * 0.1, vY);
            ctx.stroke();
          }
          for (let gy = 0; gy <= H(); gy += gSize * 0.6) {
            const bl = (H() - gy) / H();
            ctx.globalAlpha = bl * 0.12;
            ctx.beginPath();
            ctx.moveTo(0, gy);
            ctx.lineTo(W(), gy);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          ctx.restore();

          const cx = W() / 2;
          const cy = H() / 2 - 20;
          const suitH = Math.min(H() * 0.65, 280);
          const suitW = suitH * 0.5;
          const sScale = 0.4 + prog * 0.6;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.scale(sScale, sScale);
          const aura = ctx.createRadialGradient(0, 0, 0, 0, 0, suitH * 0.5);
          aura.addColorStop(0, `rgba(255,26,26,${0.12 + Math.sin(elapsed / 400) * 0.04})`);
          aura.addColorStop(0.5, "rgba(255,100,0,0.06)");
          aura.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = aura;
          ctx.fillRect(-suitH * 0.6, -suitH * 0.6, suitH * 1.2, suitH * 1.2);
          const sH = suitH;
          const sW = suitW;
          const red = "rgba(180,30,30,.85)";
          const gold = "rgba(200,160,0,.9)";
          const glow = "rgba(255,26,26,1)";

          function dp(fn, at) {
            const pt = Math.max(0, Math.min(1, (t - at) / 0.12));
            if (pt <= 0) return;
            ctx.globalAlpha = pt;
            fn(pt);
            ctx.globalAlpha = 1;
          }

          dp(() => {
            ctx.fillStyle = red;
            ctx.beginPath();
            rr(ctx, -sW * 0.22, -sH * 0.02, sW * 0.18, sH * 0.45, 4);
            ctx.fill();
            ctx.beginPath();
            rr(ctx, sW * 0.04, -sH * 0.02, sW * 0.18, sH * 0.45, 4);
            ctx.fill();
            ctx.strokeStyle = gold;
            ctx.lineWidth = 1 / sScale;
            ctx.strokeRect(-sW * 0.22, -sH * 0.02, sW * 0.18, sH * 0.45);
            ctx.strokeRect(sW * 0.04, -sH * 0.02, sW * 0.18, sH * 0.45);
            const bg1 = ctx.createRadialGradient(-sW * 0.13, sH * 0.44, 0, -sW * 0.13, sH * 0.44, sW * 0.15);
            bg1.addColorStop(0, "rgba(255,100,0,.6)");
            bg1.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = bg1;
            ctx.fillRect(-sW * 0.28, sH * 0.38, sW * 0.3, sH * 0.12);
          }, 0);

          dp(
            (pt) => {
              ctx.fillStyle = red;
              ctx.beginPath();
              rr(ctx, -sW * 0.28, -sH * 0.5, sW * 0.56, sH * 0.5, 6);
              ctx.fill();
              ctx.strokeStyle = gold;
              ctx.lineWidth = 1.2 / sScale;
              ctx.strokeRect(-sW * 0.28, -sH * 0.5, sW * 0.56, sH * 0.5);
              ctx.strokeStyle = glow;
              ctx.lineWidth = 1.8 / sScale;
              ctx.beginPath();
              ctx.arc(0, -sH * 0.28, sW * 0.1, 0, Math.PI * 2);
              ctx.stroke();
              ctx.fillStyle = `rgba(0,200,255,${0.7 + Math.sin(elapsed / 300) * 0.3})`;
              ctx.beginPath();
              ctx.arc(0, -sH * 0.28, sW * 0.06, 0, Math.PI * 2);
              ctx.fill();
              ctx.fillStyle = "white";
              ctx.globalAlpha = 0.9 * pt;
              ctx.beginPath();
              ctx.arc(0, -sH * 0.28, sW * 0.03, 0, Math.PI * 2);
              ctx.fill();
              ctx.globalAlpha = 1;
            },
            0.1
          );

          dp(
            (pt) => {
              ctx.fillStyle = red;
              ctx.beginPath();
              rr(ctx, -sW * 0.52, -sH * 0.48, sW * 0.2, sH * 0.46, 4);
              ctx.fill();
              ctx.beginPath();
              rr(ctx, sW * 0.32, -sH * 0.48, sW * 0.2, sH * 0.46, 4);
              ctx.fill();
              ctx.strokeStyle = gold;
              ctx.lineWidth = 1 / sScale;
              ctx.strokeRect(-sW * 0.52, -sH * 0.48, sW * 0.2, sH * 0.46);
              ctx.strokeRect(sW * 0.32, -sH * 0.48, sW * 0.2, sH * 0.46);

              const dr = (rx, ry) => {
                ctx.strokeStyle = glow;
                ctx.lineWidth = 1.5 / sScale;
                ctx.beginPath();
                ctx.arc(rx, ry, sW * 0.08, 0, Math.PI * 2);
                ctx.stroke();
                ctx.fillStyle = `rgba(255,80,0,${0.8 + Math.sin(elapsed / 250) * 0.2})`;
                ctx.beginPath();
                ctx.arc(rx, ry, sW * 0.05, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "white";
                ctx.globalAlpha = 0.85 * pt;
                ctx.beginPath();
                ctx.arc(rx, ry, sW * 0.025, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
              };

              dr(-sW * 0.42, sH * 0.04);
              dr(sW * 0.42, sH * 0.04);
            },
            0.22
          );

          dp(
            (pt) => {
              const dropY = -sH * 0.5 - sH * 0.3 * (1 - pt);
              ctx.save();
              ctx.translate(0, dropY);
              ctx.fillStyle = red;
              ctx.beginPath();
              ctx.moveTo(-sW * 0.24, 0);
              ctx.bezierCurveTo(-sW * 0.26, -sH * 0.26, -sW * 0.18, -sH * 0.44, 0, -sH * 0.48);
              ctx.bezierCurveTo(sW * 0.18, -sH * 0.44, sW * 0.26, -sH * 0.26, sW * 0.24, 0);
              ctx.closePath();
              ctx.fill();
              ctx.strokeStyle = gold;
              ctx.lineWidth = 1.2 / sScale;
              ctx.stroke();
              ctx.fillStyle = "rgba(0,0,0,.7)";
              ctx.beginPath();
              rr(ctx, -sW * 0.16, -sH * 0.28, sW * 0.32, sH * 0.22, 3);
              ctx.fill();
              const eyeG = `rgba(255,220,0,${0.85 + Math.sin(elapsed / 200) * 0.15})`;
              ctx.fillStyle = eyeG;
              ctx.beginPath();
              rr(ctx, -sW * 0.2, -sH * 0.2, sW * 0.08, sH * 0.04, sH * 0.02);
              ctx.fill();
              ctx.beginPath();
              rr(ctx, sW * 0.12, -sH * 0.2, sW * 0.08, sH * 0.04, sH * 0.02);
              ctx.fill();
              ctx.restore();
            },
            0.35
          );

          ctx.restore();

          if (prog > 0.15) {
            const pCount = Math.floor(prog * 18);
            for (let i = 0; i < pCount; i += 1) {
              const angle = (i / pCount) * Math.PI * 2 + elapsed / 2000;
              const dist = (1 - prog) * W() * 0.45 + 30;
              const px = cx + Math.cos(angle) * dist;
              const py = cy + Math.sin(angle) * dist * 0.6 - suitH * 0.2;
              const sz = 1.5 + Math.random() * 2;
              const alpha = 0.4 + Math.sin(elapsed / 300 + i) * 0.3;
              ctx.fillStyle = i % 3 === 0 ? `rgba(255,200,0,${alpha})` : `rgba(255,60,60,${alpha})`;
              ctx.beginPath();
              ctx.arc(px, py, sz, 0, Math.PI * 2);
              ctx.fill();
              ctx.strokeStyle = `rgba(255,80,0,${alpha * 0.4})`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(cx + (px - cx) * 0.85, cy + (py - cy) * 0.85);
              ctx.stroke();
            }
          }

          ctx.save();
          for (let sl = 0; sl < H(); sl += 4) {
            ctx.globalAlpha = 0.018;
            ctx.fillStyle = "#000";
            ctx.fillRect(0, sl, W(), 2);
          }
          ctx.globalAlpha = 1;
          ctx.restore();

          const vig = ctx.createRadialGradient(W() / 2, H() / 2, H() * 0.2, W() / 2, H() / 2, H() * 0.85);
          vig.addColorStop(0, "rgba(0,0,0,0)");
          vig.addColorStop(1, "rgba(0,0,0,.55)");
          ctx.fillStyle = vig;
          ctx.fillRect(0, 0, W(), H());

          if (prog > 0.05) {
            ctx.font = `${11}px 'Orbitron',monospace`;
            ctx.fillStyle = `rgba(0,234,255,${Math.min(prog * 3, 1) * 0.7})`;
            ctx.textAlign = "left";
            ctx.fillText(`SYSTEM BOOT ${pct}%`, 20, H() - 26);
            ctx.textAlign = "right";
            ctx.fillStyle = `rgba(255,215,0,${Math.min(prog * 2, 0.7)})`;
            ctx.fillText("STARK INDUSTRIES", W() - 20, H() - 26);
          }

          if (t > 0.92) {
            ctx.fillStyle = `rgba(255,255,255,${((t - 0.92) / 0.08) * 0.35})`;
            ctx.fillRect(0, 0, W(), H());
          }

          if (t < 1 && !skipRef.current) {
            rafRef.current = requestAnimationFrame(draw);
          } else {
            clearTimeout(hardTimeout);
            cancelAnimationFrame(rafRef.current);
            onEnd();
          }
        } catch (_err) {
          clearTimeout(hardTimeout);
          cancelAnimationFrame(rafRef.current);
          onEnd();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    run();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [onDone]);

  const handleSkip = () => {
    skipRef.current = true;
    endRef.current();
  };

  return (
    <div className={`si-video${s.vis ? " vis" : ""}${s.hide ? " hide" : ""}`}>
      <div className={`vid-flash${s.flash ? " on" : ""}`} />
      <div className={`vid-wrap${s.wrap ? " vis" : ""}`}>
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
        <div className={`vid-hud${s.hud ? " vis" : ""}`}>
          <div className="hud-grid" />
          <div className="hud-scan" />
          <div className="hud-tl">STARK INDUSTRIES v7.3</div>
          <div className="hud-tr" ref={hudTimeRef}>
            --:--:--
          </div>
          <div className="hud-bl">OPERATOR: AUTHORIZED</div>
          <div className="hud-br" ref={hudPctRef}>
            0%
          </div>
        </div>
        <button className={`vid-skip${s.skip ? " vis" : ""}`} onClick={handleSkip}>
          [ SKIP ]
        </button>
      </div>
      <div className="vid-progress-wrap">
        <div className="vid-progress-fill" ref={progFillRef} />
      </div>
      <div className="vid-label vis">SUIT-UP SEQUENCE INITIATED</div>
    </div>
  );
}

/* --------------------------------------------------------------
   OWNER PANEL
-------------------------------------------------------------- */

export default VideoScene;


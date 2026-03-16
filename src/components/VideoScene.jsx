import { useEffect, useRef, useState } from "react";
import { delay } from "../utils/delay";
import introVideo from "../assets/stark.mp4";

function VideoScene({ onDone, onTransitionStart }) {
  const [muted, setMuted] = useState(true);
  const [s, setS] = useState({
    vis: false,
    wrap: false,
    hud: false,
    badge: false,
    skip: false,
    hide: false
  });
  const endRef = useRef(() => {});
  const finishedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const set = (patch) => {
      if (!cancelled) setS((prev) => ({ ...prev, ...patch }));
    };

    async function finishSequence() {
      if (finishedRef.current || cancelled) return;
      finishedRef.current = true;
      if (onTransitionStart) onTransitionStart();
      set({ hide: true });
      await delay(700);
      if (!cancelled) onDone();
    }

    endRef.current = finishSequence;

    async function run() {
      set({ vis: true });
      await delay(120);
      set({ wrap: true });
      await delay(220);
      set({ hud: true });
      await delay(180);
      set({ badge: true, skip: true });
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [onDone, onTransitionStart]);

  const handleSkip = () => {
    endRef.current();
  };

  const handleEnded = () => {
    endRef.current();
  };

  return (
    <div className={`si-video${s.vis ? " vis" : ""}${s.hide ? " hide" : ""}`}>
      <div className={`vid-wrap${s.wrap ? " vis" : ""}`}>
        <video
          className="video-file"
          autoPlay
          muted={muted}
          playsInline
          preload="auto"
          controlsList="nodownload noplaybackrate"
          onEnded={handleEnded}
        >
          <source src={introVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={`vid-hud${s.hud ? " vis" : ""}`}>
          <div className="hud-grid" />
          <div className="hud-vignette" />
          <div className="hud-scan" />
          <div className="hud-reactor" />
          <div className="hud-tl">STARK INDUSTRIES v7.3</div>
          <div className="hud-tr">SUIT LINK ACTIVE</div>
          <div className="hud-bl">OPERATOR: AUTHORIZED</div>
          <div className="hud-br">PLAYBACK ONLINE</div>
        </div>

     

        <button
          className={`vid-audio${s.skip ? " vis" : ""}`}
          onClick={() => setMuted((prev) => !prev)}
        >
          {muted ? "[ TAP FOR SOUND ]" : "[ MUTE ]"}
        </button>

        <button className={`vid-skip${s.skip ? " vis" : ""}`} onClick={handleSkip}>
          [ SKIP ]
        </button>
      </div>

      <div className={`vid-label${s.badge ? " vis" : ""}`}>SUIT-UP SEQUENCE INITIATED</div>
    </div>
  );
}

export default VideoScene;

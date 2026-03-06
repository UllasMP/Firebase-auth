import { useCallback, useEffect, useState } from "react";
import AuthCard from "./components/AuthCard";
import Background from "./components/Background";
import IntroScreen from "./components/IntroScreen";
import SuitGallery from "./components/SuitGallery";
import VideoScene from "./components/VideoScene";
import { STARK_CSS } from "./styles/starkCss";
import { injectStarkFonts } from "./utils/injectFonts";
const DEV_MODE = true; // turn off animations while building logic

export default function App() {
  const [phase, setPhase] = useState("auth");
  const [bg, setBg] = useState({ bgOn: false, arcOn: false, ringsOn: false, hexOn: false, scanOn: false });

  useEffect(() => {
    injectStarkFonts();

    const el = document.createElement("style");
    el.id = "stark-css";
    el.textContent = STARK_CSS;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const onBg = useCallback((key) => {
    setBg((p) => ({ ...p, [key]: true }));
  }, []);

  return (
    <div className="stark-root">
      <Background {...bg} />
      {/*{phase === "intro" && <IntroScreen onDone={() => setPhase("auth")} onBg={onBg} />}*/}
      {phase === "auth" && <AuthCard onLogin={() => setPhase("video")} />}
     {/* {phase === "video" && <VideoScene onDone={() => setPhase("gallery")} />}
      {phase === "gallery" && <SuitGallery />}*/}
    </div>
  );
}

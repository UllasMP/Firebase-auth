import { useCallback, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import AuthCard from "./components/AuthCard";
import Background from "./components/Background";
import IntroScreen from "./components/IntroScreen";
import SuitGallery from "./components/SuitGallery";
import VideoScene from "./components/VideoScene";

import { STARK_CSS } from "./styles/starkCss";
import { injectStarkFonts } from "./utils/injectFonts";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { auth } from "./components/firebase";

export default function App() {

  const navigate = useNavigate();

  const [phase, setPhase] = useState("video");

  const [bg, setBg] = useState({
    bgOn: false,
    arcOn: false,
    ringsOn: false,
    hexOn: false,
    scanOn: false
  });

  const [user, setUser] = useState(null);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  // Inject Stark fonts + css
  useEffect(() => {

    injectStarkFonts();

    const el = document.createElement("style");
    el.id = "stark-css";
    el.textContent = STARK_CSS;

    document.head.appendChild(el);

    return () => el.remove();

  }, []);

  // Background animation control
  const onBg = useCallback((key) => {
    setBg((prev) => ({
      ...prev,
      [key]: true
    }));
  }, []);

  return (
    <div className="stark-root">

      <ToastContainer />

      <Background {...bg} />

      <Routes>

        {/* Intro Screen */}
        <Route
          path="/"
          element={
            <IntroScreen
              onDone={() => navigate("/starkauth")}
              onBg={onBg}
            />
          }
        />

        {/* Login / Register */}
        <Route
          path="/starkauth"
          element={
            <AuthCard
              onLogin={() => navigate("/starkauth/home")}
            />
          }
        />

        {/* Protected Home */}
        <Route
          path="/starkauth/home"
          element={
            user ? (
              <>
                {phase === "video" && (
                  <VideoScene
                    onDone={() => setPhase("gallery")}
                  />
                )}

                {phase === "gallery" && (
                  <SuitGallery />
                )}
              </>
            ) : (
              <Navigate to="/starkauth" />
            )
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    </div>
  );
}
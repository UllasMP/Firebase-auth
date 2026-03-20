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
import { signOut } from "firebase/auth";

export default function App() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState("video");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [bg, setBg] = useState({
    bgOn: false,
    arcOn: false,
    ringsOn: false,
    hexOn: false,
    scanOn: false
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    injectStarkFonts();
    const el = document.createElement("style");
    el.id = "stark-css";
    el.textContent = STARK_CSS;
    document.head.appendChild(el);

    return () => el.remove();
  }, []);

  const onBg = useCallback((key) => {
    setBg((prev) => ({ ...prev, [key]: true }));
  }, []);

  const handleIntroDone = useCallback(() => {
    navigate(user ? "/starkauth/home" : "/starkauth");
  }, [navigate, user]);

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await signOut(auth);
      setPhase("video");
      navigate("/starkauth", { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, navigate]);

  return (
    <div className="stark-root">
      <ToastContainer />
      <Background {...bg} />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/starkauth/home" replace />
            ) : (
              <IntroScreen
                onDone={handleIntroDone}
                onBg={onBg}
              />
            )
          }
        />

        <Route
          path="/starkauth"
          element={
            user ? (
              <Navigate to="/starkauth/home" replace />
            ) : (
              <AuthCard onLogin={() => navigate("/starkauth/home")} />
            )
          }
        />

        <Route
          path="/starkauth/home"
          element={
            user ? (
              <>
                <SuitGallery
                  active={phase === "transition" || phase === "gallery"}
                  onLogout={handleLogout}
                  isLoggingOut={isLoggingOut}
                />
                {phase !== "gallery" && (
                  <VideoScene
                    onTransitionStart={() => setPhase("transition")}
                    onDone={() => setPhase("gallery")}
                  />
                )}
              </>
            ) : (
              <Navigate to="/starkauth" replace />
            )
          }
        />

        <Route
          path="/starkauth/home/*"
          element={<Navigate to="/starkauth/home" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import owner from "../assets/Stark.jpg";

import { auth, db } from "./firebase";

function OwnerPanel({ visible, statBarsReady, onLogout, isLoggingOut }) {
  const [userData, setUserData] = useState(null);

  const OWNER = {
    photoUrl: owner,
    name: "TONY STARK",
    title: "CEO - STARK INDUSTRIES - IRON MAN",
    stats: [
      { label: "INTELLIGENCE", val: "97", w: "97%" },
      { label: "COMBAT", val: "88", w: "88%" },
      { label: "ENGINEERING", val: "INF", w: "100%" },
      { label: "SUITS BUILT", val: "85+", w: "85%" }
    ],
    tags: ["AVENGER", "GENIUS", "BILLIONAIRE", "PLAYBOY", "PHILANTHROPIST", "ARC REACTOR"]
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUserData(null);
        return;
      }

      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        return;
      }

      setUserData({
       
        firstName: "Unknown User",
         email: user.email,
        createdAt: null
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`gal-owner-side${visible ? " vis" : ""}${isLoggingOut ? " exit" : ""}`}>
      <div className="own-corner tl" /><div className="own-corner tr" />
      <div className="own-corner bl" /><div className="own-corner br" />
      <div className="own-scan" />
      <div className="own-sys-label">
        <div className="own-sys-head">
          <div className="own-sys-dot" />
          <span>OPERATOR IDENTITY VERIFIED</span>
        </div>
        {userData ? (
          <>
         
            <div className="own-sys-user">Name: {userData.firstName}</div>
               <div className="own-sys-user">Email: {userData.email}</div>
           
          </>
        ) : (
          <div className="own-sys-user">Loading...</div>
        )}
        <button className={`own-logout-btn${isLoggingOut ? " busy" : ""}`} onClick={onLogout} disabled={isLoggingOut}>
          {isLoggingOut ? "Shuting Down..." : "SHUTDOWN "}
        </button>
      </div>

      <div className="own-photo-wrap">
        <div className="own-photo-frame">
          {OWNER.photoUrl ? (
            <img className="own-photo-img" src={OWNER.photoUrl} alt="Owner" />
          ) : (
            <div className="own-photo-placeholder">
              <div className="own-ph-icon">?</div>
              <div className="own-ph-txt">ADD PHOTO<br />src="YOUR_URL"</div>
            </div>
          )}
          <div className="own-photo-hud">
            <div className="own-photo-hud-tl">BIOMETRIC SCAN</div>
            <div className="own-photo-hud-br">VERIFIED</div>
          </div>
          <div className="own-photo-scan" />
        </div>
      </div>
      <div className="own-details">
        <div className="own-name">{OWNER.name}</div>
        <div className="own-title">{OWNER.title}</div>
        <div className="own-divider" />
        <div className="own-stats">
          {OWNER.stats.map((st) => (
            <div key={st.label} className="own-stat">
              <span className="own-stat-label">{st.label}</span>
              <div className={`own-stat-bar-wrap${statBarsReady ? " ready" : ""}`} style={{ "--w": st.w }}>
                <div className="own-stat-bar" />
              </div>
              <span className="own-stat-val">{st.val}</span>
            </div>
          ))}
        </div>
        <div className="own-tags">
          {OWNER.tags.map((t) => <div key={t} className="own-tag">{t}</div>)}
        </div>
        <div className="own-status-row">
          <div className="own-status-led" />
          <div className="own-status-text">CLEARANCE LEVEL: ALPHA</div>
        </div>
      </div>
    </div>
  );
}

export default OwnerPanel;

import { useCallback, useEffect, useState } from "react";
import { delay } from "../utils/delay";

function AuthCard({ onLogin }) {
  const [authVis, setAuthVis]   = useState(false);
  const [cardVis, setCardVis]   = useState(false);
  const [panel, setPanel]       = useState("signup"); // login | signup
  const [switching, setSwitching] = useState(false);
  const [sweepTarget, setSweepTarget] = useState(null);
  const [lEmail, setLEmail] = useState(""); const [lPass, setLPass]   = useState("");
  const [lAlert, setLAlert] = useState(null); const [lLoad, setLLoad]  = useState(false);
  const [sName, setSName]   = useState(""); const [sEmail, setSEmail] = useState("");
  const [sPass, setSPass]   = useState(""); const [sConf, setSConf]   = useState("");
  const [sAlert, setSAlert] = useState(null); const [sLoad, setSLoad]  = useState(false);

  useEffect(() => {
    let t1, t2;
    t1 = setTimeout(() => setAuthVis(true), 50);
    t2 = setTimeout(() => setCardVis(true), 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const switchPanel = useCallback((to) => {
    if (switching || to === panel) return;
    setSwitching(true);
    setSweepTarget(to);
    setPanel(to);
    setTimeout(() => { setSwitching(false); setSweepTarget(null); }, 800);
  }, [switching, panel]);

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setLAlert(null);
    if (!lEmail || !lPass) { setLAlert({ msg: "AUTHORIZATION FIELDS INCOMPLETE", err: true }); return; }
    setLLoad(true);
    await delay(2000);
    setLLoad(false);
    onLogin();
  }, [lEmail, lPass, onLogin]);

  const handleSignup = useCallback(async (e) => {
    e.preventDefault();
    setSAlert(null);
    if (!sName || !sEmail || !sPass || !sConf) { setSAlert({ msg: "ALL BIOMETRIC FIELDS REQUIRED", err: true }); return; }
    if (sPass !== sConf) { setSAlert({ msg: "ENCRYPTION KEYS DO NOT MATCH", err: true }); return; }
    if (sPass.length < 6) { setSAlert({ msg: "ENCRYPTION KEY TOO SHORT — MIN 6 CHARS", err: true }); return; }
    setSLoad(true);
    await delay(2400);
    setSLoad(false);
    setSAlert({ msg: "IDENTITY REGISTERED — WELCOME TO STARK INDUSTRIES", err: false });
  }, [sName, sEmail, sPass, sConf]);

  const cardClass = `auth-card${cardVis ? " vis" : ""} ${panel === "login" ? "login-active" : "signup-active"}`;

  return (
    <div className={`si-auth${authVis ? " vis" : ""}`}>
      <div className={cardClass}>
        {/* LOGIN PANEL */}
        <div className="panel login-p">
          {sweepTarget === "login" && <div className="red-sweep" />}
          <div className="p-inner">
            <div className="hex-d"><svg viewBox="0 0 60 60"><polygon points="30,3 57,17 57,47 30,61 3,47 3,17"/><polygon points="30,12 48,22 48,42 30,52 12,42 12,22"/><polygon points="30,21 39,27 39,37 30,43 21,37 21,27"/></svg></div>
            <div className="c-tl" /><div className="c-tr" /><div className="c-bl" /><div className="c-br" />
            <div className="tline" style={{ top: "15%" }} /><div className="tline" style={{ bottom: "20%" }} />
            <div className="sb" style={{ left: 0 }} />
            <div className="p-header">
              <div className="sys-label"><span className="sdot" />STARK INDUSTRIES AUTH v7.3</div>
              <div className="p-title">ACCESS SYSTEM</div>
              <div className="p-sub">AUTHORIZED PERSONNEL ONLY</div>
            </div>
            <form onSubmit={handleLogin} style={{ flex: 1 }}>
              {lAlert && <div className={`salert${lAlert.err ? "" : " ssuccess"}`}>{lAlert.msg}</div>}
              <div className="fg">
                <input className="fi" type="email" placeholder=" " value={lEmail} onChange={e => { setLEmail(e.target.value); setLAlert(null); }} autoComplete="off" />
                <label className="fl">IDENTITY CODE (EMAIL)</label>
                <div className="ul" /><div className="ia" />
              </div>
              <div className="fg">
                <input className="fi" type="password" placeholder=" " value={lPass} onChange={e => { setLPass(e.target.value); setLAlert(null); }} autoComplete="off" />
                <label className="fl">ENCRYPTION KEY (PASSWORD)</label>
                <div className="ul" /><div className="ia" />
              </div>
              <button type="submit" className={`sbtn${lLoad ? " ld" : ""}`} disabled={lLoad}>
                <span className="btn-t">INITIATE ACCESS</span>
                <div className="btn-ld"><div className="larc" /></div>
              </button>
            </form>
            <div className="sw-link">NO CREDENTIALS?&nbsp;<button className="sw-btn" onClick={() => switchPanel("signup")}>REGISTER IDENTITY</button></div>
            <div className="sbar"><div className="sind" /><div className="sind r" /><div className="sind g" /><span className="stxt">JARVIS SECURITY LAYER ACTIVE</span></div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="divider"><div className="div-icon" onClick={() => switchPanel(panel === "login" ? "signup" : "login")}><div className="div-inner" /></div></div>

        {/* SIGNUP PANEL */}
        <div className="panel signup-p">
          {sweepTarget === "signup" && <div className="red-sweep" />}
          <div className="p-inner">
            <div className="hex-d" style={{ left: 15, right: "auto" }}><svg viewBox="0 0 60 60"><polygon points="30,3 57,17 57,47 30,61 3,47 3,17"/><polygon points="30,12 48,22 48,42 30,52 12,42 12,22"/><polygon points="30,21 39,27 39,37 30,43 21,37 21,27"/></svg></div>
            <div className="c-tl" /><div className="c-tr" /><div className="c-bl" /><div className="c-br" />
            <div className="tline" style={{ top: "15%" }} /><div className="tline" style={{ bottom: "20%" }} />
            <div className="sb" style={{ right: 0 }} />
            <div className="p-header">
              <div className="sys-label"><span className="sdot" style={{ background: "var(--gold)", boxShadow: "0 0 5px var(--gold)" }} />NEW IDENTITY REGISTRATION</div>
              <div className="p-title" style={{ color: "var(--gold)", animation: "glowGold 4s ease-in-out infinite" }}>REGISTER</div>
              <div className="p-sub">BIOMETRIC ENROLLMENT PROTOCOL</div>
            </div>
            <form onSubmit={handleSignup} style={{ flex: 1, overflow: "auto" }}>
              {sAlert && <div className={`salert${sAlert.err ? "" : " ssuccess"}`}>{sAlert.msg}</div>}
              {[
                [sName, setSName, "text", "OPERATIVE NAME"],
                [sEmail, setSEmail, "email", "IDENTITY CODE (EMAIL)"],
                [sPass, setSPass, "password", "ENCRYPTION KEY"],
                [sConf, setSConf, "password", "CONFIRM ENCRYPTION KEY"],
              ].map(([val, setter, type, label]) => (
                <div key={label} className="fg">
                  <input className="fi" type={type} placeholder=" " value={val} onChange={e => { setter(e.target.value); setSAlert(null); }} autoComplete="off" />
                  <label className="fl">{label}</label>
                  <div className="ul" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} /><div className="ia" />
                </div>
              ))}
              <button type="submit" className={`sbtn${sLoad ? " ld" : ""}`} style={{ borderColor: "var(--gold)", marginTop: 5 }} disabled={sLoad}>
                <span className="btn-t">REGISTER IDENTITY</span>
                <div className="btn-ld"><div className="larc" /></div>
              </button>
            </form>
            <div className="sw-link">ALREADY REGISTERED?&nbsp;<button className="sw-btn" onClick={() => switchPanel("login")}>ACCESS SYSTEM</button></div>
            <div className="sbar"><div className="sind g" /><div className="sind" /><div className="sind r" /><span className="stxt">ENCRYPTION PROTOCOL ENABLED</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   VIDEO SCENE
══════════════════════════════════════════════════════════════ */

export default AuthCard;


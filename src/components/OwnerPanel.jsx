function OwnerPanel({ visible, statBarsReady }) {
  /* ── REPLACE OWNER PHOTO ──────────────────────────────────
     To add your photo, replace the placeholder div with:
     <img className="own-photo-img" src="YOUR_PHOTO_URL" alt="Owner" />
  ─────────────────────────────────────────────────────────── */
  const OWNER = {
    photoUrl: null,            // ← set to your image URL
    name: "TONY STARK",
    title: "CEO · STARK INDUSTRIES · IRON MAN",
    stats: [
      { label: "INTELLIGENCE", val: "97",  w: "97%" },
      { label: "COMBAT",       val: "88",  w: "88%" },
      { label: "ENGINEERING",  val: "∞",   w: "100%" },
      { label: "SUITS BUILT",  val: "85+", w: "85%" },
    ],
    tags: ["AVENGER","GENIUS","BILLIONAIRE","PLAYBOY","PHILANTHROPIST","ARC REACTOR"],
  };

  return (
    <div className={`gal-owner-side${visible ? " vis" : ""}`}>
      <div className="own-corner tl" /><div className="own-corner tr" />
      <div className="own-corner bl" /><div className="own-corner br" />
      <div className="own-scan" />
      <div className="own-sys-label"><div className="own-sys-dot" />OPERATOR IDENTITY VERIFIED</div>
      <div className="own-photo-wrap">
        <div className="own-photo-frame">
          {OWNER.photoUrl
            ? <img className="own-photo-img" src={OWNER.photoUrl} alt="Owner" />
            : <div className="own-photo-placeholder">
                <div className="own-ph-icon">👤</div>
                <div className="own-ph-txt">ADD PHOTO<br />src="YOUR_URL"</div>
              </div>
          }
          <div className="own-photo-hud">
            <div className="own-photo-hud-tl">BIOMETRIC SCAN</div>
            <div className="own-photo-hud-br">VERIFIED ✓</div>
          </div>
          <div className="own-photo-scan" />
        </div>
      </div>
      <div className="own-details">
        <div className="own-name">{OWNER.name}</div>
        <div className="own-title">{OWNER.title}</div>
        <div className="own-divider" />
        <div className="own-stats">
          {OWNER.stats.map(st => (
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
          {OWNER.tags.map(t => <div key={t} className="own-tag">{t}</div>)}
        </div>
        <div className="own-status-row">
          <div className="own-status-led" />
          <div className="own-status-text">CLEARANCE LEVEL: ALPHA</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SUIT GALLERY
══════════════════════════════════════════════════════════════ */

export default OwnerPanel;


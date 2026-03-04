export function buildSuitSVG(suit, idx) {
  const c = suit.color, v = idx;
  const helmetH = 38+(v%3)*2, shoulderW = 22+(v%4)*2;
  const chestW  = 44+(v%3)*2, waistW   = 34+(v%4)*1;
  const reactorR = 7+(v%3);
  return `<svg class="suit-svg" viewBox="0 0 140 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sg${idx}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c}" stop-opacity=".9"/>
        <stop offset="100%" stop-color="${c}" stop-opacity=".3"/>
      </linearGradient>
      <linearGradient id="sg2${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${c}" stop-opacity=".6"/>
        <stop offset="100%" stop-color="${c}" stop-opacity=".1"/>
      </linearGradient>
      <radialGradient id="rg${idx}" cx="50%" cy="50%">
        <stop offset="0%" stop-color="${c}" stop-opacity=".8"/>
        <stop offset="100%" stop-color="${c}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="70" cy="105" rx="50" ry="80" fill="url(#rg${idx})" opacity=".18"/>
    <rect x="${46-(v%2)}" y="138" width="${18+(v%3)}" height="52" rx="4" fill="url(#sg2${idx})" stroke="${c}" stroke-width=".8" opacity=".9"/>
    <rect x="${72+(v%2)}" y="138" width="${18+(v%3)}" height="52" rx="4" fill="url(#sg2${idx})" stroke="${c}" stroke-width=".8" opacity=".9"/>
    <ellipse cx="${55-(v%2)}" cy="190" rx="10" ry="4" fill="${c}" opacity=".5"/>
    <ellipse cx="${82+(v%2)}" cy="190" rx="10" ry="4" fill="${c}" opacity=".5"/>
    <ellipse cx="${55-(v%2)}" cy="190" rx="6" ry="2" fill="${c}" opacity=".9"/>
    <ellipse cx="${82+(v%2)}" cy="190" rx="6" ry="2" fill="${c}" opacity=".9"/>
    <rect x="${70-waistW/2}" y="128" width="${waistW}" height="14" rx="3" fill="url(#sg${idx})" stroke="${c}" stroke-width=".8" opacity=".85"/>
    <path d="M${70-chestW/2},128 L${68-chestW/2},80 Q70,76 ${72+chestW/2},80 L${70+chestW/2},128 Z" fill="url(#sg${idx})" stroke="${c}" stroke-width="1" opacity=".95"/>
    <line x1="${70-chestW/2+6}" y1="95" x2="${70-chestW/2+6}" y2="118" stroke="${c}" stroke-width=".5" opacity=".5"/>
    <line x1="${70+chestW/2-6}" y1="95" x2="${70+chestW/2-6}" y2="118" stroke="${c}" stroke-width=".5" opacity=".5"/>
    <rect x="${70-14}" y="108" width="12" height="8" rx="1" fill="${c}" opacity=".25" stroke="${c}" stroke-width=".5"/>
    <rect x="${70+2}"  y="108" width="12" height="8" rx="1" fill="${c}" opacity=".25" stroke="${c}" stroke-width=".5"/>
    <circle cx="70" cy="93" r="${reactorR+3}" fill="rgba(0,0,0,.7)" stroke="${c}" stroke-width="1" opacity=".9"/>
    <circle cx="70" cy="93" r="${reactorR}" fill="none" stroke="${c}" stroke-width="1.5"/>
    <circle cx="70" cy="93" r="${reactorR-2}" fill="${c}" opacity=".9"><animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/></circle>
    <circle cx="70" cy="93" r="${reactorR-4}" fill="white" opacity=".8"><animate attributeName="r" values="${reactorR-4};${reactorR-3};${reactorR-4}" dur="2s" repeatCount="indefinite"/></circle>
    <ellipse cx="${70-chestW/2-shoulderW/2+2}" cy="84" rx="${shoulderW/2}" ry="${shoulderW/2-2}" fill="url(#sg${idx})" stroke="${c}" stroke-width="1" opacity=".9"/>
    <ellipse cx="${70+chestW/2+shoulderW/2-2}" cy="84" rx="${shoulderW/2}" ry="${shoulderW/2-2}" fill="url(#sg${idx})" stroke="${c}" stroke-width="1" opacity=".9"/>
    <path d="M${70-chestW/2},88 L${22+(v%4)},90 L${18+(v%4)},130 L${32+(v%3)},133 L${38+(v%4)},95 L${70-chestW/2+2},95 Z" fill="url(#sg2${idx})" stroke="${c}" stroke-width=".8" opacity=".85"/>
    <path d="M${70+chestW/2},88 L${118-(v%4)},90 L${122-(v%4)},130 L${108-(v%3)},133 L${102-(v%4)},95 L${70+chestW/2-2},95 Z" fill="url(#sg2${idx})" stroke="${c}" stroke-width=".8" opacity=".85"/>
    <ellipse cx="${26+(v%3)}" cy="133" rx="11" ry="8" fill="url(#sg${idx})" stroke="${c}" stroke-width="1" opacity=".9"/>
    <circle cx="${26+(v%3)}" cy="133" r="5" fill="${c}" opacity=".9"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite"/></circle>
    <circle cx="${26+(v%3)}" cy="133" r="2.5" fill="white" opacity=".8"/>
    <ellipse cx="${114-(v%3)}" cy="133" rx="11" ry="8" fill="url(#sg${idx})" stroke="${c}" stroke-width="1" opacity=".9"/>
    <circle cx="${114-(v%3)}" cy="133" r="5" fill="${c}" opacity=".9"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" begin="0.4s" repeatCount="indefinite"/></circle>
    <circle cx="${114-(v%3)}" cy="133" r="2.5" fill="white" opacity=".8"/>
    <rect x="64" y="72" width="12" height="10" rx="2" fill="url(#sg${idx})" stroke="${c}" stroke-width=".8"/>
    <path d="M${70-helmetH/2+4},72 Q${70-helmetH/2},${40-(v%3)*2} 70,${38-(v%4)} Q${70+helmetH/2},${40-(v%3)*2} ${70+helmetH/2-4},72 Z" fill="url(#sg${idx})" stroke="${c}" stroke-width="1.2" opacity=".98"/>
    <path d="M${70-helmetH/2+8},60 L${70-helmetH/2+6},70 L${70+helmetH/2-6},70 L${70+helmetH/2-8},60 Z" fill="rgba(0,0,0,.6)" stroke="${c}" stroke-width=".8" opacity=".9"/>
    <rect x="${70-helmetH/2+10}" y="54" width="${helmetH/2-10}" height="5" rx="2.5" fill="${c}" opacity=".95"><animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/></rect>
    <rect x="70" y="54" width="${helmetH/2-10}" height="5" rx="2.5" fill="${c}" opacity=".95"><animate attributeName="opacity" values="0.7;1;0.7" dur="3s" begin="0.2s" repeatCount="indefinite"/></rect>
    <line x1="70" y1="${40-(v%4)}" x2="70" y2="53" stroke="${c}" stroke-width="1.5" opacity=".7"/>
    <circle cx="70" cy="${40-(v%4)}" r="2.5" fill="${c}" opacity=".8"/>
    <text x="70" y="198" text-anchor="middle" font-family="'Orbitron',monospace" font-size="7" fill="${c}" opacity=".6" letter-spacing="3">${suit.id.toUpperCase()}</text>
  </svg>`;
}

// ── GLOBAL CSS ────────────────────────────────────────────────


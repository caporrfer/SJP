/* Generates stylized SVG placeholders for gym machines.
   Each placeholder = monochrome silhouette + code + noise texture.
   Returns a data URL. */

(function(){
  const shapes = {
    'press-banca': (c) => `
      <rect x="80" y="180" width="440" height="12" fill="${c}"/>
      <rect x="290" y="120" width="20" height="80" fill="${c}"/>
      <rect x="200" y="60" width="200" height="10" fill="${c}"/>
      <circle cx="150" cy="65" r="30" fill="${c}"/>
      <circle cx="450" cy="65" r="30" fill="${c}"/>
      <circle cx="150" cy="65" r="18" fill="#FAFAF7"/>
      <circle cx="450" cy="65" r="18" fill="#FAFAF7"/>
      <rect x="70" y="190" width="460" height="6" fill="${c}" opacity="0.5"/>
      <rect x="100" y="196" width="8" height="80" fill="${c}"/>
      <rect x="492" y="196" width="8" height="80" fill="${c}"/>
      <rect x="250" y="196" width="100" height="40" fill="${c}"/>
    `,
    'rack': (c) => `
      <rect x="120" y="40" width="10" height="320" fill="${c}"/>
      <rect x="470" y="40" width="10" height="320" fill="${c}"/>
      <rect x="120" y="80" width="360" height="8" fill="${c}"/>
      <rect x="100" y="140" width="30" height="10" fill="${c}"/>
      <rect x="470" y="140" width="30" height="10" fill="${c}"/>
      <rect x="100" y="220" width="30" height="10" fill="${c}"/>
      <rect x="470" y="220" width="30" height="10" fill="${c}"/>
      <rect x="60" y="360" width="480" height="12" fill="${c}"/>
      <rect x="200" y="84" width="8" height="40" fill="${c}"/>
      <rect x="392" y="84" width="8" height="40" fill="${c}"/>
    `,
    'jaula-sentadilla': (c) => `
      <rect x="80" y="40" width="10" height="320" fill="${c}"/>
      <rect x="510" y="40" width="10" height="320" fill="${c}"/>
      <rect x="80" y="40" width="440" height="10" fill="${c}"/>
      <rect x="80" y="60" width="440" height="6" fill="${c}" opacity="0.4"/>
      <rect x="200" y="130" width="200" height="8" fill="${c}"/>
      <circle cx="180" cy="134" r="20" fill="${c}"/>
      <circle cx="420" cy="134" r="20" fill="${c}"/>
      <rect x="60" y="358" width="480" height="10" fill="${c}"/>
      <rect x="90" y="140" width="8" height="30" fill="${c}"/>
      <rect x="502" y="140" width="8" height="30" fill="${c}"/>
      <rect x="90" y="220" width="8" height="30" fill="${c}"/>
      <rect x="502" y="220" width="8" height="30" fill="${c}"/>
    `,
    'belt-squat': (c) => `
      <rect x="120" y="300" width="360" height="14" fill="${c}"/>
      <rect x="200" y="100" width="200" height="10" fill="${c}"/>
      <circle cx="170" cy="105" r="28" fill="${c}"/>
      <circle cx="430" cy="105" r="28" fill="${c}"/>
      <circle cx="170" cy="105" r="14" fill="#FAFAF7"/>
      <circle cx="430" cy="105" r="14" fill="#FAFAF7"/>
      <rect x="290" y="110" width="20" height="180" fill="${c}"/>
      <rect x="140" y="210" width="320" height="8" fill="${c}" opacity="0.5"/>
      <rect x="80" y="314" width="440" height="8" fill="${c}" opacity="0.6"/>
      <rect x="260" y="290" width="80" height="12" fill="${c}"/>
    `,
    'antebrazo': (c) => `
      <rect x="150" y="240" width="300" height="14" fill="${c}"/>
      <rect x="270" y="140" width="60" height="110" fill="${c}"/>
      <rect x="200" y="120" width="200" height="10" fill="${c}"/>
      <rect x="180" y="80" width="10" height="50" fill="${c}"/>
      <rect x="410" y="80" width="10" height="50" fill="${c}"/>
      <circle cx="185" cy="80" r="16" fill="${c}"/>
      <circle cx="415" cy="80" r="16" fill="${c}"/>
      <rect x="140" y="254" width="320" height="6" fill="${c}" opacity="0.5"/>
      <rect x="160" y="260" width="10" height="80" fill="${c}"/>
      <rect x="430" y="260" width="10" height="80" fill="${c}"/>
    `,
    'row-convergente': (c) => `
      <rect x="100" y="200" width="400" height="14" fill="${c}"/>
      <rect x="290" y="100" width="20" height="100" fill="${c}"/>
      <rect x="180" y="100" width="240" height="8" fill="${c}"/>
      <circle cx="170" cy="104" r="26" fill="${c}"/>
      <circle cx="430" cy="104" r="26" fill="${c}"/>
      <rect x="140" y="214" width="320" height="80" fill="${c}" opacity="0.15"/>
      <rect x="240" y="214" width="120" height="30" fill="${c}"/>
      <rect x="90" y="300" width="420" height="10" fill="${c}"/>
      <rect x="110" y="310" width="10" height="40" fill="${c}"/>
      <rect x="480" y="310" width="10" height="40" fill="${c}"/>
    `,
    'generic': (c) => `
      <rect x="100" y="60" width="400" height="10" fill="${c}"/>
      <rect x="120" y="70" width="10" height="240" fill="${c}"/>
      <rect x="470" y="70" width="10" height="240" fill="${c}"/>
      <rect x="200" y="150" width="200" height="10" fill="${c}"/>
      <circle cx="180" cy="155" r="22" fill="${c}"/>
      <circle cx="420" cy="155" r="22" fill="${c}"/>
      <rect x="90" y="320" width="420" height="10" fill="${c}"/>
    `
  };

  window.sjpPlaceholder = function(kind, code, opts = {}) {
    const color = opts.color || '#1A1A1A';
    const bg = opts.bg || '#F2F2EE';
    const draw = shapes[kind] || shapes.generic;
    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <defs>
    <linearGradient id="g-${code}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${shadeColor(bg, -6)}"/>
    </linearGradient>
    <pattern id="grid-${code}" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="${shadeColor(bg, -10)}" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="600" height="400" fill="url(#g-${code})"/>
  <rect width="600" height="400" fill="url(#grid-${code})" opacity="0.4"/>
  <g>${draw(color)}</g>
  <g fill="${color}" opacity="0.4">
    <rect x="24" y="24" width="14" height="1.5"/>
    <rect x="24" y="30" width="7" height="1.5"/>
  </g>
  <text x="24" y="372" font-family="JetBrains Mono, monospace" font-size="10" font-weight="500" letter-spacing="1.5" fill="${color}" opacity="0.55">${code}</text>
  <text x="576" y="372" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="10" font-weight="500" letter-spacing="1.5" fill="${color}" opacity="0.55">SJP · HANDMADE</text>
</svg>`.trim();
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  };

  function shadeColor(hex, percent) {
    hex = hex.replace('#','');
    let r = parseInt(hex.substr(0,2),16);
    let g = parseInt(hex.substr(2,2),16);
    let b = parseInt(hex.substr(4,2),16);
    r = Math.max(0, Math.min(255, r + Math.round(255 * percent / 100)));
    g = Math.max(0, Math.min(255, g + Math.round(255 * percent / 100)));
    b = Math.max(0, Math.min(255, b + Math.round(255 * percent / 100)));
    return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
  }
})();

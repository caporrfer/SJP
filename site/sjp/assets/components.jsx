/* Shared components for SJP Strength Generation
   Exports: SJPNav, SJPFooter, SJPProductCard, SJPMarquee, SJPHeroBg, SJPIcon, useReveal
*/

const { useState, useEffect, useRef } = React;

/* ============================================
   ICONS
   ============================================ */
function SJPIcon({ name, size = 16, stroke = 1.6 }) {
  const s = size;
  const common = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'arrow-right':   return <svg {...common}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-left':    return <svg {...common}><path d="M19 12H5M11 5l-7 7 7 7"/></svg>;
    case 'arrow-down':    return <svg {...common}><path d="M12 5v14M5 13l7 7 7-7"/></svg>;
    case 'arrow-up-right':return <svg {...common}><path d="M7 17L17 7M8 7h9v9"/></svg>;
    case 'play':          return <svg {...common} fill="currentColor" stroke="none"><path d="M8 5v14l11-7L8 5z"/></svg>;
    case 'check':         return <svg {...common}><path d="M5 12l5 5L20 7"/></svg>;
    case 'plus':          return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus':         return <svg {...common}><path d="M5 12h14"/></svg>;
    case 'shield':        return <svg {...common}><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>;
    case 'tool':          return <svg {...common}><path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-3 3-2.4-2.4 3-3z"/></svg>;
    case 'flame':         return <svg {...common}><path d="M12 2s4 4 4 8a4 4 0 11-8 0c0-2 2-3 2-5s-1-3-1-3 5 1 5 8"/></svg>;
    case 'truck':         return <svg {...common}><path d="M1 7h13v10H1zM14 10h5l3 4v3h-8zM5 20a2 2 0 100-4 2 2 0 000 4zM17 20a2 2 0 100-4 2 2 0 000 4z"/></svg>;
    case 'whatsapp':      return <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1.1 2.8 1.2 3 .1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.1-1.3c1.5.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>;
    case 'instagram':     return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>;
    case 'youtube':       return <svg {...common}><path d="M22 8.5s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.3 5.4 12 5.4 12 5.4s-4.3 0-7.2.3c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S1.8 10.1 1.8 11.7v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.8.2 7.3.3 7.3.3s4.3 0 7.2-.3c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5c0-1.6-.2-3.2-.2-3.2z"/><path d="M10 15l4-2.5L10 10v5z" fill="currentColor"/></svg>;
    case 'tiktok':        return <svg {...common}><path d="M16 3v10.5a3.5 3.5 0 11-3.5-3.5M16 3a5 5 0 005 5M16 3h0"/></svg>;
    case 'mail':          return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="1"/><path d="M2 6l10 7L22 6"/></svg>;
    case 'phone':         return <svg {...common}><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L8 9.8a16 16 0 006 6l1.4-1.3a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.9 2z"/></svg>;
    case 'map-pin':       return <svg {...common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    case 'menu':          return <svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>;
    case 'x':             return <svg {...common}><path d="M18 6L6 18M6 6l12 12"/></svg>;
    case 'filter':        return <svg {...common}><path d="M4 5h16M7 12h10M10 19h4"/></svg>;
    case 'search':        return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    default:              return null;
  }
}

/* ============================================
   NAV
   ============================================ */
function SJPNav({ active = 'home' }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [, force] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    onScroll();
    const onLang = () => force(n => n + 1);
    window.addEventListener('sjp-lang-change', onLang);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('sjp-lang-change', onLang);
    };
  }, []);
  useEffect(() => {
    if (open) document.body.classList.add('drawer-open');
    else document.body.classList.remove('drawer-open');
    return () => document.body.classList.remove('drawer-open');
  }, [open]);

  const tt = (window.t || ((k) => k));
  const links = [
    { id: 'home', label: tt('nav.home'),       href: 'index.html' },
    { id: 'catalog', label: tt('nav.catalog'), href: 'catalog.html' },
    { id: 'custom', label: tt('nav.custom'),   href: 'custom.html' },
    { id: 'about', label: tt('nav.about'),     href: 'about.html' },
    { id: 'support', label: tt('nav.support'), href: 'support.html' },
    { id: 'contact', label: tt('nav.contact'), href: 'contact.html' }
  ];

  const lang = window.SJP_LANG || 'es';
  const switchLang = (l) => { window.setLang && window.setLang(l); };

  return (
    <nav className="nav" style={scrolled ? { boxShadow: '0 1px 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.35)' } : null}>
      <div className="nav-inner">
        <a href="index.html" className="logo" aria-label="SJP Strength Generation">
          <div className="logo-mark">S</div>
          <div>
            SJP
            <small>Strength Generation</small>
          </div>
        </a>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <a href={l.href} className={active === l.id ? 'active' : ''}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <div className="lang-toggle" title="Idioma / Language" style={{cursor:'pointer'}}>
            <span className={lang === 'es' ? 'active' : ''} style={lang !== 'es' ? {opacity: 0.5, cursor:'pointer'} : {cursor:'pointer'}} onClick={() => switchLang('es')}>ES</span>
            <span style={{opacity: 0.3}}>/</span>
            <span className={lang === 'en' ? 'active' : ''} style={lang !== 'en' ? {opacity: 0.5, cursor:'pointer'} : {cursor:'pointer'}} onClick={() => switchLang('en')}>EN</span>
          </div>
          <button className={`burger ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div className={`nav-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <ul>
          {links.map((l, i) => (
            <li key={l.id}>
              <a href={l.href} className={active === l.id ? 'active' : ''} onClick={() => setOpen(false)}>
                <span>{l.label}</span>
                <span className="num">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="drawer-foot">
          <div className="lang-toggle-mobile">
            <span className={lang === 'es' ? 'active' : ''} style={{cursor:'pointer', opacity: lang==='es'?1:0.5}} onClick={() => switchLang('es')}>ES</span>
            <span style={{opacity: 0.3}}>/</span>
            <span className={lang === 'en' ? 'active' : ''} style={{cursor:'pointer', opacity: lang==='en'?1:0.5}} onClick={() => switchLang('en')}>EN</span>
          </div>
          <p>SJP — Strength Generation</p>
        </div>
      </div>
    </nav>
  );
}

/* ============================================
   MARQUEE (cintilla industrial)
   ============================================ */
function SJPMarquee({ items }) {
  const tt = (window.t || ((k) => k));
  const defaultItems = items || [
    tt('mar.1'), tt('mar.2'), tt('mar.3'), tt('mar.4'), tt('mar.5'), tt('mar.6'), tt('mar.7')
  ];
  const run = (
    <span>
      {defaultItems.map((t, i) => (
        <React.Fragment key={i}>
          <span>{t}</span>
          <span className="dot">●</span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {run}{run}{run}
      </div>
    </div>
  );
}

/* ============================================
   PRODUCT CARD
   ============================================ */
function SJPProductCard({ product, onInfo }) {
  const p = product;
  const [imgUrl, setImgUrl] = useState('');
  const [, force] = useState(0);
  useEffect(() => {
    if (p.image) {
      setImgUrl(p.image);
    } else if (window.sjpPlaceholder) {
      setImgUrl(window.sjpPlaceholder(p.kind, p.code));
    }
    const onLang = () => force(n => n + 1);
    window.addEventListener('sjp-lang-change', onLang);
    return () => window.removeEventListener('sjp-lang-change', onLang);
  }, [p.code, p.kind]);
  const lang = window.SJP_LANG || 'es';
  const en = window.SJP_PRODUCTS_EN && window.SJP_PRODUCTS_EN[p.id];
  const name = (lang === 'en' && en) ? en.name : p.name;
  const fromLabel = lang === 'en' ? 'From' : 'Desde';

  const handleInfo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onInfo) onInfo(p);
  };

  return (
    <a href={`catalog.html?p=${p.id}`} className="card" onClick={onInfo ? handleInfo : undefined}>
      <div className="card-img" style={{ backgroundImage: imgUrl ? `url("${imgUrl}")` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {p.tag && <div className={`card-tag${p.tag === 'BESTSELLER' || p.tag === 'TOP' ? ' red' : ''}`}>{p.tag}</div>}
        {p.video && (
          <div className="card-video-badge" title="Incluye video">
            <SJPIcon name="play" size={12} />
          </div>
        )}
        <div className="card-overlay">
          <span className="btn btn-red">Ver ficha <SJPIcon name="arrow-right" size={12}/></span>
        </div>
      </div>
      <div className="card-body">
        <div className="card-cat">{p.cat} · {p.code}</div>
        <div className="card-name">{name}</div>
        <div className="card-price">
          <span className="from">{fromLabel}</span>
          <span>{p.price.toLocaleString('es-ES')} €</span>
        </div>
      </div>
    </a>
  );
}

/* ============================================
   FOOTER
   ============================================ */
function SJPFooter() {
  const [, force] = useState(0);
  useEffect(() => {
    const onLang = () => force(n => n + 1);
    window.addEventListener('sjp-lang-change', onLang);
    return () => window.removeEventListener('sjp-lang-change', onLang);
  }, []);
  const tt = (window.t || ((k) => k));
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-col footer-brand">
            <a href="index.html" className="logo">
              <div className="logo-mark">S</div>
              <div>SJP<small>Strength Generation</small></div>
            </a>
            <p>{tt('foot.tagline')}</p>
          </div>
          <div className="footer-col">
            <h5>{tt('foot.explore')}</h5>
            <ul>
              <li><a href="catalog.html">{tt('foot.full')}</a></li>
              <li><a href="catalog.html#pecho">{tt('nav.catalog')}</a></li>
              <li><a href="about.html">{tt('foot.about')}</a></li>
              <li><a href="custom.html">{tt('foot.custom')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{tt('foot.brand')}</h5>
            <ul>
              <li><a href="support.html">{tt('foot.support')}</a></li>
              <li><a href="support.html#garantia">{tt('foot.warranty')}</a></li>
              <li><a href="contact.html">{tt('foot.contact')}</a></li>
              <li><a href="mailto:sjpgeneration00@gmail.com">sjpgeneration00@gmail.com</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{tt('foot.legal')}</h5>
            <ul>
              <li><a href="#">{tt('foot.legal1')}</a></li>
              <li><a href="#">{tt('foot.legal2')}</a></li>
              <li><a href="#">{tt('foot.legal3')}</a></li>
              <li><a href="#">{tt('foot.legal4')}</a></li>
              <li><a href="#">{tt('foot.legal5')}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{tt('foot.copy')}</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram"><SJPIcon name="instagram" size={16}/></a>
            <a href="#" aria-label="YouTube"><SJPIcon name="youtube" size={16}/></a>
            <a href="#" aria-label="TikTok"><SJPIcon name="tiktok" size={16}/></a>
            <a href="#" aria-label="WhatsApp"><SJPIcon name="whatsapp" size={16}/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================
   HERO BG — industrial SVG ambience
   Dark background with hinted metal silhouette
   ============================================ */
function SJPHeroBg({ variant = 'rack' }) {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
      <defs>
        <linearGradient id="floorgrad" x1="0" y1="0.5" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0A0A"/>
          <stop offset="100%" stopColor="#1A1A1A"/>
        </linearGradient>
        <radialGradient id="spot" cx="0.5" cy="0.35" r="0.6">
          <stop offset="0%" stopColor="#2A2A2A" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0"/>
        </radialGradient>
        <pattern id="gridpat" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeOpacity="0.025" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="1600" height="900" fill="#0A0A0A"/>
      <rect width="1600" height="900" fill="url(#spot)"/>
      <rect width="1600" height="900" fill="url(#gridpat)"/>

      {/* floor plane */}
      <polygon points="0,620 1600,620 1600,900 0,900" fill="url(#floorgrad)"/>
      <line x1="0" y1="620" x2="1600" y2="620" stroke="#FFFFFF" strokeOpacity="0.06"/>

      {/* rack silhouette */}
      <g opacity="0.85">
        <rect x="460" y="240" width="16" height="400" fill="#1F1F1F"/>
        <rect x="1124" y="240" width="16" height="400" fill="#1F1F1F"/>
        <rect x="460" y="240" width="680" height="14" fill="#1F1F1F"/>
        <rect x="460" y="270" width="680" height="6" fill="#1A1A1A"/>

        {/* j-hooks */}
        <rect x="440" y="340" width="36" height="12" fill="#262626"/>
        <rect x="1124" y="340" width="36" height="12" fill="#262626"/>
        <rect x="440" y="460" width="36" height="12" fill="#262626"/>
        <rect x="1124" y="460" width="36" height="12" fill="#262626"/>

        {/* barbell */}
        <rect x="350" y="395" width="900" height="8" fill="#2F2F2F"/>
        <rect x="350" y="393" width="900" height="3" fill="#3A3A3A"/>
        {/* plates L */}
        <circle cx="370" cy="399" r="60" fill="#141414" stroke="#2A2A2A" strokeWidth="2"/>
        <circle cx="370" cy="399" r="28" fill="#0A0A0A"/>
        <circle cx="370" cy="399" r="6"  fill="#DC1F1F"/>
        {/* plates R */}
        <circle cx="1230" cy="399" r="60" fill="#141414" stroke="#2A2A2A" strokeWidth="2"/>
        <circle cx="1230" cy="399" r="28" fill="#0A0A0A"/>
        <circle cx="1230" cy="399" r="6"  fill="#DC1F1F"/>

        {/* base plates */}
        <rect x="420" y="620" width="96" height="10" fill="#1F1F1F"/>
        <rect x="1084" y="620" width="96" height="10" fill="#1F1F1F"/>
      </g>

      {/* ambient scratches */}
      <g stroke="#FFFFFF" strokeOpacity="0.04" strokeWidth="1">
        <line x1="200" y1="100" x2="280" y2="180"/>
        <line x1="1400" y1="180" x2="1480" y2="120"/>
        <line x1="120" y1="500" x2="200" y2="560"/>
      </g>

      {/* coordinate ticks */}
      <g fill="#FFFFFF" fillOpacity="0.22" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.5">
        <text x="48" y="56">SJP · STRENGTH · GENERATION</text>
        <text x="48" y="74" fillOpacity="0.4">N 40.4168° · W 03.7038°</text>
        <text x="1552" y="56" textAnchor="end">FRAME · 01 / SERIES-R</text>
        <text x="1552" y="74" textAnchor="end" fillOpacity="0.4">HANDMADE · MADRID · ES</text>
      </g>
    </svg>
  );
}

/* ============================================
   REVEAL hook using IntersectionObserver
   ============================================ */
function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const nodes = ref.current.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.15 });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
}

/* ============================================
   useLang — re-renders component on language change
   ============================================ */
function useLang() {
  const [, force] = useState(0);
  useEffect(() => {
    const onLang = () => {
      force(n => n + 1);
      document.documentElement.lang = window.SJP_LANG || 'es';
    };
    window.addEventListener('sjp-lang-change', onLang);
    document.documentElement.lang = window.SJP_LANG || 'es';
    return () => window.removeEventListener('sjp-lang-change', onLang);
  }, []);
  return window.SJP_LANG || 'es';
}

/* expose */
Object.assign(window, {
  SJPNav, SJPFooter, SJPProductCard, SJPMarquee, SJPHeroBg, SJPIcon, useReveal, useLang
});

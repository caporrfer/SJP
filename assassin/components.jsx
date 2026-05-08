/* global React */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ============== HOOKS ==============
window.useLang = function () {
  const [lang, setLang] = useState(() => localStorage.getItem("ag_lang") || "es");
  useEffect(() => { localStorage.setItem("ag_lang", lang); document.documentElement.lang = lang; }, [lang]);
  return [lang, setLang];
};

window.useT = function (lang) {
  return useCallback((obj) => {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] ?? obj.es ?? obj.en ?? "";
  }, [lang]);
};

// keyed local-storage state
window.useLS = function (key, initial) {
  const [v, setV] = useState(() => {
    try { const r = localStorage.getItem(key); return r != null ? JSON.parse(r) : initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
};

// route via hash
window.useRoute = function () {
  const parse = () => {
    const h = (location.hash || "#home").replace(/^#/, "");
    const [name, ...rest] = h.split("/");
    return { name: name || "home", params: rest };
  };
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => { setRoute(parse()); window.scrollTo({ top:0, behavior:"instant" }); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
};
window.go = (path) => { location.hash = path; };

// ============== TOAST ==============
window.Toast = function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2400); return () => clearTimeout(t); }, [onDone]);
  return React.createElement("div", { className: "toast" }, msg);
};

// ============== HEADER ==============
window.Header = function Header({ lang, setLang, route, content }) {
  const t = window.useT(lang);
  const [open, setOpen] = useState(false);
  const nav = window.AG_NAV;
  return (
    <header className="header">
      <div className="wrap">
        <div className="strip">
          <div><span className="dot"></span>{t(window.AG_T.marker)}</div>
          <div>{t(content.brand.forge)} · {content.brand.estab}</div>
        </div>
        <nav className="main">
          <a href="#home" className="brand" onClick={() => setOpen(false)}>
            <img src="assets/logo.png" alt="Assassin's Grip" />
            <div>
              <div className="name">ASSASSIN'S GRIP</div>
              <div className="sub">{t(content.brand.tagline)}</div>
            </div>
          </a>
          <div className={"links " + (open ? "open" : "")}>
            {nav.map(n => (
              <a key={n.id} href={"#" + n.id} className={route.name === n.id ? "active" : ""} onClick={() => setOpen(false)}>
                {t(n.label)}
              </a>
            ))}
          </div>
          <div className="actions">
            <div className="lang-toggle" role="group" aria-label="language">
              <button className={lang === "es" ? "on" : ""} onClick={() => setLang("es")}>ES</button>
              <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
            </div>
            <button className="menu-btn" aria-label="menu" onClick={() => setOpen(o => !o)}><span></span></button>
          </div>
        </nav>
      </div>
    </header>
  );
};

// ============== FOOTER ==============
window.Footer = function Footer({ lang, setLang, content }) {
  const t = window.useT(lang);
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="row">
              <img src="assets/logo.png" alt="" />
              <div>
                <div className="name">ASSASSIN'S GRIP</div>
                <div style={{fontFamily:"var(--f-mono)",fontSize:10,letterSpacing:".2em",color:"#888",marginTop:4}}>{t(content.brand.tagline)}</div>
              </div>
            </div>
            <p>{t({es:"Material de agarre forjado a mano. Acero macizo. Sin atajos.",en:"Hand-forged grip equipment. Solid steel. No shortcuts."})}</p>
            <p style={{fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:".18em",color:"#666",textTransform:"uppercase"}}>{t(content.brand.forge)}</p>
          </div>
          <div>
            <h5>{t(window.AG_T.navigation)}</h5>
            <ul>
              {window.AG_NAV.map(n => <li key={n.id}><a href={"#"+n.id}>{t(n.label)}</a></li>)}
            </ul>
          </div>
          <div>
            <h5>{t(window.AG_T.legal)}</h5>
            <ul>
              <li><a href="#legal/privacy">{t(window.AG_T.privacy)}</a></li>
              <li><a href="#legal/terms">{t(window.AG_T.terms)}</a></li>
              <li><a href="#legal/cookies">{t(window.AG_T.cookies)}</a></li>
              <li><a href="#legal/shipping">{t(window.AG_T.shipping)}</a></li>
            </ul>
          </div>
          <div>
            <h5>{t(window.AG_T.contact_us)}</h5>
            <ul>
              <li><a href={"mailto:"+content.contact.email}>{content.contact.email}</a></li>
              <li><a href={"https://wa.me/"+content.contact.whatsapp.replace(/\D/g,"")} target="_blank" rel="noopener">{content.contact.phone}</a></li>
              <li><a href={"https://instagram.com/"+content.contact.instagram.replace("@","")} target="_blank" rel="noopener">IG · {content.contact.instagram}</a></li>
              <li><a href={"https://youtube.com/"+content.contact.youtube} target="_blank" rel="noopener">YT · {content.contact.youtube}</a></li>
            </ul>
            <div style={{marginTop:18}}>
              <h5 style={{marginBottom:10}}>{t(window.AG_T.language)}</h5>
              <div className="lang-toggle" style={{display:"inline-flex"}}>
                <button className={lang==="es"?"on":""} onClick={()=>setLang("es")}>ES</button>
                <button className={lang==="en"?"on":""} onClick={()=>setLang("en")}>EN</button>
              </div>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} ASSASSIN'S GRIP · {t(window.AG_T.rights)}</span>
          <span>{t({es:"PANEL ADMIN",en:"ADMIN PANEL"})} · <a href="#admin">/admin</a></span>
        </div>
      </div>
    </footer>
  );
};

// ============== PRODUCT CARD ==============
window.ProductCard = function ProductCard({ p, lang, onOpen }) {
  const t = window.useT(lang);
  return (
    <div className="card" onClick={() => onOpen(p)} role="button" tabIndex={0}>
      <div className={"img" + (p.video ? " has-video" : "")}>
        {p.image ? <img src={p.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} /> :
          <div className="placeholder">{t({es:"FOTO PRODUCTO",en:"PRODUCT PHOTO"})}<br/>{p.code}</div>}
        {p.video && !p.image && <span className="tag red">{t({es:"VÍDEO",en:"VIDEO"})}</span>}
        {!p.video && <span className="tag">{p.code}</span>}
      </div>
      <div className="body-pad">
        <span className="code">{p.code} · {(window.AG_CATEGORIES.find(c=>c.id===p.cat)||{label:{es:"",en:""}}).label[lang]}</span>
        <span className="name">{t(p.name)}</span>
        <p className="desc">{t(p.desc)}</p>
        <div className="row">
          <span className="price">{p.price}</span>
          <span className="link">{t(window.AG_T.view)} →</span>
        </div>
      </div>
    </div>
  );
};

// ============== PRODUCT MODAL ==============
window.ProductModal = function ProductModal({ p, lang, onClose, contact }) {
  const t = window.useT(lang);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  if (!p) return null;
  const buyMsg = encodeURIComponent(`${lang==="es"?"Hola, quiero comprar":"Hi, I want to buy"} ${t(p.name)} (${p.code}) · ${p.price}`);
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="close">×</button>
        <div className="vis">
          {p.image ? <img src={p.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} /> :
            <div className="placeholder">{t({es:"FOTO PRODUCTO",en:"PRODUCT PHOTO"})}<br/>{p.code}</div>}
          {p.video && <div style={{position:"absolute",left:14,bottom:14,background:"#C8102E",color:"#fff",padding:"6px 10px",fontFamily:"var(--f-mono)",fontSize:10,letterSpacing:".18em"}}>▶ {t({es:"VÍDEO DISPONIBLE",en:"VIDEO AVAILABLE"})}</div>}
        </div>
        <div className="info">
          <div className="code">{p.code} · {(window.AG_CATEGORIES.find(c=>c.id===p.cat)||{label:{es:"",en:""}}).label[lang]}</div>
          <h3>{t(p.name)}</h3>
          <div className="price">{p.price}</div>
          <p className="desc">{t(p.desc)}</p>
          <div className="specs">
            <div><div className="k">{t(window.AG_T.diam)}</div><div className="v">{p.specs.d}</div></div>
            <div><div className="k">{t(window.AG_T.weight)}</div><div className="v">{p.specs.w}</div></div>
            <div><div className="k">{t(window.AG_T.finish)}</div><div className="v">{t(p.specs.finish)}</div></div>
            <div><div className="k">{t(window.AG_T.stock)}</div><div className="v" style={{color:"#1F8A5B"}}>● {t({es:"DISPONIBLE",en:"AVAILABLE"})}</div></div>
          </div>
          <div style={{display:"flex",gap:10,marginTop:8,flexWrap:"wrap"}}>
            <a className="btn red" href={"https://wa.me/"+contact.whatsapp.replace(/\D/g,"")+"?text="+buyMsg} target="_blank" rel="noopener">{t(window.AG_T.buy)} <span className="arrow">→</span></a>
            <a className="btn ghost" href={"mailto:"+contact.email+"?subject="+encodeURIComponent(t(p.name)+" · "+p.code)}>{t(window.AG_T.request_info)}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============== CAROUSEL ==============
window.Carousel = function Carousel({ children, lang }) {
  const t = window.useT(lang);
  const ref = useRef(null);
  const scrollBy = (dir) => {
    const el = ref.current; if (!el) return;
    const w = Math.min(420, el.clientWidth * 0.8);
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };
  return (
    <div className="carousel">
      <div className="carousel-track" ref={ref}>{children}</div>
      <div style={{display:"flex",justifyContent:"flex-end",marginTop:18}}>
        <div className="carousel-nav">
          <button onClick={() => scrollBy(-1)} aria-label={t(window.AG_T.prev)}>←</button>
          <button onClick={() => scrollBy(1)} aria-label={t(window.AG_T.next)}>→</button>
        </div>
      </div>
    </div>
  );
};

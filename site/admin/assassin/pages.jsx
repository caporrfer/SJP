/* global React */
const { useState, useEffect, useMemo } = React;

// ============== HOME ==============
window.HomePage = function HomePage({ lang, content, products, reviews, addReview, openProduct }) {
  const t = window.useT(lang);
  const popular = products.filter(p => p.popular).slice(0, 8);
  const heroMeta = window.AG_T.hero_meta[lang];

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="bg"></div>
        <div className="wrap hero-grid">
          <div>
            <div className="meta">
              {heroMeta.map((m,i) => <span key={i}>{i>0 && "// "}{m}</span>)}
            </div>
            <h1>
              <span>{t(content.hero.title1)}.</span>
              <span className="red">{t(content.hero.title2)}.</span>
              <span className="outline">{t(content.hero.title3)}.</span>
            </h1>
            <p className="lead">{t(content.hero.lead)}</p>
            <div className="hero-cta">
              <a className="btn red" href="#catalog">{t(content.hero.cta1)} <span className="arrow">→</span></a>
              <a className="btn on-dark ghost" href="#custom">{t(content.hero.cta2)}</a>
            </div>
          </div>
          <div className="hero-art">
            <div className="frame">
              {content.hero.image
                ? <img src={content.hero.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}} />
                : <div className="placeholder dark">{t({es:"FOTO HERO\n· ENTRENO REAL ·\nAMBIENTE INDUSTRIAL",en:"HERO PHOTO\n· REAL TRAINING ·\nINDUSTRIAL FEEL"})}</div>}
              <span className="label">REC · 04 / 2026</span>
              <span className="corner">▲ AG</span>
            </div>
            <div className="specs">
              <div><div className="k">{t(content.hero.spec1k)}</div><div className="v">{t(content.hero.spec1v)}</div></div>
              <div><div className="k">{t(content.hero.spec2k)}</div><div className="v">{t(content.hero.spec2v)}</div></div>
              <div><div className="k">{t(content.hero.spec3k)}</div><div className="v">{t(content.hero.spec3v)}</div></div>
            </div>
          </div>
        </div>
        {/* ORDER INFO BAR */}
        <div className="order-bar">
          <div className="wrap">
            <div className="inner">
              {content.order.map(o => (
                <div className="cell" key={o.num}>
                  <div className="num">{o.num}</div>
                  <div>
                    <div className="t">{t(o.t)}</div>
                    <div className="d">{t(o.d)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="block">
        <div className="wrap">
          <div className="block-head">
            <div className="ttl">
              <span className="eyebrow">{t(window.AG_T.popular_sub)}</span>
              <h2 className="h-display h-section">{t(window.AG_T.popular)}</h2>
            </div>
            <div className="right">
              <a className="btn ghost" href="#catalog">{t(window.AG_T.view_catalog)} <span className="arrow">→</span></a>
            </div>
          </div>
          <window.Carousel lang={lang}>
            {popular.map(p => <window.ProductCard key={p.id} p={p} lang={lang} onOpen={openProduct} />)}
          </window.Carousel>
        </div>
      </section>

      {/* STORY */}
      <section className="block" style={{background:"var(--bg-2)"}}>
        <div className="wrap">
          <div className="story">
            <div>
              <span className="eyebrow">{t(content.story.eyebrow)}</span>
              <h2 className="h-display h-section" style={{marginTop:14,whiteSpace:"pre-line"}}>{t(content.story.title)}</h2>
              <p className="body-lg" style={{marginTop:24}}>{t(content.story.body)}</p>
              <div className="story-numbers">
                <div><div className="k">{t(content.story.n1k)}</div><div className="v">{content.story.n1v}<small>{content.story.n1u}</small></div></div>
                <div><div className="k">{t(content.story.n2k)}</div><div className="v">{content.story.n2v}</div></div>
                <div><div className="k">{t(content.story.n3k)}</div><div className="v" style={{fontSize:22}}>{t(content.story.n3v)}</div></div>
              </div>
              <div style={{marginTop:30,display:"flex",gap:10,flexWrap:"wrap"}}>
                <a className="btn" href="#contact">{t(window.AG_T.story_cta)} <span className="arrow">→</span></a>
              </div>
            </div>
            <div className="frame">
              {content.story.image
                ? <img src={content.story.image} alt="" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute",inset:0}} />
                : <div className="placeholder">{t({es:"FOTO TALLER\n· FRAGUA / TORNO ·\nTRABAJO EN METAL",en:"WORKSHOP PHOTO\n· FORGE / LATHE ·\nMETAL WORK"})}</div>}
              <div style={{position:"absolute",left:14,top:14,fontFamily:"var(--f-mono)",fontSize:10,letterSpacing:".2em",color:"#7A7062",textTransform:"uppercase"}}>WORKSHOP · 03</div>
              <div style={{position:"absolute",right:14,bottom:14,fontFamily:"var(--f-mono)",fontSize:10,letterSpacing:".2em",color:"var(--red)",textTransform:"uppercase"}}>▲ AG</div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="block reviews-block">
        <div className="wrap">
          <div className="block-head">
            <div className="ttl">
              <span className="eyebrow on-dark">{t(window.AG_T.reviews_sub)}</span>
              <h2 className="h-display h-section" style={{color:"#fff",marginTop:14}}>{t(window.AG_T.reviews)}</h2>
            </div>
            <div className="right" style={{color:"#888",fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:".18em",textTransform:"uppercase"}}>
              {reviews.length} · {t(window.AG_T.reviews_sub)}
            </div>
          </div>
          <div className="reviews-grid">
            {reviews.slice(0,6).map((r,i) => (
              <div className="review" key={i}>
                <div className="stars">
                  {[1,2,3,4,5].map(n => <span key={n} className={n>r.stars?"off":""}>▲</span>)}
                </div>
                <p>“{t(r.text)}”</p>
                <div className="who"><strong>{r.name}</strong><span>{r.loc}</span></div>
              </div>
            ))}
          </div>
          <window.ReviewForm lang={lang} addReview={addReview} />
        </div>
      </section>

      {/* CROSS LINK */}
      <section className="block" style={{paddingTop:0}}>
        <div className="wrap">
          <div className="cross cross-solo">
            <div className="left">
              <span className="eyebrow">{t(content.cross.eyebrow)}</span>
              <h3 style={{whiteSpace:"pre-line"}}>{t(content.cross.title)}</h3>
              <p>{t(content.cross.body)}</p>
              <a className="btn" href={content.cross.url || "#"} target="_blank" rel="noopener">{t(content.cross.cta)} <span className="arrow">→</span></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============== REVIEW FORM ==============
window.ReviewForm = function ReviewForm({ lang, addReview }) {
  const t = window.useT(lang);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  const [toast, setToast] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    addReview({ name: name.trim(), loc: city.trim().toUpperCase() || "—", stars, text: { es: text, en: text } });
    setName(""); setCity(""); setText(""); setStars(5);
    setToast(t(window.AG_T.thanks_review));
  };

  return (
    <>
      <form className="review-form" onSubmit={submit}>
        <h4>▲ {t(window.AG_T.add_review)}</h4>
        <div className="field">
          <label>{t(window.AG_T.name)}</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="—" required />
        </div>
        <div className="field">
          <label>{t(window.AG_T.city)}</label>
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="—" />
        </div>
        <div className="field full">
          <label>{t(window.AG_T.rating)}</label>
          <div className="stars-input">
            {[1,2,3,4,5].map(n => (
              <button key={n} type="button" className={n<=stars?"on":""} onClick={() => setStars(n)} aria-label={"★ "+n}>▲</button>
            ))}
            <span style={{marginLeft:10}}>{stars} / 5</span>
          </div>
        </div>
        <div className="field full">
          <label>{t(window.AG_T.message)}</label>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="—" required />
        </div>
        <div className="full" style={{display:"flex",justifyContent:"flex-end"}}>
          <button className="btn red" type="submit">{t(window.AG_T.send)} <span className="arrow">→</span></button>
        </div>
      </form>
      {toast && <window.Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  );
};

// ============== CATALOG ==============
window.CatalogPage = function CatalogPage({ lang, products, openProduct }) {
  const t = window.useT(lang);
  const [cat, setCat] = useState("all");
  const filtered = useMemo(() => cat === "all" ? products : products.filter(p => p.cat === cat), [products, cat]);

  return (
    <main>
      <section className="cat-head">
        <div className="wrap">
          <span className="eyebrow on-dark">{t({es:"CATÁLOGO COMPLETO",en:"FULL CATALOG"})}</span>
          <h1 style={{marginTop:14}}>{t({es:"TODO EL ACERO,\nUNA SOLA PÁGINA.",en:"EVERY PIECE,\nONE PAGE."})}</h1>
          <div className="meta">
            <span>● {products.length} {t({es:"PIEZAS",en:"PIECES"})}</span>
            <span>{t({es:"FORJADO EN ASTURIAS",en:"FORGED IN ASTURIAS"})}</span>
            <span>{t({es:"GARANTÍA DE POR VIDA",en:"LIFETIME WARRANTY"})}</span>
          </div>
        </div>
      </section>
      <section className="block" style={{paddingTop:36}}>
        <div className="wrap">
          <div className="cat-tabs">
            {window.AG_CATEGORIES.map(c => (
              <button key={c.id} className={cat===c.id?"on":""} onClick={()=>setCat(c.id)}>{t(c.label)}</button>
            ))}
            <span style={{marginLeft:"auto",alignSelf:"center",fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:".18em",color:"var(--mute)",textTransform:"uppercase",padding:"0 18px"}}>
              {filtered.length} {t(window.AG_T.results)}
            </span>
          </div>
          <div className="cat-grid">
            {filtered.map(p => <window.ProductCard key={p.id} p={p} lang={lang} onOpen={openProduct} />)}
          </div>
          {filtered.length === 0 && (
            <div style={{padding:"80px 0",textAlign:"center",color:"var(--mute)",fontFamily:"var(--f-mono)",letterSpacing:".18em",textTransform:"uppercase"}}>
              {t({es:"SIN RESULTADOS",en:"NO RESULTS"})}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

// ============== CUSTOM ==============
window.CustomPage = function CustomPage({ lang, content }) {
  const t = window.useT(lang);
  const [form, setForm] = useState({ name:"", email:"", type:"", qty:"1", budget:"", desc:"" });
  const [toast, setToast] = useState(null);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));
  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("CUSTOM · " + (form.type || "—"));
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nType: ${form.type}\nUnits: ${form.qty}\nBudget: ${form.budget}\n\n${form.desc}`
    );
    window.location.href = `mailto:${content.contact.email}?subject=${subject}&body=${body}`;
    setToast(t(window.AG_T.thanks));
  };
  return (
    <main>
      <section className="custom-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">{t(content.custom.eyebrow)}</span>
          <h1 className="h-display h-hero" style={{marginTop:18,whiteSpace:"pre-line",color:"#fff"}}>{t(content.custom.title)}</h1>
          <p className="lead" style={{color:"#C8C8C8",fontSize:18,maxWidth:"56ch",marginTop:22}}>{t(content.custom.body)}</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="custom-form">
            <div className="lhs">
              <span className="eyebrow">{t({es:"PROCESO",en:"PROCESS"})}</span>
              <h2 className="h-display h-section" style={{marginTop:14}}>{t({es:"CUATRO PASOS.\nSIN VUELTAS.",en:"FOUR STEPS.\nNO LOOPS."})}</h2>
              <ul>
                {content.custom.steps.map(s => (
                  <li key={s.n}>
                    <span className="n">{s.n}</span>
                    <div>
                      <strong>{t(s.t)}</strong>
                      <span>{t(s.d)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <form className="rhs" onSubmit={submit}>
              <div className="fields">
                <div className="field">
                  <label>{t(window.AG_T.name)}</label>
                  <input required value={form.name} onChange={e=>set("name",e.target.value)} placeholder="—" />
                </div>
                <div className="field">
                  <label>{t(window.AG_T.email)}</label>
                  <input required type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="—" />
                </div>
                <div className="field">
                  <label>{t({es:"TIPO DE PIEZA",en:"PIECE TYPE"})}</label>
                  <select value={form.type} onChange={e=>set("type",e.target.value)}>
                    <option value="">—</option>
                    {window.AG_CATEGORIES.filter(c=>c.id!=="all").map(c=> <option key={c.id} value={t(c.label)}>{t(c.label)}</option>)}
                    <option value={lang==="es"?"OTRO":"OTHER"}>{lang==="es"?"OTRO":"OTHER"}</option>
                  </select>
                </div>
                <div className="field">
                  <label>{t(window.AG_T.qty)}</label>
                  <input value={form.qty} onChange={e=>set("qty",e.target.value)} placeholder="1" />
                </div>
                <div className="field full">
                  <label>{t(window.AG_T.budget)}</label>
                  <input value={form.budget} onChange={e=>set("budget",e.target.value)} placeholder="€ —" />
                </div>
                <div className="field full">
                  <label>{t(window.AG_T.describe)}</label>
                  <textarea required value={form.desc} onChange={e=>set("desc",e.target.value)} placeholder="—" rows="6"></textarea>
                </div>
                <div className="full" style={{display:"flex",justifyContent:"flex-end",marginTop:8}}>
                  <button className="btn red" type="submit">{t(window.AG_T.custom_send)} <span className="arrow">→</span></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {toast && <window.Toast msg={toast} onDone={()=>setToast(null)} />}
    </main>
  );
};

// ============== CONTACT ==============
window.ContactPage = function ContactPage({ lang, content }) {
  const t = window.useT(lang);
  return (
    <main>
      <section className="custom-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">{t({es:"DIRECTO. SIN INTERMEDIARIOS.",en:"DIRECT. NO MIDDLEMEN."})}</span>
          <h1 className="h-display h-hero" style={{marginTop:18,color:"#fff"}}>{t(content.contact.title)}</h1>
          <p className="lead" style={{color:"#C8C8C8",fontSize:18,maxWidth:"50ch",marginTop:22}}>{t(content.contact.body)}</p>
        </div>
      </section>
      <section>
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <span className="eyebrow">{t({es:"VÍAS",en:"CHANNELS"})}</span>
              <h2 className="h-display h-section" style={{marginTop:14}}>{t({es:"ELIGE\nCÓMO HABLAR.",en:"PICK\nYOUR CHANNEL."})}</h2>
              <div className="contact-cards">
                <a className="contact-card wsp" href={"https://wa.me/"+content.contact.whatsapp.replace(/\D/g,"")} target="_blank" rel="noopener">
                  <span className="k">{t(window.AG_T.whatsapp)} ▲</span>
                  <span className="v">{content.contact.phone}</span>
                  <span style={{fontFamily:"var(--f-mono)",fontSize:11,color:"#888",letterSpacing:".18em",marginTop:4,textTransform:"uppercase"}}>{t({es:"RESPUESTA EN 24H",en:"REPLY WITHIN 24H"})}</span>
                </a>
                <a className="contact-card" href={"mailto:"+content.contact.email}>
                  <span className="k">{t(window.AG_T.email)}</span>
                  <span className="v">{content.contact.email}</span>
                  <span style={{fontFamily:"var(--f-mono)",fontSize:11,color:"var(--mute)",letterSpacing:".18em",marginTop:4,textTransform:"uppercase"}}>{t({es:"PEDIDOS · CUSTOM",en:"ORDERS · CUSTOM"})}</span>
                </a>
                <div className="contact-card">
                  <span className="k">{t(window.AG_T.workshop)}</span>
                  <span className="v">{t(content.contact.address)}</span>
                  <span style={{fontFamily:"var(--f-mono)",fontSize:11,color:"var(--mute)",letterSpacing:".18em",marginTop:4,textTransform:"uppercase"}}>{t({es:"VISITAS CON CITA",en:"VISITS BY APPOINTMENT"})}</span>
                </div>
                <div className="contact-card">
                  <span className="k">{t(window.AG_T.hours)}</span>
                  <span className="v">{t(content.contact.hours)}</span>
                  <span style={{fontFamily:"var(--f-mono)",fontSize:11,color:"var(--mute)",letterSpacing:".18em",marginTop:4,textTransform:"uppercase"}}>UTC+1</span>
                </div>
              </div>
            </div>
            <div>
              <span className="eyebrow">{t(window.AG_T.social)}</span>
              <h2 className="h-display h-section" style={{marginTop:14,fontSize:"clamp(28px,3.4vw,44px)"}}>{t({es:"VE EL ACERO\nEN ACCIÓN.",en:"SEE THE STEEL\nIN ACTION."})}</h2>
              <div className="socials">
                <a href={"https://instagram.com/"+content.contact.instagram.replace("@","")} target="_blank" rel="noopener">
                  <span>INSTAGRAM · {content.contact.instagram}</span><span className="arrow">↗</span>
                </a>
                <a href={"https://youtube.com/"+content.contact.youtube} target="_blank" rel="noopener">
                  <span>YOUTUBE · {content.contact.youtube}</span><span className="arrow">↗</span>
                </a>
                <a href={"https://tiktok.com/"+content.contact.tiktok} target="_blank" rel="noopener">
                  <span>TIKTOK · {content.contact.tiktok}</span><span className="arrow">↗</span>
                </a>
                <a href={"mailto:"+content.contact.email}>
                  <span>EMAIL · {content.contact.email}</span><span className="arrow">↗</span>
                </a>
              </div>
              <div style={{marginTop:32,padding:24,background:"var(--ink)",color:"#fff"}}>
                <div style={{fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:".2em",color:"#888",textTransform:"uppercase"}}>▲ {t({es:"AVISO",en:"NOTICE"})}</div>
                <p style={{marginTop:10,fontSize:14,lineHeight:1.55,color:"#C8C8C8"}}>{t({es:"Para urgencias, WhatsApp es la vía más rápida. No respondo DMs en redes sociales.",en:"For anything urgent, WhatsApp is fastest. I don't reply to DMs on social media."})}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// ============== LEGAL placeholders ==============
window.LegalPage = function LegalPage({ lang, kind }) {
  const t = window.useT(lang);
  const titles = {
    privacy: window.AG_T.privacy, terms: window.AG_T.terms, cookies: window.AG_T.cookies, shipping: window.AG_T.shipping
  };
  const body = {
    privacy: { es:"Datos tratados conforme al RGPD. Se usan únicamente para procesar tu pedido y responderte. No se ceden a terceros.", en:"Data is handled under GDPR. Used only to process your order and reply. Not shared with third parties." },
    terms: { es:"Pedidos confirmados con 50% de señal. Plazo de fabricación 5–15 días laborales. Devoluciones admitidas 14 días tras recepción.", en:"Orders confirmed with 50% deposit. Lead time 5–15 business days. Returns accepted within 14 days of delivery." },
    cookies: { es:"Esta web no utiliza cookies de seguimiento. Solo almacenamiento local para idioma y preferencias.", en:"This site does not use tracking cookies. Local storage only for language and preferences." },
    shipping: { es:"Envíos a Península e Islas Baleares en 24–72h. UE en 5–7 días laborales. Resto del mundo bajo presupuesto.", en:"Shipping to mainland Spain & Balearic Islands in 24–72h. EU in 5–7 business days. Rest of world on quote." },
  };
  return (
    <main>
      <section className="custom-hero">
        <div className="wrap">
          <span className="eyebrow on-dark">{t(window.AG_T.legal)}</span>
          <h1 className="h-display h-hero" style={{marginTop:18,color:"#fff"}}>{t(titles[kind] || window.AG_T.legal)}</h1>
        </div>
      </section>
      <section className="block">
        <div className="wrap" style={{maxWidth:760}}>
          <p className="body-lg">{t(body[kind] || {es:"—",en:"—"})}</p>
          <a className="btn ghost" href="#home" style={{marginTop:32}}>{t(window.AG_T.back)}</a>
        </div>
      </section>
    </main>
  );
};

/* global React */
const { useState, useEffect } = React;

window.AdminPage = function AdminPage({ lang, content, setContent, products, setProducts, reviews, setReviews }) {
  const t = window.useT(lang);
  const [authed, setAuthed] = window.useLS("ag_admin_auth", false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [toast, setToast] = useState(null);

  // Default password — change anywhere by editing this line.
  const PASS = "forge";

  // ============ LOGIN VIEW ============
  if (!authed) {
    const submit = (e) => {
      e.preventDefault();
      if (pass === PASS) { setAuthed(true); setPass(""); setErr(false); }
      else { setErr(true); }
    };
    return (
      <div className="admin-login-wrap">
        <div className="admin-login">
          <div className="crest">
            <img src="assets/logo.png" alt="" />
            <div>
              <div className="t">ASSASSIN'S GRIP</div>
              <div className="s">▲ COMMAND · CENTER</div>
            </div>
          </div>
          <h2>{t({es:"ACCESO PRIVADO",en:"PRIVATE ACCESS"})}</h2>
          <p className="lead">{t({es:"INTRODUCE LA CLAVE DE FORJADOR PARA EDITAR LA WEB.",en:"ENTER THE FORGEMASTER PASSCODE TO EDIT THE SITE."})}</p>
          <form onSubmit={submit}>
            {err && <div className="err">▲ {t({es:"CLAVE INCORRECTA",en:"WRONG PASSCODE"})}</div>}
            <div className="field">
              <label>{t({es:"CLAVE",en:"PASSCODE"})}</label>
              <input type="password" value={pass} onChange={e=>{setPass(e.target.value);setErr(false)}} autoFocus placeholder="••••••" />
            </div>
            <button className="admin-btn primary" type="submit" style={{padding:"14px 18px"}}>
              {t({es:"ENTRAR EN EL TALLER",en:"ENTER THE WORKSHOP"})} →
            </button>
          </form>
          <div className="footer-note">
            <span>v 1.0 · 2026</span>
            <a className="back-link" href="#home">← {t({es:"VOLVER",en:"BACK"})}</a>
          </div>
        </div>
      </div>
    );
  }

  // ============ AUTHED VIEW ============

  const setPath = (path, value) => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let o = next;
      for (let i=0;i<path.length-1;i++) o = o[path[i]];
      o[path[path.length-1]] = value;
      return next;
    });
  };

  // Bilingual ES/EN input pair
  const Bi = ({ value, onChange, label, area }) => (
    <div className="field">
      <label>{label}</label>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <span className="admin-bi-tag">ES</span>
          {area
            ? <textarea value={value?.es ?? ""} onChange={e=>onChange({...value, es:e.target.value})} placeholder="—" rows="3"></textarea>
            : <input value={value?.es ?? ""} onChange={e=>onChange({...value, es:e.target.value})} placeholder="—" />}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:4}}>
          <span className="admin-bi-tag">EN</span>
          {area
            ? <textarea value={value?.en ?? ""} onChange={e=>onChange({...value, en:e.target.value})} placeholder="—" rows="3"></textarea>
            : <input value={value?.en ?? ""} onChange={e=>onChange({...value, en:e.target.value})} placeholder="—" />}
        </div>
      </div>
    </div>
  );

  const onPickImage = (cb) => (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => cb(String(r.result));
    r.readAsDataURL(f);
  };

  const TABS = [
    { id:"dashboard", n:"01", label:t({es:"PANEL",en:"DASHBOARD"}) },
    { id:"products",  n:"02", label:t({es:"PRODUCTOS",en:"PRODUCTS"}) },
    { id:"reviews",   n:"03", label:t({es:"RESEÑAS",en:"REVIEWS"}) },
    { id:"home",      n:"04", label:t({es:"INICIO",en:"HOME"}) },
    { id:"story",     n:"05", label:t({es:"HISTORIA",en:"STORY"}) },
    { id:"custom",    n:"06", label:t({es:"A MEDIDA",en:"CUSTOM"}) },
    { id:"contact",   n:"07", label:t({es:"CONTACTO",en:"CONTACT"}) },
    { id:"brand",     n:"08", label:t({es:"MARCA",en:"BRAND"}) },
  ];

  return (
    <div className="admin-app">
      {/* TOP BAR */}
      <div className="admin-topbar">
        <div className="inner">
          <div className="lhs">
            <div className="crest"><img src="assets/logo.png" alt="" /></div>
            <div className="ttl">
              <span className="t">ASSASSIN'S GRIP</span>
              <span className="s">▲ COMMAND CENTER · ADMIN</span>
            </div>
          </div>
          <div className="rhs">
            <span className="admin-status"><span className="dot"></span>{t({es:"ACTIVO",en:"ACTIVE"})}</span>
            <a className="admin-btn ghost" href="#home" target="_blank" rel="noopener">↗ {t({es:"VER WEB",en:"VIEW SITE"})}</a>
            <button className="admin-btn danger" onClick={()=>{
              if(confirm(t({es:"¿Cerrar sesión?",en:"Log out?"}))){ setAuthed(false); window.location.hash="home"; }
            }}>{t({es:"SALIR",en:"LOG OUT"})} ×</button>
          </div>
        </div>
      </div>

      {/* SHELL */}
      <div className="admin-shell">
        {/* SIDEBAR */}
        <aside className="admin-side">
          <div className="label">▲ {t({es:"SECCIONES",en:"SECTIONS"})}</div>
          {TABS.map(x => (
            <button key={x.id} className={tab===x.id?"on":""} onClick={()=>setTab(x.id)}>
              <span>{x.label}</span><span className="num">{x.n}</span>
            </button>
          ))}
          <div className="divider"></div>
          <button onClick={()=>{
            if(confirm(t({es:"¿Restablecer todo a los valores por defecto? Se borrarán los cambios.",en:"Reset everything to defaults? Your changes will be lost."}))){
              localStorage.removeItem("ag_content");
              localStorage.removeItem("ag_products");
              localStorage.removeItem("ag_reviews");
              location.reload();
            }
          }}><span style={{color:"#C44"}}>{t({es:"RESET TOTAL",en:"FULL RESET"})}</span><span className="num">×</span></button>
        </aside>

        {/* MAIN */}
        <div className="admin-main">

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <>
              <div className="admin-page-head">
                <div>
                  <span className="eyebrow">▲ DASHBOARD · 01</span>
                  <h2>{t({es:"BIENVENIDO AL TALLER",en:"WELCOME TO THE WORKSHOP"})}</h2>
                  <p className="desc">{t({es:"Desde aquí controlas todos los textos, productos, reseñas y contactos. Los cambios se guardan automáticamente en este navegador.",en:"From here you control every piece of copy, product, review and contact detail. Changes save automatically in this browser."})}</p>
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> {t({es:"RESUMEN",en:"OVERVIEW"})}</span></h3>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:1,background:"#1F1F1F",border:"1px solid #1F1F1F"}}>
                  {[
                    {k:t({es:"PRODUCTOS",en:"PRODUCTS"}), v:products.length},
                    {k:t({es:"POPULARES",en:"POPULAR"}), v:products.filter(p=>p.popular).length},
                    {k:t({es:"CON FOTO",en:"WITH PHOTO"}), v:products.filter(p=>p.image).length},
                    {k:t({es:"RESEÑAS",en:"REVIEWS"}), v:reviews.length},
                    {k:t({es:"IDIOMA WEB",en:"SITE LANG"}), v:lang.toUpperCase()},
                  ].map((s,i)=>(
                    <div key={i} style={{background:"#070707",padding:"22px 18px"}}>
                      <div style={{fontFamily:"var(--f-mono)",fontSize:9,letterSpacing:".22em",color:"#666",textTransform:"uppercase"}}>{s.k}</div>
                      <div style={{fontFamily:"var(--f-display)",fontSize:36,color:"#fff",marginTop:6,letterSpacing:".02em"}}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> {t({es:"ACCIONES RÁPIDAS",en:"QUICK ACTIONS"})}</span></h3>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
                  <button className="admin-btn primary" onClick={()=>setTab("products")}>+ {t({es:"AÑADIR PRODUCTO",en:"ADD PRODUCT"})}</button>
                  <button className="admin-btn" onClick={()=>setTab("home")}>✎ {t({es:"EDITAR HOME",en:"EDIT HOME"})}</button>
                  <button className="admin-btn" onClick={()=>setTab("contact")}>☎ {t({es:"DATOS CONTACTO",en:"CONTACT INFO"})}</button>
                  <button className="admin-btn" onClick={()=>setTab("reviews")}>★ {t({es:"VER RESEÑAS",en:"VIEW REVIEWS"})}</button>
                </div>
              </div>
            </>
          )}

          {/* PRODUCTS */}
          {tab === "products" && (
            <>
              <div className="admin-page-head">
                <div>
                  <span className="eyebrow">▲ PRODUCTOS · 02</span>
                  <h2>{t({es:"CATÁLOGO",en:"CATALOG"})}</h2>
                  <p className="desc">{t({es:"Añade, edita, ordena o elimina piezas. Sube una foto haciendo clic en la imagen.",en:"Add, edit, reorder or delete pieces. Click the image to upload a photo."})}</p>
                </div>
                <button className="admin-btn primary" onClick={()=>{
                  const id = "AG-" + Date.now().toString(36).toUpperCase();
                  setProducts(p => [{
                    id, code: id, cat:"rock", price:"0€", popular:false, video:false,
                    name:{es:"NUEVO PRODUCTO",en:"NEW PRODUCT"},
                    desc:{es:"Descripción de la pieza.",en:"Description of the piece."},
                    specs:{ d:"— MM", w:"— KG", finish:{es:"NEGRO MATE",en:"MATTE BLACK"} },
                    image:null
                  }, ...p]);
                  setToast(t({es:"PRODUCTO AÑADIDO",en:"PRODUCT ADDED"}));
                }}>+ {t({es:"NUEVO PRODUCTO",en:"NEW PRODUCT"})}</button>
              </div>
              <div className="admin-list">
                {products.map((p,i) => (
                  <div key={p.id} className="admin-product">
                    <div className="head">
                      <label className="thumb" htmlFor={"img-"+p.id}>
                        {p.image
                          ? <><img src={p.image} alt="" /><span className="swap">{t({es:"CAMBIAR",en:"SWAP"})}</span></>
                          : <span className="upload-hint">▲<br/>{t({es:"SUBIR FOTO",en:"UPLOAD"})}</span>}
                        <input id={"img-"+p.id} type="file" accept="image/*" style={{display:"none"}} onChange={onPickImage(url=>{
                          setProducts(ps => ps.map(x => x.id===p.id ? {...x, image:url} : x));
                        })} />
                      </label>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,minWidth:0}}>
                        <div className="field"><label>CODE</label><input value={p.code} onChange={e=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,code:e.target.value}:x))} /></div>
                        <div className="field"><label>{t({es:"PRECIO",en:"PRICE"})}</label><input value={p.price} onChange={e=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,price:e.target.value}:x))} /></div>
                        <div className="field"><label>{t({es:"CATEGORÍA",en:"CATEGORY"})}</label>
                          <select value={p.cat} onChange={e=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,cat:e.target.value}:x))}>
                            {window.AG_CATEGORIES.filter(c=>c.id!=="all").map(c=> <option key={c.id} value={c.id}>{c.label.es}</option>)}
                          </select>
                        </div>
                        <div className="field"><label>{t({es:"DIÁMETRO",en:"DIAMETER"})}</label><input value={p.specs.d} onChange={e=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,specs:{...x.specs,d:e.target.value}}:x))} /></div>
                        <div className="field"><label>{t({es:"PESO",en:"WEIGHT"})}</label><input value={p.specs.w} onChange={e=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,specs:{...x.specs,w:e.target.value}}:x))} /></div>
                        <div className="field" style={{flexDirection:"row",gap:14,alignItems:"flex-end",paddingBottom:6}}>
                          <label style={{display:"flex",alignItems:"center",gap:8,color:"#9A9A9A",fontFamily:"var(--f-mono)",fontSize:10,letterSpacing:".18em",textTransform:"uppercase",cursor:"pointer"}}>
                            <input type="checkbox" checked={!!p.popular} onChange={e=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,popular:e.target.checked}:x))} /> {t({es:"POPULAR",en:"POPULAR"})}
                          </label>
                          <label style={{display:"flex",alignItems:"center",gap:8,color:"#9A9A9A",fontFamily:"var(--f-mono)",fontSize:10,letterSpacing:".18em",textTransform:"uppercase",cursor:"pointer"}}>
                            <input type="checkbox" checked={!!p.video} onChange={e=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,video:e.target.checked}:x))} /> {t({es:"VÍDEO",en:"VIDEO"})}
                          </label>
                        </div>
                      </div>
                      <div className="actions">
                        <button className="admin-btn icon ghost" disabled={i===0} onClick={()=>setProducts(ps=>{const a=[...ps];[a[i-1],a[i]]=[a[i],a[i-1]];return a;})}>↑</button>
                        <button className="admin-btn icon ghost" disabled={i===products.length-1} onClick={()=>setProducts(ps=>{const a=[...ps];[a[i+1],a[i]]=[a[i],a[i+1]];return a;})}>↓</button>
                        <button className="admin-btn icon danger" onClick={()=>{
                          if(confirm(t({es:"¿Eliminar pieza?",en:"Delete piece?"}))) setProducts(ps=>ps.filter(x=>x.id!==p.id));
                        }}>×</button>
                      </div>
                    </div>
                    <Bi label={t({es:"NOMBRE",en:"NAME"})} value={p.name} onChange={v=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,name:v}:x))} />
                    <Bi label={t({es:"DESCRIPCIÓN",en:"DESCRIPTION"})} value={p.desc} onChange={v=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,desc:v}:x))} area />
                    <Bi label={t({es:"ACABADO",en:"FINISH"})} value={p.specs.finish} onChange={v=>setProducts(ps=>ps.map(x=>x.id===p.id?{...x,specs:{...x.specs,finish:v}}:x))} />
                  </div>
                ))}
                {products.length === 0 && (
                  <div className="admin-card" style={{textAlign:"center",fontFamily:"var(--f-mono)",fontSize:12,letterSpacing:".18em",color:"#555",textTransform:"uppercase",padding:"40px"}}>
                    {t({es:"SIN PRODUCTOS · AÑADE EL PRIMERO",en:"NO PRODUCTS · ADD THE FIRST"})}
                  </div>
                )}
              </div>
            </>
          )}

          {/* REVIEWS */}
          {tab === "reviews" && (
            <>
              <div className="admin-page-head">
                <div>
                  <span className="eyebrow">▲ RESEÑAS · 03</span>
                  <h2>{t({es:"RESEÑAS DE CLIENTES",en:"CUSTOMER REVIEWS"})}</h2>
                  <p className="desc">{t({es:"Edita o borra reseñas. Las nuevas las añaden los clientes desde la web.",en:"Edit or delete reviews. Customers add new ones from the site."})}</p>
                </div>
                <button className="admin-btn primary" onClick={()=>{
                  setReviews(rs => [{name:"—",loc:"—",stars:5,text:{es:"",en:""}}, ...rs]);
                }}>+ {t({es:"AÑADIR RESEÑA",en:"ADD REVIEW"})}</button>
              </div>
              <div className="admin-list">
                {reviews.map((r,i) => (
                  <div key={i} className="admin-product">
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr auto",gap:10,alignItems:"flex-end"}}>
                      <div className="field"><label>{t({es:"NOMBRE",en:"NAME"})}</label><input value={r.name} onChange={e=>setReviews(rs=>rs.map((x,j)=>j===i?{...x,name:e.target.value}:x))} /></div>
                      <div className="field"><label>{t({es:"CIUDAD",en:"CITY"})}</label><input value={r.loc} onChange={e=>setReviews(rs=>rs.map((x,j)=>j===i?{...x,loc:e.target.value}:x))} /></div>
                      <div className="field"><label>{t({es:"VALORACIÓN",en:"RATING"})}</label>
                        <select value={r.stars} onChange={e=>setReviews(rs=>rs.map((x,j)=>j===i?{...x,stars:Number(e.target.value)}:x))}>
                          {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n} ▲</option>)}
                        </select>
                      </div>
                      <button className="admin-btn icon danger" onClick={()=>{
                        if(confirm(t({es:"¿Eliminar reseña?",en:"Delete review?"}))) setReviews(rs=>rs.filter((_,j)=>j!==i));
                      }}>×</button>
                    </div>
                    <Bi label={t({es:"MENSAJE",en:"MESSAGE"})} value={r.text} onChange={v=>setReviews(rs=>rs.map((x,j)=>j===i?{...x,text:v}:x))} area />
                  </div>
                ))}
                {reviews.length === 0 && (
                  <div className="admin-card" style={{textAlign:"center",fontFamily:"var(--f-mono)",fontSize:12,letterSpacing:".18em",color:"#555",textTransform:"uppercase",padding:"40px"}}>
                    {t({es:"SIN RESEÑAS TODAVÍA",en:"NO REVIEWS YET"})}
                  </div>
                )}
              </div>
            </>
          )}

          {/* HOME */}
          {tab === "home" && (
            <>
              <div className="admin-page-head">
                <div>
                  <span className="eyebrow">▲ HOME · 04</span>
                  <h2>{t({es:"PORTADA",en:"HOMEPAGE"})}</h2>
                  <p className="desc">{t({es:"Hero principal y barra de proceso de pedido.",en:"Main hero and order process bar."})}</p>
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> HERO</span></h3>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <Bi label={t({es:"EYEBROW",en:"EYEBROW"})} value={content.hero.eyebrow} onChange={v=>setPath(["hero","eyebrow"],v)} />
                  <div className="grid3">
                    <Bi label={t({es:"TÍTULO 1",en:"TITLE 1"})} value={content.hero.title1} onChange={v=>setPath(["hero","title1"],v)} />
                    <Bi label={t({es:"TÍTULO 2 (rojo)",en:"TITLE 2 (red)"})} value={content.hero.title2} onChange={v=>setPath(["hero","title2"],v)} />
                    <Bi label={t({es:"TÍTULO 3 (outline)",en:"TITLE 3 (outline)"})} value={content.hero.title3} onChange={v=>setPath(["hero","title3"],v)} />
                  </div>
                  <Bi label={t({es:"SUBTÍTULO",en:"SUBTITLE"})} value={content.hero.lead} onChange={v=>setPath(["hero","lead"],v)} area />
                  <div className="grid2">
                    <Bi label="CTA 1" value={content.hero.cta1} onChange={v=>setPath(["hero","cta1"],v)} />
                    <Bi label="CTA 2" value={content.hero.cta2} onChange={v=>setPath(["hero","cta2"],v)} />
                  </div>
                  <div className="field">
                    <label>{t({es:"IMAGEN HERO",en:"HERO IMAGE"})}</label>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      {content.hero.image && <div style={{width:80,height:80,background:"#0A0A0A",border:"1px solid #1F1F1F",overflow:"hidden"}}><img src={content.hero.image} style={{width:"100%",height:"100%",objectFit:"cover"}} /></div>}
                      <label className="admin-btn" style={{cursor:"pointer"}}><input type="file" accept="image/*" style={{display:"none"}} onChange={onPickImage(url=>setPath(["hero","image"],url))} />▲ {t({es:"SUBIR IMAGEN",en:"UPLOAD IMAGE"})}</label>
                      {content.hero.image && <button className="admin-btn ghost danger" onClick={()=>setPath(["hero","image"],null)}>× {t({es:"QUITAR",en:"REMOVE"})}</button>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> {t({es:"BARRA DE PEDIDO (4 PASOS)",en:"ORDER BAR (4 STEPS)"})}</span></h3>
                <div style={{display:"flex",flexDirection:"column",gap:18}}>
                  {content.order.map((o,idx) => (
                    <div key={idx} style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",gap:14,alignItems:"flex-end",paddingBottom:14,borderBottom:idx<content.order.length-1?"1px solid #1F1F1F":"none"}}>
                      <div className="field"><label>#</label><input value={o.num} onChange={e=>setPath(["order",idx,"num"], e.target.value)} /></div>
                      <Bi label={t({es:"TÍTULO",en:"TITLE"})} value={o.t} onChange={v=>setPath(["order",idx,"t"],v)} />
                      <Bi label={t({es:"DETALLE",en:"DETAIL"})} value={o.d} onChange={v=>setPath(["order",idx,"d"],v)} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* STORY */}
          {tab === "story" && (
            <>
              <div className="admin-page-head">
                <div>
                  <span className="eyebrow">▲ STORY · 05</span>
                  <h2>{t({es:"HISTORIA + ENLACE GIMNASIO",en:"STORY + GYM LINK"})}</h2>
                  <p className="desc">{t({es:"El bloque \"Mi historia\" y el cross-link al proyecto hermano.",en:"The story block and sister-project cross-link."})}</p>
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> {t({es:"BLOQUE HISTORIA",en:"STORY BLOCK"})}</span></h3>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <Bi label={t({es:"EYEBROW",en:"EYEBROW"})} value={content.story.eyebrow} onChange={v=>setPath(["story","eyebrow"],v)} />
                  <Bi label={t({es:"TÍTULO",en:"TITLE"})} value={content.story.title} onChange={v=>setPath(["story","title"],v)} area />
                  <Bi label={t({es:"TEXTO",en:"BODY"})} value={content.story.body} onChange={v=>setPath(["story","body"],v)} area />
                  <div className="grid3">
                    <div className="field"><label>{t({es:"NÚMERO 1",en:"NUMBER 1"})}</label><input value={content.story.n1v} onChange={e=>setPath(["story","n1v"],e.target.value)} /></div>
                    <div className="field"><label>{t({es:"NÚMERO 2",en:"NUMBER 2"})}</label><input value={content.story.n2v} onChange={e=>setPath(["story","n2v"],e.target.value)} /></div>
                    <div className="field"><label>{t({es:"UNIDAD N1",en:"N1 UNIT"})}</label><input value={content.story.n1u} onChange={e=>setPath(["story","n1u"],e.target.value)} /></div>
                  </div>
                  <Bi label={t({es:"TEXTO Nº 3 (garantía)",en:"N3 LABEL (warranty)"})} value={content.story.n3v} onChange={v=>setPath(["story","n3v"],v)} />
                  <div className="field">
                    <label>{t({es:"IMAGEN HISTORIA",en:"STORY IMAGE"})}</label>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      {content.story.image && <div style={{width:80,height:80,background:"#0A0A0A",border:"1px solid #1F1F1F",overflow:"hidden"}}><img src={content.story.image} style={{width:"100%",height:"100%",objectFit:"cover"}} /></div>}
                      <label className="admin-btn" style={{cursor:"pointer"}}><input type="file" accept="image/*" style={{display:"none"}} onChange={onPickImage(url=>setPath(["story","image"],url))} />▲ {t({es:"SUBIR",en:"UPLOAD"})}</label>
                      {content.story.image && <button className="admin-btn ghost danger" onClick={()=>setPath(["story","image"],null)}>× {t({es:"QUITAR",en:"REMOVE"})}</button>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> {t({es:"PROYECTO HERMANO (GIMNASIO)",en:"SISTER PROJECT (GYM)"})}</span></h3>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <Bi label={t({es:"EYEBROW",en:"EYEBROW"})} value={content.cross.eyebrow} onChange={v=>setPath(["cross","eyebrow"],v)} />
                  <Bi label={t({es:"TÍTULO",en:"TITLE"})} value={content.cross.title} onChange={v=>setPath(["cross","title"],v)} area />
                  <Bi label={t({es:"TEXTO",en:"BODY"})} value={content.cross.body} onChange={v=>setPath(["cross","body"],v)} area />
                  <Bi label="CTA" value={content.cross.cta} onChange={v=>setPath(["cross","cta"],v)} />
                  <div className="field"><label>URL</label><input value={content.cross.url || ""} onChange={e=>setPath(["cross","url"],e.target.value)} placeholder="https://..." /></div>
                </div>
              </div>
            </>
          )}

          {/* CUSTOM */}
          {tab === "custom" && (
            <>
              <div className="admin-page-head">
                <div>
                  <span className="eyebrow">▲ CUSTOM · 06</span>
                  <h2>{t({es:"PÁGINA A MEDIDA",en:"CUSTOM PAGE"})}</h2>
                  <p className="desc">{t({es:"Texto e instrucciones de los pasos del proceso a medida.",en:"Copy and process steps for custom orders."})}</p>
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> {t({es:"INTRODUCCIÓN",en:"INTRO"})}</span></h3>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <Bi label={t({es:"EYEBROW",en:"EYEBROW"})} value={content.custom.eyebrow} onChange={v=>setPath(["custom","eyebrow"],v)} />
                  <Bi label={t({es:"TÍTULO",en:"TITLE"})} value={content.custom.title} onChange={v=>setPath(["custom","title"],v)} area />
                  <Bi label={t({es:"TEXTO",en:"BODY"})} value={content.custom.body} onChange={v=>setPath(["custom","body"],v)} area />
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> {t({es:"4 PASOS DEL PROCESO",en:"4 PROCESS STEPS"})}</span></h3>
                <div style={{display:"flex",flexDirection:"column",gap:18}}>
                  {content.custom.steps.map((s,idx) => (
                    <div key={idx} style={{display:"flex",flexDirection:"column",gap:10,padding:14,background:"#070707",border:"1px solid #1F1F1F"}}>
                      <Bi label={`#${s.n} ${t({es:"TÍTULO",en:"TITLE"})}`} value={s.t} onChange={v=>setPath(["custom","steps",idx,"t"],v)} />
                      <Bi label={t({es:"DETALLE",en:"DETAIL"})} value={s.d} onChange={v=>setPath(["custom","steps",idx,"d"],v)} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* CONTACT */}
          {tab === "contact" && (
            <>
              <div className="admin-page-head">
                <div>
                  <span className="eyebrow">▲ CONTACT · 07</span>
                  <h2>{t({es:"DATOS DE CONTACTO",en:"CONTACT DETAILS"})}</h2>
                  <p className="desc">{t({es:"Email, teléfono, WhatsApp y redes sociales mostrados en la web y usados por los botones de compra.",en:"Email, phone, WhatsApp and socials displayed on site and used by buy buttons."})}</p>
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> {t({es:"CANALES",en:"CHANNELS"})}</span></h3>
                <div className="grid2">
                  <div className="field"><label>EMAIL</label><input value={content.contact.email} onChange={e=>setPath(["contact","email"],e.target.value)} /></div>
                  <div className="field"><label>{t({es:"TELÉFONO",en:"PHONE"})}</label><input value={content.contact.phone} onChange={e=>setPath(["contact","phone"],e.target.value)} /></div>
                  <div className="field"><label>WHATSAPP</label><input value={content.contact.whatsapp} onChange={e=>setPath(["contact","whatsapp"],e.target.value)} placeholder="+34..." /></div>
                  <div className="field"><label>INSTAGRAM</label><input value={content.contact.instagram} onChange={e=>setPath(["contact","instagram"],e.target.value)} /></div>
                  <div className="field"><label>YOUTUBE</label><input value={content.contact.youtube} onChange={e=>setPath(["contact","youtube"],e.target.value)} /></div>
                  <div className="field"><label>TIKTOK</label><input value={content.contact.tiktok} onChange={e=>setPath(["contact","tiktok"],e.target.value)} /></div>
                </div>
                <div style={{height:14}}></div>
                <Bi label={t({es:"DIRECCIÓN TALLER",en:"WORKSHOP ADDRESS"})} value={content.contact.address} onChange={v=>setPath(["contact","address"],v)} />
                <div style={{height:14}}></div>
                <Bi label={t({es:"HORARIO",en:"HOURS"})} value={content.contact.hours} onChange={v=>setPath(["contact","hours"],v)} />
                <div style={{height:14}}></div>
                <Bi label={t({es:"INTRO",en:"INTRO"})} value={content.contact.body} onChange={v=>setPath(["contact","body"],v)} area />
                <Bi label={t({es:"TÍTULO",en:"TITLE"})} value={content.contact.title} onChange={v=>setPath(["contact","title"],v)} />
              </div>
            </>
          )}

          {/* BRAND */}
          {tab === "brand" && (
            <>
              <div className="admin-page-head">
                <div>
                  <span className="eyebrow">▲ BRAND · 08</span>
                  <h2>{t({es:"IDENTIDAD",en:"BRAND IDENTITY"})}</h2>
                  <p className="desc">{t({es:"Tagline y datos de marca mostrados en cabecera, pie y banda superior.",en:"Tagline and brand info shown in header, footer and top strip."})}</p>
                </div>
              </div>
              <div className="admin-card">
                <h3><span><span className="ico">▲</span> {t({es:"MARCA",en:"BRAND"})}</span></h3>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <Bi label={t({es:"TAGLINE",en:"TAGLINE"})} value={content.brand.tagline} onChange={v=>setPath(["brand","tagline"],v)} />
                  <Bi label={t({es:"FORJA / UBICACIÓN",en:"FORGE / LOCATION"})} value={content.brand.forge} onChange={v=>setPath(["brand","forge"],v)} />
                  <div className="field" style={{maxWidth:240}}><label>EST.</label><input value={content.brand.estab} onChange={e=>setPath(["brand","estab"],e.target.value)} /></div>
                </div>
              </div>
            </>
          )}

          <div className="admin-foot">
            <span><span className="ok">●</span> {t({es:"GUARDADO AUTOMÁTICO ACTIVO",en:"AUTOSAVE ACTIVE"})}</span>
            <span>ASSASSIN'S GRIP · COMMAND CENTER · v1.0</span>
          </div>
        </div>
      </div>
      {toast && <window.Toast msg={toast} onDone={()=>setToast(null)} />}
    </div>
  );
};

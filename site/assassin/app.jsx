/* global React, ReactDOM */
const { useState, useEffect, useMemo } = React;

function deepMerge(target, source) {
  if (Array.isArray(source)) return source;
  if (typeof source !== "object" || source === null) return source;
  const out = Array.isArray(target) ? [...target] : { ...(target || {}) };
  for (const k of Object.keys(source)) {
    out[k] = deepMerge(out?.[k], source[k]);
  }
  return out;
}

function App() {
  const [lang, setLang] = window.useLang();
  const route = window.useRoute();

  // Persisted content tree (overrides + defaults)
  const [contentOverrides, setContentOverrides] = window.useLS("ag_content", {});
  const content = useMemo(() => deepMerge(window.AG_DEFAULTS, contentOverrides), [contentOverrides]);
  const setContent = (updater) => {
    setContentOverrides(prev => {
      const merged = deepMerge(window.AG_DEFAULTS, prev);
      const next = typeof updater === "function" ? updater(merged) : updater;
      return next;
    });
  };

  const [products, setProducts] = window.useLS("ag_products", window.AG_DEFAULTS.products);
  const [reviews, setReviews] = window.useLS("ag_reviews", window.AG_DEFAULTS.reviews);

  const [openP, setOpenP] = useState(null);

  const addReview = (r) => setReviews(rs => [r, ...rs]);

  // Don't show site chrome on admin route
  const isAdmin = route.name === "admin";

  // Fix body/html for admin: dark bg + lock horizontal scroll on mobile
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isAdmin) {
      body.style.backgroundColor = "#070707";
      html.style.overflowX = "hidden";
      body.style.overflowX = "hidden";
      html.style.position = "relative";
      html.style.width = "100%";
      body.style.position = "relative";
      body.style.width = "100%";
      body.style.overscrollBehaviorX = "none";
    } else {
      body.style.backgroundColor = "";
      html.style.overflowX = "";
      body.style.overflowX = "";
      html.style.position = "";
      html.style.width = "";
      body.style.position = "";
      body.style.width = "";
      body.style.overscrollBehaviorX = "";
    }
  }, [isAdmin]);

  return (
    <>
      {!isAdmin && <window.Header lang={lang} setLang={setLang} route={route} content={content} />}

      {route.name === "home"    && <window.HomePage    lang={lang} content={content} products={products} reviews={reviews} addReview={addReview} openProduct={setOpenP} />}
      {route.name === "catalog" && <window.CatalogPage lang={lang} products={products} openProduct={setOpenP} />}
      {route.name === "custom"  && <window.CustomPage  lang={lang} content={content} />}
      {route.name === "contact" && <window.ContactPage lang={lang} content={content} />}
      {route.name === "legal"   && <window.LegalPage   lang={lang} kind={route.params[0] || "privacy"} />}
      {route.name === "admin"   && <window.AdminPage   lang={lang} content={content} setContent={setContent} products={products} setProducts={setProducts} reviews={reviews} setReviews={setReviews} />}

      {!isAdmin && <window.Footer lang={lang} setLang={setLang} content={content} />}

      {openP && <window.ProductModal p={openP} lang={lang} onClose={() => setOpenP(null)} contact={content.contact} />}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

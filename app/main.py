from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import PlainTextResponse, RedirectResponse
from pydantic import BaseModel
from typing import Optional
import sqlite3, json, os, uuid, shutil
from datetime import datetime, timezone
from pathlib import Path

app = FastAPI()

DB_PATH  = os.environ.get("DB_PATH",  "/data/sjp.db")
SITE_DIR = os.environ.get("SITE_DIR", "/app/site")
SJP_SITE_DIR = f"{SITE_DIR}/sjp"
ADMIN_SITE_DIR = f"{SITE_DIR}/admin"
ASSASSIN_SITE_DIR = f"{SITE_DIR}/assassin"

# ── Initial data ──────────────────────────────────────────────────────────────
INITIAL_PRODUCTS = [
    {"id":"sp-001","code":"SJP-001","kind":"press-banca",     "name":"Press Banca Plano Pro",        "cat":"pecho",      "price":1290,"tag":"BESTSELLER",  "video":1,"description":"Banco olímpico plano reforzado con acero 80x80mm. Capacidad 600kg.","image":""},
    {"id":"sp-002","code":"SJP-002","kind":"press-banca",     "name":"Press Banca Inclinado",         "cat":"pecho",      "price":1350,"tag":None,          "video":1,"description":"Banco inclinado ajustable, ángulo 30°–45°. Acabado premium.","image":""},
    {"id":"sp-003","code":"SJP-003","kind":"generic",         "name":"Máquina Pec Deck",              "cat":"pecho",      "price":1890,"tag":"NUEVO",       "video":0,"description":"Máquina de apertura para pectoral con resistencia radial.","image":""},
    {"id":"sp-004","code":"SJP-004","kind":"row-convergente", "name":"Row Convergente T-Bar",         "cat":"espalda",    "price":2150,"tag":None,          "video":1,"description":"Remo convergente de carga libre. Arco de movimiento natural.","image":""},
    {"id":"sp-005","code":"SJP-005","kind":"row-convergente", "name":"Remo Sentado Palanca",          "cat":"espalda",    "price":1980,"tag":None,          "video":0,"description":"Remo de palancas independientes. Ajuste ergonómico total.","image":""},
    {"id":"sp-006","code":"SJP-006","kind":"generic",         "name":"Jalón Polea Alta",              "cat":"espalda",    "price":2290,"tag":"BESTSELLER",  "video":1,"description":"Polea alta convergente con 8 posiciones de agarre.","image":""},
    {"id":"sp-007","code":"SJP-007","kind":"antebrazo",       "name":"Máquina Antebrazo Pro",         "cat":"antebrazos", "price":890, "tag":"HECHO A MANO","video":1,"description":"Rodillo de muñeca y flexión de antebrazo. Único en el mercado.","image":""},
    {"id":"sp-008","code":"SJP-008","kind":"antebrazo",       "name":"Grip Trainer Heavy",            "cat":"antebrazos", "price":640, "tag":None,          "video":0,"description":"Entrenador de agarre con carga progresiva hasta 140kg.","image":""},
    {"id":"sp-009","code":"SJP-009","kind":"jaula-sentadilla","name":"Jaula Sentadilla Elite",        "cat":"piernas",    "price":3490,"tag":"TOP",         "video":1,"description":"Power rack reforzado con spotter arms y pull-up multi-grip.","image":""},
    {"id":"sp-010","code":"SJP-010","kind":"belt-squat",      "name":"Belt Squat Machine",            "cat":"piernas",    "price":2890,"tag":"NUEVO",       "video":1,"description":"Sentadilla con cinturón. Descarga total de la columna.","image":""},
    {"id":"sp-011","code":"SJP-011","kind":"rack",            "name":"Hack Squat Inverso",            "cat":"piernas",    "price":3190,"tag":None,          "video":0,"description":"Hack squat a 45°, superficie antideslizante, carga máx 500kg.","image":""},
    {"id":"sp-012","code":"SJP-012","kind":"generic",         "name":"Curl Femoral Tumbado",          "cat":"piernas",    "price":2090,"tag":None,          "video":0,"description":"Máquina de isquios con resistencia convergente ajustable.","image":""},
    {"id":"sp-013","code":"SJP-013","kind":"belt-squat",      "name":"Belt Squat Pendular",           "cat":"piernas",    "price":3290,"tag":"NUEVO",       "video":1,"description":"Belt squat de brazo pendular con palanca articulada. Sentadilla profunda sin carga axial. Cinturón de cuero reforzado incluido.","image":"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"},
    {"id":"sp-014","code":"SJP-014","kind":"press-banca",     "name":"Press Convergente Plate",       "cat":"pecho",      "price":2490,"tag":"NUEVO",       "video":1,"description":"Press de pecho convergente de carga libre por discos. Trayectoria de arco natural, agarres neutros y mariposa. Asiento regulable en 5 posiciones.","image":"https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80"},
    {"id":"sp-015","code":"SJP-015","kind":"generic",         "name":"Polea Alta y Baja Regulable",   "cat":"espalda",    "price":600, "tag":"NUEVO",       "video":0,"description":"Estación de polea dual ajustable en 13 alturas. Cable de acero recubierto, poleas de 90mm con rodamientos sellados. Incluye cuerda triceps, mango D y barra recta. Ideal para jalón, face pull, curl y aperturas.","image":"assets/img/cable-pulley.svg"},
    {"id":"sp-016","code":"SJP-016","kind":"jaula-sentadilla","name":"Jaula Potencia Musculación",    "cat":"piernas",    "price":800, "tag":"NUEVO",       "video":0,"description":"Power cage de 4 columnas en acero S275 80×80×4mm. Barra dominadas multi-grip, J-cups de seguridad, spotter arms reforzados y 11 posiciones de altura. Capacidad estructural 800kg.","image":"assets/img/power-cage.svg"},
]

INITIAL_POPULAR = ["sp-001","sp-016","sp-013","sp-014","sp-007","sp-015"]

INITIAL_REVIEWS = [
    {
        "name": "Carlos M.",
        "location": "Sevilla",
        "rating": 5,
        "product": "Jaula Potencia Musculación",
        "comment": "Estructura muy seria, soldaduras limpias y cero holguras. La montamos en un box pequeño y se nota hecha para durar.",
    },
    {
        "name": "Nerea G.",
        "location": "Madrid",
        "rating": 5,
        "product": "Press Banca Plano Pro",
        "comment": "El banco es estable incluso cargando fuerte. La atención fue directa y el acabado llegó mejor de lo esperado.",
    },
    {
        "name": "Álvaro R.",
        "location": "Huelva",
        "rating": 4,
        "product": "Polea Alta y Baja Regulable",
        "comment": "Movimiento suave, buen recorrido y ocupa poco. Me ayudaron a ajustar medidas para mi espacio.",
    },
]

# ── DB helpers ────────────────────────────────────────────────────────────────
def get_conn():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

UPLOADS_DIR = Path("/data/uploads")
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)   # create at import time so StaticFiles mount works

def init_db():
    Path(DB_PATH).parent.mkdir(parents=True, exist_ok=True)
    conn = get_conn()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS products (
            id          TEXT PRIMARY KEY,
            code        TEXT DEFAULT '',
            kind        TEXT DEFAULT 'generic',
            name        TEXT NOT NULL,
            cat         TEXT NOT NULL,
            price       REAL DEFAULT 0,
            tag         TEXT,
            video       INTEGER DEFAULT 0,
            description TEXT DEFAULT '',
            image       TEXT DEFAULT '',
            sort_order  INTEGER DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS popular (
            product_id  TEXT PRIMARY KEY,
            sort_order  INTEGER DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS reviews (
            id          TEXT PRIMARY KEY,
            name        TEXT NOT NULL,
            location    TEXT DEFAULT '',
            rating      INTEGER NOT NULL,
            product     TEXT DEFAULT '',
            comment     TEXT NOT NULL,
            created_at  TEXT NOT NULL,
            sort_order  INTEGER DEFAULT 0
        );
    """)
    count = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]
    if count == 0:
        for i, p in enumerate(INITIAL_PRODUCTS):
            conn.execute(
                "INSERT INTO products VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                (p["id"], p["code"], p["kind"], p["name"], p["cat"],
                 p["price"], p["tag"], p["video"], p["description"], p["image"], i)
            )
        for i, pid in enumerate(INITIAL_POPULAR):
            conn.execute("INSERT OR IGNORE INTO popular VALUES (?,?)", (pid, i))
    review_count = conn.execute("SELECT COUNT(*) FROM reviews").fetchone()[0]
    if review_count == 0:
        now = datetime.now(timezone.utc).isoformat()
        for i, r in enumerate(INITIAL_REVIEWS):
            conn.execute(
                "INSERT INTO reviews VALUES (?,?,?,?,?,?,?,?)",
                (f"rv-seed-{i + 1}", r["name"], r["location"], r["rating"],
                 r["product"], r["comment"], now, i)
            )
    conn.commit()
    conn.close()

# ── Startup ───────────────────────────────────────────────────────────────────
@app.on_event("startup")
def startup():
    init_db()

# ── Data helpers ──────────────────────────────────────────────────────────────
def _read_data():
    conn = get_conn()
    prods = conn.execute(
        "SELECT * FROM products ORDER BY sort_order, rowid"
    ).fetchall()
    pop_rows = conn.execute(
        "SELECT product_id FROM popular ORDER BY sort_order"
    ).fetchall()
    conn.close()

    popular = [r["product_id"] for r in pop_rows]
    products = [
        {
            "id":    p["id"],
            "code":  p["code"],
            "kind":  p["kind"],
            "name":  p["name"],
            "cat":   p["cat"],
            "price": p["price"],
            "tag":   p["tag"],
            "video": bool(p["video"]),
            "desc":  p["description"],
            "image": p["image"] or "",
        }
        for p in prods
    ]

    cat_map = [
        ("pecho",      "Pecho"),
        ("espalda",    "Espalda"),
        ("antebrazos", "Antebrazos"),
        ("piernas",    "Piernas"),
    ]
    categories = [{"id": "all", "label": "Todo", "count": len(products)}] + [
        {"id": cid, "label": lbl, "count": sum(1 for p in products if p["cat"] == cid)}
        for cid, lbl in cat_map
    ]
    return {"products": products, "categories": categories, "popular": popular}

# ── Product endpoints ─────────────────────────────────────────────────────────
@app.get("/api/products")
def api_get_products():
    return _read_data()

class ProductIn(BaseModel):
    id:       str
    code:     str = ""
    kind:     str = "generic"
    name:     str
    cat:      str
    price:    float = 0
    tag:      Optional[str] = None
    video:    bool = False
    desc:     str = ""
    image:    str = ""
    featured: bool = False   # Controls popular list

class AuthIn(BaseModel):
    password: str

@app.post("/api/auth")
def api_auth(auth: AuthIn):
    expected = os.environ.get("ADMIN_PASSWORD", "sjp")
    if auth.password != expected:
        raise HTTPException(status_code=401, detail="Acceso denegado")
    return {"token": "ok"}

@app.post("/api/products")
def api_create_product(p: ProductIn):
    conn = get_conn()
    max_order = conn.execute(
        "SELECT COALESCE(MAX(sort_order),0) FROM products"
    ).fetchone()[0]
    conn.execute(
        "INSERT INTO products VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        (p.id, p.code, p.kind, p.name, p.cat, p.price,
         p.tag or None, int(p.video), p.desc, p.image, max_order + 1)
    )
    _update_popular(conn, p.id, p.featured)
    conn.commit()
    conn.close()
    return {"ok": True}

@app.put("/api/products/{product_id}")
def api_update_product(product_id: str, p: ProductIn):
    conn = get_conn()
    conn.execute(
        """UPDATE products
           SET code=?, kind=?, name=?, cat=?, price=?, tag=?,
               video=?, description=?, image=?
           WHERE id=?""",
        (p.code, p.kind, p.name, p.cat, p.price, p.tag or None,
         int(p.video), p.desc, p.image, product_id)
    )
    _update_popular(conn, product_id, p.featured)
    conn.commit()
    conn.close()
    return {"ok": True}

@app.delete("/api/products/{product_id}")
def api_delete_product(product_id: str):
    conn = get_conn()
    conn.execute("DELETE FROM products WHERE id=?", (product_id,))
    conn.execute("DELETE FROM popular WHERE product_id=?", (product_id,))
    conn.commit()
    conn.close()
    return {"ok": True}

def _update_popular(conn, product_id: str, featured: bool):
    if featured:
        max_ord = conn.execute(
            "SELECT COALESCE(MAX(sort_order),0) FROM popular"
        ).fetchone()[0]
        conn.execute(
            "INSERT OR IGNORE INTO popular VALUES (?,?)",
            (product_id, max_ord + 1)
        )
    else:
        conn.execute("DELETE FROM popular WHERE product_id=?", (product_id,))

# ── Reviews ──────────────────────────────────────────────────────────────────
class ReviewIn(BaseModel):
    name: str
    location: str = ""
    rating: int = 5
    product: str = ""
    comment: str

def _read_reviews():
    conn = get_conn()
    rows = conn.execute(
        "SELECT * FROM reviews ORDER BY sort_order DESC, created_at DESC"
    ).fetchall()
    conn.close()
    return [
        {
            "id": r["id"],
            "name": r["name"],
            "location": r["location"],
            "rating": r["rating"],
            "product": r["product"],
            "comment": r["comment"],
            "createdAt": r["created_at"],
        }
        for r in rows
    ]

@app.get("/api/reviews")
def api_get_reviews():
    return {"reviews": _read_reviews()}

@app.post("/api/reviews")
def api_create_review(review: ReviewIn):
    name = review.name.strip()
    comment = review.comment.strip()
    if not name or not comment:
        raise HTTPException(status_code=400, detail="Nombre y reseña son obligatorios.")
    rating = max(1, min(5, int(review.rating or 5)))
    conn = get_conn()
    max_order = conn.execute(
        "SELECT COALESCE(MAX(sort_order),0) FROM reviews"
    ).fetchone()[0]
    review_id = f"rv-{uuid.uuid4().hex[:12]}"
    created_at = datetime.now(timezone.utc).isoformat()
    conn.execute(
        "INSERT INTO reviews VALUES (?,?,?,?,?,?,?,?)",
        (
            review_id,
            name[:80],
            review.location.strip()[:80],
            rating,
            review.product.strip()[:120],
            comment[:600],
            created_at,
            max_order + 1,
        )
    )
    conn.commit()
    conn.close()
    return {"ok": True, "review": _read_reviews()[0]}

# ── Upload ────────────────────────────────────────────────────────────────────
ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif"}

@app.post("/api/upload")
async def api_upload(file: UploadFile = File(...)):
    ext = Path(file.filename).suffix.lower() if file.filename else ""
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail="Formato no permitido. Usa jpg, png o webp.")
    filename = f"{uuid.uuid4().hex}{ext}"
    dest = UPLOADS_DIR / filename
    with dest.open("wb") as out:
        shutil.copyfileobj(file.file, out)
    return {"url": f"/uploads/{filename}"}

# ── Dynamic data.js ───────────────────────────────────────────────────────────
@app.get("/assets/data.js")
def dynamic_data_js():
    data = _read_data()
    ts = datetime.now(timezone.utc).isoformat()
    js = (
        f"/* SJP catalog — generated {ts} */\n"
        f"window.SJP_PRODUCTS   = {json.dumps(data['products'],    ensure_ascii=False)};\n"
        f"window.SJP_CATEGORIES = {json.dumps(data['categories'],  ensure_ascii=False)};\n"
        f"window.SJP_POPULAR    = {json.dumps(data['popular'],     ensure_ascii=False)};\n"
    )
    return PlainTextResponse(js, media_type="application/javascript; charset=utf-8")

# ── Static files ──────────────────────────────────────────────────────────────
# /assets/data.js handled above; everything else in /assets/ is static.
app.mount("/assets",  StaticFiles(directory=f"{SJP_SITE_DIR}/assets"), name="assets")
# Uploaded product photos
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

@app.get("/admin")
def admin_redirect():
    return RedirectResponse("/admin/")

@app.get("/assassin")
def assassin_redirect():
    return RedirectResponse("/assassin/")

@app.get("/admin/assassin")
def assassin_admin_redirect():
    return RedirectResponse("/admin/assassin/")

app.mount("/admin", StaticFiles(directory=ADMIN_SITE_DIR, html=True), name="admin")
app.mount("/assassin", StaticFiles(directory=ASSASSIN_SITE_DIR, html=True), name="assassin")
# Main SJP public site
app.mount("/", StaticFiles(directory=SJP_SITE_DIR, html=True), name="site")

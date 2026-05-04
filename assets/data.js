/* Product catalog for SJP Strength Generation */
window.SJP_PRODUCTS = [
  { id: 'sp-001', code: 'SJP-001', kind: 'press-banca',       name: 'Press Banca Plano Pro', cat: 'pecho',      price: 1290, tag: 'BESTSELLER', video: true,  desc: 'Banco olímpico plano reforzado con acero 80x80mm. Capacidad 600kg.' },
  { id: 'sp-002', code: 'SJP-002', kind: 'press-banca',       name: 'Press Banca Inclinado',  cat: 'pecho',      price: 1350, tag: null,        video: true,  desc: 'Banco inclinado ajustable, ángulo 30°–45°. Acabado premium.' },
  { id: 'sp-003', code: 'SJP-003', kind: 'generic',           name: 'Máquina Pec Deck',       cat: 'pecho',      price: 1890, tag: 'NUEVO',     video: false, desc: 'Máquina de apertura para pectoral con resistencia radial.' },
  { id: 'sp-004', code: 'SJP-004', kind: 'row-convergente',   name: 'Row Convergente T-Bar',  cat: 'espalda',    price: 2150, tag: null,        video: true,  desc: 'Remo convergente de carga libre. Arco de movimiento natural.' },
  { id: 'sp-005', code: 'SJP-005', kind: 'row-convergente',   name: 'Remo Sentado Palanca',   cat: 'espalda',    price: 1980, tag: null,        video: false, desc: 'Remo de palancas independientes. Ajuste ergonómico total.' },
  { id: 'sp-006', code: 'SJP-006', kind: 'generic',           name: 'Jalón Polea Alta',       cat: 'espalda',    price: 2290, tag: 'BESTSELLER',video: true,  desc: 'Polea alta convergente con 8 posiciones de agarre.' },
  { id: 'sp-007', code: 'SJP-007', kind: 'antebrazo',         name: 'Máquina Antebrazo Pro',  cat: 'antebrazos', price: 890,  tag: 'HECHO A MANO', video: true, desc: 'Rodillo de muñeca y flexión de antebrazo. Único en el mercado.' },
  { id: 'sp-008', code: 'SJP-008', kind: 'antebrazo',         name: 'Grip Trainer Heavy',     cat: 'antebrazos', price: 640,  tag: null,        video: false, desc: 'Entrenador de agarre con carga progresiva hasta 140kg.' },
  { id: 'sp-009', code: 'SJP-009', kind: 'jaula-sentadilla',  name: 'Jaula Sentadilla Elite', cat: 'piernas',    price: 3490, tag: 'TOP',       video: true,  desc: 'Power rack reforzado con spotter arms y pull-up multi-grip.' },
  { id: 'sp-010', code: 'SJP-010', kind: 'belt-squat',        name: 'Belt Squat Machine',     cat: 'piernas',    price: 2890, tag: 'NUEVO',     video: true,  desc: 'Sentadilla con cinturón. Descarga total de la columna.' },
  { id: 'sp-011', code: 'SJP-011', kind: 'rack',              name: 'Hack Squat Inverso',     cat: 'piernas',    price: 3190, tag: null,        video: false, desc: 'Hack squat a 45°, superficie antideslizante, carga máx 500kg.' },
  { id: 'sp-012', code: 'SJP-012', kind: 'generic',           name: 'Curl Femoral Tumbado',   cat: 'piernas',    price: 2090, tag: null,        video: false, desc: 'Máquina de isquios con resistencia convergente ajustable.' },
  { id: 'sp-013', code: 'SJP-013', kind: 'belt-squat',        name: 'Belt Squat Pendular',    cat: 'piernas',    price: 3290, tag: 'NUEVO',     video: true,  desc: 'Belt squat de brazo pendular con palanca articulada. Sentadilla profunda sin carga axial. Cinturón de cuero reforzado incluido.', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80' },
  { id: 'sp-014', code: 'SJP-014', kind: 'press-banca',       name: 'Press Convergente Plate',cat: 'pecho',      price: 2490, tag: 'NUEVO',     video: true,  desc: 'Press de pecho convergente de carga libre por discos. Trayectoria de arco natural, agarres neutros y mariposa. Asiento regulable en 5 posiciones.', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80' },
  { id: 'sp-015', code: 'SJP-015', kind: 'generic',           name: 'Polea Alta y Baja Regulable', cat: 'espalda',  price: 600,  tag: 'NUEVO',     video: false, desc: 'Estación de polea dual ajustable en 13 alturas. Cable de acero recubierto, poleas de 90mm con rodamientos sellados. Incluye cuerda triceps, mango D y barra recta. Ideal para jalón, face pull, curl y aperturas.', image: 'assets/img/cable-pulley.svg' },
  { id: 'sp-016', code: 'SJP-016', kind: 'jaula-sentadilla',  name: 'Jaula Potencia Musculación', cat: 'piernas',     price: 800,  tag: 'NUEVO',     video: false, desc: 'Power cage de 4 columnas en acero S275 80×80×4mm. Barra dominadas multi-grip, J-cups de seguridad, spotter arms reforzados y 11 posiciones de altura. Capacidad estructural 800kg.', image: 'assets/img/power-cage.svg' }
];

window.SJP_CATEGORIES = [
  { id: 'all',        label: 'Todo',        count: 16 },
  { id: 'pecho',      label: 'Pecho',       count: 4 },
  { id: 'espalda',    label: 'Espalda',     count: 4 },
  { id: 'antebrazos', label: 'Antebrazos',  count: 2 },
  { id: 'piernas',    label: 'Piernas',     count: 6 }
];

/* Popular subset (6) */
window.SJP_POPULAR = ['sp-001','sp-016','sp-013','sp-014','sp-007','sp-015'];

/* Apply admin overrides if present (from localStorage) */
(function applyAdminOverrides() {
  try {
    const raw = localStorage.getItem('sjp-admin-products');
    if (!raw) return;
    const data = JSON.parse(raw);
    if (Array.isArray(data.products)) window.SJP_PRODUCTS = data.products;
    if (Array.isArray(data.categories)) window.SJP_CATEGORIES = data.categories;
    if (Array.isArray(data.popular)) window.SJP_POPULAR = data.popular;
  } catch(e) { console.warn('admin overrides invalid', e); }
})();

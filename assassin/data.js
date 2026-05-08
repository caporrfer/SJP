// Default content + i18n for ASSASSIN'S GRIP

window.AG_DEFAULTS = {
  brand: {
    name: "ASSASSIN'S GRIP",
    tagline: { es: "HERRAMIENTAS DE AGARRE HECHAS A MANO", en: "HANDMADE GRIP TOOLS" },
    estab: "EST. 2021",
    forge: { es: "FORJADO EN ASTURIAS", en: "FORGED IN ASTURIAS" },
  },
  hero: {
    eyebrow: { es: "SERIE 04 // ACERO MACIZO", en: "SERIES 04 // SOLID STEEL" },
    title1: { es: "FUERZA", en: "FORCE" },
    title2: { es: "ACERO", en: "STEEL" },
    title3: { es: "AGARRE", en: "GRIP" },
    lead: {
      es: "Material de agarre fabricado pieza a pieza. Acero macizo, soldadura limpia y moleteado profundo. Sin atajos. Sin relleno.",
      en: "Grip equipment forged piece by piece. Solid steel, clean welds and deep knurl. No shortcuts. No filler."
    },
    cta1: { es: "VER CATÁLOGO", en: "VIEW CATALOG" },
    cta2: { es: "PIEZA A MEDIDA", en: "CUSTOM BUILD" },
    spec1k: { es: "ACERO", en: "STEEL" }, spec1v: "S275JR",
    spec2k: { es: "MOLETEADO", en: "KNURL" }, spec2v: "32 MM",
    spec3k: { es: "ACABADO", en: "FINISH" }, spec3v: { es:"NEGRO MATE", en:"MATTE BLACK"},
  },
  order: [
    { num:"01", t:{es:"PEDIDO DIRECTO",en:"DIRECT ORDER"}, d:{es:"WHATSAPP O EMAIL",en:"WHATSAPP OR EMAIL"} },
    { num:"02", t:{es:"FABRICACIÓN",en:"FABRICATION"}, d:{es:"5–15 DÍAS LABORALES",en:"5–15 BUSINESS DAYS"} },
    { num:"03", t:{es:"PAGO",en:"PAYMENT"}, d:{es:"50% AL ENCARGAR",en:"50% AT ORDER"} },
    { num:"04", t:{es:"ENVÍO",en:"SHIPPING"}, d:{es:"PENINSULA + UE",en:"PENINSULA + EU"} },
  ],
  story: {
    eyebrow: { es:"NUESTRA HISTORIA", en:"OUR STORY" },
    title: { es:"FORJADO\nEN EL TALLER.\nNO EN UNA FÁBRICA.", en:"FORGED\nIN THE WORKSHOP.\nNOT IN A FACTORY." },
    body: {
      es:"Empezó con un agarre roto y un torno prestado. Hoy cada pieza sale de mi taller en Asturias, comprobada a mano y firmada. Hago el material que yo mismo uso entrenando: brutal, honesto y construido para durar más que tú.",
      en:"It started with a broken grip and a borrowed lathe. Today every piece leaves my workshop in Asturias, hand-checked and signed. I make the gear I train with myself: brutal, honest and built to outlast you."
    },
    n1k:{es:"PIEZAS FORJADAS",en:"PIECES FORGED"}, n1v:"840", n1u:"+",
    n2k:{es:"AÑOS DE TALLER",en:"YEARS IN SHOP"}, n2v:"05",
    n3k:{es:"GARANTÍA",en:"WARRANTY"}, n3v:{es:"DE POR VIDA",en:"FOR LIFE"},
  },
  cross: {
    eyebrow:{es:"PROYECTO HERMANO",en:"SISTER PROJECT"},
    title:{es:"EQUIPAMIENTO\nDE GIMNASIO",en:"GYM\nEQUIPMENT"},
    body:{
      es:"Racks, barras, plataformas y mobiliario funcional fabricados con la misma exigencia. Línea profesional para boxes y home-gyms.",
      en:"Racks, bars, platforms and functional gear built to the same standard. Professional line for boxes and home gyms."
    },
    cta:{es:"VISITAR WEB",en:"VISIT SITE"}
  },
  custom: {
    eyebrow:{es:"FABRICACIÓN A MEDIDA",en:"CUSTOM FABRICATION"},
    title:{es:"DIME QUÉ\nNECESITAS.\nLO FORJAMOS.",en:"TELL ME WHAT\nYOU NEED.\nWE FORGE IT."},
    body:{
      es:"Si una pieza no existe, la fabrico. Diámetros, longitudes, anclajes y acabados a tu medida. Pequeñas series para boxes, gimnasios y atletas.",
      en:"If the piece doesn't exist, I build it. Diameters, lengths, mounts and finishes to your spec. Small runs for boxes, gyms and athletes."
    },
    steps:[
      { n:"01", t:{es:"BRIEF",en:"BRIEF"}, d:{es:"Cuéntame medidas, uso y materiales preferidos.",en:"Tell me sizes, use and preferred materials."} },
      { n:"02", t:{es:"BOCETO + PRESUPUESTO",en:"SKETCH + QUOTE"}, d:{es:"Te envío plano y precio en 48h.",en:"I send you a drawing and quote within 48h."} },
      { n:"03", t:{es:"FORJA",en:"FORGE"}, d:{es:"Mecanizado, soldadura y acabado en taller.",en:"Machining, welding and finish in workshop."} },
      { n:"04", t:{es:"ENVÍO",en:"SHIPPING"}, d:{es:"Embalaje a prueba de transporte y seguimiento.",en:"Transport-proof packaging and tracking."} },
    ]
  },
  contact: {
    title:{es:"CONTACTO",en:"CONTACT"},
    body:{es:"Pedidos, custom y colaboraciones. Respuesta en 24h.",en:"Orders, custom builds and collaborations. Reply within 24h."},
    email:"forge@assassinsgrip.es",
    phone:"+34 600 000 000",
    whatsapp:"+34600000000",
    instagram:"@assassins.grip",
    youtube:"@assassinsgrip",
    tiktok:"@assassins.grip",
    address:{es:"TALLER · ASTURIAS, ESPAÑA",en:"WORKSHOP · ASTURIAS, SPAIN"},
    hours:{es:"L–V · 09:00 → 19:00",en:"MON–FRI · 09:00 → 19:00"},
  },
  products: [
    { id:"AG-01", code:"AG-001", name:{es:"ROCK 90 BLACKOUT",en:"ROCK 90 BLACKOUT"}, cat:"rock", price:"89€", desc:{es:"Agarre tipo bola Ø90mm. Acero macizo, núcleo pasante. Para muertos y dominadas.",en:"90mm ball grip. Solid steel, through-core. Deadlifts and pull-ups."}, popular:true, video:true, specs:{ d:"90 MM", w:"3.4 KG", finish:{es:"NEGRO MATE",en:"MATTE BLACK"} } },
    { id:"AG-02", code:"AG-002", name:{es:"AXIS 50 KNURL",en:"AXIS 50 KNURL"}, cat:"thick", price:"64€", desc:{es:"Cilindro Ø50mm con moleteado profundo. Convierte cualquier barra en barra gruesa.",en:"50mm cylinder, deep knurl. Turns any bar into a thick bar."}, popular:true, specs:{ d:"50 MM", w:"1.8 KG", finish:{es:"ACERO CRUDO",en:"RAW STEEL"} } },
    { id:"AG-03", code:"AG-003", name:{es:"PINCH 35",en:"PINCH 35"}, cat:"pinch", price:"49€", desc:{es:"Bloque pinch Ø35mm. Trabajo de pulgar y prensa.",en:"35mm pinch block. Thumb and crush work."}, popular:true, video:true, specs:{ d:"35 MM", w:"1.1 KG", finish:{es:"NEGRO MATE",en:"MATTE BLACK"} } },
    { id:"AG-04", code:"AG-004", name:{es:"FORGE HUB",en:"FORGE HUB"}, cat:"hub", price:"55€", desc:{es:"Hub de carga frontal. Para placas con orificio estándar.",en:"Front-load hub. Standard hole plates."}, popular:true, specs:{ d:"50 MM", w:"2.2 KG", finish:{es:"NEGRO MATE",en:"MATTE BLACK"} } },
    { id:"AG-05", code:"AG-005", name:{es:"WRIST ROLLER PRO",en:"WRIST ROLLER PRO"}, cat:"wrist", price:"42€", desc:{es:"Rodillo de muñeca con rodamiento. Cuerda incluida.",en:"Bearing wrist roller. Rope included."}, popular:true, specs:{ d:"40 MM", w:"1.4 KG", finish:{es:"ACERO CRUDO",en:"RAW STEEL"} } },
    { id:"AG-06", code:"AG-006", name:{es:"NORDIC HOOK",en:"NORDIC HOOK"}, cat:"hook", price:"38€", desc:{es:"Gancho de carga para barras y mancuernas. Mosquetón forjado.",en:"Loading hook for bars and dumbbells. Forged carabiner."}, popular:true, video:true, specs:{ d:"—", w:"0.9 KG", finish:{es:"NEGRO MATE",en:"MATTE BLACK"} } },
    { id:"AG-07", code:"AG-007", name:{es:"ROCK 65",en:"ROCK 65"}, cat:"rock", price:"72€", desc:{es:"Versión compacta de ROCK 90. Ø65mm.",en:"Compact ROCK 90 version. 65mm."}, popular:false, specs:{ d:"65 MM", w:"2.4 KG", finish:{es:"NEGRO MATE",en:"MATTE BLACK"} } },
    { id:"AG-08", code:"AG-008", name:{es:"AXIS 60",en:"AXIS 60"}, cat:"thick", price:"79€", desc:{es:"Cilindro Ø60mm. Para los que buscan el límite.",en:"60mm cylinder. For those at the edge."}, popular:false, specs:{ d:"60 MM", w:"2.4 KG", finish:{es:"NEGRO MATE",en:"MATTE BLACK"} } },
    { id:"AG-09", code:"AG-009", name:{es:"DOUBLE PINCH",en:"DOUBLE PINCH"}, cat:"pinch", price:"58€", desc:{es:"Pinch doble. Carga simétrica.",en:"Double pinch. Symmetric loading."}, popular:false, specs:{ d:"35 MM", w:"1.6 KG", finish:{es:"ACERO CRUDO",en:"RAW STEEL"} } },
    { id:"AG-10", code:"AG-010", name:{es:"BAND OF STEEL",en:"BAND OF STEEL"}, cat:"hub", price:"32€", desc:{es:"Anilla de carga forjada. Para bandas y poleas.",en:"Forged load ring. For bands and pulleys."}, popular:false, specs:{ d:"80 MM", w:"0.6 KG", finish:{es:"NEGRO MATE",en:"MATTE BLACK"} } },
  ],
  reviews: [],
};

window.AG_CATEGORIES = [
  { id:"all", label:{es:"TODO",en:"ALL"} },
  { id:"rock", label:{es:"ROCK / BOLA",en:"ROCK / BALL"} },
  { id:"thick", label:{es:"BARRA GRUESA",en:"THICK BAR"} },
  { id:"pinch", label:{es:"PINCH",en:"PINCH"} },
  { id:"hub", label:{es:"HUB / CARGA",en:"HUB / LOAD"} },
  { id:"wrist", label:{es:"MUÑECA",en:"WRIST"} },
  { id:"hook", label:{es:"GANCHO",en:"HOOK"} },
];

window.AG_NAV = [
  { id:"home", label:{es:"INICIO",en:"HOME"} },
  { id:"catalog", label:{es:"CATÁLOGO",en:"CATALOG"} },
  { id:"custom", label:{es:"A MEDIDA",en:"CUSTOM"} },
  { id:"contact", label:{es:"CONTACTO",en:"CONTACT"} },
];

window.AG_T = {
  popular: { es:"PRODUCTOS POPULARES", en:"POPULAR PRODUCTS" },
  popular_sub: { es:"LO QUE MÁS SE FORJA", en:"WHAT GETS FORGED MOST" },
  view_catalog: { es:"VER CATÁLOGO COMPLETO", en:"VIEW FULL CATALOG" },
  reviews: { es:"PALABRA DE TALLER", en:"WORKSHOP WORD" },
  reviews_sub: { es:"RESEÑAS VERIFICADAS", en:"VERIFIED REVIEWS" },
  add_review: { es:"DEJA TU RESEÑA", en:"LEAVE YOUR REVIEW" },
  name: { es:"NOMBRE", en:"NAME" },
  city: { es:"CIUDAD", en:"CITY" },
  rating: { es:"VALORACIÓN", en:"RATING" },
  message: { es:"MENSAJE", en:"MESSAGE" },
  send: { es:"ENVIAR", en:"SUBMIT" },
  product: { es:"PRODUCTO", en:"PRODUCT" },
  buy: { es:"COMPRAR", en:"BUY" },
  request_info: { es:"SOLICITAR INFO", en:"REQUEST INFO" },
  view: { es:"VER PIEZA", en:"VIEW PIECE" },
  back: { es:"VOLVER", en:"BACK" },
  close: { es:"CERRAR", en:"CLOSE" },
  diam: { es:"DIÁMETRO", en:"DIAMETER" },
  weight: { es:"PESO", en:"WEIGHT" },
  finish: { es:"ACABADO", en:"FINISH" },
  stock: { es:"EN STOCK", en:"IN STOCK" },
  contact_us: { es:"CONTÁCTAME", en:"CONTACT ME" },
  email: { es:"EMAIL", en:"EMAIL" },
  phone: { es:"TELÉFONO", en:"PHONE" },
  whatsapp: { es:"WHATSAPP", en:"WHATSAPP" },
  workshop: { es:"TALLER", en:"WORKSHOP" },
  hours: { es:"HORARIO", en:"HOURS" },
  social: { es:"REDES", en:"SOCIAL" },
  language: { es:"IDIOMA", en:"LANGUAGE" },
  navigation: { es:"NAVEGACIÓN", en:"NAVIGATION" },
  legal: { es:"LEGAL", en:"LEGAL" },
  privacy: { es:"PRIVACIDAD", en:"PRIVACY" },
  terms: { es:"CONDICIONES", en:"TERMS" },
  cookies: { es:"COOKIES", en:"COOKIES" },
  shipping: { es:"ENVÍOS", en:"SHIPPING" },
  rights: { es:"TODOS LOS DERECHOS RESERVADOS", en:"ALL RIGHTS RESERVED" },
  thanks: { es:"GRACIAS. RESPONDO EN 24H.", en:"THANKS. I REPLY WITHIN 24H." },
  thanks_review: { es:"RESEÑA PUBLICADA. GRACIAS.", en:"REVIEW POSTED. THANKS." },
  custom_send: { es:"ENVIAR BRIEF", en:"SUBMIT BRIEF" },
  budget: { es:"PRESUPUESTO ORIENTATIVO", en:"BUDGET ESTIMATE" },
  describe: { es:"DESCRIBE LO QUE NECESITAS", en:"DESCRIBE WHAT YOU NEED" },
  qty: { es:"UNIDADES", en:"UNITS" },
  marker: { es:"MATERIAL DE AGARRE · HECHO A MANO", en:"GRIP EQUIPMENT · HANDMADE" },
  story_cta: { es:"PEDIDO DIRECTO", en:"DIRECT ORDER" },
  hero_meta: { es:["FORJADO A MANO","ENVÍO 5-15 DÍAS","GARANTÍA DE POR VIDA"], en:["HAND FORGED","SHIPS 5-15 DAYS","LIFETIME WARRANTY"] },
  prev: { es:"ANTERIOR", en:"PREV" },
  next: { es:"SIGUIENTE", en:"NEXT" },
  filter: { es:"FILTRO", en:"FILTER" },
  results: { es:"RESULTADOS", en:"RESULTS" },
};

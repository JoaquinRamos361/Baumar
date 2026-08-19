/* ==========================================================================
   BAUMAR — Distribuidora Mayorista
   script.js — datos de productos, catálogo dinámico, carrito y WhatsApp
   ========================================================================== */

/* ==========================================================================
   1) CONFIGURACIÓN EDITABLE
   ========================================================================== */

// Número de WhatsApp de la distribuidora (formato internacional, sin espacios ni signos).
// IMPORTANTE: reemplazar por el número real antes de publicar el sitio.
const WHATSAPP_NUMBER = "5491121543013";

// Mensaje inicial del botón "Hacer pedido" del hero / flotante cuando el carrito está vacío.
const WHATSAPP_SALUDO = "Hola BAUMAR, quisiera hacer una consulta sobre sus productos.";

// Usuario/URL de Instagram de la distribuidora.
// IMPORTANTE: reemplazar por el usuario real antes de publicar el sitio.
const INSTAGRAM_URL = "https://instagram.com/baumardistribuidora";

/* ==========================================================================
   2) CATEGORÍAS
   Cada categoría define id, nombre visible, un código de "aisle" (estante de
   depósito) y un ícono. El código es el mismo lenguaje que usa el remito del
   hero: referencia real a cómo se ordena un depósito mayorista.
   ========================================================================== */
const CATEGORIES = [
  { id: "bebidas",   nombre: "Bebidas",           aisle: "A01", icon: "bottle" },
  { id: "gaseosas",  nombre: "Gaseosas",          aisle: "A02", icon: "bottle" },
  { id: "aguas",     nombre: "Aguas",             aisle: "A03", icon: "bottle" },
  { id: "jugos",     nombre: "Jugos",             aisle: "A04", icon: "bottle" },
  { id: "almacen",   nombre: "Almacén",           aisle: "B01", icon: "box" },
  { id: "fideos",    nombre: "Fideos",            aisle: "B02", icon: "box" },
  { id: "arroz",     nombre: "Arroz",             aisle: "B03", icon: "box" },
  { id: "harinas",   nombre: "Harinas",           aisle: "B04", icon: "box" },
  { id: "aceites",   nombre: "Aceites",           aisle: "B05", icon: "bottle" },
  { id: "conservas", nombre: "Conservas",         aisle: "B06", icon: "can" },
  { id: "galletitas",nombre: "Galletitas",        aisle: "C01", icon: "box" },
  { id: "golosinas", nombre: "Golosinas",         aisle: "C02", icon: "candy" },
  { id: "snacks",    nombre: "Snacks",             aisle: "C03", icon: "box" },
  { id: "limpieza",  nombre: "Limpieza",           aisle: "D01", icon: "spray" },
  { id: "higiene",   nombre: "Higiene personal",   aisle: "D02", icon: "spray" },
  { id: "lacteos",   nombre: "Lácteos",             aisle: "E01", icon: "carton" },
  { id: "otros",     nombre: "Otros",               aisle: "F01", icon: "box" },
];

const CATEGORY_ICONS = {
  bottle: '<path d="M10 2h4v4l2 3v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l2-3Z"/><path d="M9 13h6"/>',
  box: '<path d="M3 8 12 4l9 4-9 4-9-4Z"/><path d="M3 8v9l9 4V12"/><path d="M21 8v9l-9 4"/>',
  can: '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M6 9h12"/>',
  candy: '<path d="M9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"/><path d="M4 8l4 2-2 2 2 2-4 2M20 8l-4 2 2 2-2 2 4 2"/>',
  spray: '<path d="M9 4h4v3H9z"/><path d="M8 7h6l1 13a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L8 7Z"/><path d="M14 3h2M15 5h2"/>',
  carton: '<path d="M5 9 12 3l7 6v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9Z"/><path d="M9 13h6"/>',
};

/* ==========================================================================
   3) PRODUCTOS
   Estructura de datos: nombre, marca, categoria, precio, imagen, descripcion,
   presentacion, sku, destacado, etiqueta ("oferta" | "vendido" | "nuevo").
   La ruta de imagen ya está preparada: colocar el archivo real en
   images/productos/<sku>.jpg y la tarjeta lo usará automáticamente; si no
   existe, se muestra un placeholder prolijo.
   ========================================================================== */
const PRODUCTS = [
  // BEBIDAS / GASEOSAS
  p("Coca-Cola", "Coca-Cola", "gaseosas", 2450, "Gaseosa 2,25 L", "coca-cola-225", { destacado: true, etiqueta: "vendido" }),
  p("Coca-Cola Zero", "Coca-Cola", "gaseosas", 2450, "Gaseosa 2,25 L", "coca-cola-zero-225"),
  p("Sprite", "Coca-Cola", "gaseosas", 2300, "Gaseosa 2,25 L", "sprite-225"),
  p("Fanta Naranja", "Coca-Cola", "gaseosas", 2300, "Gaseosa 2,25 L", "fanta-naranja-225"),
  p("Pepsi", "Pepsico", "gaseosas", 2200, "Gaseosa 2,25 L", "pepsi-225", { etiqueta: "oferta" }),
  p("7Up", "Pepsico", "gaseosas", 2150, "Gaseosa 2,25 L", "7up-225"),
  p("Paso de los Toros", "Coca-Cola", "gaseosas", 2100, "Pomelo 2,25 L", "paso-toros-225"),
  p("Agua Mineral con Gas", "Villa del Sur", "aguas", 950, "Botella 2 L", "villa-sur-cg-2l"),
  p("Agua Mineral sin Gas", "Villa del Sur", "aguas", 900, "Botella 2 L", "villa-sur-sg-2l", { destacado: true }),
  p("Agua Saborizada Pomelo", "Levité", "aguas", 1150, "Botella 1,5 L", "levite-pomelo-15"),
  p("Soda", "Villa del Sur", "aguas", 780, "Sifón 2,25 L", "soda-225"),
  p("Jugo de Naranja", "Cepita", "jugos", 1350, "Botella 1 L", "cepita-naranja-1l"),
  p("Jugo Multifruta", "Baggio", "jugos", 1600, "Botella 1,5 L", "baggio-multifruta-15", { etiqueta: "nuevo" }),
  p("Jugo en Polvo Naranja", "Ades", "jugos", 480, "Sobre 500 g", "ades-polvo-naranja"),
  p("Cerveza Rubia", "Quilmes", "bebidas", 1400, "Botella 1 L", "quilmes-1l", { destacado: true }),
  p("Cerveza IPA", "Patagonia", "bebidas", 1650, "Botella 730 ml", "patagonia-ipa-730"),
  p("Vino Tinto Toro", "Toro", "bebidas", 2000, "Tetra Brik 1 L", "toro-tinto-1l", { destacado: true }),
  p("Vino Tinto Huellapampa Malbec", "Huellapampa", "bebidas", 5000, "Botella 750 ml", "huellapampa-malbec-750", { destacado: true, etiqueta: "nuevo" }),
  p("Té Helado Durazno", "Nestea", "bebidas", 1250, "Botella 1,5 L", "nestea-durazno-15"),
  p("Energizante", "Speed", "bebidas", 1100, "Lata 473 ml", "speed-473"),
  p("Yerba Mate", "Playadito", "bebidas", 3800, "Paquete 1 kg", "playadito-1kg", { destacado: true, etiqueta: "vendido" }),
  p("Vino Tinto Uvita", "Uvita", "bebidas", 2267, "Botella 1,125 L — bulto x6", "uvita-tinto-1125", { destacado: true, etiqueta: "oferta" }),
  p("Jugo de Naranja 100% Exprimido", "Baggio", "jugos", 2700, "Tetra Pak 1 L — bulto x12", "baggio-naranja-1l", { destacado: true, etiqueta: "oferta" }),

  // ALMACÉN — fideos / arroz / harinas / aceites / conservas
  p("Fideos Tallarín", "Matarazzo", "fideos", 890, "Paquete 500 g", "matarazzo-tallarin-500"),
  p("Fideos Moñito", "Matarazzo", "fideos", 890, "Paquete 500 g", "matarazzo-monito-500"),
  p("Fideos Mostachol", "Marolio", "fideos", 750, "Paquete 500 g", "marolio-mostachol-500", { etiqueta: "oferta" }),
  p("Fideos Guiseros", "Marolio", "fideos", 750, "Paquete 500 g", "marolio-guiseros-500"),
  p("Arroz Largo Fino", "Gallo Oro", "arroz", 1450, "Paquete 1 kg", "gallo-oro-1kg", { destacado: true }),
  p("Arroz Integral", "Gallo Oro", "arroz", 1650, "Paquete 1 kg", "gallo-integral-1kg"),
  p("Arroz Doble Carolina", "Molinos", "arroz", 1550, "Paquete 1 kg", "molinos-carolina-1kg"),
  p("Harina 0000", "Blancaflor", "harinas", 980, "Paquete 1 kg", "blancaflor-0000-1kg"),
  p("Harina Integral", "Blancaflor", "harinas", 1150, "Paquete 1 kg", "blancaflor-integral-1kg"),
  p("Premezcla para Bizcochuelo", "Exquisita", "harinas", 1400, "Caja 500 g", "exquisita-bizcochuelo-500"),
  p("Aceite de Girasol", "Natura", "aceites", 1900, "Botella 1,5 L", "natura-girasol-15", { destacado: true, etiqueta: "vendido" }),
  p("Aceite de Oliva", "Natura", "aceites", 4200, "Botella 500 ml", "natura-oliva-500"),
  p("Aceite de Maíz", "Cocinero", "aceites", 2050, "Botella 1,5 L", "cocinero-maiz-15"),
  p("Tomate Perita en Lata", "La Campagnola", "conservas", 780, "Lata 400 g", "campagnola-tomate-400"),
  p("Arvejas en Lata", "La Campagnola", "conservas", 650, "Lata 300 g", "campagnola-arvejas-300"),
  p("Atún al Natural", "La Campagnola", "conservas", 1350, "Lata 170 g", "campagnola-atun-170"),
  p("Choclo en Lata", "Marolio", "conservas", 620, "Lata 300 g", "marolio-choclo-300"),
  p("Duraznos en Almíbar", "Marolio", "conservas", 980, "Lata 820 g", "marolio-duraznos-820"),
  p("Puré de Tomate", "La Campagnola", "conservas", 590, "Sachet 520 g", "campagnola-pure-520", { etiqueta: "oferta" }),
  p("Sal Fina", "Celusal", "almacen", 480, "Paquete 500 g", "celusal-fina-500"),
  p("Azúcar Blanca", "Ledesma", "almacen", 950, "Paquete 1 kg", "ledesma-azucar-1kg"),
  p("Yerba con Palo", "Nobleza Gaucha", "almacen", 3600, "Paquete 1 kg", "nobleza-1kg"),
  p("Café Molido", "La Virginia", "almacen", 2900, "Paquete 250 g", "lavirginia-molido-250"),
  p("Mayonesa", "Hellmann's", "almacen", 1550, "Sachet 475 g", "hellmanns-475"),
  p("Kétchup", "Hellmann's", "almacen", 1250, "Sachet 400 g", "hellmanns-ketchup-400"),
  p("Vinagre de Alcohol", "Granja del Sol", "almacen", 520, "Botella 500 ml", "granja-vinagre-500"),
  p("Polenta", "Marolio", "almacen", 680, "Paquete 500 g", "marolio-polenta-500"),

  // GALLETITAS / GOLOSINAS / SNACKS
  p("Galletitas de Agua", "Express", "galletitas", 780, "Paquete 200 g", "express-agua-200"),
  p("Galletitas Dulces Surtidas", "Bagley", "galletitas", 950, "Paquete 300 g", "bagley-surtidas-300", { destacado: true }),
  p("Galletitas Rellenas Chocolate", "Oreo", "galletitas", 1100, "Paquete 118,5 g", "oreo-118"),
  p("Vainillas", "Terrabusi", "galletitas", 890, "Paquete 200 g", "terrabusi-vainillas-200"),
  p("Alfajor de Chocolate", "Havanna", "golosinas", 1250, "Unidad", "havanna-chocolate-un", { etiqueta: "nuevo" }),
  p("Alfajor Triple", "Guaymallén", "golosinas", 950, "Unidad", "guaymallen-triple-un"),
  p("Chocolate con Leche", "Águila", "golosinas", 1400, "Tableta 150 g", "aguila-leche-150"),
  p("Caramelos Masticables", "Mogul", "golosinas", 1600, "Bolsa 800 g", "mogul-mastic-800"),
  p("Chicles Menta", "Beldent", "golosinas", 780, "Blíster 6 un", "beldent-menta-6"),
  p("Papas Fritas Clásicas", "Lays", "snacks", 1350, "Paquete 180 g", "lays-clasicas-180", { destacado: true, etiqueta: "vendido" }),
  p("Palitos Salados", "Pehuamar", "snacks", 890, "Paquete 200 g", "pehuamar-palitos-200"),
  p("Maní Salado", "Prodesa", "snacks", 950, "Paquete 250 g", "prodesa-mani-250"),
  p("Conitos de Queso", "Cheetos", "snacks", 1250, "Paquete 160 g", "cheetos-160"),

  // LIMPIEZA / HIGIENE
  p("Detergente Concentrado", "Magistral", "limpieza", 1450, "Botella 750 ml", "magistral-750"),
  p("Lavandina", "Ayudín", "limpieza", 890, "Botella 1 L", "ayudin-1l", { etiqueta: "oferta" }),
  p("Jabón en Polvo", "Skip", "limpieza", 3200, "Caja 800 g", "skip-800"),
  p("Suavizante para Ropa", "Comfort", "limpieza", 1700, "Botella 900 ml", "comfort-900"),
  p("Limpiador Multiuso", "Ala", "limpieza", 1250, "Botella 750 ml", "ala-multiuso-750"),
  p("Esponja Multiuso", "Scotch-Brite", "limpieza", 620, "Pack x3", "scotchbrite-x3"),
  p("Papel Higiénico", "Elite", "higiene", 2400, "Pack x4", "elite-x4"),
  p("Jabón de Tocador", "Dove", "higiene", 780, "Pack x3", "dove-x3"),
  p("Shampoo", "Sedal", "higiene", 1650, "Botella 650 ml", "sedal-650", { destacado: true }),
  p("Pasta Dental", "Colgate", "higiene", 950, "Pomo 90 g", "colgate-90"),
  p("Desodorante Aerosol", "Rexona", "higiene", 1450, "Aerosol 150 ml", "rexona-150"),
  p("Toallas Femeninas", "Always", "higiene", 1350, "Paquete x16", "always-x16"),

  // LÁCTEOS
  p("Leche Entera", "La Serenísima", "lacteos", 980, "Sachet 1 L", "serenisima-1l", { destacado: true, etiqueta: "vendido" }),
  p("Yogur Bebible", "Ser", "lacteos", 850, "Botella 1 L", "ser-yogur-1l"),
  p("Queso Cremoso", "La Paulina", "lacteos", 3600, "Kg", "paulina-cremoso-kg"),
  p("Manteca", "La Serenísima", "lacteos", 1250, "Pote 200 g", "serenisima-manteca-200"),
  p("Dulce de Leche", "La Serenísima", "lacteos", 1750, "Pote 400 g", "serenisima-ddl-400", { etiqueta: "nuevo" }),

  // OTROS / PACKS MAYORISTAS
  p("Pack Mayorista Gaseosas x6", "Surtido", "otros", 12800, "6 unidades 2,25 L", "pack-gaseosas-x6", { destacado: true, etiqueta: "oferta" }),
  p("Pack Almacén Básico", "Surtido", "otros", 9800, "Combo fideos + arroz + aceite", "pack-almacen-basico", { destacado: true, etiqueta: "oferta" }),
  p("Pack Limpieza Hogar", "Surtido", "otros", 8600, "Combo lavandina + detergente + jabón", "pack-limpieza-hogar"),
];

function p(nombre, marca, categoria, precio, presentacion, sku, extra) {
  extra = extra || {};
  return {
    nombre,
    marca,
    categoria,
    precio,
    presentacion,
    sku,
    imagen: `images/productos/${sku}.jpg`,
    descripcion: `${nombre} — ${presentacion}. Venta mayorista por bulto cerrado.`,
    destacado: !!extra.destacado,
    etiqueta: extra.etiqueta || null, // "oferta" | "vendido" | "nuevo"
  };
}

/* ==========================================================================
   4) ESTADO GLOBAL
   ========================================================================== */
const state = {
  search: "",
  categoria: "todas",
  marca: "todas",
  soloDestacados: false,
  orden: "relevancia",
  cart: {}, // { sku: cantidad }
};

const money = (n) => "$" + n.toLocaleString("es-AR");

/* ==========================================================================
   5) RENDER: CATEGORÍAS
   ========================================================================== */
function renderCategories() {
  const grid = document.getElementById("categoriesGrid");
  const footerList = document.getElementById("footerCategories");
  const filterGroup = document.getElementById("filterCategoria");

  grid.innerHTML = CATEGORIES.map((cat) => {
    const count = PRODUCTS.filter((prod) => prod.categoria === cat.id).length;
    return `
      <button class="category-card reveal" data-cat="${cat.id}">
        <div class="category-card__tag">Pasillo ${cat.aisle}</div>
        <span class="category-card__icon"><svg viewBox="0 0 24 24">${CATEGORY_ICONS[cat.icon]}</svg></span>
        <span class="category-card__name">${cat.nombre}</span>
        <span class="category-card__count">${count} producto${count === 1 ? "" : "s"}</span>
      </button>`;
  }).join("");

  footerList.innerHTML = CATEGORIES.slice(0, 6).map((cat) =>
    `<li><a href="#catalogo" data-cat-link="${cat.id}">${cat.nombre}</a></li>`
  ).join("");

  filterGroup.innerHTML = `<button class="chip chip--active" data-filter-cat="todas">Todas</button>` +
    CATEGORIES.map((cat) => `<button class="chip" data-filter-cat="${cat.id}">${cat.nombre}</button>`).join("");

  grid.querySelectorAll(".category-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.categoria = btn.dataset.cat;
      syncCategoryChips();
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
      renderCatalog();
    });
  });

  footerList.querySelectorAll("[data-cat-link]").forEach((link) => {
    link.addEventListener("click", () => {
      state.categoria = link.dataset.catLink;
      syncCategoryChips();
      renderCatalog();
    });
  });

  filterGroup.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-filter-cat]");
    if (!chip) return;
    state.categoria = chip.dataset.filterCat;
    syncCategoryChips();
    renderCatalog();
  });
}

function syncCategoryChips() {
  document.querySelectorAll("[data-filter-cat]").forEach((chip) => {
    chip.classList.toggle("chip--active", chip.dataset.filterCat === state.categoria);
  });
}

/* ==========================================================================
   6) RENDER: FILTRO DE MARCAS
   ========================================================================== */
function renderBrandFilter() {
  const select = document.getElementById("filterMarca");
  const marcas = [...new Set(PRODUCTS.map((prod) => prod.marca))].sort((a, b) => a.localeCompare(b, "es"));
  select.innerHTML = `<option value="todas">Todas las marcas</option>` +
    marcas.map((m) => `<option value="${m}">${m}</option>`).join("");
}

/* ==========================================================================
   7) TARJETA DE PRODUCTO
   ========================================================================== */
function productCardHTML(prod) {
  const badges = [];
  if (prod.etiqueta === "oferta") badges.push('<span class="badge badge--oferta">Oferta</span>');
  if (prod.etiqueta === "vendido") badges.push('<span class="badge badge--vendido">Más vendido</span>');
  if (prod.etiqueta === "nuevo") badges.push('<span class="badge badge--nuevo">Nuevo</span>');

  const cat = CATEGORIES.find((c) => c.id === prod.categoria);
  const inCartQty = state.cart[prod.sku] || 0;

  return `
    <article class="product-card reveal" data-sku="${prod.sku}">
      <div class="product-card__media">
        <div class="product-card__badges">${badges.join("")}</div>
        <img src="${prod.imagen}" alt="${prod.nombre} — ${prod.presentacion}" loading="lazy"
             onerror="this.replaceWith(buildPlaceholder('${cat ? cat.icon : "box"}'))">
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${cat ? cat.nombre : prod.categoria}</span>
        <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
          <span class="product-card__brand">${prod.marca}</span>
          <span class="product-card__sku">${prod.sku.slice(-6).toUpperCase()}</span>
        </div>
        <h3 class="product-card__name">${prod.nombre}</h3>
        <p class="product-card__pres">${prod.presentacion}</p>
        <div class="product-card__footer">
          <div class="product-card__price"><small>Precio mayorista</small>${money(prod.precio)}</div>
          <button class="add-btn ${inCartQty ? "in-cart" : ""}" data-add="${prod.sku}" aria-label="Agregar ${prod.nombre} al pedido">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
      </div>
    </article>`;
}

// Placeholder visual cuando la imagen real todavía no fue cargada por el usuario.
window.buildPlaceholder = function (iconKey) {
  const wrap = document.createElement("div");
  wrap.className = "product-card__placeholder";
  wrap.innerHTML = `<svg viewBox="0 0 24 24">${CATEGORY_ICONS[iconKey] || CATEGORY_ICONS.box}</svg><span>Foto próximamente</span>`;
  return wrap;
};

/* ==========================================================================
   8) RENDER: DESTACADOS
   ========================================================================== */
function renderFeatured() {
  const track = document.getElementById("featuredTrack");
  const destacados = PRODUCTS.filter((prod) => prod.destacado);
  track.innerHTML = destacados.map(productCardHTML).join("");
}

/* ==========================================================================
   9) RENDER: CATÁLOGO (con filtros, búsqueda y orden)
   ========================================================================== */
function getFilteredProducts() {
  let list = [...PRODUCTS];

  if (state.categoria !== "todas") {
    list = list.filter((prod) => prod.categoria === state.categoria);
  }
  if (state.marca !== "todas") {
    list = list.filter((prod) => prod.marca === state.marca);
  }
  if (state.soloDestacados) {
    list = list.filter((prod) => prod.destacado);
  }
  if (state.search.trim()) {
    const q = state.search.trim().toLowerCase();
    list = list.filter((prod) =>
      prod.nombre.toLowerCase().includes(q) ||
      prod.marca.toLowerCase().includes(q) ||
      prod.categoria.toLowerCase().includes(q) ||
      (CATEGORIES.find((c) => c.id === prod.categoria)?.nombre.toLowerCase().includes(q))
    );
  }

  switch (state.orden) {
    case "destacados":
      list.sort((a, b) => Number(b.destacado) - Number(a.destacado));
      break;
    case "precio-asc":
      list.sort((a, b) => a.precio - b.precio);
      break;
    case "precio-desc":
      list.sort((a, b) => b.precio - a.precio);
      break;
    case "alfabetico":
      list.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
      break;
    default:
      break;
  }

  return list;
}

function renderCatalog() {
  const grid = document.getElementById("catalogGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  const list = getFilteredProducts();

  resultsCount.textContent = `${list.length} producto${list.length === 1 ? "" : "s"} encontrado${list.length === 1 ? "" : "s"}`;

  if (list.length === 0) {
    grid.innerHTML = "";
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
    grid.innerHTML = list.map(productCardHTML).join("");
  }

  observeReveal();
}

/* ==========================================================================
   11) ESTADÍSTICAS DEL HERO
   ========================================================================== */
function renderStats() {
  document.getElementById("statCategorias").textContent = CATEGORIES.length;
  document.getElementById("statProductos").textContent = PRODUCTS.length + "+";
}

/* ==========================================================================
   12) CARRITO
   ========================================================================== */
function addToCart(sku, qty = 1) {
  state.cart[sku] = (state.cart[sku] || 0) + qty;
  updateCartUI();
  showToast(`Agregado: ${PRODUCTS.find((prod) => prod.sku === sku)?.nombre || ""}`);
  bumpCartIcon();
}

function setCartQty(sku, qty) {
  if (qty <= 0) {
    delete state.cart[sku];
  } else {
    state.cart[sku] = qty;
  }
  updateCartUI();
}

function removeFromCart(sku) {
  delete state.cart[sku];
  updateCartUI();
}

function clearCart() {
  state.cart = {};
  updateCartUI();
}

function cartTotal() {
  return Object.entries(state.cart).reduce((sum, [sku, qty]) => {
    const prod = PRODUCTS.find((prd) => prd.sku === sku);
    return sum + (prod ? prod.precio * qty : 0);
  }, 0);
}

function cartCount() {
  return Object.values(state.cart).reduce((a, b) => a + b, 0);
}

function updateCartUI() {
  const count = cartCount();
  document.getElementById("cartCount").textContent = count;

  const cartList = document.getElementById("cartList");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartFooter = document.getElementById("cartFooter");

  const entries = Object.entries(state.cart);

  if (entries.length === 0) {
    cartList.innerHTML = "";
    cartEmpty.style.display = "flex";
    cartFooter.hidden = true;
  } else {
    cartEmpty.style.display = "none";
    cartFooter.hidden = false;

    cartList.innerHTML = entries.map(([sku, qty]) => {
      const prod = PRODUCTS.find((prd) => prd.sku === sku);
      if (!prod) return "";
      const cat = CATEGORIES.find((c) => c.id === prod.categoria);
      return `
        <li class="cart-item" data-sku="${sku}">
          <div class="cart-item__media">
            <img src="${prod.imagen}" alt="" loading="lazy" onerror="this.replaceWith(buildPlaceholder('${cat ? cat.icon : "box"}'))">
          </div>
          <div class="cart-item__info">
            <div class="cart-item__name">${prod.nombre}</div>
            <div class="cart-item__pres">${prod.presentacion}</div>
            <div class="cart-item__qty">
              <button class="qty-btn" data-qty-minus="${sku}" aria-label="Quitar una unidad">−</button>
              <span class="cart-item__qtynum">${qty}</span>
              <button class="qty-btn" data-qty-plus="${sku}" aria-label="Sumar una unidad">+</button>
            </div>
          </div>
          <div class="cart-item__end">
            <span class="cart-item__subtotal">${money(prod.precio * qty)}</span>
            <button class="cart-item__remove" data-remove="${sku}">Eliminar</button>
          </div>
        </li>`;
    }).join("");
  }

  document.getElementById("cartTotal").textContent = money(cartTotal());

  // Sincronizar botones "Agregar" del catálogo (marcar los que ya están en el carrito)
  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.classList.toggle("in-cart", !!state.cart[btn.dataset.add]);
  });
}

function bumpCartIcon() {
  const btn = document.getElementById("cartBtn");
  btn.classList.remove("bump");
  void btn.offsetWidth;
  btn.classList.add("bump");
}

/* ==========================================================================
   13) TOAST
   ========================================================================== */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ==========================================================================
   14) WHATSAPP
   ========================================================================== */
function buildWhatsappLink(customMessage) {
  const message = customMessage || WHATSAPP_SALUDO;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildOrderMessage() {
  const entries = Object.entries(state.cart);
  if (entries.length === 0) return WHATSAPP_SALUDO;

  const lines = entries.map(([sku, qty]) => {
    const prod = PRODUCTS.find((prd) => prd.sku === sku);
    if (!prod) return "";
    return `• ${qty}x ${prod.nombre} (${prod.presentacion}) — ${money(prod.precio * qty)}`;
  });

  return [
    "Hola, quiero realizar el siguiente pedido:",
    "",
    ...lines,
    "",
    `Total: ${money(cartTotal())}`,
  ].join("\n");
}

function sendOrderToWhatsapp() {
  const url = buildWhatsappLink(buildOrderMessage());
  window.open(url, "_blank", "noopener");
}

/* ==========================================================================
   15) CARRITO — apertura / cierre
   ========================================================================== */
function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "false");
  document.getElementById("cartOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartDrawer").setAttribute("aria-hidden", "true");
  document.getElementById("cartOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

/* ==========================================================================
   16) MENÚ MÓVIL
   ========================================================================== */
function openNav() {
  document.getElementById("nav").classList.add("open");
  document.getElementById("hamburgerBtn").setAttribute("aria-expanded", "true");
  document.getElementById("navOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeNav() {
  document.getElementById("nav").classList.remove("open");
  document.getElementById("hamburgerBtn").setAttribute("aria-expanded", "false");
  document.getElementById("navOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

/* ==========================================================================
   17) HEADER STICKY — sombra al hacer scroll
   ========================================================================== */
function handleHeaderScroll() {
  const header = document.getElementById("header");
  header.style.boxShadow = window.scrollY > 8 ? "var(--shadow-sm)" : "none";
}

/* ==========================================================================
   18) SCROLL REVEAL
   ========================================================================== */
let revealObserver = null;
function observeReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => revealObserver.observe(el));
}

/* ==========================================================================
   19) EVENTOS GLOBALES
   ========================================================================== */
function bindEvents() {
  // Buscador (desktop + mobile sincronizados)
  const searchInput = document.getElementById("searchInput");
  const searchInputMobile = document.getElementById("searchInputMobile");
  [searchInput, searchInputMobile].forEach((input) => {
    input.addEventListener("input", (e) => {
      state.search = e.target.value;
      if (input === searchInput) searchInputMobile.value = e.target.value;
      else searchInput.value = e.target.value;
      renderCatalog();
      document.getElementById("catalogo").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Filtro de marca
  document.getElementById("filterMarca").addEventListener("change", (e) => {
    state.marca = e.target.value;
    renderCatalog();
  });

  // Orden
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.orden = e.target.value;
    renderCatalog();
  });

  // Solo destacados
  document.getElementById("filterDestacados").addEventListener("change", (e) => {
    state.soloDestacados = e.target.checked;
    renderCatalog();
  });

  // Limpiar filtros
  document.getElementById("clearFiltersBtn").addEventListener("click", () => {
    state.search = ""; state.categoria = "todas"; state.marca = "todas"; state.soloDestacados = false; state.orden = "relevancia";
    searchInput.value = ""; searchInputMobile.value = "";
    document.getElementById("filterMarca").value = "todas";
    document.getElementById("sortSelect").value = "relevancia";
    document.getElementById("filterDestacados").checked = false;
    syncCategoryChips();
    renderCatalog();
  });

  // Delegación de clicks: agregar al carrito (catálogo + destacados)
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) { addToCart(addBtn.dataset.add, 1); return; }

    const qtyPlus = e.target.closest("[data-qty-plus]");
    if (qtyPlus) { const sku = qtyPlus.dataset.qtyPlus; setCartQty(sku, (state.cart[sku] || 0) + 1); return; }

    const qtyMinus = e.target.closest("[data-qty-minus]");
    if (qtyMinus) { const sku = qtyMinus.dataset.qtyMinus; setCartQty(sku, (state.cart[sku] || 0) - 1); return; }

    const removeBtn = e.target.closest("[data-remove]");
    if (removeBtn) { removeFromCart(removeBtn.dataset.remove); return; }
  });

  // Carrito: abrir / cerrar
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("cartEmptyLink").addEventListener("click", closeCart);
  document.getElementById("cartClearBtn").addEventListener("click", clearCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeNav(); } });

  // Enviar pedido por WhatsApp
  document.getElementById("whatsappBtn").addEventListener("click", sendOrderToWhatsapp);

  // Enlaces de Instagram (flotante + footer)
  [document.getElementById("floatingInstagram"), document.getElementById("footerInstagram")].forEach((el) => {
    if (!el) return;
    el.href = INSTAGRAM_URL;
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Botones de contacto / hero / footer / flotante
  const genericLinks = [
    document.getElementById("heroOrderBtn"),
    document.getElementById("contactWhatsapp"),
    document.getElementById("footerWhatsapp"),
    document.getElementById("floatingWhatsapp"),
  ];
  genericLinks.forEach((el) => {
    el.href = buildWhatsappLink();
    el.target = "_blank";
    el.rel = "noopener";
    el.addEventListener("click", (e) => {
      // Si hay productos en el carrito, el botón de pedido del hero lo usa como pedido real.
      if (el.id === "heroOrderBtn" && cartCount() > 0) {
        e.preventDefault();
        sendOrderToWhatsapp();
      }
    });
  });

  // Menú mobile
  document.getElementById("hamburgerBtn").addEventListener("click", () => {
    const isOpen = document.getElementById("nav").classList.contains("open");
    isOpen ? closeNav() : openNav();
  });
  document.getElementById("navOverlay").addEventListener("click", closeNav);
  document.querySelectorAll(".nav__link").forEach((link) => link.addEventListener("click", closeNav));

  // Scroll header
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
}

/* ==========================================================================
   20) INIT
   ========================================================================== */
function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderCategories();
  renderBrandFilter();
  renderStats();
  renderFeatured();
  renderCatalog();
  updateCartUI();
  bindEvents();
  observeReveal();
}

document.addEventListener("DOMContentLoaded", init);

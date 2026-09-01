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
  { id: "bebidas-sin-alcohol", nombre: "Bebidas sin alcohol",   aisle: "A01", icon: "bottle" },
  { id: "cervezas",            nombre: "Cervezas",              aisle: "A02", icon: "bottle" },
  { id: "vinos-espumantes",    nombre: "Vinos y espumantes",    aisle: "A03", icon: "bottle" },
  { id: "bebidas-alcohol",     nombre: "Bebidas con alcohol",   aisle: "A04", icon: "bottle" },
  { id: "galletitas",          nombre: "Galletitas",            aisle: "B01", icon: "box" },
  { id: "arroz",               nombre: "Arroz",                 aisle: "B02", icon: "box" },
  { id: "fideos",              nombre: "Fideos",                aisle: "B03", icon: "box" },
  { id: "condimentos",         nombre: "Condimentos Centurión", aisle: "B04", icon: "can" },
  { id: "almacen",             nombre: "Productos de almacén",  aisle: "B05", icon: "box" },
  { id: "papeles",             nombre: "Papeles",               aisle: "C01", icon: "carton" },
  { id: "limpieza",            nombre: "Artículos de limpieza", aisle: "C02", icon: "spray" },
  { id: "perfumeria",          nombre: "Perfumería",            aisle: "C03", icon: "spray" },
  { id: "chocolates",          nombre: "Chocolates Felfort",    aisle: "D01", icon: "candy" },
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
   Estructura de datos: nombre, marca, categoria, precioBulto, precioUnidad,
   unidBulto, presentacion, sku, destacado, etiqueta ("oferta" | "vendido" | "nuevo").
   La ruta de imagen ya está preparada: colocar el archivo real en
   images/productos/<sku>.jpg y la tarjeta lo usará automáticamente; si no
   existe, se muestra un placeholder prolijo.
   El precio GRANDE que se muestra en la tarjeta es el precio POR BULTO
   (unidad de venta mayorista); el precio CHICO es el precio por unidad
   individual, informativo.

   >>> Lista de precios actualizada el 29/08/2026 a partir de
       ARTICULOS_y_PRECIOS.xlsx. Ver notas de migración al final del archivo
       si hace falta revisar qué productos se dieron de baja o se agregaron. <<<
   ========================================================================== */
const PRODUCTS = [
  p("Vino Tinto Toro", "Toro", "vinos-espumantes", 20910, 1742.50, 12, "Tetra Brik 1 L", "toro-tinto-1l", { destacado: true }),
  p("Vino Tinto Huellapampa Malbec", "Huellapampa", "vinos-espumantes", 15600, 2600, 6, "Botella 750 ml", "huellapampa-malbec-750", { destacado: true, etiqueta: "nuevo" }),
  p("Vino Tinto Uvita", "Uvita", "vinos-espumantes", 13600, 2266.67, 6, "Botella 1,125 L", "uvita-tinto-1125", { destacado: true, etiqueta: "oferta" }),
  p("Jugo de Naranja 100% Exprimido", "Baggio", "bebidas-sin-alcohol", 32400, 2700, 12, "Tetra Pak 1 L", "baggio-naranja-1l", { destacado: true, etiqueta: "oferta" }),
  p("Agua de mesa FRESH x 600CC", "Fresh", "bebidas-sin-alcohol", 3100, 516.67, 6, "Agua de mesa FRESH x 600CC — bulto x6", "agua-de-mesa-fresh-x-600cc", {}),
  p("Agua de mesa FRESH x 1.5L", "Fresh", "bebidas-sin-alcohol", 4500, 750, 6, "Agua de mesa FRESH x 1.5L — bulto x6", "agua-de-mesa-fresh-x-1-5l", {}),
  p("Agua de mesa FRESH x 6.5L", "Fresh", "bebidas-sin-alcohol", 3910, 1955, 2, "Agua de mesa FRESH x 6.5L — bulto x2", "agua-de-mesa-fresh-x-6-5l", {}),
  p("Agua VIDA By BAGGIO x 1.5L", "Vida", "bebidas-sin-alcohol", 5000, 833.33, 6, "Agua VIDA By BAGGIO x 1.5L — bulto x6", "agua-vida-by-baggio-x-1-5l", {}),
  p("BAGGIO PRONTO x 1,5 Lts Multifruta", "Baggio", "bebidas-sin-alcohol", 15970, 1996.25, 8, "BAGGIO PRONTO x 1,5 Lts Multifruta — bulto x8", "baggio-pronto-x-1-5-lts-multifruta", {}),
  p("BAGGIO PRONTO x 1,5 Lts Naranja", "Baggio", "bebidas-sin-alcohol", 15970, 1996.25, 8, "BAGGIO PRONTO x 1,5 Lts Naranja — bulto x8", "baggio-pronto-x-1-5-lts-naranja", {}),
  p("BAGGIO PRONTO x 1Lts Naranja", "Baggio", "bebidas-sin-alcohol", 12500, 1562.50, 8, "BAGGIO PRONTO x 1Lts Naranja — bulto x8", "baggio-pronto-x-1lts-naranja", {}),
  p("BAGGIO PRONTO x 1Lts Mixfrutal", "Baggio", "bebidas-sin-alcohol", 12500, 1562.50, 8, "BAGGIO PRONTO x 1Lts Mixfrutal — bulto x8", "baggio-pronto-x-1lts-mixfrutal", {}),
  p("BAGGIO PRONTO x 200cc Manzana", "Baggio", "bebidas-sin-alcohol", 8300, 461.11, 18, "BAGGIO PRONTO x 200cc Manzana — bulto x18", "baggio-pronto-x-200cc-manzana", {}),
  p("BAGGIO PRONTO x 200cc Mixfrutal", "Baggio", "bebidas-sin-alcohol", 8300, 461.11, 18, "BAGGIO PRONTO x 200cc Mixfrutal — bulto x18", "baggio-pronto-x-200cc-mixfrutal", {}),
  p("BAGGIO PRONTO x 200cc Naranja", "Baggio", "bebidas-sin-alcohol", 8300, 461.11, 18, "BAGGIO PRONTO x 200cc Naranja — bulto x18", "baggio-pronto-x-200cc-naranja", {}),
  p("BAGGIO PRONTO x 200cc Pera", "Baggio", "bebidas-sin-alcohol", 8300, 461.11, 18, "BAGGIO PRONTO x 200cc Pera — bulto x18", "baggio-pronto-x-200cc-pera", {}),
  p("BAGGIO PRONTO x 200cc Durazno", "Baggio", "bebidas-sin-alcohol", 8300, 461.11, 18, "BAGGIO PRONTO x 200cc Durazno — bulto x18", "baggio-pronto-x-200cc-durazno", {}),
  p("BAGGIO FRESH LIVIANO Naranja x 200cc", "Baggio", "bebidas-sin-alcohol", 8300, 461.11, 18, "BAGGIO FRESH LIVIANO Naranja x 200cc — bulto x18", "baggio-fresh-liviano-naranja-x-200cc", {}),
  p("BAGGIO FRESH GASEOSA x 2.25Lts Cola", "Baggio", "bebidas-sin-alcohol", 8100, 1350, 6, "BAGGIO FRESH GASEOSA x 2.25Lts Cola — bulto x6", "baggio-fresh-gaseosa-x-2-25lts-cola", {}),
  p("BAGGIO FRESH GASEOSA x 2.25Lts Lima", "Baggio", "bebidas-sin-alcohol", 8100, 1350, 6, "BAGGIO FRESH GASEOSA x 2.25Lts Lima — bulto x6", "baggio-fresh-gaseosa-x-2-25lts-lima", {}),
  p("BAGGIO FRESH GASEOSA x 2.25Lts Naranja", "Baggio", "bebidas-sin-alcohol", 8100, 1350, 6, "BAGGIO FRESH GASEOSA x 2.25Lts Naranja — bulto x6", "baggio-fresh-gaseosa-x-2-25lts-naranja", {}),
  p("BAGGIO FRESH GASEOSA x 2.25Lts Pomelo", "Baggio", "bebidas-sin-alcohol", 8100, 1350, 6, "BAGGIO FRESH GASEOSA x 2.25Lts Pomelo — bulto x6", "baggio-fresh-gaseosa-x-2-25lts-pomelo", {}),
  p("BAGGIO FRESH GASEOSA x 2.25Lts Citrus", "Baggio", "bebidas-sin-alcohol", 8100, 1350, 6, "BAGGIO FRESH GASEOSA x 2.25Lts Citrus — bulto x6", "baggio-fresh-gaseosa-x-2-25lts-citrus", {}),
  p("BAGGIO LATTE Leche entera x 200cc", "Baggio", "bebidas-sin-alcohol", 6780, 376.67, 18, "BAGGIO LATTE Leche entera x 200cc — bulto x18", "baggio-latte-leche-entera-x-200cc", {}),
  p("BAGGIO LATTE Leche entera x 1Lts", "Baggio", "bebidas-sin-alcohol", 12990, 1623.75, 8, "BAGGIO LATTE Leche entera x 1Lts — bulto x8", "baggio-latte-leche-entera-x-1lts", {}),
  p("BAGGIO LATTE Leche Chocolatada x 200cc", "Baggio", "bebidas-sin-alcohol", 6000, 333.33, 18, "BAGGIO LATTE Leche Chocolatada x 200cc — bulto x18", "baggio-latte-leche-chocolatada-x-200cc", {}),
  p("BAGGIO FORZA 500cc", "Baggio", "bebidas-sin-alcohol", 6200, 1033.33, 6, "BAGGIO FORZA 500cc — bulto x6", "baggio-forza-500cc", {}),
  p("Coca Cola x 2.25Lts", "Coca", "bebidas-sin-alcohol", 27480, 4580, 6, "Coca Cola x 2.25Lts — bulto x6", "coca-cola-x-2-25lts", {}),
  p("Fanta x 2.25Lts", "Coca", "bebidas-sin-alcohol", 27480, 4580, 6, "Fanta x 2.25Lts — bulto x6", "fanta-x-2-25lts", {}),
  p("Sprite x 2.25Lts", "Coca", "bebidas-sin-alcohol", 27480, 4580, 6, "Sprite x 2.25Lts — bulto x6", "sprite-x-2-25lts", {}),
  p("Coca Cero x 2.25Lts", "Coca", "bebidas-sin-alcohol", 27480, 4580, 6, "Coca Light/Cero x 2.25Lts — bulto x6", "coca-light-cero-x-2-25lts", {}),
  p("Coca Cola x 1.5Lts", "Coca", "bebidas-sin-alcohol", 29690, 3711.25, 8, "Coca Cola x 1.5Lts — bulto x8", "coca-cola-x-1-5lts", {}),
  p("Fanta x 1.5Lts", "Coca", "bebidas-sin-alcohol", 29690, 3711.25, 8, "Fanta x 1.5Lts — bulto x8", "fanta-x-1-5lts", {}),
  p("Sprite x 1.5Lts", "Coca", "bebidas-sin-alcohol", 29690, 3711.25, 8, "Sprite x 1.5Lts — bulto x8", "sprite-x-1-5lts", {}),
  p("Coca Cero x 1.5Lts", "Coca", "bebidas-sin-alcohol", 29690, 3711.25, 8, "Coca Light/Cero x 1.5Lts — bulto x8", "coca-light-cero-x-1-5lts", {}),
  p("Coca Cola x 500CC", "Coca", "bebidas-sin-alcohol", 23240, 1936.67, 12, "Coca Cola x 500CC — bulto x12", "coca-cola-x-500cc", {}),
  p("Fanta x 500CC", "Coca", "bebidas-sin-alcohol", 23240, 1936.67, 12, "Fanta x 500CC — bulto x12", "fanta-x-500cc", {}),
  p("Sprite x 500CC", "Coca", "bebidas-sin-alcohol", 23240, 1936.67, 12, "Sprite x 500CC — bulto x12", "sprite-x-500cc", {}),
  p("Coca Cero x 500CC", "Coca", "bebidas-sin-alcohol", 23240, 1936.67, 12, "Coca Light/Cero x 500CC — bulto x12", "coca-light-cero-x-500cc", {}),
  p("CUNNINGTON x 2.25Lts Cola", "Cunnington", "bebidas-sin-alcohol", 10050, 1675, 6, "CUNNINGTON x 2.25Lts Cola — bulto x6", "cunnington-x-2-25lts-cola", {}),
  p("CUNNINGTON x 2.25Lts Lima", "Cunnington", "bebidas-sin-alcohol", 10050, 1675, 6, "CUNNINGTON x 2.25Lts Lima — bulto x6", "cunnington-x-2-25lts-lima", {}),
  p("CUNNINGTON x 2.25Lts Naranja", "Cunnington", "bebidas-sin-alcohol", 10050, 1675, 6, "CUNNINGTON x 2.25Lts Naranja — bulto x6", "cunnington-x-2-25lts-naranja", {}),
  p("CUNNINGTON x 2.25Lts Pomelo", "Cunnington", "bebidas-sin-alcohol", 10050, 1675, 6, "CUNNINGTON x 2.25Lts Pomelo — bulto x6", "cunnington-x-2-25lts-pomelo", {}),
  p("CUNNINGTON x 2.25Lts Lights", "Cunnington", "bebidas-sin-alcohol", 10050, 1675, 6, "CUNNINGTON x 2.25Lts Lights — bulto x6", "cunnington-x-2-25lts-lights", {}),
  p("FRESH x 1.5Lts Limone", "Fresh", "bebidas-sin-alcohol", 6870, 1145, 6, "FRESH x 1.5Lts Limone — bulto x6", "fresh-x-1-5lts-limone", {}),
  p("FRESH x 1.5Lts Manzana", "Fresh", "bebidas-sin-alcohol", 6870, 1145, 6, "FRESH x 1.5Lts Manzana — bulto x6", "fresh-x-1-5lts-manzana", {}),
  p("FRESH x 1.5Lts Multi", "Fresh", "bebidas-sin-alcohol", 6870, 1145, 6, "FRESH x 1.5Lts Multi — bulto x6", "fresh-x-1-5lts-multi", {}),
  p("FRESH x 1.5Lts Naranja", "Fresh", "bebidas-sin-alcohol", 6870, 1145, 6, "FRESH x 1.5Lts Naranja — bulto x6", "fresh-x-1-5lts-naranja", {}),
  p("FRESH x 1.5Lts Pera", "Fresh", "bebidas-sin-alcohol", 6870, 1145, 6, "FRESH x 1.5Lts Pera — bulto x6", "fresh-x-1-5lts-pera", {}),
  p("FRESH x 1.5Lts Pomelo", "Fresh", "bebidas-sin-alcohol", 6870, 1145, 6, "FRESH x 1.5Lts Pomelo — bulto x6", "fresh-x-1-5lts-pomelo", {}),
  p("FRESH x 600cc Naranja", "Fresh", "bebidas-sin-alcohol", 4780, 796.67, 6, "FRESH x 600cc Naranja — bulto x6", "fresh-x-600cc-naranja", {}),
  p("FRESH x 600cc Pomelo", "Fresh", "bebidas-sin-alcohol", 4780, 796.67, 6, "FRESH x 600cc Pomelo — bulto x6", "fresh-x-600cc-pomelo", {}),
  p("FRESH x 600cc Manzana", "Fresh", "bebidas-sin-alcohol", 4780, 796.67, 6, "FRESH x 600cc Manzana — bulto x6", "fresh-x-600cc-manzana", {}),
  p("FRESH x 600cc Cero", "Fresh", "bebidas-sin-alcohol", 4780, 796.67, 6, "FRESH x 600cc Cero — bulto x6", "fresh-x-600cc-cero", {}),
  p("POWERADE x 500cc", "Powerade", "bebidas-sin-alcohol", 10880, 1813, 6, "POWERADE x 500cc — bulto x6", "powerade-x-500cc", {}),
  p("POWERADE x 995cc", "Powerade", "bebidas-sin-alcohol", 18560, 3093, 6, "POWERADE x 995cc — bulto x6", "powerade-x-995cc", {}),
  p("Prep. MOCORETA (NARANJA) 1,5Lts", "Mocoreta", "bebidas-sin-alcohol", 8700, 1450, 6, "Prep. MOCORETA (NARANJA) 1,5Lts — bulto x6", "prep-mocoreta-naranja-1-5lts", {}),
  p("SPEED x 250cc", "Speed", "bebidas-sin-alcohol", 32540, 1355.83, 24, "SPEED x 250cc — bulto x24", "speed-x-250cc", {}),
  p("SPEED XL 473cc", "Speed", "bebidas-sin-alcohol", 26870, 2239.17, 12, "SPEED XL 473cc — bulto x12", "speed-xl-473cc", {}),
  p("Soda FRESH 2.5Lts", "Fresh", "bebidas-sin-alcohol", 4530, 755, 6, "Soda FRESH 2.5Lts — bulto x6", "soda-fresh-2-5lts", {}),
  p("VIDA by BAGGIO Saborizada 1.5Lts", "Vida", "bebidas-sin-alcohol", 5000, 833, 6, "VIDA by BAGGIO Saborizada 1.5Lts — bulto x6", "vida-by-baggio-saborizada-1-5lts", {}),
  p("VIDA by BAGGIO Saborizada 600cc", "Vida", "bebidas-sin-alcohol", 3670, 611.67, 6, "VIDA by BAGGIO Saborizada 600cc — bulto x6", "vida-by-baggio-saborizada-600cc", {}),
  p("BRAHMA 1Lts", "Brahma", "cervezas", 36500, 3041.67, 12, "BRAHMA 1Lts — bulto x12", "brahma-1lts", {}),
  p("ISENBECK Lata 473", "Isenbeck", "cervezas", 37500, 1562.50, 24, "ISENBECK Lata 473 — bulto x24", "isenbeck-lata-473", {}),
  p("AMSTEL Lata 473", "Amstel", "cervezas", 36000, 1500, 24, "AMSTEL Lata 473 — bulto x24", "amstel-lata-473", {}),
  p("SCHNEIDER Lata 473cc", "Schneider", "cervezas", 36500, 1520.83, 24, "SCHNEIDER Lata 473cc — bulto x24", "schneider-lata-473cc", {}),
  p("AS DE PICAS Malbec 750ml", "Picas", "vinos-espumantes", 18370, 3061.67, 6, "AS DE PICAS Malbec 750ml — bulto x6", "as-de-picas-malbec-750ml", {}),
  p("BODEGA PRIVADA TRADICIONAL Malbec 750cc", "Bodega", "vinos-espumantes", 20000, 3333.33, 6, "BODEGA PRIVADA TRADICIONAL Malbec 750cc — bulto x6", "bodega-privada-tradicional-malbec-750cc", {}),
  p("BODEGA PRIVADA TRADICIONAL Cabernet 750cc", "Bodega", "vinos-espumantes", 20000, 3333.33, 6, "BODEGA PRIVADA TRADICIONAL Cabernet 750cc — bulto x6", "bodega-privada-tradicional-cabernet", {}),
  p("BODEGA PRIVADA COLECCIÓN 750cc", "Bodega", "vinos-espumantes", 20600, 3433.33, 6, "BODEGA PRIVADA COLECCIÓN 750cc — bulto x6", "bodega-privada-coleccion-750cc", {}),
  p("CANCILLER BLEND Tinto x 750ml", "Canciller", "vinos-espumantes", 15910, 2651.67, 6, "CANCILLER BLEND Tinto x 750ml — bulto x6", "canciller-blend-tinto-x-750ml", {}),
  p("CANCILLER BLANCO DULCE 1125ml", "Canciller", "vinos-espumantes", 15930, 2655, 6, "CANCILLER BLANCO DULCE 1125ml — bulto x6", "canciller-blanco-dulce-1125ml", {}),
  p("CANCILLER XXV BLEND DULCE x 750ml (ESPUMOSO)", "Canciller", "vinos-espumantes", 17800, 2966, 6, "CANCILLER XXV BLEND DULCE x 750ml (ESPUMOSO) — bulto x6", "canciller-xxv-blend-dulce-x-750ml-espumo", {}),
  p("CANCILLER XXV EXTRA BRUT x 750ml", "Canciller", "vinos-espumantes", 17800, 2966, 6, "CANCILLER XXV EXTRA BRUT x 750ml — bulto x6", "canciller-xxv-extra-brut-x-750ml", {}),
  p("CENIZA NEGRA Malbec 750ml", "Ceniza", "vinos-espumantes", 16790, 2798, 6, "CENIZA NEGRA Malbec 750ml — bulto x6", "ceniza-negra-malbec-750ml", {}),
  p("CENIZA NEGRA Chenin Dulce 750ml", "Ceniza", "vinos-espumantes", 15820, 2636.67, 6, "CENIZA NEGRA Chenin Dulce 750ml — bulto x6", "ceniza-negra-chenin-dulce-750ml", {}),
  p("DILEMA Malbec 750ml", "Dilema", "vinos-espumantes", 13000, 2166, 6, "DILEMA Malbec 750ml — bulto x6", "dilema-malbec-750ml", {}),
  p("DILEMA Dulce Natural Blanco x 750ml", "Dilema", "vinos-espumantes", 18200, 3033.33, 6, "DILEMA Dulce Natural Blanco x 750ml — bulto x6", "dilema-dulce-natural-blanco-x-750ml", {}),
  p("DILEMA Dulce Natural Rosado x 750ml", "Dilema", "vinos-espumantes", 18200, 3033.33, 6, "DILEMA Dulce Natural Rosado x 750ml — bulto x6", "dilema-dulce-natural-rosado-x-750ml", {}),
  p("EL ESTANCIERO Malbec 750ml", "Estanciero", "vinos-espumantes", 16810, 2801.67, 6, "EL ESTANCIERO Malbec 750ml — bulto x6", "el-estanciero-malbec-750ml", {}),
  p("ESTANCIA MENDOZA - Bivarietales CAB-MAL x 750ml", "Estancia", "vinos-espumantes", 15640, 2606.67, 6, "ESTANCIA MENDOZA - Bivarietales CAB-MAL x 750ml — bulto x6", "estancia-mendoza-bivarietales-cab-mal-x", {}),
  p("ESTANCIA MENDOZA - Bivarietales MER-MAL x 750ml", "Estancia", "vinos-espumantes", 15640, 2606.67, 6, "ESTANCIA MENDOZA - Bivarietales MER-MAL x 750ml — bulto x6", "estancia-mendoza-bivarietales-mer-mal-x", {}),
  p("ESTANCIA MENDOZA Blanco x 750ml", "Estancia", "vinos-espumantes", 15820, 2636.67, 6, "ESTANCIA MENDOZA Blanco x 750ml — bulto x6", "estancia-mendoza-blanco-x-750ml", {}),
  p("ESTANCIA MENDOZA Blanco Dulce x 750ml", "Estancia", "vinos-espumantes", 15820, 2636.67, 6, "ESTANCIA MENDOZA Blanco Dulce x 750ml — bulto x6", "estancia-mendoza-blanco-dulce-x-750ml", {}),
  p("ESTANCIA MENDOZA Malbec x 750ml", "Estancia", "vinos-espumantes", 13880, 2313.33, 6, "ESTANCIA MENDOZA Malbec x 750ml — bulto x6", "estancia-mendoza-malbec-x-750ml", {}),
  p("ESTANCIA MENDOZA Cabernet x 750ml", "Estancia", "vinos-espumantes", 13880, 2313.33, 6, "ESTANCIA MENDOZA Cabernet x 750ml — bulto x6", "estancia-mendoza-cabernet-x-750ml", {}),
  p("ESTANCIA MENDOZA Chardonnay x 750ml", "Estancia", "vinos-espumantes", 13880, 2313.33, 6, "ESTANCIA MENDOZA Chardonnay x 750ml — bulto x6", "estancia-mendoza-chardonnay-x-750ml", {}),
  p("FINCA GABRIEL Malbec Roble 750ML", "Finca", "vinos-espumantes", 25970, 4328.33, 6, "FINCA GABRIEL Malbec Roble 750ML — bulto x6", "finca-gabriel-malbec-roble-750ml", {}),
  p("FINCA GABRIEL Cosecha Tardía 750ML", "Finca", "vinos-espumantes", 25970, 4328.33, 6, "FINCA GABRIEL Cosecha Tardía 750ML — bulto x6", "finca-gabriel-cosecha-tardia-750ml", {}),
  p("FINCA MAGNOLIA Malbec 750ml", "Finca", "vinos-espumantes", 21110, 3518.33, 6, "FINCA MAGNOLIA Malbec 750ml — bulto x6", "finca-magnolia-malbec-750ml", {}),
  p("MANOJO DE UVAS Tetra Tinto x 1Lts", "Manojo", "vinos-espumantes", 17690, 1474.17, 12, "MANOJO DE UVAS Tetra Tinto x 1Lts — bulto x12", "manojo-de-uvas-tetra-tinto-x-1lts", {}),
  p("MANOJO DE UVAS Tetra Blanco x 1Lts", "Manojo", "vinos-espumantes", 15310, 1275.83, 12, "MANOJO DE UVAS Tetra Blanco x 1Lts — bulto x12", "manojo-de-uvas-tetra-blanco-x-1lts", {}),
  p("MOSCATO PROMESA x 700ml", "Moscato", "vinos-espumantes", 17040, 2840, 6, "MOSCATO PROMESA x 700ml — bulto x6", "moscato-promesa-x-700ml", {}),
  p("NATIVO Tinto Tetra X 1Lts", "Nativo", "vinos-espumantes", 17400, 1450, 12, "NATIVO Tinto Tetra X 1Lts — bulto x12", "nativo-tinto-tetra-x-1lts", {}),
  p("NINA GOLD Cabernet Franc 750ml", "Nina", "vinos-espumantes", 33010, 5501.67, 6, "NINA GOLD Cabernet Franc 750ml — bulto x6", "nina-gold-cabernet-franc-750ml", {}),
  p("NINA GOLD Cab-Malbec 750ml", "Nina", "vinos-espumantes", 33010, 5501.67, 6, "NINA GOLD Cab-Malbec 750ml — bulto x6", "nina-gold-cab-malbec-750ml", {}),
  p("NINA GOLD Malbec 750ml", "Nina", "vinos-espumantes", 33010, 5501.67, 6, "NINA GOLD Malbec 750ml — bulto x6", "nina-gold-malbec-750ml", {}),
  p("NINA GOLD Chardonnay 750ml", "Nina", "vinos-espumantes", 33010, 5501.67, 6, "NINA GOLD Chardonnay 750ml — bulto x6", "nina-gold-chardonnay-750ml", {}),
  p("RESERO Tinto x 1125ml", "Resero", "vinos-espumantes", 11645, 1940.83, 6, "RESERO Tinto x 1125ml — bulto x6", "resero-tinto-x-1125ml", {}),
  p("RESERO Blanco Dulce x 1125ml", "Resero", "vinos-espumantes", 11645, 1940.83, 6, "RESERO Blanco Dulce x 1125ml — bulto x6", "resero-blanco-dulce-x-1125ml", {}),
  p("RESERO Tetra Tinto x 1Lts", "Resero", "vinos-espumantes", 20040, 1670, 12, "RESERO Tetra Tinto x 1Lts — bulto x12", "resero-tetra-tinto-x-1lts", {}),
  p("RESERO Tetra Blanco x 1Lts", "Resero", "vinos-espumantes", 13930, 1160.83, 12, "RESERO Tetra Blanco x 1Lts — bulto x12", "resero-tetra-blanco-x-1lts", {}),
  p("RICORDI Espumante Brut Nature 750ML", "Ricordi", "vinos-espumantes", 40010, 6668.33, 6, "RICORDI Espumante Brut Nature 750ML — bulto x6", "ricordi-espumante-brut-nature-750ml", {}),
  p("SAN HUBERTO CLASICO Malbec 750ml", "San", "vinos-espumantes", 14930, 2488.33, 6, "SAN HUBERTO CLASICO Malbec 750ml — bulto x6", "san-huberto-clasico-malbec-750ml", {}),
  p("SAN HUBERTO CLASICO Cabernet 750ml", "San", "vinos-espumantes", 14930, 2488.33, 6, "SAN HUBERTO CLASICO Cabernet 750ml — bulto x6", "san-huberto-clasico-cabernet-750ml", {}),
  p("SAN HUBERTO CLASICO Blanco Dulce 750ml", "San", "vinos-espumantes", 16360, 2726.67, 6, "SAN HUBERTO CLASICO Blanco Dulce 750ml — bulto x6", "san-huberto-clasico-blanco-dulce-750ml", {}),
  p("SAN HUBERTO CLASICO Rosado 750ml", "San", "vinos-espumantes", 16360, 2726.67, 6, "SAN HUBERTO CLASICO Rosado 750ml — bulto x6", "san-huberto-clasico-rosado-750ml", {}),
  p("SANTA FILOMENA Tinto Patero 1125ml", "Santa", "vinos-espumantes", 15540, 2590, 6, "SANTA FILOMENA Tinto Patero 1125ml — bulto x6", "santa-filomena-tinto-patero-1125ml", {}),
  p("TALACASTO Tetra Tinto x 1Lts", "Talacasto", "vinos-espumantes", 15100, 1258.50, 12, "TALACASTO Tetra Tinto x 1Lts — bulto x12", "talacasto-tetra-tinto-x-1lts", {}),
  p("TALACASTO Tetra Blanco x 1Lts", "Talacasto", "vinos-espumantes", 15100, 1258.50, 12, "TALACASTO Tetra Blanco x 1Lts — bulto x12", "talacasto-tetra-blanco-x-1lts", {}),
  p("TORO Clasico Tinto x 750ml", "Toro", "vinos-espumantes", 12600, 2100, 6, "TORO Clasico Tinto x 750ml — bulto x6", "toro-clasico-tinto-x-750ml", {}),
  p("TORO Tetra Blanco x 1Lts", "Toro", "vinos-espumantes", 15310, 1275.83, 12, "TORO Tetra Blanco x 1Lts — bulto x12", "toro-tetra-blanco-x-1lts", {}),
  p("TORO Tinto (EX-930) 700ML", "Toro", "vinos-espumantes", 10410, 1735, 6, "TORO Tinto (EX-930) 700ML — bulto x6", "toro-tinto-ex-930-700ml", {}),
  p("TORO Tinto (EX930) 1Lts", "Toro", "vinos-espumantes", 14000, 2333.33, 6, "TORO Tinto (EX930) 1Lts — bulto x6", "toro-tinto-ex930-1lts", {}),
  p("TORO Clasico Tinto x 1125ml", "Toro", "vinos-espumantes", 15850, 2641.67, 6, "TORO Clasico Tinto x 1125ml — bulto x6", "toro-clasico-tinto-x-1125ml", {}),
  p("UVITA Blanco 1Lts", "Uvita", "vinos-espumantes", 16600, 1388.33, 12, "UVITA Blanco 1Lts — bulto x12", "uvita-blanco-1lts", {}),
  p("UVITA Blanco Dulce 1Lts", "Uvita", "vinos-espumantes", 16600, 1388.33, 12, "UVITA Blanco Dulce 1Lts — bulto x12", "uvita-blanco-dulce-1lts", {}),
  p("UVITA Tinto 1Lts", "Uvita", "vinos-espumantes", 16660, 1388.33, 12, "UVITA Tinto 1Lts — bulto x12", "uvita-tinto-1lts", {}),
  p("UVITA Tinto Dulce 1Lts", "Uvita", "vinos-espumantes", 16660, 1388.33, 12, "UVITA Tinto Dulce 1Lts — bulto x12", "uvita-tinto-dulce-1lts", {}),
  p("VIÑA MAYOR Blend Tinto 700ml", "Viña", "vinos-espumantes", 8760, 1460, 6, "VIÑA MAYOR Blend Tinto 700ml — bulto x6", "vina-mayor-blend-tinto-700ml", {}),
  p("ZUMUVA Tetra Tinto x 1 Lts", "Zumuva", "vinos-espumantes", 15900, 1325, 12, "ZUMUVA Tetra Tinto x 1 Lts — bulto x12", "zumuva-tetra-tinto-x-1-lts", {}),
  p("ZUMUVA Tetra Blanco x 1 Lts", "Zumuva", "vinos-espumantes", 15905, 1325, 12, "ZUMUVA Tetra Blanco x 1 Lts — bulto x12", "zumuva-tetra-blanco-x-1-lts", {}),
  p("ZUMUVA Tetra Blanco Dulce x 1 Lts", "Zumuva", "vinos-espumantes", 15905, 1325, 12, "ZUMUVA Tetra Blanco Dulce x 1 Lts — bulto x12", "zumuva-tetra-blanco-dulce-x-1-lts", {}),
  p("Fernet BRANCA x 750ml", "Branca", "bebidas-alcohol", 14770, 14770, 1,  "Fernet BRANCA x 750ml — bulto x12", "fernet-branca-x-750ml", {}),
  p("Fernet BRANCA x 450ml", "Branca", "bebidas-alcohol", 8600, 8600, 1, "Fernet BRANCA x 450ml — bulto x12", "fernet-branca-x-450ml", {}),
  p("Fernet BRANCA Menta x 450ml", "Branca", "bebidas-alcohol", 8600, 8600, 1, "Fernet BRANCA Menta x 450ml — bulto x12", "fernet-branca-menta-x-450ml", {}),
  p("CARPANO Rosso x 950ml", "Carpano", "bebidas-alcohol", 7285, 7285, 1, "CARPANO Rosso x 950ml — bulto x6", "carpano-rosso-x-950ml", {}),
  p("CARPANO Bianco x 950ml", "Carpano", "bebidas-alcohol", 7285, 7285, 1, "CARPANO Bianco x 950ml — bulto x6", "carpano-bianco-x-950ml", {}),
  p("Vodka SERNOVA Original x 700ml", "Sernova", "bebidas-alcohol", 6900, 6900, 1, "Vodka SERNOVA Original x 700ml — bulto x12", "vodka-sernova-original-x-700ml", {}),
  p("Vodka SERNOVA Wild Berries x 700ml", "Sernova", "bebidas-alcohol", 6900, 6900, 1, "Vodka SERNOVA Wild Berries x 700ml — bulto x6", "vodka-sernova-wild-berries-x-700ml", {}),
  p("Vodka SERNOVA Sweet Apple x 700ml", "Sernova", "bebidas-alcohol", 6900, 6900, 1, "Vodka SERNOVA Sweet Apple x 700ml — bulto x6", "vodka-sernova-sweet-apple-x-700ml", {}),
  p("Vodka SERNOVA Trop.Passion x 700ml", "Sernova", "bebidas-alcohol", 6900, 6900, 1, "Vodka SERNOVA Trop.Passion x 700ml — bulto x6", "vodka-sernova-trop-passion-x-700ml", {}),
  p("Alfajor Guaymallen Chocolate", "Alfajores", "galletitas", 11150, 278.75, 40, "Alfajores Guaymallen Chocolate — bulto x40", "alfajores-guaymallen-chocolate", {}),
  p("Alfajor Guaymallen Blanco", "Alfajores", "galletitas", 11150, 278.75, 40, "Alfajores Guaymallen Blanco — bulto x40", "alfajores-guaymallen-blanco", {}),
  p("Alfajor Guaymallen TRIPLE Chocolate", "Triple", "galletitas", 9970, 415.42, 24, "Alfajores Guaymallen TRIPLE Chocolate — bulto x24", "alfajores-guaymallen-triple-chocolate", {}),
  p("Alfajor Guaymallen TRIPLE Blanco", "Triple", "galletitas", 9970, 415.42, 24, "Alfajores Guaymallen TRIPLE Blanco — bulto x24", "alfajores-guaymallen-triple-dulce-de", {}),
  p("Alfajor Capitan del Espacio Chocolate", "Alfajor", "galletitas", 43900, 1219.44, 36, "Alfajores Capitan del Espacio Chocolate — bulto x36", "alfajor-capitan-del-espacio-chocolate", {}),
  p("Alfajor Capitan del Espacio Dulce de Leche", "Alfajor", "galletitas", 43900, 1219.44, 36, "Alfajores Capitan del Espacio Dulce de Leche — bulto x36", "alfajor-capitan-del-espacio-dulce-de", {}),
  p("Alfajor Capitan del Espacio TRIPLE", "Triple", "galletitas", 44500, 1854.17, 24, "Alfajores Capitan del Espacio TRIPLE — bulto x24", "alfajor-capitan-del-espacio-triple", {}),
  p("Don Satur Bizcochos X 200GRS", "Don", "galletitas", 1110, 1110, 1, "Don Satur Bizcochos X 200GRS — bulto x30", "don-satur-bizcochos-x-200grs", {}),
  p("Don Satur Agridulce X 200GRS", "Don", "galletitas", 1110, 1110, 1, "Don Satur Agridulce X 200GRS — bulto x30", "don-satur-agridulce-x-200grs", {}),
  p("Don Satur Negritas X 200GRS", "Don", "galletitas", 1110, 1110, 1, "Don Satur Negritas X 200GRS — bulto x30", "don-satur-negritas-x-200grs", {}),
  p("Don Satur Magdalena x 220Grs", "Don", "galletitas", 2270, 2270, 1, "Don Satur Magdalena x 220Grs — bulto x10", "don-satur-magdalena-x-220grs", {}),
  p("Don Satur Talitas x 140g", "Don", "galletitas", 1210, 1210, 1, "Don Satur Talitas x 140g — bulto x20", "don-satur-talitas-x-140g", {}),
  p("Arroz Gallo PARBOIL Oro 500 Grs", "Gallo", "arroz", 13610, 1361, 10, "Arroz Gallo PARBOIL Oro 500 Grs — bulto x10", "arroz-gallo-parboil-oro-500-grs", {}),
  p("Arroz Lucchetti Largo fino 500Grs", "Lucchetti", "arroz", 8840, 884, 10, "Arroz Lucchetti Largo fino 500Grs — bulto x10", "arroz-lucchetti-largo-fino-500grs", {}),
  p("Monte Lirio x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Monte Lirio x 500G — bulto x10", "monte-lirio-x-500g", {}),
  p("Monte Lirio Moños x 500G", "Monte Lirio", "fideos", 22050, 2205, 10, "Monte Lirio Moños x 500G — bulto x10", "monte-lirio-monos-x-500g", {}),
  p("Lucchetti Ave Maria x 500GRS", "Lucchetti", "fideos", 1070, 1070, 1, "Lucchetti Ave Maria x 500GRS — bulto x15", "lucchetti-ave-maria-x-500grs", {}),
  p("Lucchetti Dedalito x 500GRS", "Lucchetti", "fideos", 1070, 1070, 1, "Lucchetti Dedalito x 500GRS — bulto x15", "lucchetti-dedalito-x-500grs", {}),
  p("Lucchetti Municion x 500GRS", "Lucchetti", "fideos", 1070, 1070, 1, "Lucchetti Municion x 500GRS — bulto x15", "lucchetti-municion-x-500grs", {}),
  p("Lucchetti Letritas x 500GRS", "Lucchetti", "fideos", 1070, 1070, 1, "Lucchetti Letritas x 500GRS — bulto x15", "lucchetti-letritas-x-500grs", {}),
  p("Lucchetti Tirabuzon x 500Grs", "Lucchetti", "fideos", 1120, 1120, 1, "Lucchetti Tirabuzon x 500Grs — bulto x15", "lucchetti-tirabuzon-x-500grs", {}),
  p("Lucchetti Mostachol x 500Grs", "Lucchetti", "fideos", 1120, 1120, 1, "Lucchetti Mostachol x 500Grs — bulto x15", "lucchetti-mostachol-x-500grs", {}),
  p("Lucchetti Codito x 500Grs", "Lucchetti", "fideos", 1120, 1120, 1, "Lucchetti Codito x 500Grs — bulto x15", "lucchetti-codito-x-500grs", {}),
  p("Lucchetti Tallarin x 500Grs", "Lucchetti", "fideos", 1120, 1120, 1, "Lucchetti Tallarin x 500Grs — bulto x20", "lucchetti-tallarin-x-500grs", {}),
  p("Adobo para Pizzas x 20Grs", "Adobo", "condimentos", 480, 480, 1, "Adobo para Pizzas x 20Grs — bulto x50", "adobo-para-pizzas-x-20grs", {}),
  p("Aji Molido x 25Grs", "Aji", "condimentos", 560, 560, 1, "Aji Molido x 25Grs — bulto x50", "aji-molido-x-25grs", {}),
  p("Azucar Impalpable x 200Grs", "Azucar", "condimentos", 890, 890, 1, "Azucar Impalpable x 200Grs — bulto x10", "azucar-impalpable-x-200grs", {}),
  p("Bicarbonato de Sodio x 50Grs", "Bicarbonato", "condimentos", 380, 380, 1, "Bicarbonato de Sodio x 50Grs — bulto x50", "bicarbonato-de-sodio-x-50grs", {}),
  p("Chimi Churri Deshidratado x 25Grs", "Chimi", "condimentos", 470, 470, 1, "Chimi Churri Deshidratado x 25Grs — bulto x50", "chimi-churri-deshidratado-x-25grs", {}),
  p("Coco Rayado x 25Grs", "Coco", "condimentos", 680, 680, 1, "Coco Rayado x 25Grs — bulto x50", "coco-rayado-x-25grs", {}),
  p("Comino Molido x 25Grs", "Comino", "condimentos", 530, 530, 1, "Comino Molido x 25Grs — bulto x50", "comino-molido-x-25grs", {}),
  p("Extracto de Vainilla x 100cc", "Extracto", "condimentos", 1240, 1240, 1, "Extracto de Vainilla x 100cc — bulto x24", "extracto-de-vainilla-x-100cc", {}),
  p("Granas para Reposteria x 50Grs", "Granas", "condimentos", 650, 650, 1, "Granas para Reposteria x 50Grs — bulto x50", "granas-para-reposteria-x-50grs", {}),
  p("Grageas para Reposteria x 50Grs", "Grageas", "condimentos", 720, 720, 1, "Grageas para Reposteria x 50Grs — bulto x50", "grageas-para-reposteria-x-50grs", {}),
  p("Oregano x 25Grs", "Oregano", "condimentos", 590, 590, 1, "Oregano x 25Grs — bulto x50", "oregano-x-25grs", {}),
  p("Pimenton Seleccionado x 25Grs", "Pimenton", "condimentos", 520, 520, 1, "Pimenton Seleccionado x 25Grs — bulto x50", "pimenton-seleccionado-x-25grs", {}),
  p("Pimienta Blanca Molida x 50Grs", "Pimienta", "condimentos", 2030, 2030, 1, "Pimienta Blanca Molida x 50Grs — bulto x50", "pimienta-blanca-molida-x-50grs", {}),
  p("Pimienta Negra Molida x 25grs", "Pimienta", "condimentos", 1380, 1380, 1, "Pimienta Negra Molida x 25grs — bulto x50", "pimienta-negra-molida-x-25grs", {}),
  p("Polvo para Hornear Centurion x 50Grs", "Polvo", "condimentos", 530, 530, 1, "Polvo para Hornear Centurion x 50Grs — bulto x50", "polvo-para-hornear-centurion-x-50grs", {}),
  p("Provenzal Deshidratado x 25Grs", "Provenzal", "condimentos", 640, 640, 1, "Provenzal Deshidratado x 25Grs — bulto x50", "provenzal-deshidratado-x-25grs", {}),
  p("Aceite de Oliva La Posta del Olivo 500cc", "Aceite", "almacen", 63480, 10580, 6, "Aceite de Oliva La Posta del Olivo 500cc — bulto x6", "aceite-de-oliva-la-posta-del-olivo-500cc", {}),
  p("Aceite de Oliva La Posta del Olivo 250cc", "Aceite", "almacen", 36840, 6140, 6, "Aceite de Oliva La Posta del Olivo 250cc — bulto x6", "aceite-de-oliva-la-posta-del-olivo-250cc", {}),
  p("Atun Desmenuzado al Natural MORIXE lata x 170Grs", "Morixe", "almacen", 81120, 1690, 48, "Atun Desmenuzado al Natural MORIXE lata x 170Grs — bulto x48", "atun-desmenuzado-al-natural-morixe-lata", {}),
  p("Atun Desmenuzado en Aceite MORIXE lata x 170Grs", "Morixe", "almacen", 81120, 1690, 48, "Atun Desmenuzado en Aceite MORIXE lata x 170Grs — bulto x48", "atun-desmenuzado-en-aceite-morixe-lata", {}),
  p("Atun en Lomitos en Aceite MORIXE lata x 170Grs", "Morixe", "almacen", 105600, 2200, 48, "Atun en Lomitos en Aceite MORIXE lata x 170Grs — bulto x48", "atun-en-lomitos-en-aceite-morixe-lata-x", {}),
  p("Atun en Lomitos Natural MORIXE lata x 170Grs", "Morixe", "almacen", 105600, 2200, 48, "Atun en Lomitos Natural MORIXE lata x 170Grs — bulto x48", "atun-en-lomitos-natural-morixe-lata-x", {}),
  p("Cafe Arlintan x 50Grs", "Cafe", "almacen", 38400, 3200, 12, "Cafe Arlintan x 50Grs — bulto x12", "cafe-arlintan-x-50grs", {}),
  p("Cafe Arlintan x 100Grs", "Cafe", "almacen", 50880, 4240, 12, "Cafe Arlintan x 100Grs — bulto x12", "cafe-arlintan-x-100grs", {}),
  p("Caldo Knorr Verdura x 2uni x 24", "Caldo", "almacen", 11830, 492.92, 24, "Caldo Knorr Verdura x 2uni x 24 — bulto x24", "caldo-knorr-verdura-x-2uni-x-24", {}),
  p("Caldo Knorr Gallina x 2uni x 24", "Caldo", "almacen", 11830, 492.92, 24, "Caldo Knorr Gallina x 2uni x 24 — bulto x24", "caldo-knorr-gallina-x-2uni-x-24", {}),
  p("Dulce de Membrillo De La Huerta Baggio x 2Kg", "Dulce", "almacen", 4930, 4930, 1, "Dulce de Membrillo De La Huerta Baggio x 2Kg — bulto x1", "dulce-de-membrillo-de-la-huerta-baggio-x", {}),
  p("Dulce de Membrillo De La Huerta Baggio x 5Kg", "Dulce", "almacen", 13430, 13430, 1, "Dulce de Membrillo De La Huerta Baggio x 5Kg — bulto x1", "dulce-de-membrillo-de-la-huerta-baggio-x-2", {}),
  p("Dulce de Membrillo 7 Dias Baggio x 2Kg", "Dulce", "almacen", 13420, 13420, 1, "Dulce de Membrillo 7 Dias Baggio x 2Kg — bulto x1", "dulce-de-membrillo-7-dias-baggio-x-2kg", {}),
  p("Dulce de Membrillo 7 Dias Baggio x 5Kg", "Dulce", "almacen", 12570, 12570, 1, "Dulce de Membrillo 7 Dias Baggio x 5Kg — bulto x1", "dulce-de-membrillo-7-dias-baggio-x-5kg", {}),
  p("Edulcorante SiDiet Stevia x 200cc", "Edulcorante", "almacen", 7080, 1180, 6, "Edulcorante SiDiet Stevia x 200cc — bulto x6", "edulcorante-sidiet-stevia-x-200cc", {}),
  p("Edulcorante SiDiet Stevia x 250cc", "Edulcorante", "almacen", 8280, 1380, 6, "Edulcorante SiDiet Stevia x 250cc — bulto x6", "edulcorante-sidiet-stevia-x-250cc", {}),
  p("Edulcorante SI-Diet Stevia 600cc", "Edulcorante", "almacen", 15490, 2581.67, 6, "Edulcorante SI-Diet Stevia 600cc — bulto x6", "edulcorante-si-diet-stevia-600cc", {}),
  p("Endulzante SI LIGHT CLASICO 500cc", "Light", "almacen", 8810, 1468.33, 6, "Endulzante SI LIGHT CLASICO 500cc — bulto x6", "endulzante-si-light-clasico-500cc", {}),
  p("Endulzante SI LIGHT CLASICO 600cc", "Light", "almacen", 10160, 1693.33, 6, "Endulzante SI LIGHT CLASICO 600cc — bulto x6", "endulzante-si-light-clasico-600cc", {}),
  p("Endulzante SI LIGHT STEVIA 500cc", "Light", "almacen", 10420, 1736.67, 6, "Endulzante SI LIGHT STEVIA 500cc — bulto x6", "endulzante-si-light-stevia-500cc", {}),
  p("Endulzante SI LIGHT STEVIA 600cc", "Light", "almacen", 12040, 2006.67, 6, "Endulzante SI LIGHT STEVIA 600cc — bulto x6", "endulzante-si-light-stevia-600cc", {}),
  p("Encendedores Candela x 25 Unidades", "Encendedores", "almacen", 8490, 339.60, 25, "Encendedores Candela x 25 Unidades — bulto x25", "encendedores-candela-x-25-unidades", {}),
  p("Encendedores Okey x 25 Unidades", "Encendedores", "almacen", 5820, 232.80, 25, "Encendedores Okey x 25 Unidades — bulto x25", "encendedores-okey-x-25-unidades", {}),
  p("Harina Morixe 000 1Kg", "Harina", "almacen", 10740, 1074, 10, "Harina Morixe 000 1Kg — bulto x10", "harina-morixe-000-1kg", {}),
  p("Harina Morixe 0000 1Kg", "Harina", "almacen", 10740, 1074, 10, "Harina Morixe 0000 1Kg — bulto x10", "harina-morixe-0000-1kg", {}),
  p("Harina Morixe Leudante 1Kg", "Harina", "almacen", 13410, 1341, 10, "Harina Morixe Leudante 1Kg — bulto x10", "harina-morixe-leudante-1kg", {}),
  p("Harina Morixe para pizza 1Kg", "Harina", "almacen", 13000, 1300, 10, "Harina Morixe para pizza 1Kg — bulto x10", "harina-morixe-para-pizza-1kg", {}),
  p("Jugo de Limón Minerva x 250cc", "Jugo", "almacen", 19920, 1660, 12, "Jugo de Limón Minerva x 250cc — bulto x12", "jugo-de-limon-minerva-x-250cc", {}),
  p("Jugo Tang x 20 Uni.", "Jugo", "almacen", 7320, 366, 20, "Jugo Tang x 20 Uni. — bulto x20", "jugo-tang-x-20-uni", {}),
  p("Jugo Clight x 20 Uni", "Jugo", "almacen", 153800, 7690, 20, "Jugo Clight x 20 Uni — bulto x20", "jugo-clight-x-20-uni", {}),
  p("Ketchup Hellmans x 60GRS", "Ketchup", "almacen", 23150, 771.67, 30, "Ketchup Hellmans x 60GRS — bulto x30", "ketchup-hellmans-x-60grs", {}),
  p("Maizena x 220Grs", "Maizena", "almacen", 101500, 2030, 50, "Maizena x 220Grs — bulto x50", "maizena-x-220grs", {}),
  p("Mate Cocido Nobleza Gaucha 25 uni", "Mate", "almacen", 8520, 852, 10, "Mate Cocido Nobleza Gaucha 25 uni — bulto x10", "mate-cocido-nobleza-gaucha-25-uni", {}),
  p("Mayonesa Hellmans x 118Grs", "Mayonesa", "almacen", 15300, 765, 20, "Mayonesa Hellmans x 118Grs — bulto x20", "mayonesa-hellmans-x-118grs", {}),
  p("Mermelada Baggio De La Huerta 454Grs", "Mermelada", "almacen", 9480, 1580, 6, "Mermelada Baggio De La Huerta 454Grs — bulto x6", "mermelada-baggio-de-la-huerta-454grs", {}),
  p("Mostaza Savora DP x 250Grs", "Mostaza", "almacen", 34320, 1430, 24, "Mostaza Savora DP x 250Grs — bulto x24", "mostaza-savora-dp-x-250grs", {}),
  p("Pan Rallado Morixe 500Grs", "Pan", "almacen", 10440, 870, 12, "Pan Rallado Morixe 500Grs — bulto x12", "pan-rallado-morixe-500grs", {}),
  p("Pure De Papa Knorr x 125grs", "Pure", "almacen", 18480, 1540, 12, "Pure De Papa Knorr x 125grs — bulto x12", "pure-de-papa-knorr-x-125grs", {}),
  p("Pure de Tomate De La Huerta x 210cc", "Pure", "almacen", 8260, 458.89, 18, "Pure de Tomate De La Huerta x 210cc — bulto x18", "pure-de-tomate-de-la-huerta-x-210cc", {}),
  p("Pure de Tomate De La Huerta x 530cc", "Pure", "almacen", 9400, 783.33, 12, "Pure de Tomate De La Huerta x 530cc — bulto x12", "pure-de-tomate-de-la-huerta-x-530cc", {}),
  p("Pure de Tomate De La Huerta x 1030cc", "Pure", "almacen", 11680, 1460, 8, "Pure de Tomate De La Huerta x 1030cc — bulto x8", "pure-de-tomate-de-la-huerta-x-1030cc", {}),
  p("Sal Fina Celusal Paquete x 500Grs", "Sal", "almacen", 30300, 1010, 30, "Sal Fina Celusal Paquete x 500Grs — bulto x30", "sal-fina-celusal-paquete-x-500grs", {}),
  p("Sal Entrefina Celusal Paquete x 500Grs", "Sal", "almacen", 34200, 1140, 30, "Sal Entrefina Celusal Paquete x 500Grs — bulto x30", "sal-entrefina-celusal-paquete-x-500grs", {}),
  p("Sal Fina Tresal x 500Grs", "Sal", "almacen", 10600, 530, 20, "Sal Fina Tresal x 500Grs — bulto x20", "sal-fina-tresal-x-500grs", {}),
  p("Sal Entrefina Tresal x 1Kg", "Sal", "almacen", 8300, 830, 10, "Sal Entrefina Tresal x 1Kg — bulto x10", "sal-entrefina-tresal-x-1kg", {}),
  p("Salsas Knorr Pizza 340Grs", "Salsas", "almacen", 32640, 1360, 24, "Salsas Knorr Pizza 340Grs — bulto x24", "salsas-knorr-pizza-340grs", {}),
  p("Vinagre Marolio x 1Lts", "Vinagre", "almacen", 15360, 1280, 12, "Vinagre Marolio x 1Lts — bulto x12", "vinagre-marolio-x-1lts", {}),
  p("Yerba Amanda x 500Grs", "Yerba", "almacen", 16980, 1698, 10, "Yerba Amanda x 500Grs — bulto x10", "yerba-amanda-x-500grs", {}),
  p("P/H ELEGANTE DOBLE HOJA (VIOLETA) 4/30MTS", "Elegante", "papeles", 22780, 2278, 10, "P/H ELEGANTE DOBLE HOJA (VIOLETA) 4/30MTS — bulto x10", "p-h-elegante-doble-hoja-violeta-4-30mts", {}),
  p("P/H ELEGANTE H/S X 80 M (VERDE) 4/80MTS", "Elegante", "papeles", 33220, 3322, 10, "P/H ELEGANTE H/S X 80 M (VERDE) 4/80MTS — bulto x10", "p-h-elegante-h-s-x-80-m-verde-4-80mts", {}),
  p("P/H ELEGANTE H/S X 6 (CELESTE) 6/30MTS", "Elegante", "papeles", 24240, 2020, 12, "P/H ELEGANTE H/S X 6 (CELESTE) 6/30MTS — bulto x12", "p-h-elegante-h-s-x-6-celeste-6-30mts", {}),
  p("P/H ELEGANTE H/S X 4 ( CELESTE) 4/30MTS", "Elegante", "papeles", 16040, 1336.67, 12, "P/H ELEGANTE H/S X 4 ( CELESTE) 4/30MTS — bulto x12", "p-h-elegante-h-s-x-4-celeste-4-30mts", {}),
  p("R/C ELEGANTE GIGANTE X 200 PAÑOS", "Elegante", "papeles", 22700, 1891.67, 12, "R/C ELEGANTE GIGANTE X 200 PAÑOS — bulto x12", "r-c-elegante-gigante-x-200-panos", {}),
  p("R/C ELEGANTE X 3 DE 50 PAÑOS (ROJO)", "Elegante", "papeles", 11980, 1497.50, 8, "R/C ELEGANTE X 3 DE 50 PAÑOS (ROJO) — bulto x8", "r-c-elegante-x-3-de-50-panos-rojo", {}),
  p("R/C DICHA X 3 DE 40 PAÑOS", "Dicha", "papeles", 15160, 1263.33, 12, "R/C DICHA X 3 DE 40 PAÑOS — bulto x12", "r-c-dicha-x-3-de-40-panos", {}),
  p("P/H PERIPEL INDIVIDUAL H/S X 80MTS X 30 Unidades", "Peripel", "papeles", 8200, 273.33, 30, "P/H PERIPEL INDIVIDUAL H/S X 80MTS X 30 Unidades — bulto x30", "p-h-peripel-individual-h-s-x-80mts-x-30-", {}),
  p("BLEM Aerosol X 360cc", "Blem", "limpieza", 70440, 5870, 12, "BLEM Aerosol X 360cc — bulto x12", "blem-aerosol-x-360cc", {}),
  p("CERAMICOL Aerosol X 360cc", "Ceramicol", "limpieza", 62880, 5240, 12, "CERAMICOL Aerosol X 360cc — bulto x12", "ceramicol-aerosol-x-360cc", {}),
  p("CIF Antigrasa DP 450ml", "Cif", "limpieza", 20850, 1390, 15, "CIF Antigrasa DP 450ml — bulto x15", "cif-antigrasa-dp-450ml", {}),
  p("CIF Baño DP 450ml", "Cif", "limpieza", 20850, 1390, 15, "CIF Baño DP 450ml — bulto x15", "cif-bano-dp-450ml", {}),
  p("CIF Vidrios DP 450ml", "Cif", "limpieza", 28800, 1920, 15, "CIF Vidrios DP 450ml — bulto x15", "cif-vidrios-dp-450ml", {}),
  p("CIF Blanco Crema X 375cc", "Cif", "limpieza", 21840, 1820, 12, "CIF Blanco Crema X 375cc — bulto x12", "cif-blanco-crema-x-375cc", {}),
  p("CIF Limpiador Desinfectante GATILLO x 400ml", "Cif", "limpieza", 23520, 1960, 12, "CIF Limpiador Desinfectante GATILLO x 400ml — bulto x12", "cif-limpiador-desinfectante-gatillo-x-40", {}),
  p("CIF Lustramuebles Ultra Brillo GAT x 400Ml", "Cif", "limpieza", 14520, 1210, 12, "CIF Lustramuebles Ultra Brillo GAT x 400Ml — bulto x12", "cif-lustramuebles-ultra-brillo-gat-x-400", {}),
  p("Detergente ALA Plus x 750ml", "Ala", "limpieza", 25950, 1730, 15, "Detergente ALA Plus x 750ml — bulto x15", "detergente-ala-plus-x-750ml", {}),
  p("Detergente CIF x 300ml", "Cif", "limpieza", 23640, 1970, 12, "Detergente CIF x 300ml — bulto x12", "detergente-cif-x-300ml", {}),
  p("Detergente MAGISTRAL x 300ml", "Magistral", "limpieza", 46200, 2200, 21, "Detergente MAGISTRAL x 300ml — bulto x21", "detergente-magistral-x-300ml", {}),
  p("DRIVE Limpia Piso DP x 450cc", "Drive", "limpieza", 16500, 1100, 15, "DRIVE Limpia Piso DP x 450cc — bulto x15", "drive-limpia-piso-dp-x-450cc", {}),
  p("DRIVE Limpiador Multiuso DP x 450cc", "Drive", "limpieza", 9000, 600, 15, "DRIVE Limpiador Multiuso DP x 450cc — bulto x15", "drive-limpiador-multiuso-dp-x-450cc", {}),
  p("Espirales RAID x 12 sobres de 4 unidades", "Raid", "limpieza", 9390, 782.50, 12, "Espirales RAID x 12 sobres de 4 unidades — bulto x12", "espirales-raid-x-12-sobres-de-4-unidades", {}),
  p("Espirales RAID Estuches x 12 Unidades", "Raid", "limpieza", 56160, 2340, 24, "Espirales RAID Estuches x 12 Unidades — bulto x24", "espirales-raid-estuches-x-12-unidades", {}),
  p("Esponja Acero Inox. MAKE 10grs", "Make", "limpieza", 2850, 237.50, 12, "Esponja Acero Inox. MAKE 10grs — bulto x12", "esponja-acero-inox-make-10grs", {}),
  p("Esponja Recticulada MORTIMER", "Mortimer", "limpieza", 12730, 1060.83, 12, "Esponja Recticulada MORTIMER — bulto x12", "esponja-recticulada-mortimer", {}),
  p("FUYI MMM Aerosol x 360cc", "Fuyi", "limpieza", 64440, 5370, 12, "FUYI MMM Aerosol x 360cc — bulto x12", "fuyi-mmm-aerosol-x-360cc", {}),
  p("GLADE Aerosol x 360cc", "Glade", "limpieza", 18480, 3080, 6, "GLADE Aerosol x 360cc — bulto x6", "glade-aerosol-x-360cc", {}),
  p("GLADE Pastillas Inodoro", "Glade", "limpieza", 16560, 690, 24, "GLADE Pastillas Inodoro — bulto x24", "glade-pastillas-inodoro", {}),
  p("HARPIC Power Plus 500ml", "Harpic", "limpieza", 48000, 4000, 12, "HARPIC Power Plus 500ml — bulto x12", "harpic-power-plus-500ml", {}),
  p("HARPIC Removedor de Sarro 500ml", "Harpic", "limpieza", 48000, 4000, 12, "HARPIC Removedor de Sarro 500ml — bulto x12", "harpic-removedor-de-sarro-500ml", {}),
  p("Jabon Blanco ALA x 200Grs", "Ala", "limpieza", 127680, 1520, 84, "Jabon Blanco ALA x 200Grs — bulto x84", "jabon-blanco-ala-x-200grs", {}),
  p("Jabon en Polvo ALA x 400Grs", "Ala", "limpieza", 35040, 1460, 24, "Jabon en Polvo ALA x 400Grs — bulto x24", "jabon-en-polvo-ala-x-400grs", {}),
  p("Jabon en Polvo ZORRO EVOLUTION x 360Grs", "Zorro", "limpieza", 32400, 900, 36, "Jabon en Polvo ZORRO EVOLUTION x 360Grs — bulto x36", "jabon-en-polvo-zorro-evolution-x-360grs", {}),
  p("Jabon Liquido ALA DP x 800ml", "Ala", "limpieza", 34200, 2850, 12, "Jabon Liquido ALA DP x 800ml — bulto x12", "jabon-liquido-ala-dp-x-800ml", {}),
  p("Jabon Liquido GRANBY DP x 800ml", "Granby", "limpieza", 27000, 2250, 12, "Jabon Liquido GRANBY DP x 800ml — bulto x12", "jabon-liquido-granby-dp-x-800ml", {}),
  p("Jabon Liquido SKIP BIO ENZIMAS DP x 800ml", "Skip", "limpieza", 37080, 3090, 12, "Jabon Liquido SKIP BIO ENZIMAS DP x 800ml — bulto x12", "jabon-liquido-skip-bio-enzimas-dp-x-800m", {}),
  p("Lavandina AYUDIN x 1 Lts", "Ayudin", "limpieza", 16950, 1130, 15, "Lavandina AYUDIN x 1 Lts — bulto x15", "lavandina-ayudin-x-1-lts", {}),
  p("Lavandina AYUDIN x 2 Lts", "Ayudin", "limpieza", 19680, 2460, 8, "Lavandina AYUDIN x 2 Lts — bulto x8", "lavandina-ayudin-x-2-lts", {}),
  p("LYSOFORM Aerosol x 360cc", "Lysoform", "limpieza", 49080, 4090, 12, "LYSOFORM Aerosol x 360cc — bulto x12", "lysoform-aerosol-x-360cc", {}),
  p("Pilas DURACELL AAA", "Duracell", "limpieza", 7150, 1191.67, 6, "Pilas DURACELL AAA — bulto x6", "pilas-duracell-aaa", {}),
  p("Pilas DURACELL AA", "Duracell", "limpieza", 7150, 1191.67, 6, "Pilas DURACELL AA — bulto x6", "pilas-duracell-aa", {}),
  p("POETT Limpia Piso x 900cc", "Poett", "limpieza", 20280, 1690, 12, "POETT Limpia Piso x 900cc — bulto x12", "poett-limpia-piso-x-900cc", {}),
  p("POETT Limpia Piso x 3 Lts", "Poett", "limpieza", 26650, 8883.33, 3, "POETT Limpia Piso x 3 Lts — bulto x3", "poett-limpia-piso-x-3-lts", {}),
  p("RAID MMM Aerosol x 380cc", "Raid", "limpieza", 83280, 6940, 12, "RAID MMM Aerosol x 380cc — bulto x12", "raid-mmm-aerosol-x-380cc", {}),
  p("RAID MMM Aerosol S/OLOR x 360cc", "Raid", "limpieza", 110040, 9170, 12, "RAID MMM Aerosol S/OLOR x 360cc — bulto x12", "raid-mmm-aerosol-s-olor-x-360cc", {}),
  p("RAID Antipolilla Aero x 360 cc", "Raid", "limpieza", 74760, 6230, 12, "RAID Antipolilla Aero x 360 cc — bulto x12", "raid-antipolilla-aero-x-360-cc", {}),
  p("RAID Casa y Jardin x 380cc", "Raid", "limpieza", 78360, 6530, 12, "RAID Casa y Jardin x 380cc — bulto x12", "raid-casa-y-jardin-x-380cc", {}),
  p("RAID Extermina Cucarachas x 360cc", "Raid", "limpieza", 76680, 6390, 12, "RAID Extermina Cucarachas x 360cc — bulto x12", "raid-extermina-cucarachas-x-360cc", {}),
  p("RAID Matapulgas x 390cc", "Raid", "limpieza", 170400, 14200, 12, "RAID Matapulgas x 390cc — bulto x12", "raid-matapulgas-x-390cc", {}),
  p("RAID MAX Hormigas Aero x 360cc", "Raid", "limpieza", 112920, 9410, 12, "RAID MAX Hormigas Aero x 360cc — bulto x12", "raid-max-hormigas-aero-x-360cc", {}),
  p("RAID MAX Mata Cucarachas y Arañas Aero x 360cc", "Raid", "limpieza", 136920, 11410, 12, "RAID MAX Mata Cucarachas y Arañas Aero x 360cc — bulto x12", "raid-max-mata-cucarachas-y-aranas-aero-x", {}),
  p("Suavizante VIVERE Clasico x 900ml", "Vivere", "limpieza", 40920, 3410, 12, "Suavizante VIVERE Clasico x 900ml — bulto x12", "suavizante-vivere-clasico-x-900ml", {}),
  p("Tabletas RAID x 24 Unidades", "Raid", "limpieza", 70920, 5910, 12, "Tabletas RAID x 24 Unidades — bulto x12", "tabletas-raid-x-24-unidades", {}),
  p("CURITAS Aposito de Tela 8 Unidades", "Curitas", "perfumeria", 33030, 1376.25, 24, "CURITAS Aposito de Tela 8 Unidades — bulto x24", "curitas-aposito-de-tela-8-unidades", {}),
  p("Desodorante AXE 96Grs", "Axe", "perfumeria", 39480, 3290, 12, "Desodorante AXE 96Grs — bulto x12", "desodorante-axe-96grs", {}),
  p("Desodorante REXONA x 90Grs", "Rexona", "perfumeria", 48120, 4010, 12, "Desodorante REXONA x 90Grs — bulto x12", "desodorante-rexona-x-90grs", {}),
  p("Desodorante en crema REXONA Odorono C/Glicerina x 60Grs", "Rexona", "perfumeria", 33480, 2790, 12, "Desodorante en crema REXONA Odorono C/Glicerina x 60Grs — bulto x12", "desodorante-en-crema-rexona-odorono-c-gl", {}),
  p("DOVE Shampoo x 200ml", "Dove", "perfumeria", 47400, 3950, 12, "DOVE Shampoo x 200ml — bulto x12", "dove-shampoo-x-200ml", {}),
  p("DOVE Acondicionador x 200ml", "Dove", "perfumeria", 47400, 3950, 12, "DOVE Acondicionador x 200ml — bulto x12", "dove-acondicionador-x-200ml", {}),
  p("DOVE Shampoo DOY PACK x 180ml", "Dove", "perfumeria", 31080, 2590, 12, "DOVE Shampoo DOY PACK x 180ml — bulto x12", "dove-shampoo-doy-pack-x-180ml", {}),
  p("DOVE Acondicionador DOY PACK x 180ml", "Dove", "perfumeria", 31080, 2590, 12, "DOVE Acondicionador DOY PACK x 180ml — bulto x12", "dove-acondicionador-doy-pack-x-180ml", {}),
  p("Jabon DOVE x 90Grs", "Dove", "perfumeria", 126000, 2100, 60, "Jabon DOVE x 90Grs — bulto x60", "jabon-dove-x-90grs", {}),
  p("Jabon LUX x 120Grs", "Lux", "perfumeria", 93600, 1300, 72, "Jabon LUX x 120Grs — bulto x72", "jabon-lux-x-120grs", {}),
  p("Jabon LUX x 120 Grs X 3 Unidades", "Lux", "perfumeria", 63360, 2640, 24, "Jabon LUX x 120 Grs X 3 Unidades — bulto x24", "jabon-lux-x-120-grs-x-3-unidades", {}),
  p("Jabón Liquido LUX DP x 220ml", "Lux", "perfumeria", 21840, 1820, 12, "Jabón Liquido LUX DP x 220ml — bulto x12", "jabon-liquido-lux-dp-x-220ml", {}),
  p("Jabon REXONA x 120Grs", "Rexona", "perfumeria", 82080, 1140, 72, "Jabon REXONA x 120Grs — bulto x72", "jabon-rexona-x-120grs", {}),
  p("Jabon Liquido SUAVE x 220ml", "Suave", "perfumeria", 11520, 960, 12, "Jabon Liquido SUAVE x 220ml — bulto x12", "jabon-liquido-suave-x-220ml", {}),
  p("OFF Repelente en Aerosol x 170ml", "Off", "perfumeria", 68040, 5670, 12, "OFF Repelente en Aerosol x 170ml — bulto x12", "off-repelente-en-aerosol-x-170ml", {}),
  p("OFF EXTRA DURACCION Repelente en Aerosol x 170ml", "Off", "perfumeria", 90840, 7570, 12, "OFF EXTRA DURACCION Repelente en Aerosol x 170ml — bulto x12", "off-extra-duraccion-repelente-en-aerosol", {}),
  p("OFF DEFENSE Aerosol x 170cc", "Off", "perfumeria", 106920, 8910, 12, "OFF DEFENSE Aerosol x 170cc — bulto x12", "off-defense-aerosol-x-170cc", {}),
  p("OFF Aerosol BONUS x 290cc", "Off", "perfumeria", 94920, 7910, 12, "OFF Aerosol BONUS x 290cc — bulto x12", "off-aerosol-bonus-x-290cc", {}),
  p("OFF Repelente en Crema x 60Grs", "Off", "perfumeria", 30360, 2530, 12, "OFF Repelente en Crema x 60Grs — bulto x12", "off-repelente-en-crema-x-60grs", {}),
  p("OFF FAMILY Repelente en Crema x 196Grs", "Off", "perfumeria", 48720, 4060, 12, "OFF FAMILY Repelente en Crema x 196Grs — bulto x12", "off-family-repelente-en-crema-x-196grs", {}),
  p("PANTENE Max Shampoo 10ml x 24 unidades", "Pantene", "perfumeria", 4490, 187.08, 24, "PANTENE Max Shampoo 10ml x 24 unidades — bulto x24", "pantene-max-shampoo-10ml-x-24-unidades", {}),
  p("PANTENE Max Acondicionador 10ml x 24 unidades", "Pantene", "perfumeria", 4490, 187.08, 24, "PANTENE Max Acondicionador 10ml x 24 unidades — bulto x24", "pantene-max-acondicionador-10ml-x-24", {}),
  p("PLUSBELLE Shampoo x 1L", "Plusbelle", "perfumeria", 38520, 3210, 12, "PLUSBELLE Shampoo x 1L — bulto x12", "plusbelle-shampoo-x-1l", {}),
  p("PLUSBELLE Acondicionador x 1L", "Plusbelle", "perfumeria", 38520, 3210, 12, "PLUSBELLE Acondicionador x 1L — bulto x12", "plusbelle-acondicionador-x-1l", {}),
  p("Prestobarba MINORA PLUS II", "Minora", "perfumeria", 6600, 660, 10, "Prestobarba MINORA PLUS II — bulto x10", "prestobarba-minora-plus-ii", {}),
  p("Prestobarba 2 filos GILLETTE", "Gillette", "perfumeria", 12990, 1082.50, 12, "Prestobarba 2 filos GILLETTE — bulto x12", "prestobarba-2-filos-gillette", {}),
  p("Prestobarba 3 filos GILLETTE", "Gillette", "perfumeria", 15600, 1560, 10, "Prestobarba 3 filos GILLETTE — bulto x10", "prestobarba-3-filos-gillette", {}),
  p("GILLETTE VENUS Simply 3", "Gillette", "perfumeria", 16410, 2051.25, 8, "GILLETTE VENUS Simply 3 — bulto x8", "gillette-venus-simply-3", {}),
  p("Proct. CALIPSO Anatomicos x 20 unidades", "Calipso", "perfumeria", 41600, 1040, 40, "Proct. CALIPSO Anatomicos x 20 unidades — bulto x40", "proct-calipso-anatomicos-x-20-unidades", {}),
  p("SEDAL S.O.S Shampoo x 24 unidades", "Sedal", "perfumeria", 6240, 260, 24, "SEDAL S.O.S Shampoo x 24 unidades — bulto x24", "sedal-s-o-s-shampoo-x-24-unidades", {}),
  p("SEDAL S.O.S Acondicionador x 24 unidades", "Sedal", "perfumeria", 6240, 260, 24, "SEDAL S.O.S Acondicionador x 24 unidades — bulto x24", "sedal-s-o-s-acondicionador-x-24-unidades", {}),
  p("SEDAL Shampoo x 190ml", "Sedal", "perfumeria", 27960, 2330, 12, "SEDAL Shampoo x 190ml — bulto x12", "sedal-shampoo-x-190ml", {}),
  p("SEDAL Acondicionador x 190ml", "Sedal", "perfumeria", 27960, 2330, 12, "SEDAL Acondicionador x 190ml — bulto x12", "sedal-acondicionador-x-190ml", {}),
  p("SEDAL Shampoo DP x 300ml", "Sedal", "perfumeria", 31800, 2650, 12, "SEDAL Shampoo DP x 300ml — bulto x12", "sedal-shampoo-dp-x-300ml", {}),
  p("SEDAL Acondicionador DP x 300ml", "Sedal", "perfumeria", 31800, 2650, 12, "SEDAL Acondicionador DP x 300ml — bulto x12", "sedal-acondicionador-dp-x-300ml", {}),
  p("SUAVE Shampoo x 930ml", "Suave", "perfumeria", 18000, 2250, 8, "SUAVE Shampoo x 930ml — bulto x8", "suave-shampoo-x-930ml", {}),
  p("SUAVE Acondicionador x 930ml", "Suave", "perfumeria", 18000, 2250, 8, "SUAVE Acondicionador x 930ml — bulto x8", "suave-acondicionador-x-930ml", {}),
  p("Talco Efficient REXONA x 100Grs", "Rexona", "perfumeria", 41880, 3490, 12, "Talco Efficient REXONA x 100Grs — bulto x12", "talco-efficient-rexona-x-100grs", {}),
  p("Toallitas CALIPSO C/A x 8 unidades", "Calipso", "perfumeria", 47000, 940, 50, "Toallitas CALIPSO C/A x 8 unidades — bulto x50", "toallitas-calipso-c-a-x-8-unidades", {}),
  p("Alfafort 28 Grs", "Alfafort", "chocolates", 19710, 821.25, 24, "Alfafort 28 Grs — bulto x24", "alfafort-28-grs", {}),
  p("Bananina 15Grs", "Bananina", "chocolates", 12370, 412.33, 30, "Bananina 15Grs — bulto x30", "bananina-15grs", {}),
  p("Bananina Split 15Grs", "Bananina", "chocolates", 12370, 412.33, 30, "Bananina Split 15Grs — bulto x30", "bananina-split-15grs", {}),
  p("Barrita Espacial Fort 24Grs", "Barrita", "chocolates", 22150, 1107.50, 20, "Barrita Espacial Fort 24Grs — bulto x20", "barrita-espacial-fort-24grs", {}),
  p("Bocadito Delicia 10Grs", "Bocadito", "chocolates", 13850, 288.54, 48, "Bocadito Delicia 10Grs — bulto x48", "bocadito-delicia-10grs", {}),
  p("Bocadito Marroc 14Grs", "Bocadito", "chocolates", 34420, 573.67, 60, "Bocadito Marroc 14Grs — bulto x60", "bocadito-marroc-14grs", {}),
  p("Bocadito Marroc Cric 14Grs", "Bocadito", "chocolates", 34420, 573.67, 60, "Bocadito Marroc Cric 14Grs — bulto x60", "bocadito-marroc-cric-14grs", {}),
  p("Bocadito Cericet 19Grs", "Bocadito", "chocolates", 37480, 1561.67, 24, "Bocadito Cericet 19Grs — bulto x24", "bocadito-cericet-19grs", {}),
  p("Botellitas Whisky 24Grs", "Botellitas", "chocolates", 23460, 1173, 20, "Botellitas Whisky 24Grs — bulto x20", "botellitas-whisky-24grs", {}),
  p("Bombonera en Caja 264Grs", "Bombonera", "chocolates", 13960, 13960, 1, "Bombonera en Caja 264Grs — bulto x1", "bombonera-en-caja-264grs", {}),
  p("Bombón D'OR 12Grs", "Bombón", "chocolates", 11890, 396.33, 30, "Bombón D'OR 12Grs — bulto x30", "bombon-d-or-12grs", {}),
  p("Cerealfort 23Grs", "Cerealfort", "chocolates", 10990, 457.92, 24, "Cerealfort 23Grs — bulto x24", "cerealfort-23grs", {}),
  p("Chocolate Clasico 70% Cacao 50Grs", "Chocolate", "chocolates", 52000, 3250, 16, "Chocolate Clasico 70% Cacao 50Grs — bulto x16", "chocolate-clasico-70-cacao-50grs", {}),
  p("Choc.Leche y Mani 75Grs", "Choc.Leche", "chocolates", 28350, 2835, 10, "Choc.Leche y Mani 75Grs — bulto x10", "choc-leche-y-mani-75grs", {}),
  p("Chupelatin 15Grs", "Chupelatin", "chocolates", 28720, 897.50, 32, "Chupelatin 15Grs — bulto x32", "chupelatin-15grs", {}),
  p("Diabfort / Fort Diet Leche 20 x 50grs", "Diabfort", "chocolates", 67030, 3351.50, 20, "Diabfort / Fort Diet Leche 20 x 50grs — bulto x20", "diabfort-fort-diet-leche-20-x-50grs", {}),
  p("Dos Corazones 26Grs", "Dos", "chocolates", 20460, 1023, 20, "Dos Corazones 26Grs — bulto x20", "dos-corazones-26grs", {}),
  p("Feeling 20Grs", "Feeling", "chocolates", 15990, 533, 30, "Feeling 20Grs — bulto x30", "feeling-20grs", {}),
  p("Fort Chocolate C/Maní 30Grs", "Fort", "chocolates", 13300, 1108.33, 12, "Fort Chocolate C/Maní 30Grs — bulto x12", "fort-chocolate-c-mani-30grs", {}),
  p("Jack Chocolate con sorpresa", "Jack", "chocolates", 27750, 1387.50, 20, "Jack Chocolate con sorpresa — bulto x20", "jack-chocolate-con-sorpresa", {}),
  p("Jackelin 14Grs", "Jackelin", "chocolates", 22460, 748.67, 30, "Jackelin 14Grs — bulto x30", "jackelin-14grs", {}),
  p("Kooky Bon 10Grs", "Kooky", "chocolates", 8670, 289, 30, "Kooky Bon 10Grs — bulto x30", "kooky-bon-10grs", {}),
  p("Licorfort Whisky 13Grs", "Licorfort", "chocolates", 22460, 748.67, 30, "Licorfort Whisky 13Grs — bulto x30", "licorfort-whisky-13grs", {}),
  p("Licoritas 20Grs", "Licoritas", "chocolates", 19990, 799.60, 25, "Licoritas 20Grs — bulto x25", "licoritas-20grs", {}),
  p("Mentitas 16Grs", "Mentitas", "chocolates", 14170, 472.33, 30, "Mentitas 16Grs — bulto x30", "mentitas-16grs", {}),
  p("Medallon Dulce de Leche 21 GRS", "Grs", "chocolates", 15180, 759, 20, "Medallon Dulce de Leche 21 GRS — bulto x20", "medallon-dulce-de-leche-21-grs", {}),
  p("Nobel 35Grs", "Nobel", "chocolates", 17160, 1144, 15, "Nobel 35Grs — bulto x15", "nobel-35grs", {}),
  p("Paraguitas 13Grs", "Paraguitas", "chocolates", 23580, 589.50, 40, "Paraguitas 13Grs — bulto x40", "paraguitas-13grs", {}),
  p("Piratas 5Grs", "Piratas", "chocolates", 19340, 322.33, 60, "Piratas 5Grs — bulto x60", "piratas-5grs", {}),
  p("Refresco Clasico 27Grs", "Refresco", "chocolates", 5390, 449.17, 12, "Refresco Clasico 27Grs — bulto x12", "refresco-clasico-27grs", {}),
  p("Refresco Tutti 27Grs", "Refresco", "chocolates", 5390, 449.17, 12, "Refresco Tutti 27Grs — bulto x12", "refresco-tutti-27grs", {}),
  p("Tableta de Chocolate con Leche y Maní 250grs", "Tableta", "chocolates", 63040, 7880, 8, "Tableta de Chocolate con Leche y Maní 250grs — bulto x8", "tableta-de-chocolate-con-leche-y-mani-25", {}),
  p("Tivis 25Grs", "Tivis", "chocolates", 15570, 778.50, 20, "Tivis 25Grs — bulto x20", "tivis-25grs", {}),
  p("Torroncino 23Grs", "Torroncino", "chocolates", 41890, 1396.33, 30, "Torroncino 23Grs — bulto x30", "torroncino-23grs", {}),
  p("Vino Huella Pampa Blanco Dulce", "Huellapampa", "vinos-espumantes", 14700, 2450, 6, "Botella 750 ml", "huellapampa-blanco-dulce-750", {}),
  p("FABRE MONTMAYOU TERRUÑO Cabernet Franc 750ml", "Fabre Montmayou", "vinos-espumantes", 47950, 7991.67, 6, "FABRE MONTMAYOU TERRUÑO Cabernet Franc 750ml — bulto x6", "fabre-montmayou-terruno-cabernet-franc-7", {}),
  p("FABRE MONTMAYOU TERRUÑO Malbec 750ml", "Fabre Montmayou", "vinos-espumantes", 47950, 7991.67, 6, "FABRE MONTMAYOU TERRUÑO Malbec 750ml — bulto x6", "fabre-montmayou-terruno-malbec-750ml", {}),
  p("Vino Salentein Reserva Malbec 750ml", "Salentein", "vinos-espumantes", 53500, 53500, 1, "Botella 750 ml", "salentein-reserva-malbec-750ml", { etiqueta: "nuevo" }),
  p("Vino Cavic Blanco Tetra 1Lts", "Cavic", "vinos-espumantes", 15100, 1258.33, 12, "Cavic Blanco Tetra 1Lts — bulto x12", "cavic-blanco-tetra-1lts", {}),
  p("Vino Cavic Tinto Tetra 1Lts", "Cavic", "vinos-espumantes", 13000, 1083.33, 12, "Cavic Tinto Tetra 1Lts — bulto x12", "cavic-tinto-tetra-1lts", {}),
  p("Vino Bodega Privada Malbec EPICO RESERVA 750cc", "Bodega Privada", "vinos-espumantes", 33540, 5590, 6, "Bodega Privada Malbec EPICO RESERVA 750cc — bulto x6", "bodega-privada-malbec-epico-reserva-750c", { etiqueta: "nuevo" }),
  p("Doña Paula Estate Malbec 750ml", "Doña Paula", "vinos-espumantes", 34050, 5675, 6, "Doña Paula Estate Malbec 750ml — bulto x6", "dona-paula-estate-malbec-750ml", {}),
  p("Doña Paula Estate Black Blend 750ml", "Doña Paula", "vinos-espumantes", 34050, 5675, 6, "Doña Paula Estate Black Blend 750ml — bulto x6", "dona-paula-estate-black-blend-750ml", {}),
  p("Doña Paula Estate Cabernet 750ml", "Doña Paula", "vinos-espumantes", 34050, 5675, 6, "Doña Paula Estate Cabernet 750ml — bulto x6", "dona-paula-estate-cabernet-750ml", {}),
  p("Doña Paula Estate Sauvignon Blanc 750ml", "Doña Paula", "vinos-espumantes", 34050, 5675, 6, "Doña Paula Estate Sauvignon Blanc 750ml — bulto x6", "dona-paula-estate-sauvignon-blanc-750ml", {}),
  p("Doña Paula Estate Blue Blend 750ml", "Doña Paula", "vinos-espumantes", 34050, 5675, 6, "Doña Paula Estate Blue Blend 750ml — bulto x6", "dona-paula-estate-blue-blend-750ml", {}),
  p("Fideos Monte Lirio Nido N°1 x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Fideos Monte Lirio Nido N°1 x 500G — bulto x10", "monte-lirio-nido-n1-x-500g", {}),
  p("Fideos Monte Lirio Nido N°2 x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Fideos Monte Lirio Nido N°2 x 500G — bulto x10", "monte-lirio-nido-n2-x-500g", {}),
  p("Fideos Monte Lirio Nido N°3 x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Fideos Monte Lirio Nido N°3 x 500G — bulto x10", "monte-lirio-nido-n3-x-500g", {}),
  p("Fideos Monte Lirio Nido N°4 x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Fideos Monte Lirio Nido N°4 x 500G — bulto x10", "monte-lirio-nido-n4-x-500g", {}),
  p("Fideos Monte Lirio Espinaca N°2 x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Fideos Monte Lirio Espinaca N°2 x 500G — bulto x10", "monte-lirio-espinaca-n2-x-500g", {}),
  p("Fideos Monte Lirio Cabello de Ángel x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Fideos Monte Lirio Cabello de Ángel x 500G — bulto x10", "monte-lirio-cabello-de-angel-x-500g", {}),
  p("Fideos Monte Lirio Palitos N°1 x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Fideos Monte Lirio Palitos N°1 x 500G — bulto x10", "monte-lirio-palitos-n1-x-500g", {}),
  p("Fideos Monte Lirio Palitos N°1 Espinaca x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Fideos Monte Lirio Palitos N°1 Espinaca x 500G — bulto x10", "monte-lirio-palitos-n1-espinaca-x-500g", {}),
  p("Fideos Monte Lirio Dobladitos N°2 x 500G", "Monte Lirio", "fideos", 18950, 1895, 10, "Fideos Monte Lirio Dobladitos N°2 x 500G — bulto x10", "monte-lirio-dobladitos-n2-x-500g", {}),
  p("Fideos Don Vicente Tallarin x 500Grs", "Don Vicente", "fideos", 27800, 2780, 10, "Fideos Don Vicente Tallarin x 500Grs — bulto x10", "fideos-don-vicente-tallarin-x-500grs", {}),
  p("Nuez Moscada en grano x 2 uni", "Nuez Moscada", "condimentos", 66000, 1320, 50, "Nuez Moscada en grano x 2 uni — bulto x50", "nuez-moscada-en-grano-x-2-uni", {}),
  p("Sazonador Knorr Limon y Oregano x 21Grs", "Knorr", "condimentos", 2472, 103, 24, "Sazonador Knorr Limon y Oregano x 21Grs — bulto x24", "sazonador-knorr-limon-y-oregano-x-21grs", {}),
  p("Sazonador Knorr Criollo x 21Grs", "Knorr", "condimentos", 2472, 103, 24, "Sazonador Knorr Criollo x 21Grs — bulto x24", "sazonador-knorr-criollo-x-21grs", {}),
  p("Fernet Vittone 750ml", "Vittone", "bebidas-alcohol", 68040, 5670, 12, "Fernet Vittone 750ml — bulto x12", "fernet-vittone-750ml", {}),
  p("Brancamenta 750ml", "Branca", "bebidas-alcohol", 156000, 13000, 12, "Brancamenta 750ml — bulto x12", "brancamenta-750ml", {}),
  p("Gin Spirito Blu x 700cc", "Spirito", "bebidas-alcohol", 96000, 16000, 6, "Gin Spirito Blu x 700cc — bulto x6", "gin-spirito-blu-x-700cc", {}),
  p("Famous Grouse Finest x 700ml", "Famous Grouse", "bebidas-alcohol", 84510, 14085, 6, "Famous Grouse Finest x 700ml — bulto x6", "famous-grouse-finest-x-700ml", {}),
  p("Punt e Mes 750ml", "Punt e Mes", "bebidas-alcohol", 41010, 6835, 6, "Punt e Mes 750ml — bulto x6", "punt-e-mes-750ml", {}),
  p("Iguana Rubia 1Lts", "Iguana", "cervezas", 28500, 2375, 12, "Iguana Rubia 1Lts — bulto x12", "iguana-rubia-1lts", {}),
  p("Palermo Liviana 1Lts", "Palermo", "cervezas", 28500, 2375, 12, "Palermo Liviana 1Lts — bulto x12", "palermo-liviana-1lts", {}),
  p("Lata Warsteiner 473cc", "Warsteiner", "cervezas", 37500, 1562.50, 24, "Lata Warsteiner 473cc — bulto x24", "lata-warsteiner-473cc", {}),
  p("Leche Entera 7 DIAS 1L", "7 Dias", "almacen", 12990, 1623.75, 8, "Leche Entera 7 DIAS 1L — bulto x8", "leche-entera-7-dias-1l", {}),
  p("Yerba Cruz de Malta x 500Grs", "Cruz de Malta", "almacen", 17470, 1747, 10, "Yerba Cruz de Malta x 500Grs — bulto x10", "yerba-cruz-de-malta-x-500grs", {}),
  p("Yerba La Cumbrecita Naranja x 500Grs", "La Cumbrecita", "almacen", 11590, 1159, 10, "Yerba La Cumbrecita Naranja x 500Grs — bulto x10", "yerba-la-cumbrecita-naranja-x-500grs", {}),
  p("Yerba La Cumbrecita Menta x 500Grs", "La Cumbrecita", "almacen", 11590, 1159, 10, "Yerba La Cumbrecita Menta x 500Grs — bulto x10", "yerba-la-cumbrecita-menta-x-500grs", {}),
  p("Azucar Finca El Lazo 1Kg", "Finca El Lazo", "almacen", 71000, 7100, 10, "Azucar Finca El Lazo 1Kg — bulto x10", "azucar-finca-el-lazo-1kg", {}),
  p("Cóctel 4 Frutas Punta Estación x 820Grs", "Punta Estación", "almacen", 23604, 1967, 12, "Cóctel 4 Frutas Punta Estación x 820Grs — bulto x12", "coctel-4-frutas-punta-estacion-x-820grs", {}),
  p("Aceite Morixe Oliva 500ml", "Morixe", "almacen", 42720, 7120, 6, "Aceite Morixe Oliva 500ml — bulto x6", "aceite-morixe-oliva-500ml", {}),
  p("Pure de papa Centurion x 100Grs", "Centurion", "almacen", 18480, 1540, 12, "Pure de papa Centurion x 100Grs — bulto x12", "pure-de-papa-centurion-x-100grs", {}),
  p("Savora DP x 500Grs", "Savora", "almacen", 58800, 2450, 24, "Savora DP x 500Grs — bulto x24", "savora-dp-x-500grs", {}),
  p("Celusal Sal Gruesa Paquete x 500Grs", "Celusal", "almacen", 30300, 1010, 30, "Celusal Sal Gruesa Paquete x 500Grs — bulto x30", "celusal-sal-gruesa-paquete-x-500grs", {}),
  p("Atun Desmenuzado al Natural BAHIA x 170Grs", "Bahia", "almacen", 81120, 1690, 48, "Atun Desmenuzado al Natural BAHIA x 170Grs — bulto x48", "atun-desmenuzado-al-natural-bahia-x-170g", {}),
  p("ZIPLOC Bolsa Conserva Grande x 10 uni", "Ziploc", "almacen", 4650, 4650, 1, "ZIPLOC Bolsa Conserva Grande x 10 uni", "ziploc-bolsa-conserva-grande-x-10-uni", {}),
  p("ZIPLOC Bolsa Multipack x 9 uni", "Ziploc", "almacen", 4650, 4650, 1, "ZIPLOC Bolsa Multipack x 9 uni", "ziploc-bolsa-multipack-x-9-uni", {}),
  p("Jabon Liquido Concentrado GRANBY 500ml", "Granby", "limpieza", 4200, 4200, 1, "Jabon Liquido Concentrado GRANBY 500ml", "jabon-liquido-concentrado-granby-500ml", {}),
  p("Esponja Salvauñas GLOW x 24 unidades", "Glow", "limpieza", 11600, 483.33, 24, "Esponja Salvauñas GLOW x 24 unidades — bulto x24", "esponja-salvaunas-glow-x-24-unidades", {}),
  p("Esponja de acero GLOW 10Grs", "Glow", "limpieza", 5280, 440, 12, "Esponja de acero GLOW 10Grs — bulto x12", "esponja-de-acero-glow-10grs", {}),
  p("Guante Multiuso GLOW", "Glow", "limpieza", 2621, 2621, 1, "Guante Multiuso GLOW", "guante-multiuso-glow", {}),
  p("Jabon ALA Camelilto Doy Pack 120ML", "Ala", "limpieza", 950, 950, 1, "Jabon ALA Camelilto Doy Pack 120ML", "jabon-ala-camelilto-doy-pack-120ml", {}),
  p("Glade Pisos Bidón x 4 Litros", "Glade", "limpieza", 10650, 10650, 1, "Glade Pisos Bidón x 4 Litros", "glade-pisos-bidon-x-4-litros", {}),
  p("POETT Limpia Pisos x 4Lts", "Poett", "limpieza", 83280, 27760, 3, "POETT Limpia Pisos x 4Lts — bulto x3", "poett-limpia-pisos-x-4lts", {}),
  p("RAID 45 Noches Repuesto Electrico x 32,9ml", "Raid", "limpieza", 6450, 6450, 1, "RAID 45 Noches Repuesto Electrico x 32,9ml", "raid-45-noches-repuesto-electrico-x-32-9", {}),
  p("RAID Aparato P/Tableta Económico", "Raid", "limpieza", 7215, 7215, 1, "RAID Aparato P/Tableta Económico", "raid-aparato-p-tableta-economico", {}),
  p("Vino Toro Tinto Tetra 1L", "Toro", "vinos-espumantes", 20910, 1742.50, 12, "Vino Toro Tinto Tetra 1L — bulto x12", "toro-tinto-tetra-1l", {}),
  p("Fideos Lucchetti Spaghetti x 500Grs", "Lucchetti", "fideos", 22400, 1120, 20, "Fideos Lucchetti Spaghetti x 500Grs — bulto x20", "fideos-lucchetti-spaghetti-x-500grs", {}),
  p("Huevo Jack Mafalda 14Grs", "Jack", "chocolates", 23910, 2391, 10, "Huevo Jack Mafalda 14Grs — bulto x10", "huevo-jack-mafalda-14grs", {}),
  p("Fort Mint 14Grs", "Fort", "chocolates", 22460, 748.67, 30, "Fort Mint 14Grs — bulto x30", "fort-mint-14grs", {}),
];
function p(nombre, marca, categoria, precioBulto, precioUnidad, unidBulto, presentacion, sku, extra) {
  extra = extra || {};
  return {
    nombre,
    marca,
    categoria,
    precio: precioBulto,        // precio grande de la tarjeta = precio por bulto (usado también en el carrito/WhatsApp)
    precioUnidad,                // precio chico de la tarjeta = precio por unidad individual
    unidBulto,
    presentacion,
    sku,
    imagen: `images/productos/${sku}.jpg`,
    descripcion: `${nombre} — ${presentacion}. Venta mayorista por bulto cerrado (x${unidBulto}).`,
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
  cart: {}, // { sku: cantidad }  → cantidad = cantidad de BULTOS
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
   Precio GRANDE = por bulto · Precio CHICO = por unidad
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
          <span class="product-card__sku">x${prod.unidBulto} x bulto</span>
        </div>
        <h3 class="product-card__name">${prod.nombre}</h3>
        <p class="product-card__pres">${prod.presentacion}</p>
        <div class="product-card__footer">
          <div class="product-card__price"><small>${money(prod.precioUnidad)} c/u</small>${money(prod.precio)}</div>
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
   12) CARRITO — las cantidades son en BULTOS; el precio unitario del carrito
   es el precio por bulto (prod.precio)
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
            <div class="cart-item__pres">${prod.presentacion} (bulto x${prod.unidBulto})</div>
            <div class="cart-item__qty">
              <button class="qty-btn" data-qty-minus="${sku}" aria-label="Quitar un bulto">−</button>
              <span class="cart-item__qtynum">${qty}</span>
              <button class="qty-btn" data-qty-plus="${sku}" aria-label="Sumar un bulto">+</button>
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
    return `• ${qty}x bulto ${prod.nombre} (${prod.presentacion}) — ${money(prod.precio * qty)}`;
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
   14.1) CONFIRMACIÓN DE PEDIDO
   ========================================================================== */
function injectConfirmModalStyles() {
  if (document.getElementById("confirmModalStyles")) return;
  const style = document.createElement("style");
  style.id = "confirmModalStyles";
  style.textContent = `
    .confirm-overlay {
      position: fixed; inset: 0;
      background: rgba(21,22,26,0.55);
      z-index: 120;
      display: flex; align-items: center; justify-content: center;
      padding: 20px;
      opacity: 0; pointer-events: none;
      transition: opacity 0.25s ease;
    }
    .confirm-overlay.active { opacity: 1; pointer-events: auto; }
    .confirm-modal {
      background: var(--paper-alt, #fffdf9);
      border-radius: 18px;
      max-width: 460px;
      width: 100%;
      max-height: 86vh;
      overflow-y: auto;
      padding: 26px 26px 22px;
      box-shadow: 0 24px 48px -16px rgba(21,22,26,0.35);
      transform: translateY(16px);
      transition: transform 0.25s ease;
    }
    .confirm-overlay.active .confirm-modal { transform: translateY(0); }
    .confirm-modal h3 {
      font-family: var(--font-display, inherit);
      font-size: 20px;
      margin: 0 0 4px;
    }
    .confirm-modal p.confirm-sub {
      font-size: 13.5px;
      color: var(--steel, #3d4a5c);
      margin: 0 0 18px;
    }
    .confirm-list {
      list-style: none;
      margin: 0 0 16px;
      padding: 0;
      border-top: 1px solid var(--line, rgba(21,22,26,0.12));
    }
    .confirm-list li {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid var(--line, rgba(21,22,26,0.12));
      font-size: 13.5px;
    }
    .confirm-list li .qty {
      font-family: var(--font-mono, monospace);
      font-weight: 700;
      color: var(--amber-dark, #c07f1f);
      margin-right: 8px;
    }
    .confirm-list li .name { flex: 1; }
    .confirm-list li .subtotal { font-family: var(--font-mono, monospace); font-weight: 600; white-space: nowrap; }
    .confirm-total {
      display: flex; justify-content: space-between; align-items: baseline;
      font-weight: 700; font-size: 17px; margin-bottom: 18px;
    }
    .confirm-field { margin-bottom: 14px; }
    .confirm-field label {
      display: block; font-size: 12.5px; font-weight: 600;
      color: var(--steel, #3d4a5c); margin-bottom: 6px;
    }
    .confirm-field input {
      width: 100%;
      border: 1.5px solid var(--line, rgba(21,22,26,0.12));
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
    }
    .confirm-field input:focus {
      outline: none;
      border-color: var(--amber-dark, #c07f1f);
    }
    .confirm-actions { display: flex; gap: 10px; margin-top: 4px; }
    .confirm-actions .btn { flex: 1; }
  `;
  document.head.appendChild(style);
}

function buildConfirmModal() {
  if (document.getElementById("confirmOverlay")) return;
  injectConfirmModalStyles();
  const overlay = document.createElement("div");
  overlay.className = "confirm-overlay";
  overlay.id = "confirmOverlay";
  overlay.innerHTML = `
    <div class="confirm-modal" role="dialog" aria-modal="true" aria-label="Confirmar pedido">
      <h3>Confirmá tu pedido</h3>
      <p class="confirm-sub">Revisá que las cantidades sean correctas antes de enviarlo por WhatsApp.</p>
      <ul class="confirm-list" id="confirmList"></ul>
      <div class="confirm-total">
        <span>Total</span>
        <strong id="confirmTotal">$0</strong>
      </div>
      <div class="confirm-field">
        <label for="confirmName">Nombre y apellido</label>
        <input type="text" id="confirmName" placeholder="Ej: Juan Pérez" autocomplete="name">
      </div>
      <div class="confirm-field">
        <label for="confirmCity">Ciudad</label>
        <input type="text" id="confirmCity" placeholder="Ej: Burzaco" autocomplete="address-level2">
      </div>
      <div class="confirm-field">
        <label for="confirmAddress">Dirección exacta</label>
        <input type="text" id="confirmAddress" placeholder="Ej: Av. Siempre Viva 742" autocomplete="street-address">
      </div>
      <div class="confirm-field">
        <label for="confirmCrossStreets">Entre calles</label>
        <input type="text" id="confirmCrossStreets" placeholder="Ej: entre San Martín y Belgrano">
      </div>
      <div class="confirm-actions">
        <button class="btn btn--ghost" id="confirmCancelBtn" type="button">Volver a revisar</button>
        <button class="btn btn--whatsapp" id="confirmSendBtn" type="button" style="flex:1.3;">Confirmar y enviar</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeConfirmModal();
  });
  document.getElementById("confirmCancelBtn").addEventListener("click", closeConfirmModal);
  document.getElementById("confirmSendBtn").addEventListener("click", confirmAndSendOrder);
}

function openConfirmModal() {
  if (cartCount() === 0) {
    showToast("Tu pedido está vacío");
    return;
  }
  buildConfirmModal();
  const overlay = document.getElementById("confirmOverlay");
  const list = document.getElementById("confirmList");

  list.innerHTML = Object.entries(state.cart).map(([sku, qty]) => {
    const prod = PRODUCTS.find((prd) => prd.sku === sku);
    if (!prod) return "";
    return `
      <li>
        <span><span class="qty">${qty}x</span><span class="name">${prod.nombre}</span></span>
        <span class="subtotal">${money(prod.precio * qty)}</span>
      </li>`;
  }).join("");

  document.getElementById("confirmTotal").textContent = money(cartTotal());

  const nameInput = document.getElementById("confirmName");
  nameInput.value = state.contactName || "";
  document.getElementById("confirmCity").value = state.contactCity || "";
  document.getElementById("confirmAddress").value = state.contactAddress || "";
  document.getElementById("confirmCrossStreets").value = state.contactCrossStreets || "";

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  setTimeout(() => nameInput.focus(), 50);
}

function closeConfirmModal() {
  const overlay = document.getElementById("confirmOverlay");
  if (!overlay) return;
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function confirmAndSendOrder() {
  const name = document.getElementById("confirmName").value.trim();
  const city = document.getElementById("confirmCity").value.trim();
  const address = document.getElementById("confirmAddress").value.trim();
  const crossStreets = document.getElementById("confirmCrossStreets").value.trim();

  state.contactName = name;
  state.contactCity = city;
  state.contactAddress = address;
  state.contactCrossStreets = crossStreets;

  const infoLines = [];
  if (name) infoLines.push(`Nombre: ${name}`);
  if (city) infoLines.push(`Ciudad: ${city}`);
  if (address) infoLines.push(`Dirección: ${address}`);
  if (crossStreets) infoLines.push(`Entre calles: ${crossStreets}`);

  const message = infoLines.length
    ? [...infoLines, "", buildOrderMessage()].join("\n")
    : buildOrderMessage();

  const url = buildWhatsappLink(message);
  window.open(url, "_blank", "noopener");
  closeConfirmModal();
  closeCart();
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

  document.getElementById("filterMarca").addEventListener("change", (e) => {
    state.marca = e.target.value;
    renderCatalog();
  });

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    state.orden = e.target.value;
    renderCatalog();
  });

  document.getElementById("filterDestacados").addEventListener("change", (e) => {
    state.soloDestacados = e.target.checked;
    renderCatalog();
  });

  document.getElementById("clearFiltersBtn").addEventListener("click", () => {
    state.search = ""; state.categoria = "todas"; state.marca = "todas"; state.soloDestacados = false; state.orden = "relevancia";
    searchInput.value = ""; searchInputMobile.value = "";
    document.getElementById("filterMarca").value = "todas";
    document.getElementById("sortSelect").value = "relevancia";
    document.getElementById("filterDestacados").checked = false;
    syncCategoryChips();
    renderCatalog();
  });

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

  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("cartEmptyLink").addEventListener("click", closeCart);
  document.getElementById("cartClearBtn").addEventListener("click", clearCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeNav(); closeConfirmModal(); } });

  document.getElementById("whatsappBtn").addEventListener("click", openConfirmModal);

  [document.getElementById("floatingInstagram"), document.getElementById("footerInstagram")].forEach((el) => {
    if (!el) return;
    el.href = INSTAGRAM_URL;
    el.target = "_blank";
    el.rel = "noopener";
  });

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
      if (el.id === "heroOrderBtn" && cartCount() > 0) {
        e.preventDefault();
        openConfirmModal();
      }
    });
  });

  document.getElementById("hamburgerBtn").addEventListener("click", () => {
    const isOpen = document.getElementById("nav").classList.contains("open");
    isOpen ? closeNav() : openNav();
  });
  document.getElementById("navOverlay").addEventListener("click", closeNav);
  document.querySelectorAll(".nav__link").forEach((link) => link.addEventListener("click", closeNav));

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
}

/* ==========================================================================
   19.1) AJUSTES VISUALES DEL HERO
   ========================================================================== */
function applyHeroTweaks() {
  const style = document.createElement("style");
  style.id = "heroTweaksStyles";
  style.textContent = `
    .hero__visual .crate,
    .hero .crate--a,
    .hero .crate--b {
      display: none !important;
    }
    .hero::before {
      filter: none !important;
      opacity: 0.9 !important;
    }
    .hero {
      background: #6f9633 !important;
    }
    .hero__title {
      color: #12190c !important;
    }
    .hero__subtitle {
      color: #12190c !important;
      text-shadow: none !important;
    }
  `;
  document.head.appendChild(style);
}

/* ==========================================================================
   20) INIT
   ========================================================================== */
function init() {
  document.getElementById("year").textContent = new Date().getFullYear();
  applyHeroTweaks();
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

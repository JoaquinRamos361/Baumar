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
   ========================================================================== */
const PRODUCTS = [
  // === PRODUCTOS CON FOTO REAL (no modificar nombre/sku/imagen) ===
  p("Vino Tinto Toro", "Toro", "vinos-espumantes", 2000, 2000, 1, "Tetra Brik 1 L", "toro-tinto-1l", { destacado: true }),
  p("Vino Tinto Huellapampa Malbec", "Huellapampa", "vinos-espumantes", 5000, 5000, 1, "Botella 750 ml", "huellapampa-malbec-750", { destacado: true, etiqueta: "nuevo" }),
  p("Vino Tinto Uvita", "Uvita", "vinos-espumantes", 13602, 2267, 6, "Botella 1,125 L", "uvita-tinto-1125", { destacado: true, etiqueta: "oferta" }),
  p("Jugo de Naranja 100% Exprimido", "Baggio", "bebidas-sin-alcohol", 32400, 2700, 12, "Tetra Pak 1 L", "baggio-naranja-1l", { destacado: true, etiqueta: "oferta" }),
  p("Agua de mesa FRESH x 600CC", "Fresh", "bebidas-sin-alcohol", 3100.00, 516.67, 6, "Agua de mesa FRESH x 600CC — bulto x6", "agua-de-mesa-fresh-x-600cc"),
  p("Agua de mesa FRESH x 1.5L", "Fresh", "bebidas-sin-alcohol", 4500.00, 750.00, 6, "Agua de mesa FRESH x 1.5L — bulto x6", "agua-de-mesa-fresh-x-1-5l"),
  p("Agua de mesa FRESH x 6.5L", "Fresh", "bebidas-sin-alcohol", 3900.00, 1950.00, 2, "Agua de mesa FRESH x 6.5L — bulto x2", "agua-de-mesa-fresh-x-6-5l"),
  p("Agua VIDA By BAGGIO x 1.5L", "Vida", "bebidas-sin-alcohol", 4500.00, 750.00, 6, "Agua VIDA By BAGGIO x 1.5L — bulto x6", "agua-vida-by-baggio-x-1-5l"),
  p("BAGGIO PRONTO x 1,5 Lts Multifruta", "Baggio", "bebidas-sin-alcohol", 15970.00, 1996.25, 8, "BAGGIO PRONTO x 1,5 Lts Multifruta — bulto x8", "baggio-pronto-x-1-5-lts-multifruta"),
  p("BAGGIO PRONTO x 1Lts Naranja/ Mixfrutal", "Baggio", "bebidas-sin-alcohol", 12500.00, 1562.50, 8, "BAGGIO PRONTO x 1Lts Naranja/ Mixfrutal — bulto x8", "baggio-pronto-x-1lts-naranja-mixfrutal"),
  p("BAGGIO PRONTO x 200cc Manzana/ Mixfrutal/ Naranja/ Pera/ Durazno", "Baggio", "bebidas-sin-alcohol", 8300.00, 461.11, 18, "BAGGIO PRONTO x 200cc Manzana/ Mixfrutal/ Naranja/ Pera/ Durazno — bulto x18", "baggio-pronto-x-200cc-manzana-mixfrutal-"),
  p("BAGGIO FRESH LIVIANO Naranja x 200cc", "Baggio", "bebidas-sin-alcohol", 5691.00, 316.17, 18, "BAGGIO FRESH LIVIANO Naranja x 200cc — bulto x18", "baggio-fresh-liviano-naranja-x-200cc"),
  p("BAGGIO FRESH GASEOSA x 2.25Lts Cola/ Lima/ Naranja/ Pomelo/ Citrus", "Baggio", "bebidas-sin-alcohol", 8100.00, 1350.00, 6, "BAGGIO FRESH GASEOSA x 2.25Lts Cola/ Lima/ Naranja/ Pomelo/ Citrus — bulto x6", "baggio-fresh-gaseosa-x-2-25lts-cola-lima"),
  p("BAGGIO LATTE Leche entera x 200cc", "Baggio", "bebidas-sin-alcohol", 6450.00, 358.33, 18, "BAGGIO LATTE Leche entera x 200cc — bulto x18", "baggio-latte-leche-entera-x-200cc"),
  p("BAGGIO LATTE Leche entera x 1Lts", "Baggio", "bebidas-sin-alcohol", 11640.00, 1455.00, 8, "BAGGIO LATTE Leche entera x 1Lts — bulto x8", "baggio-latte-leche-entera-x-1lts"),
  p("BAGGIO LATTE Leche Chocolatada x 200cc", "Baggio", "bebidas-sin-alcohol", 9770.00, 542.78, 18, "BAGGIO LATTE Leche Chocolatada x 200cc — bulto x18", "baggio-latte-leche-chocolatada-x-200cc"),
  p("BAGGIO FORZA 500cc", "Baggio", "bebidas-sin-alcohol", 6200.00, 1033.33, 6, "BAGGIO FORZA 500cc — bulto x6", "baggio-forza-500cc"),
  p("COCA COLA /FANTA /SPRITE/ COCA LIGHT-CERO x 2.25Lts", "Coca", "bebidas-sin-alcohol", 27480.00, 4580.00, 6, "COCA COLA /FANTA /SPRITE/ COCA LIGHT-CERO x 2.25Lts — bulto x6", "coca-cola-fanta-sprite-coca-light-cero-x"),
  p("COCA COLA /FANTA /SPRITE/ COCA LIGHT-CERO x 1.5Lts", "Coca", "bebidas-sin-alcohol", 29690.00, 3711.25, 8, "COCA COLA /FANTA /SPRITE/ COCA LIGHT-CERO x 1.5Lts — bulto x8", "coca-cola-fanta-sprite-coca-light-cero-x-2"),
  p("COCA COLA /FANTA /SPRITE/ COCA LIGHT-CERO x 500CC", "Coca", "bebidas-sin-alcohol", 23240.00, 1936.67, 12, "COCA COLA /FANTA /SPRITE/ COCA LIGHT-CERO x 500CC — bulto x12", "coca-cola-fanta-sprite-coca-light-cero-x-3"),
  p("CUNNINGTON x 2.25Lts Cola/ Lima/ Naranja/ Pomelo/ Lights", "Cunnington", "bebidas-sin-alcohol", 10050.00, 1675.00, 6, "CUNNINGTON x 2.25Lts Cola/ Lima/ Naranja/ Pomelo/ Lights — bulto x6", "cunnington-x-2-25lts-cola-lima-naranja-p"),
  p("FRESH x 1.5Lts Limone/ Manzana/ Multi/ Naranja/ Pera/ Pomelo", "Fresh", "bebidas-sin-alcohol", 6870.00, 1145.00, 6, "FRESH x 1.5Lts Limone/ Manzana/ Multi/ Naranja/ Pera/ Pomelo — bulto x6", "fresh-x-1-5lts-limone-manzana-multi-nara"),
  p("FRESH x 600cc Naranja/ Pomelo/ Manzana/ Cero", "Fresh", "bebidas-sin-alcohol", 4780.00, 796.67, 6, "FRESH x 600cc Naranja/ Pomelo/ Manzana/ Cero — bulto x6", "fresh-x-600cc-naranja-pomelo-manzana-cer"),
  p("POWERADE x 500cc", "Powerade", "bebidas-sin-alcohol", 10880.00, 1813.33, 6, "POWERADE x 500cc — bulto x6", "powerade-x-500cc"),
  p("POWERADE x 995cc", "Powerade", "bebidas-sin-alcohol", 18560.00, 3093.33, 6, "POWERADE x 995cc — bulto x6", "powerade-x-995cc"),
  p("Prep. MOCORETA (NARANJA) 1,5Lts", "Mocoreta", "bebidas-sin-alcohol", 8700.00, 1450.00, 6, "Prep. MOCORETA (NARANJA) 1,5Lts — bulto x6", "prep-mocoreta-naranja-1-5lts"),
  p("SPEED x 250cc", "Speed", "bebidas-sin-alcohol", 32540.00, 1355.83, 24, "SPEED x 250cc — bulto x24", "speed-x-250cc"),
  p("SPEED XL 473cc", "Speed", "bebidas-sin-alcohol", 26870.00, 2239.17, 12, "SPEED XL 473cc — bulto x12", "speed-xl-473cc"),
  p("Soda FRESH 2.5Lts", "Fresh", "bebidas-sin-alcohol", 4530.00, 755.00, 6, "Soda FRESH 2.5Lts — bulto x6", "soda-fresh-2-5lts"),
  p("Soda Sifón TORASSO 2Lts", "Torasso", "bebidas-sin-alcohol", 7160.00, 1193.33, 6, "Soda Sifón TORASSO 2Lts — bulto x6", "soda-sifon-torasso-2lts"),
  p("VIDA by BAGGIO Saborizada 1.5Lts", "Vida", "bebidas-sin-alcohol", 5830.00, 971.67, 6, "VIDA by BAGGIO Saborizada 1.5Lts — bulto x6", "vida-by-baggio-saborizada-1-5lts"),
  p("VIDA by BAGGIO Saborizada 600cc", "Vida", "bebidas-sin-alcohol", 3670.00, 611.67, 6, "VIDA by BAGGIO Saborizada 600cc — bulto x6", "vida-by-baggio-saborizada-600cc"),
  p("BRAHMA 1Lts", "Brahma", "cervezas", 36500.00, 3041.67, 12, "BRAHMA 1Lts — bulto x12", "brahma-1lts"),
  p("ISENBECK Lata 473", "Isenbeck", "cervezas", 27000.00, 1125.00, 24, "ISENBECK Lata 473 — bulto x24", "isenbeck-lata-473"),
  p("AMSTEL Lata 473", "Amstel", "cervezas", 36000.00, 1500.00, 24, "AMSTEL Lata 473 — bulto x24", "amstel-lata-473"),
  p("SCHNEIDER Lata 473cc", "Schneider", "cervezas", 36500.00, 1520.83, 24, "SCHNEIDER Lata 473cc — bulto x24", "schneider-lata-473cc"),
  p("AS DE PICAS Malbec 750ml", "Picas", "vinos-espumantes", 18370.00, 3061.67, 6, "AS DE PICAS Malbec 750ml — bulto x6", "as-de-picas-malbec-750ml"),
  p("BODEGA PRIVADA TRADICIONAL Malbec/Cabernet 750cc", "Bodega", "vinos-espumantes", 20000.00, 3333.33, 6, "BODEGA PRIVADA TRADICIONAL Malbec/Cabernet 750cc — bulto x6", "bodega-privada-tradicional-malbec-cabern"),
  p("BODEGA PRIVADA COLECCIÓN 750cc", "Bodega", "vinos-espumantes", 20600.00, 3433.33, 6, "BODEGA PRIVADA COLECCIÓN 750cc — bulto x6", "bodega-privada-coleccion-750cc"),
  p("CANCILLER BLEND Tinto x 750ml", "Canciller", "vinos-espumantes", 15930.00, 2655.00, 6, "CANCILLER BLEND Tinto x 750ml — bulto x6", "canciller-blend-tinto-x-750ml"),
  p("CANCILLER BLANCO DULCE 1125ml", "Canciller", "vinos-espumantes", 15930.00, 2655.00, 6, "CANCILLER BLANCO DULCE 1125ml — bulto x6", "canciller-blanco-dulce-1125ml"),
  p("CANCILLER XXV BLEND DULCE x 750ml (ESPUMOSO)", "Canciller", "vinos-espumantes", 17800.00, 2966.67, 6, "CANCILLER XXV BLEND DULCE x 750ml (ESPUMOSO) — bulto x6", "canciller-xxv-blend-dulce-x-750ml-espumo"),
  p("CANCILLER XXV EXTRA BRUT x 750ml", "Canciller", "vinos-espumantes", 17800.00, 2966.67, 6, "CANCILLER XXV EXTRA BRUT x 750ml — bulto x6", "canciller-xxv-extra-brut-x-750ml"),
  p("CENIZA NEGRA Malbec / Chenin Dulce 750ml", "Ceniza", "vinos-espumantes", 15820.00, 2636.67, 6, "CENIZA NEGRA Malbec / Chenin Dulce 750ml — bulto x6", "ceniza-negra-malbec-chenin-dulce-750ml"),
  p("DILEMA Malbec 750ml", "Dilema", "vinos-espumantes", 16800.00, 2800.00, 6, "DILEMA Malbec 750ml — bulto x6", "dilema-malbec-750ml"),
  p("DILEMA Dulce Natural Blanco/ Rosado x 750ml", "Dilema", "vinos-espumantes", 18200.00, 3033.33, 6, "DILEMA Dulce Natural Blanco/ Rosado x 750ml — bulto x6", "dilema-dulce-natural-blanco-rosado-x-750"),
  p("EL ESTANCIERO Malbec 750ml", "Estanciero", "vinos-espumantes", 15840.00, 2640.00, 6, "EL ESTANCIERO Malbec 750ml — bulto x6", "el-estanciero-malbec-750ml"),
  p("ESTANCIA MENDOZA - Bivarietales (CAB-MAL / MER-MAL) x 750ml", "Estancia", "vinos-espumantes", 15640.00, 2606.67, 6, "ESTANCIA MENDOZA - Bivarietales (CAB-MAL / MER-MAL) x 750ml — bulto x6", "estancia-mendoza-bivarietales-cab-mal-me"),
  p("ESTANCIA MENDOZA Blanco/Blanco D. x 750ml", "Estancia", "vinos-espumantes", 15820.00, 2636.67, 6, "ESTANCIA MENDOZA Blanco/Blanco D. x 750ml — bulto x6", "estancia-mendoza-blanco-blanco-d-x-750ml"),
  p("ESTANCIA MENDOZA Malbec / Cabernet / Chardonnay x 750ml", "Estancia", "vinos-espumantes", 13880.00, 2313.33, 6, "ESTANCIA MENDOZA Malbec / Cabernet / Chardonnay x 750ml — bulto x6", "estancia-mendoza-malbec-cabernet-chardon"),
  p("FINCA GABRIEL Malbec Roble / Cosecha Tardía 750ML", "Finca", "vinos-espumantes", 25970.00, 4328.33, 6, "FINCA GABRIEL Malbec Roble / Cosecha Tardía 750ML — bulto x6", "finca-gabriel-malbec-roble-cosecha-tardi"),
  p("FINCA MAGNOLIA Malbec 750ml", "Finca", "vinos-espumantes", 21110.00, 3518.33, 6, "FINCA MAGNOLIA Malbec 750ml — bulto x6", "finca-magnolia-malbec-750ml"),
  p("MAGENTA Malbec 750ml", "Magenta", "vinos-espumantes", 30770.00, 5128.33, 6, "MAGENTA Malbec 750ml — bulto x6", "magenta-malbec-750ml"),
  p("MANOJO DE UVAS Tetra Tinto x 1Lts", "Manojo", "vinos-espumantes", 16930.00, 1410.83, 12, "MANOJO DE UVAS Tetra Tinto x 1Lts — bulto x12", "manojo-de-uvas-tetra-tinto-x-1lts"),
  p("MANOJO DE UVAS Tetra Blanco x 1Lts", "Manojo", "vinos-espumantes", 14630.00, 1219.17, 12, "MANOJO DE UVAS Tetra Blanco x 1Lts — bulto x12", "manojo-de-uvas-tetra-blanco-x-1lts"),
  p("MOSCATO PROMESA x 700ml", "Moscato", "vinos-espumantes", 16790.00, 2798.33, 6, "MOSCATO PROMESA x 700ml — bulto x6", "moscato-promesa-x-700ml"),
  p("NATIVO Tinto Tetra X 1Lts", "Nativo", "vinos-espumantes", 17400.00, 1450.00, 12, "NATIVO Tinto Tetra X 1Lts — bulto x12", "nativo-tinto-tetra-x-1lts"),
  p("NINA GOLD Cabernet Franc 750ml", "Nina", "vinos-espumantes", 33010.00, 5501.67, 6, "NINA GOLD Cabernet Franc 750ml — bulto x6", "nina-gold-cabernet-franc-750ml"),
  p("NINA GOLD Cab-Malbec / Malbec / Chardonnay 750ml", "Nina", "vinos-espumantes", 33010.00, 5501.67, 6, "NINA GOLD Cab-Malbec / Malbec / Chardonnay 750ml — bulto x6", "nina-gold-cab-malbec-malbec-chardonnay-7"),
  p("PRIVADO Malbec Roble 750ml", "Privado", "vinos-espumantes", 42820.00, 7136.67, 6, "PRIVADO Malbec Roble 750ml — bulto x6", "privado-malbec-roble-750ml"),
  p("RESERO Tinto/ Blanco Dulce x 1125ml", "Resero", "vinos-espumantes", 11645.00, 1940.83, 6, "RESERO Tinto/ Blanco Dulce x 1125ml — bulto x6", "resero-tinto-blanco-dulce-x-1125ml"),
  p("RESERO Tetra Tinto x 1Lts", "Resero", "vinos-espumantes", 17570.00, 1464.17, 12, "RESERO Tetra Tinto x 1Lts — bulto x12", "resero-tetra-tinto-x-1lts"),
  p("RESERO Tetra Blanco x 1Lts", "Resero", "vinos-espumantes", 13930.00, 1160.83, 12, "RESERO Tetra Blanco x 1Lts — bulto x12", "resero-tetra-blanco-x-1lts"),
  p("RICORDI Malbec 750ML", "Ricordi", "vinos-espumantes", 20840.00, 3473.33, 6, "RICORDI Malbec 750ML — bulto x6", "ricordi-malbec-750ml"),
  p("RICORDI Espumante Brut Nature 750ML", "Ricordi", "vinos-espumantes", 36990.00, 6165.00, 6, "RICORDI Espumante Brut Nature 750ML — bulto x6", "ricordi-espumante-brut-nature-750ml"),
  p("SAN HUBERTO CLASICO Malbec / Cabernet 750ml", "San", "vinos-espumantes", 14930.00, 2488.33, 6, "SAN HUBERTO CLASICO Malbec / Cabernet 750ml — bulto x6", "san-huberto-clasico-malbec-cabernet-750m"),
  p("SAN HUBERTO CLASICO Blanco Dulce / Rosado 750ml", "San", "vinos-espumantes", 16360.00, 2726.67, 6, "SAN HUBERTO CLASICO Blanco Dulce / Rosado 750ml — bulto x6", "san-huberto-clasico-blanco-dulce-rosado-"),
  p("SANTA FILOMENA Tinto Patero 1125ml", "Santa", "vinos-espumantes", 15530.00, 2588.33, 6, "SANTA FILOMENA Tinto Patero 1125ml — bulto x6", "santa-filomena-tinto-patero-1125ml"),
  p("TALACASTO Tetra Tinto / Blanco x 1Lts", "Talacasto", "vinos-espumantes", 15100.00, 1258.33, 12, "TALACASTO Tetra Tinto / Blanco x 1Lts — bulto x12", "talacasto-tetra-tinto-blanco-x-1lts"),
  p("TORO Clasico Tinto x 750ml", "Toro", "vinos-espumantes", 12600.00, 2100.00, 6, "TORO Clasico Tinto x 750ml — bulto x6", "toro-clasico-tinto-x-750ml"),
  p("TORO Clasico Blanco x 700ml", "Toro", "vinos-espumantes", 9665.00, 1610.83, 6, "TORO Clasico Blanco x 700ml — bulto x6", "toro-clasico-blanco-x-700ml"),
  p("TORO Tetra Blanco x 1Lts", "Toro", "vinos-espumantes", 15310.00, 1275.83, 12, "TORO Tetra Blanco x 1Lts — bulto x12", "toro-tetra-blanco-x-1lts"),
  p("TORO Tinto (EX-930) 700ML", "Toro", "vinos-espumantes", 10400.00, 1733.33, 6, "TORO Tinto (EX-930) 700ML — bulto x6", "toro-tinto-ex-930-700ml"),
  p("TORO Tinto (EX930) 1Lts", "Toro", "vinos-espumantes", 14000.00, 2333.33, 6, "TORO Tinto (EX930) 1Lts — bulto x6", "toro-tinto-ex930-1lts"),
  p("TORO Clasico Tinto x 1125ml", "Toro", "vinos-espumantes", 15850.00, 2641.67, 6, "TORO Clasico Tinto x 1125ml — bulto x6", "toro-clasico-tinto-x-1125ml"),
  p("UVITA Blanco/B. Dulce 1Lts", "Uvita", "vinos-espumantes", 16660.00, 1388.33, 12, "UVITA Blanco/B. Dulce 1Lts — bulto x12", "uvita-blanco-b-dulce-1lts"),
  p("UVITA Tinto /T. Dulce 1Lts", "Uvita", "vinos-espumantes", 16660.00, 1388.33, 12, "UVITA Tinto /T. Dulce 1Lts — bulto x12", "uvita-tinto-t-dulce-1lts"),
  p("VIÑA MAYOR Blend Tinto 700ml", "Viña", "vinos-espumantes", 8770.00, 1461.67, 6, "VIÑA MAYOR Blend Tinto 700ml — bulto x6", "vina-mayor-blend-tinto-700ml"),
  p("ZUMUVA Tetra Tinto x 1 Lts", "Zumuva", "vinos-espumantes", 15900.00, 1325.00, 12, "ZUMUVA Tetra Tinto x 1 Lts — bulto x12", "zumuva-tetra-tinto-x-1-lts"),
  p("ZUMUVA Tetra Blanco/ Blanco Dulce x 1 Lts", "Zumuva", "vinos-espumantes", 15900.00, 1325.00, 12, "ZUMUVA Tetra Blanco/ Blanco Dulce x 1 Lts — bulto x12", "zumuva-tetra-blanco-blanco-dulce-x-1-lts"),
  p("Fernet BRANCA x 750ml", "Branca", "bebidas-alcohol", 177240.00, 14770.00, 12, "Fernet BRANCA x 750ml — bulto x12", "fernet-branca-x-750ml"),
  p("Fernet BRANCA x 450ml", "Branca", "bebidas-alcohol", 121800.00, 10150.00, 12, "Fernet BRANCA x 450ml — bulto x12", "fernet-branca-x-450ml"),
  p("Fernet BRANCA Menta x 450ml", "Branca", "bebidas-alcohol", 103200.00, 8600.00, 12, "Fernet BRANCA Menta x 450ml — bulto x12", "fernet-branca-menta-x-450ml"),
  p("CARPANO Rosso/Bianco x 950ml", "Carpano", "bebidas-alcohol", 45000.00, 7500.00, 6, "CARPANO Rosso/Bianco x 950ml — bulto x6", "carpano-rosso-bianco-x-950ml"),
  p("Vodka SERNOVA Original x 700ml", "Sernova", "bebidas-alcohol", 82800.00, 6900.00, 12, "Vodka SERNOVA Original x 700ml — bulto x12", "vodka-sernova-original-x-700ml"),
  p("Vodka SERNOVA Wild Berries/Sweet Apple/Trop.Passion x 700ml", "Sernova", "bebidas-alcohol", 45840.00, 7640.00, 6, "Vodka SERNOVA Wild Berries/Sweet Apple/Trop.Passion x 700ml — bulto x6", "vodka-sernova-wild-berries-sweet-apple-t"),
  p("Alfajores Guaymallen Chocolate / Dulce de Leche", "Alfajores", "galletitas", 9970.00, 249.25, 40, "Alfajores Guaymallen Chocolate / Dulce de Leche — bulto x40", "alfajores-guaymallen-chocolate-dulce-de-"),
  p("Alfajores Guaymallen TRIPLE Chocolate / Dulce de Leche", "Triple", "galletitas", 9970.00, 415.42, 24, "Alfajores Guaymallen TRIPLE Chocolate / Dulce de Leche — bulto x24", "alfajores-guaymallen-triple-chocolate-du"),
  p("Alfajor Capitan del Espacio Chocolate / Dulce de Leche", "Alfajor", "galletitas", 43900.00, 1219.44, 36, "Alfajor Capitan del Espacio Chocolate / Dulce de Leche — bulto x36", "alfajor-capitan-del-espacio-chocolate-du"),
  p("Alfajor Capitan del Espacio TRIPLE", "Triple", "galletitas", 44500.00, 1854.17, 24, "Alfajor Capitan del Espacio TRIPLE — bulto x24", "alfajor-capitan-del-espacio-triple"),
  p("Don Satur Bizcochos/ Agridulce/ Negritas X 200GRS", "Don", "galletitas", 33300.00, 1110.00, 30, "Don Satur Bizcochos/ Agridulce/ Negritas X 200GRS — bulto x30", "don-satur-bizcochos-agridulce-negritas-x"),
  p("Don Satur Magdalena x 220Grs", "Don", "galletitas", 22700.00, 2270.00, 10, "Don Satur Magdalena x 220Grs — bulto x10", "don-satur-magdalena-x-220grs"),
  p("Don Satur Talitas x 140g", "Don", "galletitas", 22000.00, 1100.00, 20, "Don Satur Talitas x 140g — bulto x20", "don-satur-talitas-x-140g"),
  p("Arroz Gallo PARBOIL Oro 500 Grs", "Gallo", "arroz", 13610.00, 1361.00, 10, "Arroz Gallo PARBOIL Oro 500 Grs — bulto x10", "arroz-gallo-parboil-oro-500-grs"),
  p("Arroz Lucchetti Largo fino 500Grs", "Lucchetti", "arroz", 8840.00, 884.00, 10, "Arroz Lucchetti Largo fino 500Grs — bulto x10", "arroz-lucchetti-largo-fino-500grs"),
  p("Monte Lirio x 500G", "Monte Lirio", "fideos", 18950.00, 1895.00, 10, "Monte Lirio x 500G — bulto x10", "monte-lirio-x-500g"),
  p("Monte Lirio Moños x 500G", "Monte Lirio", "fideos", 22050.00, 2205.00, 10, "Monte Lirio Moños x 500G — bulto x10", "monte-lirio-monos-x-500g"),
  p("Lucchetti Ave Maria/ Dedalito/ Municion/ Letritas x 500GRS", "Lucchetti", "fideos", 16050.00, 1070.00, 15, "Lucchetti Ave Maria/ Dedalito/ Municion/ Letritas x 500GRS — bulto x15", "lucchetti-ave-maria-dedalito-municion-le"),
  p("Lucchetti Tirabuzon/ Mostachol/ Codito x 500Grs", "Lucchetti", "fideos", 16800.00, 1120.00, 15, "Lucchetti Tirabuzon/ Mostachol/ Codito x 500Grs — bulto x15", "lucchetti-tirabuzon-mostachol-codito-x-5"),
  p("Lucchetti Tallarin/Spaghetti x 500Grs", "Lucchetti", "fideos", 22400.00, 1120.00, 20, "Lucchetti Tallarin/Spaghetti x 500Grs — bulto x20", "lucchetti-tallarin-spaghetti-x-500grs"),
  p("Adobo para Pizzas x 20Grs", "Adobo", "condimentos", 24000.00, 480.00, 50, "Adobo para Pizzas x 20Grs — bulto x50", "adobo-para-pizzas-x-20grs"),
  p("Aji Molido x 25Grs", "Aji", "condimentos", 28000.00, 560.00, 50, "Aji Molido x 25Grs — bulto x50", "aji-molido-x-25grs"),
  p("Azucar Impalpable x 200Grs", "Azucar", "condimentos", 8900.00, 890.00, 10, "Azucar Impalpable x 200Grs — bulto x10", "azucar-impalpable-x-200grs"),
  p("Bicarbonato de Sodio x 50Grs", "Bicarbonato", "condimentos", 19000.00, 380.00, 50, "Bicarbonato de Sodio x 50Grs — bulto x50", "bicarbonato-de-sodio-x-50grs"),
  p("Chimi Churri Deshidratado x 25Grs", "Chimi", "condimentos", 23500.00, 470.00, 50, "Chimi Churri Deshidratado x 25Grs — bulto x50", "chimi-churri-deshidratado-x-25grs"),
  p("Coco Rayado x 25Grs", "Coco", "condimentos", 34000.00, 680.00, 50, "Coco Rayado x 25Grs — bulto x50", "coco-rayado-x-25grs"),
  p("Comino Molido x 25Grs", "Comino", "condimentos", 26500.00, 530.00, 50, "Comino Molido x 25Grs — bulto x50", "comino-molido-x-25grs"),
  p("Extracto de Vainilla x 100cc", "Extracto", "condimentos", 29760.00, 1240.00, 24, "Extracto de Vainilla x 100cc — bulto x24", "extracto-de-vainilla-x-100cc"),
  p("Granas para Reposteria x 50Grs", "Granas", "condimentos", 32500.00, 650.00, 50, "Granas para Reposteria x 50Grs — bulto x50", "granas-para-reposteria-x-50grs"),
  p("Grageas para Reposteria x 50Grs", "Grageas", "condimentos", 36000.00, 720.00, 50, "Grageas para Reposteria x 50Grs — bulto x50", "grageas-para-reposteria-x-50grs"),
  p("Oregano x 25Grs", "Oregano", "condimentos", 29500.00, 590.00, 50, "Oregano x 25Grs — bulto x50", "oregano-x-25grs"),
  p("Pimenton Seleccionado x 25Grs", "Pimenton", "condimentos", 26000.00, 520.00, 50, "Pimenton Seleccionado x 25Grs — bulto x50", "pimenton-seleccionado-x-25grs"),
  p("Pimienta Blanca Molida x 50Grs", "Pimienta", "condimentos", 101500.00, 2030.00, 50, "Pimienta Blanca Molida x 50Grs — bulto x50", "pimienta-blanca-molida-x-50grs"),
  p("Pimienta Negra Molida x 25grs", "Pimienta", "condimentos", 69000.00, 1380.00, 50, "Pimienta Negra Molida x 25grs — bulto x50", "pimienta-negra-molida-x-25grs"),
  p("Polvo para Hornear Centurion x 50Grs", "Polvo", "condimentos", 26500.00, 530.00, 50, "Polvo para Hornear Centurion x 50Grs — bulto x50", "polvo-para-hornear-centurion-x-50grs"),
  p("Provenzal Deshidratado x 25Grs", "Provenzal", "condimentos", 32000.00, 640.00, 50, "Provenzal Deshidratado x 25Grs — bulto x50", "provenzal-deshidratado-x-25grs"),
  p("Aceite de Oliva La Posta del Olivo 500cc", "Aceite", "almacen", 59820.00, 9970.00, 6, "Aceite de Oliva La Posta del Olivo 500cc — bulto x6", "aceite-de-oliva-la-posta-del-olivo-500cc"),
  p("Aceite de Oliva La Posta del Olivo 250cc", "Aceite", "almacen", 34740.00, 5790.00, 6, "Aceite de Oliva La Posta del Olivo 250cc — bulto x6", "aceite-de-oliva-la-posta-del-olivo-250cc"),
  p("Atun Desmenuzado al Natural / en aceite MORIXE lata x 170Grs", "Morixe", "almacen", 60000.00, 1250.00, 48, "Atun Desmenuzado al Natural / en aceite MORIXE lata x 170Grs — bulto x48", "atun-desmenuzado-al-natural-en-aceite-mo"),
  p("Atun en Lomitos en Aceite/Natural MORIXE lata x 170Grs", "Morixe", "almacen", 105600.00, 2200.00, 48, "Atun en Lomitos en Aceite/Natural MORIXE lata x 170Grs — bulto x48", "atun-en-lomitos-en-aceite-natural-morixe"),
  p("Cafe Arlintan x 50Grs", "Cafe", "almacen", 38280.00, 3190.00, 12, "Cafe Arlintan x 50Grs — bulto x12", "cafe-arlintan-x-50grs"),
  p("Cafe Arlintan x 100Grs", "Cafe", "almacen", 50880.00, 4240.00, 12, "Cafe Arlintan x 100Grs — bulto x12", "cafe-arlintan-x-100grs"),
  p("Caldo Knorr Verdura/Gallina x 2uni x 24", "Caldo", "almacen", 11830.00, 492.92, 24, "Caldo Knorr Verdura/Gallina x 2uni x 24 — bulto x24", "caldo-knorr-verdura-gallina-x-2uni-x-24"),
  p("Choclo Amarillo en granos Bahia X 300Grs", "Choclo", "almacen", 42960.00, 1790.00, 24, "Choclo Amarillo en granos Bahia X 300Grs — bulto x24", "choclo-amarillo-en-granos-bahia-x-300grs"),
  p("Dulce de Membrillo De La Huerta Baggio x 2Kg", "Dulce", "almacen", 4930.00, 4930.00, 1, "Dulce de Membrillo De La Huerta Baggio x 2Kg — bulto x1", "dulce-de-membrillo-de-la-huerta-baggio-x"),
  p("Dulce de Membrillo De La Huerta Baggio x 5Kg", "Dulce", "almacen", 13420.00, 13420.00, 1, "Dulce de Membrillo De La Huerta Baggio x 5Kg — bulto x1", "dulce-de-membrillo-de-la-huerta-baggio-x-2"),
  p("Dulce de Membrillo 7 Dias Baggio x 2Kg", "Dulce", "almacen", 13420.00, 13420.00, 1, "Dulce de Membrillo 7 Dias Baggio x 2Kg — bulto x1", "dulce-de-membrillo-7-dias-baggio-x-2kg"),
  p("Dulce de Membrillo 7 Dias Baggio x 5Kg", "Dulce", "almacen", 12570.00, 12570.00, 1, "Dulce de Membrillo 7 Dias Baggio x 5Kg — bulto x1", "dulce-de-membrillo-7-dias-baggio-x-5kg"),
  p("Edulcorante SiDiet Clasico x 200cc", "Edulcorante", "almacen", 5900.00, 983.33, 6, "Edulcorante SiDiet Clasico x 200cc — bulto x6", "edulcorante-sidiet-clasico-x-200cc"),
  p("Edulcorante SiDiet Clasico x 250cc", "Edulcorante", "almacen", 6860.00, 1143.33, 6, "Edulcorante SiDiet Clasico x 250cc — bulto x6", "edulcorante-sidiet-clasico-x-250cc"),
  p("Edulcorante SiDiet Clasico x 500cc", "Edulcorante", "almacen", 11000.00, 1833.33, 6, "Edulcorante SiDiet Clasico x 500cc — bulto x6", "edulcorante-sidiet-clasico-x-500cc"),
  p("Edulcorante SiDiet Clasico x 600cc", "Edulcorante", "almacen", 12690.00, 2115.00, 6, "Edulcorante SiDiet Clasico x 600cc — bulto x6", "edulcorante-sidiet-clasico-x-600cc"),
  p("Edulcorante SiDiet Stevia x 200cc", "Edulcorante", "almacen", 7080.00, 1180.00, 6, "Edulcorante SiDiet Stevia x 200cc — bulto x6", "edulcorante-sidiet-stevia-x-200cc"),
  p("Edulcorante SiDiet Stevia x 250cc", "Edulcorante", "almacen", 8280.00, 1380.00, 6, "Edulcorante SiDiet Stevia x 250cc — bulto x6", "edulcorante-sidiet-stevia-x-250cc"),
  p("Edulcorante SI-Diet Stevia 600cc", "Edulcorante", "almacen", 15040.00, 2506.67, 6, "Edulcorante SI-Diet Stevia 600cc — bulto x6", "edulcorante-si-diet-stevia-600cc"),
  p("Endulzante SI LIGHT CLASICO 500cc", "Light", "almacen", 8810.00, 1468.33, 6, "Endulzante SI LIGHT CLASICO 500cc — bulto x6", "endulzante-si-light-clasico-500cc"),
  p("Endulzante SI LIGHT CLASICO 600cc", "Light", "almacen", 10160.00, 1693.33, 6, "Endulzante SI LIGHT CLASICO 600cc — bulto x6", "endulzante-si-light-clasico-600cc"),
  p("Endulzante SI LIGHT STEVIA 500cc", "Light", "almacen", 10420.00, 1736.67, 6, "Endulzante SI LIGHT STEVIA 500cc — bulto x6", "endulzante-si-light-stevia-500cc"),
  p("Endulzante SI LIGHT STEVIA 600cc", "Light", "almacen", 12040.00, 2006.67, 6, "Endulzante SI LIGHT STEVIA 600cc — bulto x6", "endulzante-si-light-stevia-600cc"),
  p("Encendedores Candela x 25 Unidades", "Encendedores", "almacen", 8490.00, 339.60, 25, "Encendedores Candela x 25 Unidades — bulto x25", "encendedores-candela-x-25-unidades"),
  p("Encendedores Okey x 25 Unidades", "Encendedores", "almacen", 5820.00, 232.80, 25, "Encendedores Okey x 25 Unidades — bulto x25", "encendedores-okey-x-25-unidades"),
  p("Harina Morixe 000 1Kg", "Harina", "almacen", 8150.00, 815.00, 10, "Harina Morixe 000 1Kg — bulto x10", "harina-morixe-000-1kg"),
  p("Harina Morixe 0000 1Kg", "Harina", "almacen", 10470.00, 1047.00, 10, "Harina Morixe 0000 1Kg — bulto x10", "harina-morixe-0000-1kg"),
  p("Harina Morixe Integral 1Kg", "Harina", "almacen", 9950.00, 995.00, 10, "Harina Morixe Integral 1Kg — bulto x10", "harina-morixe-integral-1kg"),
  p("Harina Morixe Leudante 1Kg", "Harina", "almacen", 13410.00, 1341.00, 10, "Harina Morixe Leudante 1Kg — bulto x10", "harina-morixe-leudante-1kg"),
  p("Harina Morixe para pizza 1Kg", "Harina", "almacen", 13000.00, 1300.00, 10, "Harina Morixe para pizza 1Kg — bulto x10", "harina-morixe-para-pizza-1kg"),
  p("Jugo de Limón Minerva x 250cc", "Jugo", "almacen", 19920.00, 1660.00, 12, "Jugo de Limón Minerva x 250cc — bulto x12", "jugo-de-limon-minerva-x-250cc"),
  p("Jugo Tang x 20 Uni.", "Jugo", "almacen", 7320.00, 366.00, 20, "Jugo Tang x 20 Uni. — bulto x20", "jugo-tang-x-20-uni"),
  p("Jugo Clight x 20 Uni", "Jugo", "almacen", 7690.00, 384.50, 20, "Jugo Clight x 20 Uni — bulto x20", "jugo-clight-x-20-uni"),
  p("Ketchup Hellmans x 60GRS", "Ketchup", "almacen", 23150.00, 771.67, 30, "Ketchup Hellmans x 60GRS — bulto x30", "ketchup-hellmans-x-60grs"),
  p("Ketchup Hellmans x 250Grs", "Ketchup", "almacen", 46080.00, 1920.00, 24, "Ketchup Hellmans x 250Grs — bulto x24", "ketchup-hellmans-x-250grs"),
  p("Lentejas Secas BAHIA Lata x 300Grs", "Bahia", "almacen", 33120.00, 1380.00, 24, "Lentejas Secas BAHIA Lata x 300Grs — bulto x24", "lentejas-secas-bahia-lata-x-300grs"),
  p("Maizena x 220Grs", "Maizena", "almacen", 101500.00, 2030.00, 50, "Maizena x 220Grs — bulto x50", "maizena-x-220grs"),
  p("Mate Cocido CRISF 25 Saquitos", "Crisf", "almacen", 6950.00, 695.00, 10, "Mate Cocido CRISF 25 Saquitos — bulto x10", "mate-cocido-crisf-25-saquitos"),
  p("Mate Cocido Nobleza Gaucha 25 uni", "Mate", "almacen", 8520.00, 852.00, 10, "Mate Cocido Nobleza Gaucha 25 uni — bulto x10", "mate-cocido-nobleza-gaucha-25-uni"),
  p("Mayonesa Hellmans x 118Grs", "Mayonesa", "almacen", 15300.00, 765.00, 20, "Mayonesa Hellmans x 118Grs — bulto x20", "mayonesa-hellmans-x-118grs"),
  p("Mayonesa Hellmans x 237GRS", "Mayonesa", "almacen", 33200.00, 1383.33, 24, "Mayonesa Hellmans x 237GRS — bulto x24", "mayonesa-hellmans-x-237grs"),
  p("Mayonesa Natura x 125Grs", "Mayonesa", "almacen", 11500.00, 575.00, 20, "Mayonesa Natura x 125Grs — bulto x20", "mayonesa-natura-x-125grs"),
  p("Mayonesa Natura x 250Grs", "Mayonesa", "almacen", 17030.00, 1419.17, 12, "Mayonesa Natura x 250Grs — bulto x12", "mayonesa-natura-x-250grs"),
  p("Mermelada Baggio De La Huerta 454Grs", "Mermelada", "almacen", 9480.00, 1580.00, 6, "Mermelada Baggio De La Huerta 454Grs — bulto x6", "mermelada-baggio-de-la-huerta-454grs"),
  p("Mostaza Savora DP x 250Grs", "Mostaza", "almacen", 34320.00, 1430.00, 24, "Mostaza Savora DP x 250Grs — bulto x24", "mostaza-savora-dp-x-250grs"),
  p("Pan Rallado Morixe 500Grs", "Pan", "almacen", 10440.00, 870.00, 12, "Pan Rallado Morixe 500Grs — bulto x12", "pan-rallado-morixe-500grs"),
  p("Pimientos Morrones BAHIA x 185Grs", "Bahia", "almacen", 79440.00, 3310.00, 24, "Pimientos Morrones BAHIA x 185Grs — bulto x24", "pimientos-morrones-bahia-x-185grs"),
  p("Pure De Papa Knorr x 125grs", "Pure", "almacen", 28320.00, 2360.00, 12, "Pure De Papa Knorr x 125grs — bulto x12", "pure-de-papa-knorr-x-125grs"),
  p("Pulpa de Tomate De La Huerta x 205cc", "Pulpa", "almacen", 4880.00, 271.11, 18, "Pulpa de Tomate De La Huerta x 205cc — bulto x18", "pulpa-de-tomate-de-la-huerta-x-205cc"),
  p("Pulpa de Tomate De La Huerta x 520cc", "Pulpa", "almacen", 4870.00, 405.83, 12, "Pulpa de Tomate De La Huerta x 520cc — bulto x12", "pulpa-de-tomate-de-la-huerta-x-520cc"),
  p("Pulpa de Tomate De La Huerta x 1018cc", "Pulpa", "almacen", 6260.00, 782.50, 8, "Pulpa de Tomate De La Huerta x 1018cc — bulto x8", "pulpa-de-tomate-de-la-huerta-x-1018cc"),
  p("Pulpa de Tomate 7 Dias x 205cc", "Pulpa", "almacen", 4740.00, 263.33, 18, "Pulpa de Tomate 7 Dias x 205cc — bulto x18", "pulpa-de-tomate-7-dias-x-205cc"),
  p("Pulpa de Tomate 7 Días x 520cc", "Pulpa", "almacen", 5350.00, 445.83, 12, "Pulpa de Tomate 7 Días x 520cc — bulto x12", "pulpa-de-tomate-7-dias-x-520cc"),
  p("Pulpa de Tomate 7 Días x 1018cc", "Pulpa", "almacen", 6070.00, 758.75, 8, "Pulpa de Tomate 7 Días x 1018cc — bulto x8", "pulpa-de-tomate-7-dias-x-1018cc"),
  p("Pure de Tomate De La Huerta x 210cc", "Pure", "almacen", 8250.00, 458.33, 18, "Pure de Tomate De La Huerta x 210cc — bulto x18", "pure-de-tomate-de-la-huerta-x-210cc"),
  p("Pure de Tomate De La Huerta x 530cc", "Pure", "almacen", 9400.00, 783.33, 12, "Pure de Tomate De La Huerta x 530cc — bulto x12", "pure-de-tomate-de-la-huerta-x-530cc"),
  p("Pure de Tomate De La Huerta x 1030cc", "Pure", "almacen", 11680.00, 1460.00, 8, "Pure de Tomate De La Huerta x 1030cc — bulto x8", "pure-de-tomate-de-la-huerta-x-1030cc"),
  p("Pure de Tomate 7 Días x 210cc", "Pure", "almacen", 5900.00, 327.78, 18, "Pure de Tomate 7 Días x 210cc — bulto x18", "pure-de-tomate-7-dias-x-210cc"),
  p("Pure de Tomate 7 Días x 530cc", "Pure", "almacen", 6330.00, 527.50, 12, "Pure de Tomate 7 Días x 530cc — bulto x12", "pure-de-tomate-7-dias-x-530cc"),
  p("Te Crysf Pack S/Ens 25 uni", "Te", "almacen", 5650.00, 565.00, 10, "Te Crysf Pack S/Ens 25 uni — bulto x10", "te-crysf-pack-s-ens-25-uni"),
  p("Sal Fina Celusal Paquete x 500Grs", "Sal", "almacen", 35100.00, 1170.00, 30, "Sal Fina Celusal Paquete x 500Grs — bulto x30", "sal-fina-celusal-paquete-x-500grs"),
  p("Sal Entrefina Celusal Paquete x 500Grs", "Sal", "almacen", 31500.00, 1050.00, 30, "Sal Entrefina Celusal Paquete x 500Grs — bulto x30", "sal-entrefina-celusal-paquete-x-500grs"),
  p("Sal Parrillera Dos Anclas Paquete x 500Grs", "Sal", "almacen", 23040.00, 960.00, 24, "Sal Parrillera Dos Anclas Paquete x 500Grs — bulto x24", "sal-parrillera-dos-anclas-paquete-x-500g"),
  p("Sal Fina Tresal x 500Grs", "Sal", "almacen", 9600.00, 480.00, 20, "Sal Fina Tresal x 500Grs — bulto x20", "sal-fina-tresal-x-500grs"),
  p("Sal Entrefina Tresal x 1Kg", "Sal", "almacen", 8300.00, 830.00, 10, "Sal Entrefina Tresal x 1Kg — bulto x10", "sal-entrefina-tresal-x-1kg"),
  p("Sal Gruesa Tresal x 1Kg", "Sal", "almacen", 8800.00, 880.00, 10, "Sal Gruesa Tresal x 1Kg — bulto x10", "sal-gruesa-tresal-x-1kg"),
  p("Salsas Knorr Pizza 340Grs", "Salsas", "almacen", 32640.00, 1360.00, 24, "Salsas Knorr Pizza 340Grs — bulto x24", "salsas-knorr-pizza-340grs"),
  p("Sopas Caseras Knorr con Fideos 78 / 105GRS", "Sopas", "almacen", 14900.00, 1490.00, 10, "Sopas Caseras Knorr con Fideos 78 / 105GRS — bulto x10", "sopas-caseras-knorr-con-fideos-78-105grs"),
  p("Vinagre Marolio x 1Lts", "Vinagre", "almacen", 15000.00, 1250.00, 12, "Vinagre Marolio x 1Lts — bulto x12", "vinagre-marolio-x-1lts"),
  p("Vitina x 250grs", "Vitina", "almacen", 8400.00, 1400.00, 6, "Vitina x 250grs — bulto x6", "vitina-x-250grs"),
  p("Yerba Amanda x 500Grs", "Yerba", "almacen", 16980.00, 1698.00, 10, "Yerba Amanda x 500Grs — bulto x10", "yerba-amanda-x-500grs"),
  p("P/H ELEGANTE DOBLE HOJA (VIOLETA) 4/30MTS", "Elegante", "papeles", 22780.00, 2278.00, 10, "P/H ELEGANTE DOBLE HOJA (VIOLETA) 4/30MTS — bulto x10", "p-h-elegante-doble-hoja-violeta-4-30mts"),
  p("P/H ELEGANTE H/S X 80 M (VERDE) 4/80MTS", "Elegante", "papeles", 33220.00, 3322.00, 10, "P/H ELEGANTE H/S X 80 M (VERDE) 4/80MTS — bulto x10", "p-h-elegante-h-s-x-80-m-verde-4-80mts"),
  p("P/H ELEGANTE H/S X 6 (CELESTE) 6/30MTS", "Elegante", "papeles", 24240.00, 2020.00, 12, "P/H ELEGANTE H/S X 6 (CELESTE) 6/30MTS — bulto x12", "p-h-elegante-h-s-x-6-celeste-6-30mts"),
  p("P/H ELEGANTE H/S X 4 ( CELESTE) 4/30MTS", "Elegante", "papeles", 16040.00, 1336.67, 12, "P/H ELEGANTE H/S X 4 ( CELESTE) 4/30MTS — bulto x12", "p-h-elegante-h-s-x-4-celeste-4-30mts"),
  p("P/H ELEGANTE H/S 24/30mts PREMIUN ALOE", "Elegante", "papeles", 8590.00, 357.92, 24, "P/H ELEGANTE H/S 24/30mts PREMIUN ALOE — bulto x24", "p-h-elegante-h-s-24-30mts-premiun-aloe"),
  p("R/C ELEGANTE GIGANTE X 200 PAÑOS", "Elegante", "papeles", 22700.00, 1891.67, 12, "R/C ELEGANTE GIGANTE X 200 PAÑOS — bulto x12", "r-c-elegante-gigante-x-200-panos"),
  p("R/C ELEGANTE X 3 DE 50 PAÑOS (ROJO)", "Elegante", "papeles", 11980.00, 1497.50, 8, "R/C ELEGANTE X 3 DE 50 PAÑOS (ROJO) — bulto x8", "r-c-elegante-x-3-de-50-panos-rojo"),
  p("R/C DICHA X 3 DE 40 PAÑOS", "Dicha", "papeles", 15160.00, 1263.33, 12, "R/C DICHA X 3 DE 40 PAÑOS — bulto x12", "r-c-dicha-x-3-de-40-panos"),
  p("PAÑUELOS ELEGANTE POCKET D/H 6x10", "Elegante", "papeles", 24600.00, 820.00, 30, "PAÑUELOS ELEGANTE POCKET D/H 6x10 — bulto x30", "panuelos-elegante-pocket-d-h-6x10"),
  p("PAÑUELOS ELEGANTE POCKET T/H 6x10", "Elegante", "papeles", 34560.00, 1280.00, 27, "PAÑUELOS ELEGANTE POCKET T/H 6x10 — bulto x27", "panuelos-elegante-pocket-t-h-6x10"),
  p("P/H PERIPEL INDIVIDUAL H/S X 80MTS X 30 Unidades", "Peripel", "papeles", 8200.00, 273.33, 30, "P/H PERIPEL INDIVIDUAL H/S X 80MTS X 30 Unidades — bulto x30", "p-h-peripel-individual-h-s-x-80mts-x-30-"),
  p("BLEM Aerosol X 360cc", "Blem", "limpieza", 67200.00, 5600.00, 12, "BLEM Aerosol X 360cc — bulto x12", "blem-aerosol-x-360cc"),
  p("CERAMICOL Aerosol X 360cc", "Ceramicol", "limpieza", 62880.00, 5240.00, 12, "CERAMICOL Aerosol X 360cc — bulto x12", "ceramicol-aerosol-x-360cc"),
  p("CIF Antigrasa/Baño DP 450ml", "Cif", "limpieza", 22950.00, 1530.00, 15, "CIF Antigrasa/Baño DP 450ml — bulto x15", "cif-antigrasa-bano-dp-450ml"),
  p("CIF Vidrios DP 450ml", "Cif", "limpieza", 28800.00, 1920.00, 15, "CIF Vidrios DP 450ml — bulto x15", "cif-vidrios-dp-450ml"),
  p("CIF Blanco Crema X 375cc", "Cif", "limpieza", 21840.00, 1820.00, 12, "CIF Blanco Crema X 375cc — bulto x12", "cif-blanco-crema-x-375cc"),
  p("CIF GEL Desinfectante Bot x 250grs", "Cif", "limpieza", 15000.00, 1250.00, 12, "CIF GEL Desinfectante Bot x 250grs — bulto x12", "cif-gel-desinfectante-bot-x-250grs"),
  p("CIF Limpiador Desinfectante AERO x 360cm3", "Cif", "limpieza", 24240.00, 2020.00, 12, "CIF Limpiador Desinfectante AERO x 360cm3 — bulto x12", "cif-limpiador-desinfectante-aero-x-360cm"),
  p("CIF Limpiador Desinfectante GATILLO x 400ml", "Cif", "limpieza", 23520.00, 1960.00, 12, "CIF Limpiador Desinfectante GATILLO x 400ml — bulto x12", "cif-limpiador-desinfectante-gatillo-x-40"),
  p("CIF Lustramuebles Ultra Brillo GAT x 400Ml", "Cif", "limpieza", 14520.00, 1210.00, 12, "CIF Lustramuebles Ultra Brillo GAT x 400Ml — bulto x12", "cif-lustramuebles-ultra-brillo-gat-x-400"),
  p("Detergente ALA Plus x 750ml", "Ala", "limpieza", 25950.00, 1730.00, 15, "Detergente ALA Plus x 750ml — bulto x15", "detergente-ala-plus-x-750ml"),
  p("Detergente ALA Ultra x 300ml", "Ala", "limpieza", 14640.00, 1220.00, 12, "Detergente ALA Ultra x 300ml — bulto x12", "detergente-ala-ultra-x-300ml"),
  p("Detergente CIF x 300ml", "Cif", "limpieza", 23640.00, 1970.00, 12, "Detergente CIF x 300ml — bulto x12", "detergente-cif-x-300ml"),
  p("Detergente MAGISTRAL x 300ml", "Magistral", "limpieza", 46200.00, 2200.00, 21, "Detergente MAGISTRAL x 300ml — bulto x21", "detergente-magistral-x-300ml"),
  p("DRIVE Limpia Piso DP x 450cc", "Drive", "limpieza", 16500.00, 1100.00, 15, "DRIVE Limpia Piso DP x 450cc — bulto x15", "drive-limpia-piso-dp-x-450cc"),
  p("DRIVE Limpiador Multiuso DP x 450cc", "Drive", "limpieza", 6675.00, 445.00, 15, "DRIVE Limpiador Multiuso DP x 450cc — bulto x15", "drive-limpiador-multiuso-dp-x-450cc"),
  p("Espirales RAID x 12 sobres de 4 unidades", "Raid", "limpieza", 9390.00, 782.50, 12, "Espirales RAID x 12 sobres de 4 unidades — bulto x12", "espirales-raid-x-12-sobres-de-4-unidades"),
  p("Espirales RAID Estuches x 12 Unidades", "Raid", "limpieza", 56160.00, 2340.00, 24, "Espirales RAID Estuches x 12 Unidades — bulto x24", "espirales-raid-estuches-x-12-unidades"),
  p("Esponja Acero Inox. MAKE 10grs", "Make", "limpieza", 2850.00, 237.50, 12, "Esponja Acero Inox. MAKE 10grs — bulto x12", "esponja-acero-inox-make-10grs"),
  p("Esponja Dorada MAKE 10grs", "Make", "limpieza", 6480.00, 540.00, 12, "Esponja Dorada MAKE 10grs — bulto x12", "esponja-dorada-make-10grs"),
  p("Esponja Recticulada MORTIMER", "Mortimer", "limpieza", 12730.00, 1060.83, 12, "Esponja Recticulada MORTIMER — bulto x12", "esponja-recticulada-mortimer"),
  p("FUYI MMM Aerosol x 360cc", "Fuyi", "limpieza", 64440.00, 5370.00, 12, "FUYI MMM Aerosol x 360cc — bulto x12", "fuyi-mmm-aerosol-x-360cc"),
  p("GLADE Aerosol x 360cc", "Glade", "limpieza", 18480.00, 3080.00, 6, "GLADE Aerosol x 360cc — bulto x6", "glade-aerosol-x-360cc"),
  p("GLADE Pastillas Inodoro", "Glade", "limpieza", 16464.00, 686.00, 24, "GLADE Pastillas Inodoro — bulto x24", "glade-pastillas-inodoro"),
  p("HARPIC Power Plus/ Rem. Sarro 500ml", "Harpic", "limpieza", 48000.00, 4000.00, 12, "HARPIC Power Plus/ Rem. Sarro 500ml — bulto x12", "harpic-power-plus-rem-sarro-500ml"),
  p("Jabon Blanco ALA x 200Grs", "Ala", "limpieza", 127680.00, 1520.00, 84, "Jabon Blanco ALA x 200Grs — bulto x84", "jabon-blanco-ala-x-200grs"),
  p("Jabon en Polvo ALA x 400Grs", "Ala", "limpieza", 35040.00, 1460.00, 24, "Jabon en Polvo ALA x 400Grs — bulto x24", "jabon-en-polvo-ala-x-400grs"),
  p("Jabon en Polvo GRANBY x 400Grs", "Granby", "limpieza", 15840.00, 660.00, 24, "Jabon en Polvo GRANBY x 400Grs — bulto x24", "jabon-en-polvo-granby-x-400grs"),
  p("Jabon en Polvo GRANBY x 800Grs", "Granby", "limpieza", 37200.00, 1550.00, 24, "Jabon en Polvo GRANBY x 800Grs — bulto x24", "jabon-en-polvo-granby-x-800grs"),
  p("Jabon en Polvo ZORRO x 400Grs", "Zorro", "limpieza", 31680.00, 880.00, 36, "Jabon en Polvo ZORRO x 400Grs — bulto x36", "jabon-en-polvo-zorro-x-400grs"),
  p("Jabon en Polvo ZORRO EVOLUTION x 360Grs", "Zorro", "limpieza", 32400.00, 900.00, 36, "Jabon en Polvo ZORRO EVOLUTION x 360Grs — bulto x36", "jabon-en-polvo-zorro-evolution-x-360grs"),
  p("Jabon Liquido ALA DP x 800ml", "Ala", "limpieza", 34200.00, 2850.00, 12, "Jabon Liquido ALA DP x 800ml — bulto x12", "jabon-liquido-ala-dp-x-800ml"),
  p("Jabon Liquido GRANBY DP x 800ml", "Granby", "limpieza", 27000.00, 2250.00, 12, "Jabon Liquido GRANBY DP x 800ml — bulto x12", "jabon-liquido-granby-dp-x-800ml"),
  p("Jabon Liquido SKIP BIO ENZIMAS DP x 800ml", "Skip", "limpieza", 37080.00, 3090.00, 12, "Jabon Liquido SKIP BIO ENZIMAS DP x 800ml — bulto x12", "jabon-liquido-skip-bio-enzimas-dp-x-800m"),
  p("Jabon Liquido ZORRO x 800ml", "Zorro", "limpieza", 31500.00, 2250.00, 14, "Jabon Liquido ZORRO x 800ml — bulto x14", "jabon-liquido-zorro-x-800ml"),
  p("Lavandina AYUDIN x 1 Lts", "Ayudin", "limpieza", 16950.00, 1130.00, 15, "Lavandina AYUDIN x 1 Lts — bulto x15", "lavandina-ayudin-x-1-lts"),
  p("Lavandina AYUDIN x 2 Lts", "Ayudin", "limpieza", 19680.00, 2460.00, 8, "Lavandina AYUDIN x 2 Lts — bulto x8", "lavandina-ayudin-x-2-lts"),
  p("Lavandina AYUDIN en GEL x 700cc", "Ayudin", "limpieza", 42000.00, 2800.00, 15, "Lavandina AYUDIN en GEL x 700cc — bulto x15", "lavandina-ayudin-en-gel-x-700cc"),
  p("LYSOFORM Aerosol x 360cc", "Lysoform", "limpieza", 45120.00, 3760.00, 12, "LYSOFORM Aerosol x 360cc — bulto x12", "lysoform-aerosol-x-360cc"),
  p("LYSOFORM Piso DP x 420cc", "Lysoform", "limpieza", 18480.00, 1540.00, 12, "LYSOFORM Piso DP x 420cc — bulto x12", "lysoform-piso-dp-x-420cc"),
  p("Pilas DURACELL AAA", "Duracell", "limpieza", 7150.00, 1191.67, 6, "Pilas DURACELL AAA — bulto x6", "pilas-duracell-aaa"),
  p("Pilas DURACELL AA", "Duracell", "limpieza", 7150.00, 1191.67, 6, "Pilas DURACELL AA — bulto x6", "pilas-duracell-aa"),
  p("POETT Limpia Piso x 900cc", "Poett", "limpieza", 20280.00, 1690.00, 12, "POETT Limpia Piso x 900cc — bulto x12", "poett-limpia-piso-x-900cc"),
  p("POETT Limpia Piso x 3 Lts", "Poett", "limpieza", 26650.00, 8883.33, 3, "POETT Limpia Piso x 3 Lts — bulto x3", "poett-limpia-piso-x-3-lts"),
  p("RAID MMM Aerosol x 380cc", "Raid", "limpieza", 83280.00, 6940.00, 12, "RAID MMM Aerosol x 380cc — bulto x12", "raid-mmm-aerosol-x-380cc"),
  p("RAID MMM Aerosol S/OLOR x 360cc", "Raid", "limpieza", 110040.00, 9170.00, 12, "RAID MMM Aerosol S/OLOR x 360cc — bulto x12", "raid-mmm-aerosol-s-olor-x-360cc"),
  p("RAID Antipolilla Aero x 360 cc", "Raid", "limpieza", 74760.00, 6230.00, 12, "RAID Antipolilla Aero x 360 cc — bulto x12", "raid-antipolilla-aero-x-360-cc"),
  p("RAID Casa y Jardin x 380cc", "Raid", "limpieza", 78360.00, 6530.00, 12, "RAID Casa y Jardin x 380cc — bulto x12", "raid-casa-y-jardin-x-380cc"),
  p("RAID Extermina Cucarachas x 360cc", "Raid", "limpieza", 76680.00, 6390.00, 12, "RAID Extermina Cucarachas x 360cc — bulto x12", "raid-extermina-cucarachas-x-360cc"),
  p("RAID Matapulgas x 390cc", "Raid", "limpieza", 170400.00, 14200.00, 12, "RAID Matapulgas x 390cc — bulto x12", "raid-matapulgas-x-390cc"),
  p("RAID MAX Hormigas Aero x 360cc", "Raid", "limpieza", 112920.00, 9410.00, 12, "RAID MAX Hormigas Aero x 360cc — bulto x12", "raid-max-hormigas-aero-x-360cc"),
  p("RAID MAX Mata Cucarachas y Arañas Aero x 360cc", "Raid", "limpieza", 136920.00, 11410.00, 12, "RAID MAX Mata Cucarachas y Arañas Aero x 360cc — bulto x12", "raid-max-mata-cucarachas-y-aranas-aero-x"),
  p("Suavizante VIVERE Plancha Facil x 810ml", "Vivere", "limpieza", 35400.00, 2950.00, 12, "Suavizante VIVERE Plancha Facil x 810ml — bulto x12", "suavizante-vivere-plancha-facil-x-810ml"),
  p("Suavizante VIVERE Clasico x 900ml", "Vivere", "limpieza", 40920.00, 3410.00, 12, "Suavizante VIVERE Clasico x 900ml — bulto x12", "suavizante-vivere-clasico-x-900ml"),
  p("Tabletas RAID x 24 Unidades", "Raid", "limpieza", 70920.00, 5910.00, 12, "Tabletas RAID x 24 Unidades — bulto x12", "tabletas-raid-x-24-unidades"),
  p("Velas GOLONDRINA x 4 Unidades", "Golondrina", "limpieza", 53820.00, 2152.80, 25, "Velas GOLONDRINA x 4 Unidades — bulto x25", "velas-golondrina-x-4-unidades"),
  p("Azufre GONZALITO 5 Unidades", "Gonzalito", "perfumeria", 28610.00, 1430.50, 20, "Azufre GONZALITO 5 Unidades — bulto x20", "azufre-gonzalito-5-unidades"),
  p("CURITAS Aposito de Tela 8 Unidades", "Curitas", "perfumeria", 33030.00, 1376.25, 24, "CURITAS Aposito de Tela 8 Unidades — bulto x24", "curitas-aposito-de-tela-8-unidades"),
  p("Desodorante AXE 96Grs", "Axe", "perfumeria", 39480.00, 3290.00, 12, "Desodorante AXE 96Grs — bulto x12", "desodorante-axe-96grs"),
  p("Desodorante DOVE x 150ML", "Dove", "perfumeria", 50520.00, 4210.00, 12, "Desodorante DOVE x 150ML — bulto x12", "desodorante-dove-x-150ml"),
  p("Desodorante DOVE Rollon original x 50ML", "Dove", "perfumeria", 21000.00, 1750.00, 12, "Desodorante DOVE Rollon original x 50ML — bulto x12", "desodorante-dove-rollon-original-x-50ml"),
  p("Desodorante REXONA x 90Grs", "Rexona", "perfumeria", 48120.00, 4010.00, 12, "Desodorante REXONA x 90Grs — bulto x12", "desodorante-rexona-x-90grs"),
  p("Desodorante en crema REXONA Odorono C/Glicerina x 60Grs", "Rexona", "perfumeria", 27000.00, 2250.00, 12, "Desodorante en crema REXONA Odorono C/Glicerina x 60Grs — bulto x12", "desodorante-en-crema-rexona-odorono-c-gl"),
  p("DOVE Shampoo/Acondicionador x 200ml", "Dove", "perfumeria", 47400.00, 3950.00, 12, "DOVE Shampoo/Acondicionador x 200ml — bulto x12", "dove-shampoo-acondicionador-x-200ml"),
  p("DOVE Shampoo/Acondicionador DOY PACK x 180ml", "Dove", "perfumeria", 31080.00, 2590.00, 12, "DOVE Shampoo/Acondicionador DOY PACK x 180ml — bulto x12", "dove-shampoo-acondicionador-doy-pack-x-1"),
  p("Jabon DOVE x 90Grs", "Dove", "perfumeria", 125400.00, 2090.00, 60, "Jabon DOVE x 90Grs — bulto x60", "jabon-dove-x-90grs"),
  p("Jabon LUX x 120Grs", "Lux", "perfumeria", 93600.00, 1300.00, 72, "Jabon LUX x 120Grs — bulto x72", "jabon-lux-x-120grs"),
  p("Jabon LUX x 120 Grs X 3 Unidades", "Lux", "perfumeria", 63360.00, 2640.00, 24, "Jabon LUX x 120 Grs X 3 Unidades — bulto x24", "jabon-lux-x-120-grs-x-3-unidades"),
  p("Jabón Liquido LUX DP x 220ml", "Lux", "perfumeria", 21840.00, 1820.00, 12, "Jabón Liquido LUX DP x 220ml — bulto x12", "jabon-liquido-lux-dp-x-220ml"),
  p("Jabon REXONA x 120Grs", "Rexona", "perfumeria", 77760.00, 1080.00, 72, "Jabon REXONA x 120Grs — bulto x72", "jabon-rexona-x-120grs"),
  p("Jabon REXONA x 120Grs x 3 Unidades", "Rexona", "perfumeria", 66960.00, 2790.00, 24, "Jabon REXONA x 120Grs x 3 Unidades — bulto x24", "jabon-rexona-x-120grs-x-3-unidades"),
  p("Jabon Liquido SUAVE x 220ml", "Suave", "perfumeria", 11280.00, 940.00, 12, "Jabon Liquido SUAVE x 220ml — bulto x12", "jabon-liquido-suave-x-220ml"),
  p("OFF Repelente en Aerosol x 170ml", "Off", "perfumeria", 68040.00, 5670.00, 12, "OFF Repelente en Aerosol x 170ml — bulto x12", "off-repelente-en-aerosol-x-170ml"),
  p("OFF EXTRA DURACCION Repelente en Aerosol x 170ml", "Off", "perfumeria", 90840.00, 7570.00, 12, "OFF EXTRA DURACCION Repelente en Aerosol x 170ml — bulto x12", "off-extra-duraccion-repelente-en-aerosol"),
  p("OFF DEFENSE Aerosol x 170cc", "Off", "perfumeria", 106920.00, 8910.00, 12, "OFF DEFENSE Aerosol x 170cc — bulto x12", "off-defense-aerosol-x-170cc"),
  p("OFF Aerosol BONUS x 290cc", "Off", "perfumeria", 94920.00, 7910.00, 12, "OFF Aerosol BONUS x 290cc — bulto x12", "off-aerosol-bonus-x-290cc"),
  p("OFF Repelente en Crema x 60Grs", "Off", "perfumeria", 27480.00, 2290.00, 12, "OFF Repelente en Crema x 60Grs — bulto x12", "off-repelente-en-crema-x-60grs"),
  p("OFF FAMILY Repelente en Crema x 196Grs", "Off", "perfumeria", 48720.00, 4060.00, 12, "OFF FAMILY Repelente en Crema x 196Grs — bulto x12", "off-family-repelente-en-crema-x-196grs"),
  p("PANTENE Max Shampoo/Acondicionador 10ml x 24 unidades", "Pantene", "perfumeria", 4490.00, 187.08, 24, "PANTENE Max Shampoo/Acondicionador 10ml x 24 unidades — bulto x24", "pantene-max-shampoo-acondicionador-10ml-"),
  p("PLUSBELLE Shampoo/ Acondicionador x 1L", "Plusbelle", "perfumeria", 37200.00, 3100.00, 12, "PLUSBELLE Shampoo/ Acondicionador x 1L — bulto x12", "plusbelle-shampoo-acondicionador-x-1l"),
  p("Prestobarba MINORA PLUS II", "Minora", "perfumeria", 6600.00, 660.00, 10, "Prestobarba MINORA PLUS II — bulto x10", "prestobarba-minora-plus-ii"),
  p("Prestobarba 2 filos GILLETTE", "Gillette", "perfumeria", 12990.00, 1082.50, 12, "Prestobarba 2 filos GILLETTE — bulto x12", "prestobarba-2-filos-gillette"),
  p("Prestobarba 3 filos GILLETTE", "Gillette", "perfumeria", 15200.00, 1520.00, 10, "Prestobarba 3 filos GILLETTE — bulto x10", "prestobarba-3-filos-gillette"),
  p("GILLETTE VENUS Simply 3", "Gillette", "perfumeria", 16410.00, 2051.25, 8, "GILLETTE VENUS Simply 3 — bulto x8", "gillette-venus-simply-3"),
  p("Proct. CALIPSO Anatomicos x 20 unidades", "Calipso", "perfumeria", 41600.00, 1040.00, 40, "Proct. CALIPSO Anatomicos x 20 unidades — bulto x40", "proct-calipso-anatomicos-x-20-unidades"),
  p("SEDAL S.O.S Shampoo/ Acondicionador x 24 unidades", "Sedal", "perfumeria", 6240.00, 260.00, 24, "SEDAL S.O.S Shampoo/ Acondicionador x 24 unidades — bulto x24", "sedal-s-o-s-shampoo-acondicionador-x-24-"),
  p("SEDAL Shampoo/ Acondicionador x 190ml", "Sedal", "perfumeria", 27960.00, 2330.00, 12, "SEDAL Shampoo/ Acondicionador x 190ml — bulto x12", "sedal-shampoo-acondicionador-x-190ml"),
  p("SEDAL Shampoo/ Acondicionador x 340ml", "Sedal", "perfumeria", 34680.00, 2890.00, 12, "SEDAL Shampoo/ Acondicionador x 340ml — bulto x12", "sedal-shampoo-acondicionador-x-340ml"),
  p("SEDAL Shampoo/ Acondicionador DP x 300ml", "Sedal", "perfumeria", 28440.00, 2370.00, 12, "SEDAL Shampoo/ Acondicionador DP x 300ml — bulto x12", "sedal-shampoo-acondicionador-dp-x-300ml"),
  p("SUAVE Shampoo/ Acondicionador x 930ml", "Suave", "perfumeria", 17936.00, 2242.00, 8, "SUAVE Shampoo/ Acondicionador x 930ml — bulto x8", "suave-shampoo-acondicionador-x-930ml"),
  p("Talco Efficient REXONA x 100Grs", "Rexona", "perfumeria", 41880.00, 3490.00, 12, "Talco Efficient REXONA x 100Grs — bulto x12", "talco-efficient-rexona-x-100grs"),
  p("Toallitas CALIPSO C/A x 8 unidades", "Calipso", "perfumeria", 47000.00, 940.00, 50, "Toallitas CALIPSO C/A x 8 unidades — bulto x50", "toallitas-calipso-c-a-x-8-unidades"),
  p("Alfafort 28 Grs", "Alfafort", "chocolates", 19710.00, 821.25, 24, "Alfafort 28 Grs — bulto x24", "alfafort-28-grs"),
  p("Bananina/Bananina Split 15Grs", "Bananina/Bananina", "chocolates", 12370.00, 412.33, 30, "Bananina/Bananina Split 15Grs — bulto x30", "bananina-bananina-split-15grs"),
  p("Barrita Espacial Fort 24Grs", "Barrita", "chocolates", 22150.00, 1107.50, 20, "Barrita Espacial Fort 24Grs — bulto x20", "barrita-espacial-fort-24grs"),
  p("Bocadito Delicia 10Grs", "Bocadito", "chocolates", 13850.00, 288.54, 48, "Bocadito Delicia 10Grs — bulto x48", "bocadito-delicia-10grs"),
  p("Bocadito Marroc 14Grs", "Bocadito", "chocolates", 34410.00, 573.50, 60, "Bocadito Marroc 14Grs — bulto x60", "bocadito-marroc-14grs"),
  p("Bocadito Marroc Cric 14Grs", "Bocadito", "chocolates", 34410.00, 573.50, 60, "Bocadito Marroc Cric 14Grs — bulto x60", "bocadito-marroc-cric-14grs"),
  p("Bocadito Cericet 19Grs", "Bocadito", "chocolates", 37480.00, 1561.67, 24, "Bocadito Cericet 19Grs — bulto x24", "bocadito-cericet-19grs"),
  p("Botellitas Whisky 24Grs", "Botellitas", "chocolates", 23460.00, 1173.00, 20, "Botellitas Whisky 24Grs — bulto x20", "botellitas-whisky-24grs"),
  p("Bombonera en Caja 264Grs", "Bombonera", "chocolates", 13960.00, 13960.00, 1, "Bombonera en Caja 264Grs — bulto x1", "bombonera-en-caja-264grs"),
  p("Bombón D'OR 12Grs", "Bombón", "chocolates", 11890.00, 396.33, 30, "Bombón D'OR 12Grs — bulto x30", "bombon-d-or-12grs"),
  p("Cerealfort 23Grs", "Cerealfort", "chocolates", 10990.00, 457.92, 24, "Cerealfort 23Grs — bulto x24", "cerealfort-23grs"),
  p("Chocolate Clasico 70% Cacao 50Grs", "Chocolate", "chocolates", 50990.00, 3186.88, 16, "Chocolate Clasico 70% Cacao 50Grs — bulto x16", "chocolate-clasico-70-cacao-50grs"),
  p("Choc.Leche y Mani 75Grs", "Choc.Leche", "chocolates", 28350.00, 2835.00, 10, "Choc.Leche y Mani 75Grs — bulto x10", "choc-leche-y-mani-75grs"),
  p("Chupelatin 15Grs", "Chupelatin", "chocolates", 28720.00, 897.50, 32, "Chupelatin 15Grs — bulto x32", "chupelatin-15grs"),
  p("Diabfort / Fort Diet Leche 20 x 50grs", "Diabfort", "chocolates", 67030.00, 3351.50, 20, "Diabfort / Fort Diet Leche 20 x 50grs — bulto x20", "diabfort-fort-diet-leche-20-x-50grs"),
  p("Dos Corazones 26Grs", "Dos", "chocolates", 20460.00, 1023.00, 20, "Dos Corazones 26Grs — bulto x20", "dos-corazones-26grs"),
  p("Feeling 20Grs", "Feeling", "chocolates", 15990.00, 533.00, 30, "Feeling 20Grs — bulto x30", "feeling-20grs"),
  p("Fort Chocolate C/Maní 30Grs", "Fort", "chocolates", 13300.00, 1108.33, 12, "Fort Chocolate C/Maní 30Grs — bulto x12", "fort-chocolate-c-mani-30grs"),
  p("Jack Chocolate con sorpresa", "Jack", "chocolates", 27750.00, 1387.50, 20, "Jack Chocolate con sorpresa — bulto x20", "jack-chocolate-con-sorpresa"),
  p("Jackelin 14Grs", "Jackelin", "chocolates", 22460.00, 748.67, 30, "Jackelin 14Grs — bulto x30", "jackelin-14grs"),
  p("Kooky Bon 10Grs", "Kooky", "chocolates", 8670.00, 289.00, 30, "Kooky Bon 10Grs — bulto x30", "kooky-bon-10grs"),
  p("Licorfort Whisky 13Grs", "Licorfort", "chocolates", 22460.00, 748.67, 30, "Licorfort Whisky 13Grs — bulto x30", "licorfort-whisky-13grs"),
  p("Licoritas 20Grs", "Licoritas", "chocolates", 19990.00, 799.60, 25, "Licoritas 20Grs — bulto x25", "licoritas-20grs"),
  p("Mentitas 16Grs", "Mentitas", "chocolates", 14170.00, 472.33, 30, "Mentitas 16Grs — bulto x30", "mentitas-16grs"),
  p("Medallon Dulce de Leche 21 GRS", "Grs", "chocolates", 15180.00, 759.00, 20, "Medallon Dulce de Leche 21 GRS — bulto x20", "medallon-dulce-de-leche-21-grs"),
  p("Nobel 35Grs", "Nobel", "chocolates", 17160.00, 1144.00, 15, "Nobel 35Grs — bulto x15", "nobel-35grs"),
  p("Paraguitas 13Grs", "Paraguitas", "chocolates", 23580.00, 589.50, 40, "Paraguitas 13Grs — bulto x40", "paraguitas-13grs"),
  p("Piratas 5Grs", "Piratas", "chocolates", 19340.00, 322.33, 60, "Piratas 5Grs — bulto x60", "piratas-5grs"),
  p("Refresco 27Grs (Clasico/Tutti)", "Refresco", "chocolates", 5390.00, 449.17, 12, "Refresco 27Grs (Clasico/Tutti) — bulto x12", "refresco-27grs-clasico-tutti"),
  p("Tableta de Chocolate con Leche y Maní 250grs", "Tableta", "chocolates", 63040.00, 7880.00, 8, "Tableta de Chocolate con Leche y Maní 250grs — bulto x8", "tableta-de-chocolate-con-leche-y-mani-25"),
  p("Tivis 25Grs", "Tivis", "chocolates", 15570.00, 778.50, 20, "Tivis 25Grs — bulto x20", "tivis-25grs"),
  p("Torroncino 23Grs", "Torroncino", "chocolates", 38540.00, 1284.67, 30, "Torroncino 23Grs — bulto x30", "torroncino-23grs"),
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
   Antes de abrir WhatsApp, se muestra un resumen del pedido para que el
   cliente confirme cantidades y datos de contacto. Esto no reemplaza un
   remito firmado en la entrega, pero reduce pedidos armados por error o
   apurados, y dejar registrado nombre/teléfono le da al vendedor un dato
   de contacto para reconfirmar antes de salir a repartir.
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
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeNav(); closeConfirmModal(); } });

  // Enviar pedido por WhatsApp → primero pasa por la pantalla de confirmación
  document.getElementById("whatsappBtn").addEventListener("click", openConfirmModal);

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
        openConfirmModal();
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
   19.1) AJUSTES VISUALES DEL HERO (pedidos por el cliente)
   - Oculta los dos cuadrados decorativos (naranja/azul) del hero.
   - La marca de agua "BAUMAR" ya no lleva ningún filtro de color: se deja
     tal cual es la imagen (fondo verde sólido + letras blancas), para que
     se funda con el fondo del hero en vez de notarse como un recuadro.
   - Fondo del hero: el mismo verde plano que el logo-fondo.png (#6f9633),
     sin degradé, para que no haya bordes visibles alrededor de la imagen.
   Se hace por CSS inyectado para no tocar index.html/style.css.
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
      /* sin filtro: mismo verde que el fondo, no se nota el recuadro */
      filter: none !important;
      opacity: 0.9 !important;
    }
    .hero {
      /* mismo verde plano que trae el logo-fondo.png */
      background: #6f9633 !important;
    }
    .hero__title {
      /* mismo criterio que el subtítulo: oscuro para que no se pierda
         donde el texto pisa las letras blancas de la marca de agua */
      color: #12190c !important;
    }
    .hero__subtitle {
      /* oscuro en vez de blanco: así contrasta tanto contra el verde
         como contra las letras blancas de la marca de agua */
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



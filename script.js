"use strict";

/*
 * STOCKFLOW — wersja demonstracyjna
 * Dane zapisywane lokalnie w przeglądarce.
 */

const CLOTHING_SIZES = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

const PANTS_SIZES = [
  ...Array.from({ length: 14 }, (_, index) => 40 + index * 2),
  53
].map(String).sort((a, b) => Number(a) - Number(b));

const SHOE_SIZES = Array.from(
  { length: 13 },
  (_, index) => String(36 + index)
);

const GLOVE_SIZES = ["8", "9", "10", "11"];

const TOTAL_STOCK_KEY = "__total";
const DEFAULT_MINIMUM = 3;
const MAX_STOCK_VALUE = 99999;

function getProductSizes(product) {
  if (product.category === "ppe") return [];

  if (
    product.type === "rekawiczki-letnie" ||
    product.type === "rekawiczki-zimowe"
  ) {
    return GLOVE_SIZES;
  }

  if (product.category === "pozostale") return [];
  if (product.type === "spodnie") return PANTS_SIZES;
  if (product.category === "obuwie") return SHOE_SIZES;

  return CLOTHING_SIZES;
}

function getStockKey(product, productState = state[product.id]) {
  return getProductSizes(product).length
    ? productState.selectedSize
    : TOTAL_STOCK_KEY;
}

const CLOTHING_FILTERS = [
  { id: "all", label: "Wszystkie kategorie" },
  { id: "tshirt", label: "T-shirt" },
  { id: "longsleeve", label: "Longsleeve" },
  { id: "bluza", label: "Bluza" },
  { id: "softshell", label: "Softshell" },
  { id: "spodnie", label: "Spodnie" },
  { id: "kurtka", label: "Kurtka" },
  { id: "kamizelka", label: "Kamizelka" },
  { id: "plaszcz", label: "Płaszcz" }
];

const CATEGORY_FILTERS = {
  odziez: CLOTHING_FILTERS,

  ppe: [
    { id: "all", label: "Wszystkie PPE" },
    { id: "kask", label: "Kask" },
    { id: "harness", label: "Harness" },
    { id: "linka", label: "Linka pozycjonująca" },
    { id: "haki", label: "Haki" }
  ],

  obuwie: [
    { id: "all", label: "Wszystkie obuwie" },
    { id: "buty-letnie", label: "Buty letnie" },
    { id: "buty-zimowe", label: "Buty zimowe" }
  ],

  pozostale: [
    { id: "all", label: "Wszystkie pozostałe" },
    { id: "markery", label: "Markery" },
    { id: "rekawiczki-letnie", label: "Rękawiczki letnie" },
    { id: "rekawiczki-zimowe", label: "Rękawiczki zimowe" },
    { id: "okulary-jasne", label: "Okulary jasne" },
    { id: "okulary-ciemne", label: "Okulary ciemne" },
    { id: "lampka-czolowa", label: "Lampka czołowa" },
    { id: "srubokret", label: "Śrubokręt" },
    { id: "torba-narzedziowa", label: "Torba narzędziowa" },
    { id: "multispanner", label: "Multispanner" },
    { id: "nakolanniki", label: "Nakolanniki" },
    { id: "szelki-odblaskowe", label: "Szelki odblaskowe" },
    { id: "lonze-narzedziowe", label: "Lonże narzędziowe" },
    { id: "milwaukee-katowe", label: "Milwaukee kątowe" },
    { id: "pokrowiec-absorber", label: "Pokrowiec na absorber" }
  ]
};

/* ========================================
   PRODUKTY
======================================== */

const PRODUCTS = [
  // ODZIEŻ
  {
    id: "odziez-01",
    name: "T-shirt czarny",
    category: "odziez",
    type: "tshirt",
    image: "images/koszulkac.png"
  },
  {
    id: "odziez-02",
    name: "T-shirt odblaskowy",
    category: "odziez",
    type: "tshirt",
    image: "images/koszulkaz.png"
  },
  {
    id: "odziez-03",
    name: "Longsleeve czarny",
    category: "odziez",
    type: "longsleeve",
    image: "images/longc.png"
  },
  {
    id: "odziez-04",
    name: "Longsleeve odblaskowy",
    category: "odziez",
    type: "longsleeve",
    image: "images/longz.png"
  },
  {
    id: "odziez-05",
    name: "Bluza robocza",
    category: "odziez",
    type: "bluza",
    image: "images/bluza.png"
  },
  {
    id: "odziez-06",
    name: "Softshell",
    category: "odziez",
    type: "softshell",
    image: "images/softshell.png"
  },
  {
    id: "odziez-07",
    name: "Kurtka zimowa",
    category: "odziez",
    type: "kurtka",
    image: "images/kurtka.png"
  },
  {
    id: "odziez-08",
    name: "Spodnie robocze",
    category: "odziez",
    type: "spodnie",
    image: "images/spodnien.png"
  },
  {
    id: "odziez-09",
    name: "Spodnie ogrodniczki",
    category: "odziez",
    type: "spodnie",
    image: "images/spodnieo.png"
  },
  {
    id: "odziez-10",
    name: "Kamizelka żółta",
    category: "odziez",
    type: "kamizelka",
    image: "images/kamizelkaz.png"
  },
  {
    id: "odziez-11",
    name: "Kamizelka czerwona",
    category: "odziez",
    type: "kamizelka",
    image: "images/kamizelkac.png"
  },
  {
    id: "odziez-12",
    name: "Kamizelka letnia",
    category: "odziez",
    type: "kamizelka",
    image: "images/kamizelkal.png"
  },
  {
    id: "odziez-13",
    name: "Płaszcz przeciwdeszczowy",
    category: "odziez",
    type: "plaszcz",
    image: "images/płaszcz.png"
  },

  // PPE
  {
    id: "ppe-01",
    name: "Kask",
    category: "ppe",
    type: "kask",
    image: "https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "ppe-02",
    name: "Harness",
    category: "ppe",
    type: "harness",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "ppe-03",
    name: "Linka pozycjonująca",
    category: "ppe",
    type: "linka",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "ppe-04",
    name: "Haki",
    category: "ppe",
    type: "haki",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=500&q=80"
  },

  // OBUWIE
  {
    id: "obuwie-01",
    name: "Buty letnie",
    category: "obuwie",
    type: "buty-letnie",
    image: "images/butyl.png"
  },
  {
    id: "obuwie-02",
    name: "Buty zimowe",
    category: "obuwie",
    type: "buty-zimowe",
    image: "images/butyz.png"
  },

  // MARKERY
  {
    id: "pozostale-01",
    name: "Marker żółty",
    category: "pozostale",
    type: "markery",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-02",
    name: "Marker czerwony",
    category: "pozostale",
    type: "markery",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-03",
    name: "Marker czarny",
    category: "pozostale",
    type: "markery",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-04",
    name: "Marker biały",
    category: "pozostale",
    type: "markery",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-05",
    name: "Marker niebieski",
    category: "pozostale",
    type: "markery",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80"
  },

  // RĘKAWICZKI
  {
    id: "pozostale-06",
    name: "Rękawiczki letnie",
    category: "pozostale",
    type: "rekawiczki-letnie",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-07",
    name: "Rękawiczki zimowe",
    category: "pozostale",
    type: "rekawiczki-zimowe",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=500&q=80"
  },

  // OKULARY
  {
    id: "pozostale-08",
    name: "Okulary jasne",
    category: "pozostale",
    type: "okulary-jasne",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-09",
    name: "Okulary ciemne",
    category: "pozostale",
    type: "okulary-ciemne",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80"
  },

  // POZOSTAŁE WYPOSAŻENIE
  {
    id: "pozostale-10",
    name: "Lampka czołowa",
    category: "pozostale",
    type: "lampka-czolowa",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-11",
    name: "Śrubokręt",
    category: "pozostale",
    type: "srubokret",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-12",
    name: "Torba narzędziowa",
    category: "pozostale",
    type: "torba-narzedziowa",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-13",
    name: "Multispanner",
    category: "pozostale",
    type: "multispanner",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-14",
    name: "Nakolanniki",
    category: "pozostale",
    type: "nakolanniki",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-15",
    name: "Szelki odblaskowe",
    category: "pozostale",
    type: "szelki-odblaskowe",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-16",
    name: "Lonże narzędziowe",
    category: "pozostale",
    type: "lonze-narzedziowe",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-17",
    name: "Milwaukee kątowe",
    category: "pozostale",
    type: "milwaukee-katowe",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pozostale-18",
    name: "Pokrowiec na absorber",
    category: "pozostale",
    type: "pokrowiec-absorber",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=500&q=80"
  }
];

const STORAGE_KEY = "stockflow-demo-v1";

let activeCategory = "odziez";
let activeFilter = "all";
let activeView = "products";
let searchQuery = "";

const productList = document.getElementById("product-list");
const filtersContainer = document.getElementById("filters");
const resultsCount = document.getElementById("results-count");
const emptyMessage = document.getElementById("empty-message");
const searchInput = document.getElementById("search");

/* ========================================
   STAN I ZAPIS DANYCH
======================================== */

function createDefaultState() {
  const initialState = {};

  PRODUCTS.forEach((product) => {
    const sizes = getProductSizes(product);
    const keys = sizes.length ? sizes : [TOTAL_STOCK_KEY];

    initialState[product.id] = {
      quantities: Object.fromEntries(
        keys.map((key) => [key, 0])
      ),
      minimums: Object.fromEntries(
        keys.map((key) => [key, DEFAULT_MINIMUM])
      ),
      selectedSize: sizes[0] ?? null,
      step: 2
    };
  });

  return initialState;
}

function loadState() {
  const defaults = createDefaultState();

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return defaults;

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object") {
      return defaults;
    }

    PRODUCTS.forEach((product) => {
      const existing = parsed[product.id];

      if (!existing || typeof existing !== "object") return;

      const sizes = getProductSizes(product);
      const target = defaults[product.id];
      const keys = sizes.length ? sizes : [TOTAL_STOCK_KEY];

      keys.forEach((key) => {
        const savedMinimum = Number(existing.minimums?.[key]);

        if (
          existing.minimums?.[key] !== undefined &&
          Number.isInteger(savedMinimum) &&
          savedMinimum >= 0 &&
          savedMinimum <= MAX_STOCK_VALUE
        ) {
          target.minimums[key] = savedMinimum;
        }

        const value = Number(existing.quantities?.[key]);

        if (
          existing.quantities?.[key] !== undefined &&
          Number.isFinite(value) &&
          value >= 0
        ) {
          target.quantities[key] = Math.min(
            Math.floor(value),
            MAX_STOCK_VALUE
          );
        }
      });

      // Obsługa starszych zapisów dla produktów bez rozmiarów.
      if (sizes.length === 0) {
        const hasTotal =
          existing.quantities?.[TOTAL_STOCK_KEY] !== undefined;

        if (!hasTotal && existing.quantities) {
          target.quantities[TOTAL_STOCK_KEY] = Object.values(
            existing.quantities
          ).reduce((sum, value) => {
            const number = Number(value);

            return sum + (
              Number.isFinite(number) && number > 0
                ? Math.floor(number)
                : 0
            );
          }, 0);
        }
      }

      if (sizes.includes(String(existing.selectedSize))) {
        target.selectedSize = String(existing.selectedSize);
      }

      const step = Number(existing.step);

      if (
        Number.isInteger(step) &&
        step >= 1 &&
        step <= MAX_STOCK_VALUE
      ) {
        target.step = step;
      }
    });

    return defaults;
  } catch (error) {
    console.error("Nie udało się odczytać zapisanych danych:", error);
    return defaults;
  }
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Nie udało się zapisać danych:", error);
    alert("Nie udało się zapisać danych w przeglądarce.");
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function stockClass(quantity) {
  if (quantity === 0) return "stock-empty";
  if (quantity <= 2) return "stock-low";
  if (quantity <= 5) return "stock-medium";
  return "stock-good";
}

function getMinimum(product, key) {
  const minimum = Number(state[product.id]?.minimums?.[key]);

  return Number.isInteger(minimum) && minimum >= 0
    ? minimum
    : DEFAULT_MINIMUM;
}

function updateMinimum(productId, key, value) {
  const productState = state[productId];
  const minimum = Number(value);

  if (
    !productState ||
    !Number.isInteger(minimum) ||
    minimum < 0 ||
    minimum > MAX_STOCK_VALUE
  ) {
    return false;
  }

  if (!productState.minimums) {
    productState.minimums = {};
  }

  productState.minimums[key] = minimum;
  saveState();

  return true;
}

/* ========================================
   FILTRY I WYSZUKIWANIE
======================================== */

function renderFilters() {
  filtersContainer.hidden = activeView === "orders";

  if (activeView === "orders") {
    filtersContainer.innerHTML = "";
    return;
  }

  const options = CATEGORY_FILTERS[activeCategory];

  filtersContainer.innerHTML = options.map((filter) => `
    <button
      class="filter-btn ${filter.id === activeFilter ? "active" : ""}"
      data-filter="${filter.id}"
      type="button"
      aria-pressed="${filter.id === activeFilter}"
    >${escapeHTML(filter.label)}</button>
  `).join("");
}

function getVisibleProducts() {
  return PRODUCTS.filter((product) => {
    const categoryMatches = product.category === activeCategory;

    const filterMatches =
      activeFilter === "all" || product.type === activeFilter;

    const searchMatches = product.name
      .toLocaleLowerCase("pl")
      .includes(searchQuery.toLocaleLowerCase("pl"));

    return categoryMatches && filterMatches && searchMatches;
  });
}

/* ========================================
   POMOCNICZE HTML
======================================== */

function renderProductImage(product) {
  return `
    <div class="product-image-wrap">
      <img
        class="product-image"
        src="${escapeHTML(product.image)}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
        referrerpolicy="no-referrer"
      >
    </div>
  `;
}

/*
 * Przyciski są zgrupowane w jednej kolumnie.
 * Nowe klasy pozwalają nadać im większy rozmiar w CSS.
 */
function renderStockControls(product, quantity) {
  const productState = state[product.id];

  return `
    <div class="stock-actions-column">
      <div class="stock-controls stock-controls-large">
        <button
          class="small-action small-action-large"
          data-action="add-one"
          data-product="${product.id}"
          type="button"
          aria-label="Dodaj jedną sztukę"
          title="Dodaj 1 sztukę"
        >+1</button>

        <output
          class="stock-number"
          aria-label="Aktualny stan magazynowy"
          aria-live="polite"
        >${quantity}</output>

        <button
          class="small-action small-action-large"
          data-action="remove-one"
          data-product="${product.id}"
          type="button"
          aria-label="Odejmij jedną sztukę"
          title="Odejmij 1 sztukę"
          ${quantity === 0 ? "disabled" : ""}
        >-1</button>
      </div>

      <div class="step-controls step-controls-large">
        <button
          class="step-action step-action-large"
          data-action="add-step"
          data-product="${product.id}"
          type="button"
          aria-label="Dodaj wybraną liczbę sztuk"
        >+</button>

        <input
          class="step-value step-value-large"
          type="number"
          min="1"
          max="${MAX_STOCK_VALUE}"
          step="1"
          inputmode="numeric"
          value="${productState.step}"
          data-step="${product.id}"
          aria-label="Liczba sztuk do dodania lub odjęcia"
        >

        <button
          class="step-action step-action-large"
          data-action="remove-step"
          data-product="${product.id}"
          type="button"
          aria-label="Odejmij wybraną liczbę sztuk"
          ${quantity === 0 ? "disabled" : ""}
        >-</button>
      </div>
    </div>
  `;
}

function renderMinimum(product, stockKey, minimum, selectedSize) {
  const hasSizes = getProductSizes(product).length > 0;

  return `
    <div class="minimum-panel">
      <span class="minimum-label">MINIMUM</span>

      <label class="minimum-control">
        <input
          class="minimum-input"
          type="number"
          min="0"
          max="${MAX_STOCK_VALUE}"
          step="1"
          inputmode="numeric"
          value="${minimum}"
          data-minimum="${product.id}"
          data-minimum-key="${escapeHTML(stockKey)}"
          aria-label="Minimalny stan: ${escapeHTML(product.name)}${hasSizes ? `, rozmiar ${escapeHTML(selectedSize)}` : ""}"
        >
        <span>szt.</span>
      </label>
    </div>
  `;
}

/* ========================================
   KAFELKI PRODUKTÓW
======================================== */

function renderProducts() {
  if (activeView === "orders") {
    renderOrderProducts();
    return;
  }

  const products = getVisibleProducts();

  resultsCount.textContent = `Produkty: ${products.length}`;
  emptyMessage.hidden = products.length > 0;

  if (products.length === 0) {
    productList.innerHTML = "";
    return;
  }

  productList.innerHTML = products.map((product) => {
    const productState = state[product.id];
    const sizes = getProductSizes(product);
    const hasSizes = sizes.length > 0;

    const selectedSize = productState.selectedSize;
    const stockKey = hasSizes ? selectedSize : TOTAL_STOCK_KEY;
    const quantity = productState.quantities[stockKey] ?? 0;
    const minimum = getMinimum(product, stockKey);

    const sizeRows = sizes.map((size) => {
      const sizeQuantity = productState.quantities[size] ?? 0;
      const selected = size === selectedSize;

      return `
        <tr
          class="size-row ${selected ? "selected" : ""}"
          data-product="${product.id}"
          data-size="${size}"
          aria-selected="${selected}"
        >
          <td class="size-label">${escapeHTML(size)}</td>
          <td class="size-quantity ${stockClass(sizeQuantity)}">
            ${sizeQuantity}
          </td>
        </tr>
      `;
    }).join("");

    /*
     * Produk z rozmiarami:
     * zdjęcie | tabela rozmiarów | wybrany rozmiar |
     * przyciski zmiany stanu | minimum
     *
     * Produkty bez rozmiarów:
     * zdjęcie | stan i przyciski | minimum
     */

    if (!hasSizes) {
      return `
        <article
          class="product-row product-row-no-sizes"
          data-product-row="${product.id}"
        >
          <h2 class="product-name">
            ${escapeHTML(product.name)}
          </h2>

          ${renderProductImage(product)}
<div class="stock-management-layout">
  <div class="selected-size-column">
    <div class="stock-heading">WYBRANY ROZMIAR</div>

    <div class="selected-size">
      <span class="selected-size-badge">
        Brak rozmiaru do wyboru
      </span>
    </div>
  </div>

  ${renderStockControls(product, quantity)}
</div>

          ${renderMinimum(product, stockKey, minimum, selectedSize)}
        </article>
      `;
    }

    return `
      <article
        class="product-row product-row-has-sizes"
        data-product-row="${product.id}"
      >
        <h2 class="product-name">
          ${escapeHTML(product.name)}
        </h2>

        ${renderProductImage(product)}

        <div class="size-table-wrap">
          <table
            class="size-table"
            aria-label="Stany rozmiarów: ${escapeHTML(product.name)}"
          >
            <tbody>${sizeRows}</tbody>
          </table>
        </div>

        <div class="stock-panel">
          <div class="stock-management-layout">
            <div class="selected-size-column">
              <div class="stock-heading">WYBRANY ROZMIAR</div>

              <div class="selected-size">
  <span class="selected-size-badge">
    ${hasSizes
      ? escapeHTML(selectedSize)
      : "Brak rozmiaru do wyboru"}
  </span>
</div>
            </div>

            ${renderStockControls(product, quantity)}
          </div>
        </div>

        ${renderMinimum(product, stockKey, minimum, selectedSize)}
      </article>
    `;
  }).join("");

  handleImageFallbacks(".product-image");
}

/* ========================================
   DO ZAMÓWIENIA
======================================== */

function renderOrderProducts() {
  const rows = [];

  PRODUCTS.forEach((product) => {
    const productState = state[product.id];
    const sizes = getProductSizes(product);
    const keys = sizes.length ? sizes : [TOTAL_STOCK_KEY];

    keys.forEach((key) => {
      const quantity = productState.quantities[key] ?? 0;
      const minimum = getMinimum(product, key);

      if (quantity > minimum) return;

      const sizeLabel = sizes.length
        ? `Rozmiar: ${escapeHTML(key)}`
        : "Bez rozmiaru";

      const searchText =
        `${product.name} ${sizes.length ? key : ""}`
          .toLocaleLowerCase("pl");

      if (
        searchQuery &&
        !searchText.includes(searchQuery.toLocaleLowerCase("pl"))
      ) {
        return;
      }

      const shortage = Math.max(0, minimum - quantity);

      rows.push(`
        <article class="order-row">
          <img
            class="order-image"
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            referrerpolicy="no-referrer"
          >

          <div class="order-details">
            <h2 class="order-name">
              ${escapeHTML(product.name)}
            </h2>

            <div class="order-meta">
              <span class="order-size">
                ${sizeLabel}
              </span>

              <span class="order-stock">
                Stan: <strong>${quantity}</strong>
              </span>

              <span class="order-minimum">
                Minimum: <strong>${minimum}</strong>
              </span>

              ${
                shortage > 0
                  ? `
                    <span class="order-shortage">
                      Brakuje: <strong>${shortage}</strong>
                    </span>
                  `
                  : `
                    <span class="order-shortage order-shortage-ok">
                      Na poziomie minimum
                    </span>
                  `
              }
            </div>
          </div>
        </article>
      `);
    });
  });

  resultsCount.textContent = `Do zamówienia: ${rows.length}`;
  emptyMessage.hidden = true;

  if (rows.length === 0) {
    productList.innerHTML = `
      <div class="order-empty">
        <strong>Magazyn jest na bieżąco.</strong><br>
        Żaden produkt nie wymaga obecnie zamówienia.
      </div>
    `;
    return;
  }

  productList.innerHTML = `
    <div class="order-list">
      ${rows.join("")}
    </div>
  `;

  handleImageFallbacks(".order-image");
}

function handleImageFallbacks(selector) {
  productList.querySelectorAll(selector).forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";

      const parent = img.parentElement;

      if (parent) {
        parent.classList.add("image-unavailable");
        parent.setAttribute("aria-label", "Brak zdjęcia produktu");
      }
    }, { once: true });
  });
}

/* ========================================
   GŁÓWNE RENDEROWANIE
======================================== */

function render() {
  renderFilters();

  const categories = document.querySelector(".main-categories");

  if (
    categories &&
    !categories.querySelector('[data-category="pozostale"]')
  ) {
    const button = document.createElement("button");

    button.className = "main-tab";
    button.type = "button";
    button.dataset.category = "pozostale";
    button.textContent = "Pozostałe";

    categories.appendChild(button);
  }

  document.querySelectorAll(".main-tab").forEach((button) => {
    const isOrdersTab = button.dataset.view === "orders";

    const active = isOrdersTab
      ? activeView === "orders"
      : activeView === "products" &&
        button.dataset.category === activeCategory;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderProducts();
}

/* ========================================
   ZMIANA WIDOKU I FILTRÓW
======================================== */

function selectCategory(category) {
  if (!CATEGORY_FILTERS[category]) return;

  activeView = "products";
  activeCategory = category;
  activeFilter = "all";

  render();
}

function selectFilter(filter) {
  const valid = CATEGORY_FILTERS[activeCategory].some(
    (option) => option.id === filter
  );

  if (!valid) return;

  activeFilter = filter;
  render();
}

/* ========================================
   WYBÓR ROZMIARU I ZMIANA STANU
======================================== */

function selectSize(productId, size) {
  const product = PRODUCTS.find((item) => item.id === productId);

  if (
    !product ||
    !state[productId] ||
    !getProductSizes(product).includes(String(size))
  ) {
    return;
  }

  state[productId].selectedSize = String(size);

  saveState();
  renderProducts();
}

function changeStock(productId, amount) {
  const product = PRODUCTS.find((item) => item.id === productId);
  const productState = state[productId];

  if (
    !product ||
    !productState ||
    !Number.isFinite(amount) ||
    amount === 0
  ) {
    return;
  }

  const stockKey = getStockKey(product, productState);
  const current = productState.quantities[stockKey] ?? 0;
  const next = current + amount;

  if (next < 0 || next > MAX_STOCK_VALUE) return;

  productState.quantities[stockKey] = next;

  saveState();
  renderProducts();
}

function updateStep(productId, value) {
  if (!state[productId]) return false;

  const parsed = Number(value);

  if (
    !Number.isInteger(parsed) ||
    parsed < 1 ||
    parsed > MAX_STOCK_VALUE
  ) {
    return false;
  }

  state[productId].step = parsed;
  saveState();

  return true;
}

/* ========================================
   OBSŁUGA KATEGORII
======================================== */

const mainCategories = document.querySelector(".main-categories");

if (mainCategories) {
  mainCategories.addEventListener("click", (event) => {
    const button = event.target.closest(".main-tab");

    if (!button) return;

    if (button.dataset.view === "orders") {
      activeView = "orders";
      render();
      return;
    }

    if (button.dataset.category) {
      selectCategory(button.dataset.category);
    }
  });
}

/* ========================================
   OBSŁUGA FILTRÓW
======================================== */

filtersContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");

  if (!button) return;

  selectFilter(button.dataset.filter);
});

/* ========================================
   OBSŁUGA PRZYCISKÓW I ROZMIARÓW
======================================== */

productList.addEventListener("click", (event) => {
  const sizeRow = event.target.closest("[data-size][data-product]");

  if (sizeRow) {
    selectSize(sizeRow.dataset.product, sizeRow.dataset.size);
    return;
  }

  const actionButton = event.target.closest("[data-action]");

  if (!actionButton || actionButton.disabled) return;

  const productId = actionButton.dataset.product;
  const action = actionButton.dataset.action;
  const step = state[productId]?.step ?? 1;

  switch (action) {
    case "add-one":
      changeStock(productId, 1);
      break;

    case "remove-one":
      changeStock(productId, -1);
      break;

    case "add-step":
      changeStock(productId, step);
      break;

    case "remove-step":
      changeStock(productId, -step);
      break;
  }
});

/* ========================================
   OBSŁUGA MINIMUM MAGAZYNOWEGO
======================================== */

productList.addEventListener("change", (event) => {
  const input = event.target.closest("[data-minimum]");

  if (!input) return;

  const productId = input.dataset.minimum;
  const key = input.dataset.minimumKey;
  const value = Number(input.value);

  const product = PRODUCTS.find((item) => item.id === productId);

  if (!product) return;

  if (
    input.value.trim() === "" ||
    !Number.isInteger(value) ||
    value < 0 ||
    value > MAX_STOCK_VALUE
  ) {
    input.value = getMinimum(product, key);
    return;
  }

  if (!updateMinimum(productId, key, value)) {
    input.value = getMinimum(product, key);
    return;
  }

  renderProducts();
});

/* ========================================
   OBSŁUGA LICZBY ZMIANY
======================================== */

productList.addEventListener("change", (event) => {
  const input = event.target.closest("[data-step]");

  if (!input) return;

  const productId = input.dataset.step;
  const value = Number(input.value);

  if (
    input.value.trim() === "" ||
    !Number.isInteger(value) ||
    value < 1 ||
    value > MAX_STOCK_VALUE
  ) {
    input.value = state[productId]?.step ?? 2;
    return;
  }

  updateStep(productId, value);
  input.value = state[productId].step;
});

/* ========================================
   WYSZUKIWANIE
======================================== */

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim();
  renderProducts();
});

/* ========================================
   START
======================================== */

render();
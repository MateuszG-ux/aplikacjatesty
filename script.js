"use strict";

/*
 * STOCKFLOW — wersja demonstracyjna
 * Dane są zapisywane lokalnie w przeglądarce.
 * To nie jest jeszcze synchronizacja między urządzeniami.
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

// Lista produktów
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

  // POZOSTAŁE — MARKERY
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

  // POZOSTAŁE WYPOSAŻENIE — BEZ ROZMIARU
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
let searchQuery = "";

const productList = document.getElementById("product-list");
const filtersContainer = document.getElementById("filters");
const resultsCount = document.getElementById("results-count");
const emptyMessage = document.getElementById("empty-message");
const searchInput = document.getElementById("search");

// Tworzenie początkowych stanów magazynowych
function createDefaultState() {
  const state = {};

  PRODUCTS.forEach((product) => {
    const sizes = getProductSizes(product);

    const quantities = sizes.length
      ? Object.fromEntries(sizes.map((size) => [size, 0]))
      : { [TOTAL_STOCK_KEY]: 0 };

    state[product.id] = {
      quantities,
      selectedSize: sizes[0] ?? null,
      step: 2
    };
  });

  return state;
}

// Wczytywanie zapisanych danych
function loadState() {
  const defaults = createDefaultState();

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return defaults;

    const parsed = JSON.parse(saved);

    PRODUCTS.forEach((product) => {
      const existing = parsed[product.id];

      if (!existing) return;

      const sizes = getProductSizes(product);
      const target = defaults[product.id];

      sizes.forEach((size) => {
        const value = Number(existing.quantities?.[size]);

        if (Number.isFinite(value) && value >= 0) {
          target.quantities[size] = Math.floor(value);
        }
      });

      if (sizes.length === 0) {
        const savedTotal = Number(
          existing.quantities?.[TOTAL_STOCK_KEY]
        );

        if (
          Number.isFinite(savedTotal) &&
          savedTotal >= 0 &&
          existing.quantities?.[TOTAL_STOCK_KEY] !== undefined
        ) {
          target.quantities[TOTAL_STOCK_KEY] = Math.floor(savedTotal);
        } else {
          const legacyTotal = Object.values(
            existing.quantities ?? {}
          ).reduce((sum, value) => {
            const number = Number(value);

            return sum +
              (Number.isFinite(number) && number > 0
                ? Math.floor(number)
                : 0);
          }, 0);

          target.quantities[TOTAL_STOCK_KEY] = legacyTotal;
        }
      }

      if (sizes.includes(String(existing.selectedSize))) {
        target.selectedSize = String(existing.selectedSize);
      }

      const step = Number(existing.step);

      if (Number.isFinite(step) && step >= 1 && step <= 99999) {
        target.step = Math.floor(step);
      }
    });

    return defaults;
  } catch (error) {
    console.error("Nie udało się odczytać zapisanych danych:", error);
    return defaults;
  }
}

let state = loadState();

// Zapisywanie danych
function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Nie udało się zapisać danych:", error);
    alert("Nie udało się zapisać danych w przeglądarce.");
  }
}

// Zabezpieczenie tekstu wyświetlanego w HTML
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// Kolory stanów magazynowych
function stockClass(quantity) {
  if (quantity === 0) return "stock-empty";
  if (quantity <= 2) return "stock-low";
  if (quantity <= 5) return "stock-medium";
  return "stock-good";
}

// Wyświetlanie filtrów
function renderFilters() {
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

// Filtrowanie produktów
function getVisibleProducts() {
  return PRODUCTS.filter((product) => {
    const categoryMatches = product.category === activeCategory;

    const filterMatches =
      activeFilter === "all" || product.type === activeFilter;

    const searchMatches =
      product.name.toLocaleLowerCase("pl").includes(
        searchQuery.toLocaleLowerCase("pl")
      );

    return categoryMatches && filterMatches && searchMatches;
  });
}

// Wyświetlanie produktów
function renderProducts() {
  const products = getVisibleProducts();

  resultsCount.textContent = `Produkty: ${products.length}`;
  emptyMessage.hidden = products.length > 0;

  productList.innerHTML = products.map((product) => {
    const productState = state[product.id];
    const sizes = getProductSizes(product);
    const hasSizes = sizes.length > 0;

    const selectedSize = productState.selectedSize;
    const stockKey = hasSizes ? selectedSize : TOTAL_STOCK_KEY;
    const quantity = productState.quantities[stockKey] ?? 0;

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
          <td class="size-quantity ${stockClass(sizeQuantity)}">${sizeQuantity}</td>
        </tr>
      `;
    }).join("");

    return `
      <article
        class="product-row ${hasSizes ? "" : "product-row-no-sizes"}"
        data-product-row="${product.id}"
      >
        <div class="product-image-wrap">
          <img
            class="product-image"
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            referrerpolicy="no-referrer"
          >
        </div>

        <div class="size-table-wrap ${hasSizes ? "" : "no-size-placeholder"}">
          ${
            hasSizes
              ? `
                <table
                  class="size-table"
                  aria-label="Stany rozmiarów: ${escapeHTML(product.name)}"
                >
                  <tbody>${sizeRows}</tbody>
                </table>
              `
              : `<div class="no-size-label">Stan</div>`
          }
        </div>

        <div class="stock-panel">
          <h2 class="product-name">${escapeHTML(product.name)}</h2>

          ${
            hasSizes
              ? `<div class="stock-heading">ROZMIAR</div>`
              : ""
          }

          ${
            hasSizes
              ? `
                <div class="selected-size">
                  <span class="selected-size-badge">
                    ${escapeHTML(selectedSize)}
                  </span>
                </div>
              `
              : ""
          }

          <div class="stock-controls">
            <button
              class="small-action"
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
              class="small-action"
              data-action="remove-one"
              data-product="${product.id}"
              type="button"
              aria-label="Odejmij jedną sztukę"
              title="Odejmij 1 sztukę"
              ${quantity === 0 ? "disabled" : ""}
            >-1</button>
          </div>

          <div class="step-controls">
            <button
              class="step-action"
              data-action="add-step"
              data-product="${product.id}"
              type="button"
              aria-label="Dodaj wybraną liczbę sztuk"
            >+</button>

            <input
              class="step-value"
              type="number"
              min="1"
              max="99999"
              step="1"
              inputmode="numeric"
              value="${productState.step}"
              data-step="${product.id}"
              aria-label="Liczba sztuk do dodania lub odjęcia"
            >

            <button
              class="step-action"
              data-action="remove-step"
              data-product="${product.id}"
              type="button"
              aria-label="Odejmij wybraną liczbę sztuk"
              ${quantity === 0 ? "disabled" : ""}
            >-</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // Jeśli zdjęcie się nie załaduje, pokaż neutralne tło.
  productList.querySelectorAll(".product-image").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";

      img.parentElement.style.background =
        "linear-gradient(135deg, #353328, #171715)";

      img.parentElement.setAttribute(
        "aria-label",
        "Brak zdjęcia produktu"
      );
    }, { once: true });
  });
}

// Odświeżanie całego widoku
function render() {
  renderFilters();

  // Dodaj przycisk „Pozostałe”, jeśli nie ma go w index.html.
  const mainCategories = document.querySelector(".main-categories");

  if (
    mainCategories &&
    !mainCategories.querySelector('[data-category="pozostale"]')
  ) {
    const button = document.createElement("button");
    button.className = "main-tab";
    button.type = "button";
    button.dataset.category = "pozostale";
    button.textContent = "Pozostałe";
    mainCategories.appendChild(button);
  }

  document.querySelectorAll(".main-tab").forEach((button) => {
    const active = button.dataset.category === activeCategory;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  renderProducts();
}

// Wybór kategorii głównej
function selectCategory(category) {
  if (!CATEGORY_FILTERS[category]) return;

  activeCategory = category;
  activeFilter = "all";

  render();
}

// Wybór filtra
function selectFilter(filter) {
  const valid = CATEGORY_FILTERS[activeCategory].some(
    (option) => option.id === filter
  );

  if (!valid) return;

  activeFilter = filter;

  render();
}

// Wybór rozmiaru
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

// Zmiana stanu magazynowego
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

  // Stan nie może spaść poniżej zera.
  if (next < 0) return;

  productState.quantities[stockKey] = next;

  saveState();
  renderProducts();
}

// Ustawianie liczby sztuk dla większej zmiany
function updateStep(productId, value) {
  if (!state[productId]) return;

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1 || parsed > 99999) {
    return;
  }

  state[productId].step = Math.floor(parsed);

  saveState();
}

// Obsługa kategorii głównych
document
  .querySelector(".main-categories")
  .addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");

    if (!button) return;

    selectCategory(button.dataset.category);
  });

// Obsługa filtrów podrzędnych
filtersContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");

  if (!button) return;

  selectFilter(button.dataset.filter);
});

// Obsługa kliknięć w rozmiary i przyciski ilości
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

// Obsługa pola większej zmiany ilości
productList.addEventListener("change", (event) => {
  const input = event.target.closest("[data-step]");

  if (!input) return;

  const productId = input.dataset.step;
  const value = Number(input.value);

  if (!Number.isInteger(value) || value < 1 || value > 99999) {
    input.value = state[productId].step;
    return;
  }

  updateStep(productId, value);
  input.value = state[productId].step;
});

// Wyszukiwanie produktów
searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim();

  renderProducts();
});

// Uruchomienie aplikacji
render();
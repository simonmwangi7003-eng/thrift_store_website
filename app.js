const products = [
  {
    id: 1,
    name: "The Sunday Knit",
    category: "Clothing",
    detail: "Soft wool · Size M",
    price: 2800,
    tag: "JUST IN",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80",
    alt: "Soft neutral knit sweater",
  },
  {
    id: 2,
    name: "Sunny Side Vase",
    category: "Home",
    detail: "Hand-thrown · 24 cm",
    price: 1650,
    tag: "ONE OF A KIND",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=700&q=80",
    alt: "Sculptural ceramic vase",
  },
  {
    id: 3,
    name: "The Weekend Tote",
    category: "Accessories",
    detail: "Woven cotton · Roomy",
    price: 1200,
    tag: "GOOD FIND",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80",
    alt: "Everyday woven tote bag",
  },
  {
    id: 4,
    name: "Sunday Market Shirt",
    category: "Clothing",
    detail: "Cotton blend · Size L",
    price: 1950,
    tag: "JUST IN",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80",
    alt: "Relaxed vintage button-up shirt",
  },
  {
    id: 5,
    name: "Little Earth Lamp",
    category: "Home",
    detail: "Ceramic base · Warm glow",
    price: 3500,
    tag: "ONE OF A KIND",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80",
    alt: "Warm vintage table lamp",
  },
  {
    id: 6,
    name: "The Good Jeans",
    category: "Clothing",
    detail: "Broken-in denim · Size 30",
    price: 2400,
    tag: "GOOD FIND",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
    alt: "Classic vintage blue jeans",
  },
  {
    id: 7,
    name: "Golden Hour Shades",
    category: "Accessories",
    detail: "Amber frame · UV400",
    price: 950,
    tag: "JUST IN",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
    alt: "Timeless amber sunglasses",
  },
  {
    id: 8,
    name: "Sunday Table Set",
    category: "Home",
    detail: "Set of 2 · Stoneware",
    price: 2200,
    tag: "ONE OF A KIND",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=700&q=80",
    alt: "Handmade stoneware plates",
  },
  {
    id: 9,
    name: "The Little Leather Bag",
    category: "Accessories",
    detail: "Genuine leather · Loved",
    price: 3200,
    tag: "GOOD FIND",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    alt: "Pre-loved brown leather shoulder bag",
  },
  {
    id: 10,
    name: "Cloud Nine Cardigan",
    category: "Clothing",
    detail: "Cashmere blend · Size S",
    price: 3100,
    tag: "JUST IN",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=80",
    alt: "Cozy cream vintage cardigan",
  },
  {
    id: 11,
    name: "The Sunday Tray",
    category: "Home",
    detail: "Carved wood · 32 cm",
    price: 1450,
    tag: "GOOD FIND",
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=700&q=80",
    alt: "Vintage wooden serving tray",
  },
  {
    id: 12,
    name: "Little Lucky Scarf",
    category: "Accessories",
    detail: "Silk blend · 60 × 60 cm",
    price: 850,
    tag: "ONE OF A KIND",
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=700&q=80",
    alt: "Colorful vintage silk scarf",
  },
];
const money = (n) => "KSh " + new Intl.NumberFormat("en-KE").format(n);
let category = "All",
  query = "",
  sort = "featured",
  saved = new Set(
    JSON.parse(localStorage.getItem("second-story-saved") || "[]"),
  ),
  cart = JSON.parse(localStorage.getItem("second-story-cart") || "{}"),
  toastTimer;
const grid = document.querySelector("#product-grid"),
  empty = document.querySelector("#empty-state"),
  search = document.querySelector("#search-input");
function visibleProducts() {
  let list = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (p.name + " " + p.detail + " " + p.category)
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (!location.hash.includes("saved") || saved.has(p.id)),
  );
  if (sort === "low") list.sort((a, b) => a.price - b.price);
  if (sort === "high") list.sort((a, b) => b.price - a.price);
  if (sort === "new") list.sort((a, b) => b.id - a.id);
  return list;
}
function renderProducts() {
  const list = visibleProducts();
  grid.innerHTML = list
    .map(
      (p) =>
        `<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.alt}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="favorite-button ${saved.has(p.id) ? "is-favorite" : ""}" data-favorite="${p.id}" aria-label="${saved.has(p.id) ? "Remove from" : "Save"} ${p.name}">${saved.has(p.id) ? "♥" : "♡"}</button><button class="quick-add" data-add="${p.id}">Add to bag <span>＋</span></button></div><div class="product-info"><div><div class="product-name">${p.name}</div><div class="product-meta">${p.detail}</div></div><div class="product-price">${money(p.price)}</div></div></article>`,
    )
    .join("");
  empty.hidden = list.length > 0;
  grid.hidden = list.length === 0;
  document.querySelector("#result-count").textContent =
    `Showing ${list.length} ${list.length === 1 ? "lovely find" : "lovely finds"}`;
  document
    .querySelectorAll(".category-tab")
    .forEach((b) =>
      b.classList.toggle("active", b.dataset.category === category),
    );
  document.querySelector(".saved-count").textContent = saved.size;
}
function persist() {
  localStorage.setItem("second-story-cart", JSON.stringify(cart));
  localStorage.setItem("second-story-saved", JSON.stringify([...saved]));
  renderCart();
}
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  persist();
  showToast(`${products.find((p) => p.id === id).name} is in your bag ♡`);
}
function renderCart() {
  const rows = Object.entries(cart).filter(([, q]) => q > 0),
    count = rows.reduce((n, [, q]) => n + q, 0),
    subtotal = rows.reduce(
      (n, [id, q]) => n + products.find((p) => p.id === +id).price * q,
      0,
    );
  document
    .querySelectorAll(".bag-count")
    .forEach((el) => (el.textContent = count));
  document.querySelector("#cart-subtotal").textContent = money(subtotal);
  document.querySelector("#delivery-message").textContent =
    subtotal > 10000
      ? "Your order qualifies for free delivery ✳"
      : `Free delivery on orders over KSh 10,000. ${subtotal ? `${money(10000 - subtotal)} to go.` : ""}`;
  document.querySelector("#cart-items").innerHTML = rows
    .map(([id, q]) => {
      const p = products.find((x) => x.id === +id);
      return `<div class="cart-row"><img src="${p.image}" alt=""><div><div class="cart-row-name">${p.name}</div><div class="cart-row-meta">${p.detail}</div><div class="qty-control"><button data-qty="${id}" data-delta="-1" aria-label="Remove one ${p.name}">−</button><span>${q}</span><button data-qty="${id}" data-delta="1" aria-label="Add one ${p.name}">+</button></div><button class="remove-item" data-remove="${id}">Remove</button></div><span class="cart-row-price">${money(p.price * q)}</span></div>`;
    })
    .join("");
  document.querySelector("#cart-empty").style.display = count ? "none" : "flex";
  document.querySelector("#cart-footer").classList.toggle("is-hidden", !count);
}
function showToast(message) {
  const t = document.querySelector("#toast");
  t.textContent = message;
  t.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("visible"), 2200);
}
function openCart() {
  document.querySelector("#overlay").classList.add("visible");
  document.querySelector("#cart-drawer").classList.add("open");
  document.querySelector("#cart-drawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.querySelector("#overlay").classList.remove("visible");
  document.querySelector("#cart-drawer").classList.remove("open");
  document.querySelector("#cart-drawer").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]"),
    fav = e.target.closest("[data-favorite]"),
    qty = e.target.closest("[data-qty]"),
    remove = e.target.closest("[data-remove]"),
    tab = e.target.closest(".category-tab"),
    nav = e.target.closest("[data-nav-category]");
  if (add) addToCart(+add.dataset.add);
  if (fav) {
    const id = +fav.dataset.favorite;
    saved.has(id) ? saved.delete(id) : saved.add(id);
    persist();
    renderProducts();
  }
  if (qty) {
    const id = qty.dataset.qty;
    cart[id] = Math.max(0, (cart[id] || 0) + +qty.dataset.delta);
    if (!cart[id]) delete cart[id];
    persist();
  }
  if (remove) {
    delete cart[remove.dataset.remove];
    persist();
  }
  if (tab) {
    category = tab.dataset.category;
    location.hash = "shop";
    renderProducts();
  }
  if (nav) {
    category = nav.dataset.navCategory;
    renderProducts();
    document.querySelector(".desktop-nav").classList.remove("open");
  }
  if (e.target.closest(".bag-button")) openCart();
  if (
    e.target.closest(".close-drawer") ||
    e.target.id === "overlay" ||
    e.target.closest(".continue-shopping")
  )
    closeCart();
  if (e.target.closest("#clear-filters") || e.target.closest("#reset-search")) {
    e.preventDefault();
    category = "All";
    query = "";
    search.value = "";
    renderProducts();
  }
  if (e.target.closest(".close-checkout")) closeCheckout();
  if (e.target.closest("#finish-order")) {
    closeCheckout();
    document.querySelector("#checkout-form").hidden = false;
    document.querySelector("#order-success").hidden = true;
    renderProducts();
  }
});
document.querySelector(".heart-toggle").addEventListener("click", () => {
  if (location.hash === "#saved") {
    location.hash = "shop";
    category = "All";
  } else location.hash = "saved";
  renderProducts();
  document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
});
document.querySelector(".search-toggle").addEventListener("click", () => {
  document.querySelector("#shop").scrollIntoView({ behavior: "smooth" });
  search.focus();
});
search.addEventListener("input", () => {
  query = search.value;
  renderProducts();
});
document.querySelector("#sort-select").addEventListener("change", (e) => {
  sort = e.target.value;
  renderProducts();
});
document.querySelector("#newsletter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector("#newsletter-message").textContent =
    "You’re on the list. Good things are coming your way!";
  e.target.reset();
});
document
  .querySelector(".menu-toggle")
  .addEventListener("click", () =>
    document.querySelector(".desktop-nav").classList.toggle("open"),
  );
document.querySelector("#overlay").addEventListener("click", closeCart);
document
  .querySelectorAll(".bag-button")
  .forEach((b) => b.addEventListener("click", openCart));
document.querySelector(".close-drawer").addEventListener("click", closeCart);
document
  .querySelector(".continue-shopping")
  .addEventListener("click", closeCart);
document
  .querySelector(".close-checkout")
  .addEventListener("click", closeCheckout);
function closeCheckout() {
  document.querySelector("#checkout-modal").classList.remove("visible");
  document.querySelector("#checkout-modal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelector("#checkout-button").addEventListener("click", () => {
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  if (!count) return;
  closeCart();
  document.querySelector("#checkout-summary").textContent =
    `${count} special ${count === 1 ? "find is" : "finds are"} on their way to a new chapter.`;
  document.querySelector("#checkout-modal").classList.add("visible");
  document
    .querySelector("#checkout-modal")
    .setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});
document.querySelector("#checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  cart = {};
  persist();
  e.target.hidden = true;
  document.querySelector("#order-success").hidden = false;
});
document.querySelector("#checkout-modal").addEventListener("click", (e) => {
  if (e.target.id === "checkout-modal") closeCheckout();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
    closeCheckout();
  }
  if (
    e.key === "/" &&
    !/input|textarea/i.test(document.activeElement.tagName)
  ) {
    e.preventDefault();
    search.focus();
  }
});
renderProducts();
renderCart();

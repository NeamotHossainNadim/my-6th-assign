const plantsContainer = document.getElementById("plants-container");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const categoryList = document.querySelector("aside ul");

let cart = [];
let categoriesMap = {}; // { "Fruit Tree": 1, "Flowering Tree": 2, ... }

// -------------------- Fetch Helper --------------------
async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// -------------------- Load All Plants --------------------
async function loadPlants() {
  const data = await fetchData("https://openapi.programming-hero.com/api/plants");
  displayPlants(data?.plants || []);
}

// -------------------- Load Categories --------------------
async function loadCategories() {
  const data = await fetchData("https://openapi.programming-hero.com/api/categories");
  const categories = data?.categories || [];

  // Build categories list HTML at once
  let html = `
    <li><a href="#" data-id="all" class="block bg-green-700 text-white px-4 py-2 rounded">All Trees</a></li>
  `;

  categories.forEach(c => {
    categoriesMap[c.category_name] = c.id;
    html += `
      <li>
        <a href="#" data-id="${c.id}" class="block px-4 py-2 hover:bg-green-100 rounded">
          ${c.category_name}
        </a>
      </li>
    `;
  });

  categoryList.innerHTML = html;
}

// -------------------- Load Plants by Category --------------------
async function loadCategoryPlants(categoryId) {
  const data = await fetchData(`https://openapi.programming-hero.com/api/category/${categoryId}`);
  displayPlants(data?.plants || []);
}

// -------------------- Display Plants --------------------
function displayPlants(plants) {
  if (!plants.length) {
    plantsContainer.innerHTML = `<p class="text-gray-500">No plants found</p>`;
    return;
  }

  // Build all cards in one go (less reflow)
  plantsContainer.innerHTML = plants.map(plant => `
    <div class="bg-white shadow rounded-lg p-4 flex flex-col h-fit">
      <img src="${plant.image}" alt="${plant.name}" 
           class="rounded-md mb-4 w-full h-40 object-cover">
      <h3 class="text-lg font-semibold">${plant.name}</h3>
      <p class="text-sm text-gray-600 mb-2">${plant.description.slice(0, 100)}...</p>
      <span class="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">${plant.category}</span>
      <div class="mt-2 flex justify-between items-center">
        <span class="font-bold">৳${plant.price}</span>
        <button class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" 
          data-action="add-to-cart"
          data-id="${plant.id}" 
          data-name="${plant.name}" 
          data-price="${plant.price}">
          Add to Cart
        </button>
      </div>
    </div>
  `).join("");
}

// -------------------- Cart Functions --------------------
function addToCart(plant) {
  const existing = cart.find(item => item.id === plant.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...plant, quantity: 1 });
  renderCart();
}

function renderCart() {
  if (!cart.length) {
    cartItemsContainer.innerHTML = `<p class="text-gray-500 text-sm">Your cart is empty</p>`;
    cartTotalElement.textContent = "৳0";
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    total += item.price * item.quantity;
    return `
      <li class="flex justify-between items-center">
        <span>${item.name} x${item.quantity}</span>
        <span>৳${item.price * item.quantity}</span>
      </li>
    `;
  }).join("");

  cartTotalElement.textContent = `৳${total}`;
}

// -------------------- Global Event Delegation --------------------
document.body.addEventListener("click", e => {
  const target = e.target;

  // Category filter
  if (target.closest("aside ul li a")) {
    e.preventDefault();
    const btn = target.closest("a");
    const categoryId = btn.dataset.id;

    // active styling reset
    document.querySelectorAll("aside ul li a").forEach(b => b.classList.remove("bg-green-700", "text-white"));
    btn.classList.add("bg-green-700", "text-white");

    if (categoryId === "all") loadPlants();
    else loadCategoryPlants(categoryId);
  }

  // Add to cart
  if (target.dataset.action === "add-to-cart") {
    const id = target.dataset.id;
    const name = target.dataset.name;
    const price = parseFloat(target.dataset.price);
    addToCart({ id, name, price });
  }
});

document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const name = this.dataset.name;
      delete cart[name];
      updateCart();
    });
  });

// -------------------- Init --------------------
loadCategories();
loadPlants();

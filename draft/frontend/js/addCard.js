// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector(".add-btn");
//   const productGrid = document.querySelector(".product-grid");

//   addBtn.addEventListener("click", () => {
//     const newCard = document.createElement("div");
//     newCard.classList.add("product-card");
//     newCard.textContent = "Placeholder Product";
//     productGrid.appendChild(newCard);
//   });
// });

// Fetch and display products
function loadProducts() {
  fetch('/api/products/')
    .then(res => res.json())
    .then(products => {
      const grid = document.querySelector('.product-grid');
      grid.innerHTML = '';
      products.forEach(product => {
        grid.innerHTML += `
          <div class="product-card">
            <h4>${product.name}</h4>
            <p>Price: $${product.price}</p>
            <p>Qty: ${product.quantity}</p>
            <img src="${product.image}" alt="${product.name}" style="max-width:120px; max-height:120px; object-fit:contain;" />
          </div>
        `;
      });
    });
}
loadProducts();

// Modal logic
const modal = document.getElementById("modal");
const btn = document.getElementById("addBtn");
const span = document.querySelector(".close");

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
}

// Handle form submission
const form = modal.querySelector("form");
form.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    quantity: Number(formData.get("quantity")),
    image: formData.get("image")
  };

  // Send POST request to API
  const res = await fetch('/api/products/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    modal.style.display = "none";
    form.reset();
    loadProducts(); // Refresh product grid
  } else {
    alert("Failed to add product.");
  }
};
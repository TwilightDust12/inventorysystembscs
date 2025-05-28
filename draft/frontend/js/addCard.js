// Fetch and display products
function loadProducts() {
  fetch('/api/products/')
    .then(res => res.json())
    .then(products => {
      const grid = document.querySelector('.product-grid');
      let html = '';
      products.forEach(product => {
        html += `
          <div class="product-card">
            <header>${product.name}</header>
            <div class="image-placeholder">
              <img src="${product.image}" alt="Product Image" class="image"/>
            </div>
            <div class="content">
              <div class="info-block">
                <div class="label">Price</div>
                <div class="price-tag">$${product.price}</div>
              </div>
              <div class="info-block">
                <div class="label">Stock</div>
                <div class="stock-count">${product.quantity}</div>
              </div>
            </div>

            
          </div>
        `;
      });
      grid.innerHTML = html;
    })
    .catch(err => {
      console.error('Failed to load products:', err);
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

  if (data.price <= 0 || data.quantity < 0) {
    alert("Price must be greater than 0 and quantity cannot be negative.");
    return;
  }
  if (!data.name || !data.price || !data.quantity) {
    alert("Please fill in all fields.");
    return;
  }

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
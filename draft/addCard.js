document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector(".add-btn");
    const productGrid = document.querySelector(".product-grid");
  
    addBtn.addEventListener("click", () => {
      const newCard = document.createElement("div");
      newCard.classList.add("product-card");
      newCard.textContent = "Placeholder Product";
      productGrid.appendChild(newCard);
    });
  });
  
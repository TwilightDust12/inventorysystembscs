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

//modal
const modal = document.getElementById("modal");
const btn = document.getElementById("addBtn");
const span = document.querySelector(".close");

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
}
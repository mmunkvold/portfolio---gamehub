const cartItems = JSON.parse(localStorage.getItem("cartList"));
const cartContainer = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");
let total = 0;

cartItems.forEach(function (cartElement) {
  total += cartElement.price;
  cartContainer.innerHTML += `
  <div class="cart-item">
    <div style="background-image: url(${cartElement.image}) "class="cart-image"></div>
    <h4>Name of product:${cartElement.name}</h4>
    <p>Kr ${cartElement.price},-</p>
  </div>
    `;
});
totalContainer.innerHTML = `Total: kr ${total},-`;

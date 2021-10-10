const cartItems = JSON.parse(localStorage.getItem("cartList"));
const cartContainer = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");
let total = 0;

cartItems.forEach(function (cartElement) {
  total += parseFloat(cartElement.price);
  cartContainer.innerHTML += `
  <div class="cart-item">
    <img class="cart-image" src="${cartElement.image}"/>
    <h4>${cartElement.name}</h4>
    <p id="checkout-price">kr ${cartElement.price}</p>
  </div>`;
});
totalContainer.innerHTML = `<hr></hr>Total: kr ${total},-`;

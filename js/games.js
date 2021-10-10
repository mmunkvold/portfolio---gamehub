const newGamesContainer = document.querySelector(".new-games-container");
const urlNewGames = "https://monicamunkvoldnikolaisen.no/gamehub/wp-json/wc/store/products?category=16";

const cart = document.querySelector(".cart");
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");
let cartArray = [];

async function getNewGames() {
  try {
    const response = await fetch(urlNewGames);
    const products = await response.json();

    newGamesContainer.innerHTML = "";

    products.forEach(function (product) {
      newGamesContainer.innerHTML += `
        <div class="game">
          <p class="new-label">${product.tags[0].name}</p>
          <a href="gamedetails.html?id=${product.id}" ><img class="game-image card " src="${product.images[0].src}"/>
          <h3>${product.name}</h3></a>
          <div class="game-price">Price: ${product.prices.regular_price},-</div>
          <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.prices.regular_price}" data-image="${product.images[0].src}">Add to cart</button>
        </div>
      `;
    });

    const buttons = document.querySelectorAll(".add-to-cart-btn");

    buttons.forEach(function (button) {
      button.addEventListener("click", addItemToCart);
    });
  } catch (error) {
    newGamesContainer.innerHTML = displayError("Oh dear, something isn't working...");
  }
}

getNewGames();

/* ========================================================== */

const usedGamesContainer = document.querySelector(".used-games-container");
const urlUsedGames = "https://monicamunkvoldnikolaisen.no/gamehub/wp-json/wc/store/products?category=15";

async function getUsedGames() {
  try {
    const response = await fetch(urlUsedGames);
    const products = await response.json();

    usedGamesContainer.innerHTML = "";

    products.forEach(function (product) {
      usedGamesContainer.innerHTML += `
        <div class="game">
          <p class="used-label">${product.tags[0].name}</p>
          <a href="gamedetails.html?id=${product.id}" ><img class="game-image card " src="${product.images[0].src}"/>
          <h3>${product.name}</h3></a>
          <div class="game-price">Price: ${product.prices.regular_price},-</div>
          <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.prices.regular_price}" data-image="${product.images[0].src}">Add to cart</button>
        </div>
      `;
    });
    const buttons = document.querySelectorAll(".add-to-cart-btn");

    buttons.forEach(function (button) {
      button.addEventListener("click", addItemToCart);
    });
  } catch (error) {
    usedGamesContainer.innerHTML = displayError("Oh dear, something isn't working...");
  }
}

getUsedGames();

function addItemToCart(event) {
  const name = event.target.dataset.name;
  const price = event.target.dataset.price;
  const image = event.target.dataset.image;

  cartArray.push({ name, price, image });

  localStorage.setItem("cartList", JSON.stringify(cartArray));
  showCart();
}

function showCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartList"));
  cart.style.display = "block";
  cartList.innerHTML = "";
  let total = 0;

  cartItems.forEach(function (cartElement) {
    total += parseFloat(cartElement.price);

    cartList.innerHTML += `
      <div class="cart-item">
        <img class="cart-image" src="${cartElement.image}"/>
        <h4>${cartElement.name}</h4>
        <p>kr ${cartElement.price},-</p>
      </div>`;
  });
  totalContainer.innerHTML = `<hr></hr>Total: kr ${total},-`;
}

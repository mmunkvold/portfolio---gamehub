const newGamesContainer = document.querySelector(".new-games-container");

const urlNewGames = "https://monicamunkvoldnikolaisen.no/gamehub/wp-json/wc/store/products?category=16";

const cart = document.querySelector(".cart");
const cartItems = JSON.parse(localStorage.getItem("cartList"));
const cartList = document.querySelector(".cart-list");
const totalContainer = document.querySelector(".total");
let cartArray = [];

async function getNewGames(urlNewGames) {
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
          <button class="add-to-cart-btn" data-product="${product.name}">Add to cart</button>
        </div>
      `;
    });
    const buttons = Array.from(document.getElementsByClassName("add-to-cart-btn"));

    buttons.forEach(function (button) {
      button.onclick = function (event) {
        console.log(event.target.dataset.product.name);

        const itemToAdd = event.target.dataset.product;
        if (products.name == event.target.dataset.product.name) {
          cartArray.push(itemToAdd);
        }
        //cartArray.push(itemToAdd);
        showCart(cartArray);
        localStorage.setItem("cartList", JSON.stringify(cartArray));
      };
    });
  } catch (error) {
    newGamesContainer.innerHTML = displayError("Oh dear, something isn't working...");
  }
}
getNewGames(urlNewGames);

/* ========================================================== */

// Used games:

const usedGamesContainer = document.querySelector(".used-games-container");

const urlUsedGames = "https://monicamunkvoldnikolaisen.no/gamehub/wp-json/wc/store/products?category=15";
//console.log(urlUsedGames);

async function getUsedGames(urlUsedGames) {
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
          <button class="add-to-cart-btn" data-product="${product.id}">Add to cart</button>
        </div>
      `;
    });
    const buttons = Array.from(document.getElementsByClassName("add-to-cart-btn"));

    buttons.forEach(function (button) {
      button.onclick = function (event) {
        //console.log(products);

        const itemToAdd = products.id;
        if (products.id == event.target.dataset.product.id) {
          cartArray.push(itemToAdd);
        }
        //cartArray.push(itemToAdd);
        showCart(cartArray);
        localStorage.setItem("cartList", JSON.stringify(cartArray));
      };
    });
  } catch (error) {
    usedGamesContainer.innerHTML = displayError("Oh dear, something isn't working...");
  }
}
getUsedGames(urlUsedGames);

function showCart(cartItems) {
  cart.style.display = "block";
  cartList.innerHTML = "";
  let total = 0;
  //console.log(cartItems); //gives an array of the products clicked
  cartItems.forEach(function (cartElement) {
    total += cartElement.price; //GET CARTELEMENT UNDEFINED
    cartList.innerHTML += `
    <div class="cart-item">
    <h4>${cartElement.name}</h4> 
    <div style="background-image: url(${cartElement.image})" class="cart-image">
    </div><button class="remove-btn"></button></div>`;
  });
  totalContainer.innerHTML = `Total: kr ${total},-`;
}

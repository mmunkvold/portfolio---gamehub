const detailsContainer = document.querySelector(".details");
detailsContainer.innerHTML = "";
let cartArray = 0;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://monicamunkvoldnikolaisen.no/gamehub/wp-json/wc/store/products/" + id;

async function getDetails() {
  try {
    const response = await fetch(url);
    const details = await response.json();
    //console.log(details);
    document.title = details.name + " | gamehub";
    createHTML(details);

    const buttons = document.querySelectorAll(".add-to-cart-btn");

    buttons.forEach(function (button) {
      button.addEventListener("click", addItemToCart);
    });
  } catch (error) {
    detailsContainer.innerHTML = displayError("Oh oh, something isn't working...");
  }
}
getDetails();

function createHTML(product) {
  detailsContainer.innerHTML += `
    <div class="details">
      <div class="col-1">
        <img id="details-img" src="${product.images[0].src}"/>
      </div>
      <div class="col-2">
        <h2>${product.name}</h2><p>${product.description}</p>
        <div class="product-price-details">Price: ${product.prices.regular_price},-</div>
        <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.prices.regular_price}" data-image="${product.images[0].src}">Add to cart</button>
        <hr />
        <h3>Specifications and Requirements:</h3>${product.short_description}
      </div>
    </div>`;
}

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

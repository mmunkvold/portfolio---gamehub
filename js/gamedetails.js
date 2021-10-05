const detailsContainer = document.querySelector(".details");
detailsContainer.innerHTML = "";
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
  } catch (error) {
    //console.log("duhh");
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
        <div class="product-price-details ">Price: ${product.prices.regular_price},-</div>
        <button id="" class="add-to-cart-btn" data-product="${product.id}">Add to cart</button>
        <hr />
        <h3>Specifications and Requirements:</h3>${product.short_description}
      </div>
    </div>`;
}

// Search result on search page:

const searchResultsContainer = document.querySelector(".search-result");

const url = "https://monicamunkvoldnikolaisen.no/gamehub/wp-json/wc/store/products";

async function searchGames() {
  try {
    const response = await fetch(url);
    const results = await response.json();

    searchResultsContainer.innerHTML = "";
    for (let i = 0; i < results.length; i++) {
      searchResultsContainer.innerHTML += `
      <div class="search-result">
        <div class="search-result-item">
        <a href="gamedetails.html?id=${results[i].id}" >
            <img class="game-image card" src="${results[i].images[0].src}"/>
            <h3>${results[i].name}</h3>
        </a>
        </div>
    </div>`;
    }
  } catch (error) {
    searchResultsContainer.innerHTML = displayError("Oh dear, something isn't working...");
  }
}
searchGames();

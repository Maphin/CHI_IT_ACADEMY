// Написати додаток, який реалізує відображення списку персонажів з Rick & Morty API і зробити просту пагінацію.

const BASE_URL = 'https://rickandmortyapi.com/api/character';
const root = document.querySelector("#content");
const prevBtn = document.querySelector(".actions #prev");
const nextBtn = document.querySelector(".actions #next");
const currentPageLabel = document.querySelector(".actions #currentPage");

let nextPageUrl = null;
let prevPageUrl = null;

fetchCharacters(BASE_URL);

async function fetchCharacters(url = BASE_URL) {
    root.innerHTML = "Loading...";
    try {
        const response = await fetch(url);
        const data = await response.json();

        nextPageUrl = data.info.next;   
        prevPageUrl = data.info.prev;

        let currentPage = nextPageUrl 
            ? parseInt(nextPageUrl.split('page=')[1]) - 1
            : data.info.pages;
        
        renderCharacters(data.results);
        renderCurrentPage(currentPage);
        handleButtonsVisibility();
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

function renderCharacters(characters) {
  root.innerHTML = "";
  const fragment = document.createDocumentFragment();

  characters.forEach((character) => {
    const characterContent = document.createElement("div");
    characterContent.classList.add("character");

    characterContent.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <div class="character-name">${character.name}</div>
      <div class="character-status">${character.status}</div>
    `;
    fragment.appendChild(characterContent);
  });
  
  root.append(fragment);
}
function renderCurrentPage(currentPage) {
    currentPageLabel.textContent = `Page: ${currentPage}`;
}
function handleButtonsVisibility() {
    prevBtn.disabled = !prevPageUrl;
    nextBtn.disabled = !nextPageUrl;
}

prevBtn.addEventListener("click", () => {
  if (prevPageUrl) {
    fetchCharacters(prevPageUrl);
  }
});
nextBtn.addEventListener("click", () => {
  if (nextPageUrl) {
    fetchCharacters(nextPageUrl);
  }
});
/* 
За основу беремо минуле домашнє завдання. І змінюємо функціонал так:
- При натисканні на картку відкриваємо модальне вікно, у вікні відображаємо картинку персонажа, ім'я, статус. 
(Щоразу робимо новий запит за ID, подія не повинна підніматися вище картки https://rickandmortyapi.com/documentation/#get-a-single-character)
- У модальному вікні є кнопка "Закрити", вона закриває це вікно.
- Клік за межами вікна також закриває вікно.
Для обробки подій використовуємо event delegation.
Пагінацію змінюємо на ліниве завантаження за типом Instagram: при прокрутці донизу списку, підвантажуємо ще порцію карток.
*/

const BASE_URL = 'https://rickandmortyapi.com/api/character';
const root = document.querySelector("#content");
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const currentPageLabel = document.querySelector(".actions #currentPage");
const loadingDiv = document.getElementById('loading');

let nextPageUrl = null;

fetchCharacters(BASE_URL);

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data');
    return await response.json();
  } catch (error) {
    console.log('Error:', error);
  }
}
async function fetchCharacters(url = BASE_URL) {
    toggleLoadingVisibility(true);
    const data = await fetchData(url);
    if (data) {
      nextPageUrl = data.info.next;
      renderCharacters(data.results);
    }
    toggleLoadingVisibility(false);
}
async function fetchCharacterByID(id) {
    const character = await fetchData(`${BASE_URL}/${id}`);
    if (character) showModal(character);
}
function renderCharacters(characters) {
  const fragment = document.createDocumentFragment();

  characters.forEach((character) => {
    const characterContent = document.createElement("div");
    characterContent.classList.add("character");
    characterContent.dataset.id = character.id;

    characterContent.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <div class="character-name">${character.name}</div>
      <div class="character-status">${character.status}</div>
    `;
    fragment.appendChild(characterContent);
  });
  
  root.append(fragment);
}

function showModal(character) {
  modalImage.src = character.image;
  modalName.textContent = character.name;
  modal.style.display = 'flex';
}
function closeModal() {
  modal.style.display = 'none';
}
function toggleLoadingVisibility(isVisible) {
  loadingDiv.style.display = isVisible ? 'block' : 'none';
}
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    fetchCharacters(nextPageUrl);
  }
}

document.addEventListener('click', function(event) {
  const targetCharacter = event.target.closest('.character');
  if (targetCharacter) {
      const characterId = targetCharacter.dataset.id;
      fetchCharacterByID(characterId);
      return;
  }

  if (event.target.dataset.action === 'close-modal' || event.target === modal) {
      closeModal();
  }
});

window.addEventListener('scroll', handleScroll);
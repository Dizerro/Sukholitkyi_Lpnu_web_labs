async function loadCardTemplate() {
  const response = await fetch('../components/card.html');
  return await response.text();
}

function renderTourTemplate(tour, template) {
  return template
    .replace(/{{id}}/g, tour.id)
    .replace(/{{image_url}}/g, tour.image_url)
    .replace(/{{title}}/g, tour.title)
    .replace(/{{country}}/g, tour.country)
    .replace(/{{description}}/g, tour.description)
    .replace(/{{duration}}/g, tour.duration)
    .replace(/{{price}}/g, tour.price);
}

async function renderTours(tours) {
  const cardTemplate = await loadCardTemplate();
  const toursGrid = document.getElementById('tours-grid');
  toursGrid.innerHTML = tours.map(tour => renderTourTemplate(tour, cardTemplate)).join('');

  const editTourButtons = document.querySelectorAll('.js-edit-btn');
  const removeTourButtons = document.querySelectorAll('.js-remove-btn');

  editTourButtons.forEach(editTourButton => {
    editTourButton.addEventListener('click', handleEdit);
  });
  removeTourButtons.forEach(removeTourButton => {
    removeTourButton.addEventListener('click', handleRemove(window.store));
  });
}

function byPrice(tour1, tour2) { return tour1.price - tour2.price };
function byTitle(tour1, tour2) { return tour1.title.localeCompare(tour2.title) };
function ByDuration(tour1, tour2) { return tour1.duration - tour2.duration };

function sortTours(tours, sortSelect) {
  const sortType = sortSelect.value;
  switch (sortType) {
    case 'price':
      return tours.sort(byPrice);
    case 'duration':
      return tours.sort(ByDuration);
    case 'title':
    default:
      return tours.sort(byTitle);
  }
}

function handleSearch(store, searchInput, sortSelect) {
  return () => {
    const tours = store.search(searchInput.value);
    currentTours = sortTours(tours, sortSelect);
    renderTours(currentTours);
  };
}

function handleClear(store, searchInput, sortSelect) {
  return () => {
    searchInput.value = '';
    const tours = store.clearSearch();
    currentTours = sortTours(tours, sortSelect);
    renderTours(currentTours);
  };
}

function handleSortSelect(store, sortSelect) {
  return () => {
    currentTours = sortTours(currentTours, sortSelect);
    renderTours(currentTours);
  };
}

function handleCalculate() {
  return () => {
    const totalPrice = currentTours.reduce((total, tour) => total + tour.price, 0);
    const totalPriceElement = document.getElementById('js-total-price');
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} €`;
  };
}

function handleRemove(store) {
  return (event) => {
    const tourId = parseInt(event.target.dataset.tourId);
    if (confirm('Are you sure you want to remove this tour?')) {
      store.remove(tourId);
      currentTours = currentTours.filter(tour => tour.id !== tourId);
      renderTours(currentTours);
    }
  };
}

function handleEdit(event) {
  const tourId = parseInt(event.target.dataset.tourId);
  window.location.href = `../pages/edit.html?id=${tourId}`;
}

let currentTours = [];

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;
  const searchInput = document.getElementById('js-search-input');
  const searchButton = document.getElementById('js-search-btn');
  const clearButton = document.getElementById('js-clear-btn');
  const sortSelect = document.getElementById('js-sort-select');
  const calculateButton = document.getElementById('js-calculate-btn');

  currentTours = store.tours;
  renderTours(currentTours);

  searchButton.addEventListener('click', handleSearch(store, searchInput, sortSelect));
  clearButton.addEventListener('click', handleClear(store, searchInput, sortSelect));
  sortSelect.addEventListener('change', handleSortSelect(store, sortSelect));
  calculateButton.addEventListener('click', handleCalculate());
});

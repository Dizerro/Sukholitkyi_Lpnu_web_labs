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
    .replace(/{{duration}}/g, tour.duration)
    .replace(/{{description}}/g, tour.description)
    .replace(/{{price}}/g, tour.price);
}

async function renderTours(tours) {
  const cardTemplate = await loadCardTemplate();
  const toursGrid = document.getElementById('tours-grid');

  if (tours.length === 0) {
    toursGrid.innerHTML = '<p class="no-tours">No tours found</p>';
    return;
  }

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

function showLoading() {
  const toursGrid = document.getElementById('tours-grid');
  toursGrid.innerHTML = '<p class="loading">Loading tours...</p>';
}

function showError(message) {
  const toursGrid = document.getElementById('tours-grid');
  toursGrid.innerHTML = `<p class="error">Error: ${message}</p>`;
}

function buildSearchParams(searchInput, sortSelect) {
  const params = {};

  // Add search term if provided
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    params.search = searchValue;
  }

  // Add sorting parameters
  if (sortSelect && sortSelect.value) {
    params.orderBy = sortSelect.value;
    params.order = 'asc'; // Default to ascending
  }

  return params;
}

// Perform search and render results
async function performSearch(store, searchInput, sortSelect) {
  try {
    showLoading();
    const searchParams = buildSearchParams(searchInput, sortSelect);
    const tours = await store.search(searchParams);
    currentTours = tours;
    await renderTours(currentTours);
  } catch (error) {
    showError(error.message);
  }
}

function handleSearch(store, searchInput, sortSelect) {
  return () => performSearch(store, searchInput, sortSelect);
}

function handleClear(store, searchInput, sortSelect) {
  return async () => {
    searchInput.value = '';

    try {
      showLoading();
      const tours = await store.clearSearch();
      currentTours = tours;
      await renderTours(currentTours);
    } catch (error) {
      showError(error.message);
    }
  };
}

function handleSortSelect(store, searchInput, sortSelect) {
  return () => performSearch(store, searchInput, sortSelect);
}

function handleCalculate() {
  return () => {
    const totalPrice = currentTours.reduce((total, tour) => total + tour.price, 0);
    const totalPriceElement = document.getElementById('js-total-price');
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} UAH`;
  };
}

function handleRemove(store) {
  return async (event) => {
    const tourId = parseInt(event.target.dataset.tourId);
    if (confirm('Are you sure you want to remove this tour?')) {
      try {
        await store.remove(tourId);
        currentTours = currentTours.filter(tour => tour.id !== tourId);
        await renderTours(currentTours);
      } catch (error) {
        alert(`Failed to remove tour: ${error.message}`);
      }
    }
  };
}

function handleEdit(event) {
  const tourId = parseInt(event.target.dataset.tourId);
  window.location.href = `../pages/edit.html?id=${tourId}`;
}

let currentTours = [];

document.addEventListener('DOMContentLoaded', async () => {
  const store = window.store;
  const searchInput = document.getElementById('js-search-input');
  const searchButton = document.getElementById('js-search-btn');
  const clearButton = document.getElementById('js-clear-btn');
  const sortSelect = document.getElementById('js-sort-select');
  const calculateButton = document.getElementById('js-calculate-btn');


  try {
    showLoading();
    await store.loadTours();
    currentTours = store.tours;
    await renderTours(currentTours);
  } catch (error) {
    showError(error.message);
  }

  searchButton.addEventListener('click', handleSearch(store, searchInput, sortSelect));
  clearButton.addEventListener('click', handleClear(store, searchInput, sortSelect));
  sortSelect.addEventListener('change', handleSortSelect(store, searchInput, sortSelect));
  calculateButton.addEventListener('click', handleCalculate());

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });
});
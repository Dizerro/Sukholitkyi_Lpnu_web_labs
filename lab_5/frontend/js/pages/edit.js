import { TourForm } from '../components/tour-form.js';

function getTourIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'));
}

document.addEventListener('DOMContentLoaded', async () => {
  const store = window.store;
  const tourId = getTourIdFromUrl();

  if (!tourId) {
    window.location.href = '../pages/index.html';
    return;
  }

  let tour;
  try {
    tour = await store.getTour(tourId);
  } catch (error) {
    alert(`Failed to load tour: ${error.message}`);
    window.location.href = '../pages/index.html';
    return;
  }

  if (!tour) {
    window.location.href = '../pages/index.html';
    return;
  }

  const handleEdit = async (formData, originalTour) => {
    try {
      await store.update(originalTour.id, formData);
      window.location.href = '../pages/index.html';
    } catch (error) {
      alert(`Failed to update tour: ${error.message}`);
    }
  };

  new TourForm('edit-form', tour, handleEdit);
});
import { TourForm } from '../components/tour-form.js';

function getTourIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'));
}

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;
  const tourId = getTourIdFromUrl();

  if (!tourId) {
    window.location.href = '../pages/index.html';
    return;
  }

  const tour = store.tours.find(tour => tour.id === tourId);

  if (!tour) {
    window.location.href = '../pages/index.html';
    return;
  }

  const handleEdit = (formData, originalTour) => {
    store.update(originalTour.id, formData);
    window.location.href = '../pages/index.html';
  };

  new TourForm('edit-form', tour, handleEdit);
});

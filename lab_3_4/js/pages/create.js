import { TourForm } from '../components/tour-form.js';

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;

  const handleCreate = (formData) => {
    store.add(formData);
    window.location.href = '../pages/index.html';
  };

  new TourForm('create-form', null, handleCreate);
});

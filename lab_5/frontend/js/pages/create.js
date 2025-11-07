import { TourForm } from '../components/tour-form.js';

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;

  const handleCreate = async (formData) => {
    try {
      await store.add(formData);
      window.location.href = '../pages/index.html';
    } catch (error) {
      alert(`Failed to create tour: ${error.message}`);
    }
  };

  new TourForm('create-form', null, handleCreate);
});
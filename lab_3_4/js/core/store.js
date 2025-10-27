import Tour from '../models/tour.js';
import data from './data.js';

class Store {
  constructor() {
    this.storageKey = 'tours-store';
    this.loadFromStorage();
  }

  loadFromStorage() {
    const storedTours = localStorage.getItem(this.storageKey);
    if (storedTours) {
      this.tours = JSON.parse(storedTours).map(tour => new Tour(tour));
    } else {
      this.tours = data.tours.map(tour => new Tour(tour));
      this.saveToStorage();
    }
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tours));
  }

  generateId() {
    return this.tours.length > 0 ? Math.max(...this.tours.map(tour => tour.id)) + 1 : 1;
  }

  add(tourData) {
    const newTour = new Tour({ ...tourData, id: this.generateId() });
    this.tours.push(newTour);
    this.saveToStorage();
    return newTour;
  }

  remove(tourId) {
    this.tours = this.tours.filter(tour => tour.id !== tourId);
    this.saveToStorage();
  }

  update(tourId, updatedData) {
    const tourIndex = this.tours.findIndex(tour => tour.id === tourId);
    if (tourIndex !== -1) {
      this.tours[tourIndex] = new Tour({ ...this.tours[tourIndex], ...updatedData });
      this.saveToStorage();
    }
  }

  sort(compareFn) {
    return this.tours.sort(compareFn);
  }

  search(title) {
    if (!title || title.trim() === '') {
      return this.tours;
    }

    return this.tours.filter(tour => tour.title.toLowerCase().includes(title.toLowerCase().trim()));
  }

  clearSearch() {
    return this.tours;
  }

  calculateTotalPrice() {
    return this.tours.reduce((total, tour) => total + tour.price, 0);
  }
}

export default Store;
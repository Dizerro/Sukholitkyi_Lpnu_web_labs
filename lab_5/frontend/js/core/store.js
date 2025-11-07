import Tour from '../models/tour.js';
import api from './api.js';

class Store {
  constructor() {
    this.tours = [];
    this.loading = false;
    this.error = null;
  }

  // Fetch all tours from API
  async loadTours(params = {}) {
    this.loading = true;
    this.error = null;
    try {
      const data = await api.getTours(params);
      this.tours = data.map(tour => new Tour(tour));
      return this.tours;
    } catch (error) {
      this.error = error.message;
      console.error('Failed to load tours:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Add a new tour via API
  async add(tourData) {
    this.loading = true;
    this.error = null;
    try {
      const newTour = await api.createTour(tourData);
      const tour = new Tour(newTour);
      this.tours.push(tour);
      return tour;
    } catch (error) {
      this.error = error.message;
      console.error('Failed to add tour:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Remove a tour via API
  async remove(tourId) {
    this.loading = true;
    this.error = null;
    try {
      await api.deleteTour(tourId);
      this.tours = this.tours.filter(tour => tour.id !== tourId);
    } catch (error) {
      this.error = error.message;
      console.error('Failed to remove tour:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Update a tour via API
  async update(tourId, updatedData) {
    this.loading = true;
    this.error = null;
    try {
      await api.updateTour(tourId, updatedData);
      const tourIndex = this.tours.findIndex(tour => tour.id === tourId);
      if (tourIndex !== -1) {
        this.tours[tourIndex] = new Tour({ ...this.tours[tourIndex], ...updatedData });
      }
    } catch (error) {
      this.error = error.message;
      console.error('Failed to update tour:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Get a single tour by ID
  async getTour(tourId) {
    this.loading = true;
    this.error = null;
    try {
      const data = await api.getTour(tourId);
      return new Tour(data);
    } catch (error) {
      this.error = error.message;
      console.error('Failed to get tour:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Sort tours (local operation)
  sort(compareFn) {
    return this.tours.sort(compareFn);
  }

  // Search tours with multiple criteria
  async search(searchParams = {}) {
    // Handle string input for simple search
    if (typeof searchParams === 'string') {
      return searchParams.trim()
        ? this.loadTours({ search: searchParams.trim() })
        : this.loadTours();
    }

    // Filter out empty values and pass to loadTours
    const params = Object.entries(searchParams)
      .filter(([_, value]) => value !== '' && value != null)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return this.loadTours(params);
  }

  // Clear search (reload all tours)
  async clearSearch() {
    return this.loadTours();
  }

  // Calculate total price (local operation)
  calculateTotalPrice() {
    return this.tours.reduce((total, tour) => total + tour.price, 0);
  }
}

export default Store;
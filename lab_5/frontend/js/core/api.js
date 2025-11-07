const API_BASE_URL = 'http://localhost:5050';

class ApiService {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return null;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Tour endpoints
  async getTours(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/tours?${queryString}` : '/tours';
    return this.request(endpoint);
  }

  async getTour(id) {
    return this.request(`/tours/${id}`);
  }

  async createTour(tourData) {
    return this.request('/tours', {
      method: 'POST',
      body: JSON.stringify(tourData),
    });
  }

  async updateTour(id, tourData) {
    return this.request(`/tours/${id}`, {
      method: 'PUT',
      body: JSON.stringify(tourData),
    });
  }

  async deleteTour(id) {
    return this.request(`/tours/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
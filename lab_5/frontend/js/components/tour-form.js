export class TourForm {
  constructor(formId, tour, submitHandler) {
    this.formId = formId;
    this.form = document.getElementById(formId);
    this.tour = tour;
    this.submitHandler = submitHandler;
    this.init();
  }

  init() {
    if (!this.form) {
      console.error(`Form with id "${this.formId}" not found`);
      return;
    }

    this.populateForm();
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.hideAlert();

    if (!this.validateForm()) {
      return;
    }

    const formData = this.collectFormData();
    this.submitHandler(formData, this.tour);
  }

  populateForm() {
    if (!this.tour) return;

    document.getElementById('title').value = this.tour.title || '';
    document.getElementById('country').value = this.tour.country || '';
    document.getElementById('duration').value = this.tour.duration || '';
    document.getElementById('description').value = this.tour.description || '';
    document.getElementById('price').value = this.tour.price || '0.00';
  }

  clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('country').value = '';
    document.getElementById('duration').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '0.00';
  }

  showAlert(message) {
    const alertElement = document.getElementById('js-error-alert');
    const alertText = document.getElementById('js-error-text');
    alertText.textContent = message;
    alertElement.style.display = 'block';
  }

  hideAlert() {
    const alertElement = document.getElementById('js-error-alert');
    alertElement.style.display = 'none';
  }

  validateForm() {
    const title = document.getElementById('title').value.trim();
    const country = document.getElementById('country').value.trim();
    const duration = parseInt(document.getElementById('duration').value);
    const price = parseFloat(document.getElementById('price').value);

    if (!title || title.length < 2) {
      this.showAlert('Title must be at least 2 characters long');
      return false;
    }

    if (!country || country.length < 2) {
      this.showAlert('Country name must be at least 2 characters long');
      return false;
    }

    if (isNaN(duration) || duration <= 0) {
      this.showAlert('Duration must be a valid positive number');
      return false;
    }

    if (isNaN(price) || price <= 0) {
      this.showAlert('Price must be a valid positive number');
      return false;
    }

    return true;
  }

  collectFormData() {
    return {
      title: document.getElementById('title').value.trim(),
      country: document.getElementById('country').value.trim(),
      duration: Number(document.getElementById('duration').value),
      description: document.getElementById('description').value.trim(),
      price: parseFloat(document.getElementById('price').value),
      image_url: ''
    };
  }
}

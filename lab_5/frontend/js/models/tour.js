class Tour {
  constructor({
    id,
    title,
    country,
    duration,
    description = '',
    price,
    image_url = ''
  }) {
    this.id = id;
    this.title = title;
    this.country = country;
    this.duration = duration;
    this.description = description;
    this.price = price;
    this.image_url = image_url;
  }
}

export default Tour;

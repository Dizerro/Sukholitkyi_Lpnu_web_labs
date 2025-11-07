function TourCard({ title, description, image }) {
  return (
    <div className="tour-card">
      <div className="tour-image">
        <img src={image} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default TourCard;

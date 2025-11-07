import TourCard from "./TourCard";
import paris from "../assets/images/paris.jpeg";
import kyoto from "../assets/images/kyoto.jpeg";
import bali from "../assets/images/bali.jpeg";

function TourList() {
  const tours = [
    { title: "Romantic Paris", description: "The city of lights and love awaits you.", image: paris },
    { title: "Kyoto Traditions", description: "Walk through ancient temples and cherry blossoms.", image: kyoto },
    { title: "Bali Paradise", description: "Enjoy beaches, sun, and tropical vibes.", image: bali },
  ];

  return (
    <section className="tours">
      <div className="tours-grid">
        {tours.map((tour, index) => (
          <TourCard key={index} {...tour} />
        ))}
      </div>
      <div className="view-more">
        <button>View More</button>
      </div>
    </section>
  );
}

export default TourList;

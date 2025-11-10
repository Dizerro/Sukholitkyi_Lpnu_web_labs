import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import { toursData } from "../toursData";

function Home() {
  const cards = toursData;
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, cards.length));
  };

  return (
    <div className="home-page">
      <Header />

      <section className="hero-section">
        <div className="hero-content">
          <h2>Explore the world with ease</h2>
          <p>Discover amazing destinations and plan unforgettable trips.</p>
        </div>
      </section>

      <section className="cards-section">
        <div className="cards-grid-home">
          {cards.slice(0, visibleCount).map((card) => (
            <div className="card" key={card.id}>
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        {visibleCount < cards.length ? (
          <div className="button-container">
            <PrimaryButton label="View more" onClick={showMore} />
          </div>
        ) : (
          <div className="button-container">
            <p>All destinations are shown!</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Home;

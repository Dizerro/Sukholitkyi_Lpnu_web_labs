import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";

import paris from "../assets/images/paris.jpeg";
import kyoto from "../assets/images/kyoto.jpeg";
import bali from "../assets/images/bali.jpeg";

function Home() {
  const cards = [
    { id: 1, title: "Romantic Paris", text: "City of lights and love awaits you.", image: paris },
    { id: 2, title: "Kyoto Adventure", text: "Discover temples and cherry blossoms.", image: kyoto },
    { id: 3, title: "Bali Escape", text: "Relax on tropical beaches.", image: bali },
  ];

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
        <div className="cards-grid">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <img src={card.image} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

        <div className="button-container">
          <PrimaryButton label="View more" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;

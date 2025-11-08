import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import FilterBar from "../components/FilterBar"; // 👈 import here

import paris from "../assets/images/paris.jpeg";
import kyoto from "../assets/images/kyoto.jpeg";
import bali from "../assets/images/bali.jpeg";

function Catalog() {
  const tours = [
    { id: 1, title: "Paris Getaway", country: "France", price: 499, image: paris },
    { id: 2, title: "Kyoto Adventure", country: "Japan", price: 799, image: kyoto },
    { id: 3, title: "Bali Paradise", country: "Indonesia", price: 699, image: bali },
    { id: 4, title: "Evening Kyiv",  country: "Ukraine", price: 699},
    { id: 5, title: "Bali Escape",  country: "Indonesia", price: 699},
    { id: 6, title: "Bali Escape",  country: "Indonesia", price: 699},
  ];

  return (
    <>
      <Header />
      <section className="catalog">
        <FilterBar />

        <div className="catalog-grid">
          {tours.map((tour) => (
            <div key={tour.id} className="catalog-card">
              <img src={tour.image} alt={tour.title} />
              <div className="catalog-card-content">
                <h3>{tour.title}</h3>
                <p>{tour.country}</p>
                <span className="price">${tour.price}</span>
                <PrimaryButton label="View details" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Catalog;

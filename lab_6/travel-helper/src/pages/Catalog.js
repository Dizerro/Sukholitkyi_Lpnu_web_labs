import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import { getTours } from "../api/toursApi";

function Catalog() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    price: "all",
    duration: "all",
    country: "all",
  });

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (id) => {
    navigate(`/item/${id}`);
  };

  useEffect(() => {
    setLoading(true);

    getTours({ search: filters.search })
      .then((response) => setTours(response.data))
      .finally(() => {
        setTimeout(() => setLoading(false), 100); // 200ms to show loader briefly
      });

  }, [filters.search]);

  const filteredTours = tours.filter((tour) => {
    const [minP, maxP] =
      filters.price === "all" ? [0, Infinity] : filters.price.split("-").map(Number);
    const priceMatch = tour.price >= minP && tour.price <= maxP;

    const [minD, maxD] =
      filters.duration === "all" ? [0, Infinity] : filters.duration.split("-").map(Number);
    const durationMatch = tour.duration >= minD && tour.duration <= maxD;

    const countryMatch =
      filters.country === "all" || tour.country === filters.country;

    return priceMatch && durationMatch && countryMatch;
  });

  return (
    <>
      <Header />
      <section className="catalog">
        <FilterBar onFilterChange={handleFilterChange} />

        {loading ? (
          <Loader />
        ) : (
          <div className="catalog-grid-catalog">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="catalog-card">
                <img src={tour.image} alt={tour.title} />
                <div className="catalog-card-content">
                  <h3>{tour.title}</h3>
                  <p>{tour.country}</p>
                  <span className="price">${tour.price}</span>
                  <PrimaryButton
                    label="View details"
                    onClick={() => handleViewDetails(tour.id)}
                  />
                </div>
              </div>
            ))}

            {filteredTours.length === 0 && (
              <p style={{ gridColumn: "1/-1", textAlign: "center" }}>
                No tours found.
              </p>
            )}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Catalog;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import { getTours } from "../api/toursApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";

function Catalog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    search: "",
    price: "all",
    duration: "all",
    country: "all",
  });

  const [tourTypes, setTourTypes] = useState({});
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewDetails = (id) => {
    navigate(`/item/${id}`);
  };

  const handleTypeSelect = (id, type) => {
    setTourTypes((prev) => ({
      ...prev,
      [id]: type,
    }));
  };

  useEffect(() => {
    setLoading(true);

    const priceRange =
      filters.price === "all"
        ? { priceMin: 0, priceMax: 999999 }
        : {
            priceMin: filters.price.split("-")[0],
            priceMax: filters.price.split("-")[1],
          };

    const durationRange =
      filters.duration === "all"
        ? { durationMin: 0, durationMax: 999 }
        : {
            durationMin: filters.duration.split("-")[0],
            durationMax: filters.duration.split("-")[1],
          };

    getTours({
      search: filters.search,
      country: filters.country,
      ...priceRange,
      ...durationRange,
    })
      .then((response) => setTours(response.data))
      .finally(() => {
        setTimeout(() => setLoading(false), 100);
      });
  }, [filters]);

  return (
    <>
      <Header />
      <section className="catalog">
        <FilterBar onFilterChange={handleFilterChange} />

        {loading ? (
          <Loader />
        ) : (
          <div className="catalog-grid-catalog">
            {tours.map((tour) => {
              const selectedType = tourTypes[tour.id] || "standard";

              let finalPrice = tour.price;
              if (selectedType === "economy") finalPrice = tour.price * 0.9;
              if (selectedType === "luxury") finalPrice = tour.price * 1.25;

              finalPrice = Number(finalPrice.toFixed(2));

              return (
                <div key={tour.id} className="catalog-card">
                  <img src={tour.image} alt={tour.title} />

                  <div className="catalog-card-content">
                    <h3>{tour.title}</h3>
                    <p>{tour.country}</p>

                    <span className="price">${finalPrice}</span>

                    <div className="tour-type-selector" style={{ marginTop: "10px" }}>
                      <select
                        className="filter-select"
                        value={selectedType}
                        onChange={(e) => handleTypeSelect(tour.id, e.target.value)}
                      >
                        <option value="economy">Economy (-10%)</option>
                        <option value="standard">Standard</option>
                        <option value="luxury">Luxury (+25%)</option>
                      </select>
                    </div>

                    <PrimaryButton
                      label="View details"
                      onClick={() => handleViewDetails(tour.id)}
                    />

                    <PrimaryButton
                      label="Add to cart"
                      onClick={() => {
                        dispatch(
                          addToCart({
                            ...tour,
                            tourType: selectedType,
                            price: finalPrice,
                          })
                        );
                        toast.success("Tour added to cart!");
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {tours.length === 0 && (
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

import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import { toursData } from "../toursData";

function Item() {
  const { id } = useParams();
  const tour = toursData.find((t) => t.id === Number(id));

  if (!tour) {
    return (
      <div className="item-page">
        <Header />
        <div className="not-found">
          <h2>Tour not found</h2>
          <Link to="/catalog">Back to Catalog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="item-page">
      <Header />

      <div className="item-details">
        <img src={tour.image} alt={tour.title} className="item-image" />
        <div className="item-info">
          <h2>{tour.title}</h2>
          <p><strong>Country:</strong> {tour.country}</p>
          <p><strong>Price:</strong> ${tour.price}</p>
          <p><strong>Duration:</strong> {tour.duration} days</p>
          <p className="item-description">{tour.description}</p>

          <div className="button-container">
            <Link to="/catalog">
              <PrimaryButton label="Back to Catalog" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Item;

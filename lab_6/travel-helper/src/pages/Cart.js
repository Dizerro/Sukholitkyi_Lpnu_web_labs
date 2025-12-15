import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import PrimaryButton from "../components/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../redux/actions";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const loading = false;

  return (
    <div className="cart-page">
      <Header />

      <section className="catalog">
        <h2>Your Cart</h2>

        <div className="cart-nav-buttons">
          <Link to="/catalog">
            <PrimaryButton label="Back to Catalog" />
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-img" />

                  <div className="cart-info">
                    <h3>{item.title}</h3>
                    <p>{item.country}</p>
                    <p>${item.price}</p>

                    <p className="tour-type-tag">
                      Type: <strong>{item.tourType}</strong>
                    </p>

                    <p className="traveler-count">
                      Travelers: <strong>{item.qty}</strong>{" "}
                      {item.qty === 1 ? "person" : "people"}
                    </p>

                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          dispatch(decreaseQty(item.id, item.tourType))
                        }
                      >
                        −
                      </button>

                      <span className="qty-display">{item.qty}</span>

                      <button
                        className="qty-btn"
                        onClick={() =>
                          dispatch(increaseQty(item.id, item.tourType))
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() =>
                        dispatch(removeFromCart(item.id, item.tourType))
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total-actions">
              <div className="cart-total">
                <h3>Total: ${total.toFixed(2)}</h3>
              </div>

              <PrimaryButton
                label="Checkout"
                onClick={() => navigate("/checkout")}
              />
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Cart;

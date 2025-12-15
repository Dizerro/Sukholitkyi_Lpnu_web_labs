import Header from "../components/Header";
import Footer from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <section className="success-page">
        <h1>Success</h1>
        <p>Your order has been successfully placed.</p>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <PrimaryButton
            label="Back to catalog"
            onClick={() => navigate("/catalog")}
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Success;

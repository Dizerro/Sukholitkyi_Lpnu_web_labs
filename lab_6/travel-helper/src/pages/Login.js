import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const emailRegex = /^[^\s@]+@[^\s@]{2,}/;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Email domain must contain at least 2 characters");
      return;
    }

    setError("");
    localStorage.setItem("user", email);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  return (
    <>
      <Header />

      <section className="checkout-page">
        <h1>Login</h1>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button className="checkout-submit" type="submit">
            Login
          </button>

          <p style={{ marginTop: "16px", textAlign: "center" }}>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default Login;

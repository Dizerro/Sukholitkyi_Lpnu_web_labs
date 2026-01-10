import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Travel Helper</h1>
        </div>

        <nav className="navigation">
          <ul>
            {user && (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/catalog">Catalog</Link></li>
                <li><Link to="/cart">Cart</Link></li>
              </>
            )}

            {user && (
              <li>
                <button className="primary-btn" onClick={handleLogout}>
                  Sign me out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

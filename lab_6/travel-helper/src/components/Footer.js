import { FaFacebookF, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="branding">
          <h4>Travel Helper</h4>
          <p>
            Your trusted guide for discovering and booking the best travel experiences.
          </p>
        </div>

        <div className="footer-logo">LOGO</div>

        <div className="socials">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaGoogle /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Travel Helper. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

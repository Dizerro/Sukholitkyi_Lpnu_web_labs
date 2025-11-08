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
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" aria-label="Google"><FaGoogle /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Travel Helper. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

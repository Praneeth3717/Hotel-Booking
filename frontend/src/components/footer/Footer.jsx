import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Hotel Booking</h3>
          <p>Book your perfect stay with us.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/About">About</a></li>
            <li><a href="/Contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: praneethchandupatla@gmail.com</p>
          <p>Phone: +919963310841</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Hotel Booking. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

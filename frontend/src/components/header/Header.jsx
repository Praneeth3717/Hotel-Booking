import backgroundImage from '../../assets/background-img3.jpg';
import './Header.css';

const Header = () => {
  return (
    <div
      className="Header-pic"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="Header-title">Welcome to The Fortune Heights</h1>
    </div>
  );
};

export default Header;

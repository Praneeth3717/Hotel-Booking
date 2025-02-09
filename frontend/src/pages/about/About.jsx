import "./About.css";

const About = () => {
  return (
    <div className="About">
      <div className="about-header">
        <h1>About The Fortune Heights</h1>
        <p>Your perfect stay, just a click away.</p>
      </div>
      
      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            Welcome to **The Fortune Heights**, where luxury meets comfort. 
            We offer top-notch accommodation, excellent customer service, and a seamless booking experience.
          </p>
        </div>
        
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a world-class hospitality experience that feels like home.
            Whether you`re traveling for business or leisure, we ensure a memorable and hassle-free stay.
          </p>
        </div>

        <div className="about-text">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>🏨 Luxurious and affordable rooms</li>
            <li>💼 24/7 customer support</li>
            <li>🍽️ World-class dining experiences</li>
            <li>📍 Prime locations in top cities</li>
            <li>🛎️ Hassle-free online booking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

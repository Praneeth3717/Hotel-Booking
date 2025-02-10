import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="Contact">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We`d love to hear from you! Reach out to us for any queries.</p>
      </div>

      <div className="contact-container">
        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>

        <div className="contact-info">
          <h2>Our Contact Details</h2>
          <p>📍 Naimnagar,Hanumkonda,Warangal</p>
          <p>📧 Email: praneethchandupatla@gmail.com</p>
          <p>📞 Phone: +91 9963310841</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

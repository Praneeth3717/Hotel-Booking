import './Payments.css';
import { StoreContext } from '../../context/StoreContext';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { BookingData } from '../../api/Api';

const Payments = () => {
  const { checkIn, checkOut, guests, Url_Host } = useContext(StoreContext);
  const location = useLocation();
  const { Room_Type, Room_Price, Room_Image } = location.state;
  const totalPrice = (parseFloat(Room_Price) + 200 + 15.7).toFixed(2);
  const imageUrl = `${Url_Host}/images/${Room_Image}`;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    street: '',
    pinCode: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutate: handleBooking, isLoading, isError, error } = useMutation({
    mutationFn: () =>
      BookingData({
        ...formData,
        checkIn,
        checkOut,
        guests,
        Room_Type,
        Room_Price,
        totalPrice,
      }),
    onSuccess: () => {
      alert('Payment Completed Successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        street: '',
        pinCode: '',
        paymentMethod: '',
      });
    },
    onError: (error) => {
      console.error('Booking error:', error);
      alert(error.message || 'Payment Failed. Please Try Again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    handleBooking();
  };

  return (
    <div className="Payments">
      <div className="Billing_details">
        <h2>Billing Details:</h2>
        <div className="Billing_name">
          <div className="B_f">
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
            />
          </div>
          <div className="B_f">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
          </div>
        </div>
        <div className="Billing_address">
          <label>Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange}/>

          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange}/>

          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange}/>

          <label>Street Address:</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange}/>

          <label>Pin Code:</label>
          <input type="number" name="pinCode" value={formData.pinCode} onChange={handleChange}/>
        </div>
        <div className="Billing_name">
          <div className="B_f">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange}/>
          </div>
          <div className="B_f">
            <label>Phone:</label>
            <input type="number" name="phone" value={formData.phone} onChange={handleChange}/>
          </div>
        </div>
        <div className="Payment_Meth">
          <h3>Choose Payment Method</h3>
          <form className="Pay">
            <input type="radio" id="googlePay" name="paymentMethod" value="Google Pay" onChange={handleChange}/>
            <label htmlFor="googlePay">Google Pay</label>

            <input type="radio" id="phonePe" name="paymentMethod" value="Phone Pe" onChange={handleChange}/>
            <label htmlFor="phonePe">Phone Pe</label>

            <input type="radio" id="paytm" name="paymentMethod" value="Paytm" onChange={handleChange}/>
            <label htmlFor="paytm">Paytm</label>

            <input type="radio" id="creditCard" name="paymentMethod" value="Credit Card" onChange={handleChange}/>
            <label htmlFor="creditCard">Credit Card</label>
          </form>
        </div>
      </div>
      <div className="Your_Order">
        <h2>Your Order</h2>
        <p>{Room_Type}</p>
        <div className="Order_image">
          <img src={imageUrl} alt="Room" />
        </div>
        <div className="Order_summ">
          <h3>Your Trip Summary</h3>
          <div className="summ">
            <p>Check-In:</p>
            <p>{checkIn}</p>
          </div>
          <div className="summ">
            <p>Check-Out:</p>
            <p>{checkOut}</p>
          </div>
          <div className="summ">
            <p>Guests:</p>
            <p>{guests}</p>
          </div>
        </div>
        <div className="Order_Break">
          <h3>Pricing Breakdown</h3>
          <div className="summ">
            <p>Room Price:</p>
            <p>Rs. {Room_Price}</p>
          </div>
          <div className="summ">
            <p>Maintenance Fee:</p>
            <p>Rs. 200</p>
          </div>
          <div className="summ">
            <p>Taxes:</p>
            <p>Rs. 15.7</p>
          </div>
          <div className="summ">
            <p>Total:</p>
            <p>Rs. {totalPrice}</p>
          </div>
          <button className="btn" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Confirm & Pay'}
          </button>
          {isError && <div className="error-message">{error.message}</div>}
        </div>
      </div>
    </div>
  );
};

export default Payments;

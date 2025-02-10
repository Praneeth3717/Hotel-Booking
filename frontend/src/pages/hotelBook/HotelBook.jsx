import "./HotelBook.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const HotelBook = () => {
  const navigate = useNavigate();
  const { hotel_location } = useParams();
  const [hotel_detail, setHotelDetail] = useState({});
  const [display_roomsleft, setDisplayRoomsLeft] = useState(false);
  const { Room_list,Token,checkIn,checkOut,setCheckIn,setCheckOut,setGuests,guests,Url_Host} = useContext(StoreContext);

  useEffect(() => {
    axios
      .get(`${Url_Host}/hotels/getHotel/${hotel_location}`)
      .then((response) => {
        setHotelDetail(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Url_Host,hotel_location]);
  useEffect(() => {
    sessionStorage.setItem("checkIn", checkIn);
    sessionStorage.setItem("checkOut", checkOut);
    sessionStorage.setItem("guests", guests);
  }, [checkIn, checkOut, guests]);

  const handleBooking = (e,room) => {
    e.preventDefault()
    if (!Token) {
      navigate("/SignIn");
      return;
    }
    if (!checkIn || !checkOut) {
      alert("Please select both Check-in and Check-out dates.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after the Check-in date.");
      return;
    }
    if (guests < 1) {
      alert("Please select at least one guest.");
      return;
    }
    navigate(`./${room.room_type}/payment`,{
        state:{
            Room_Type:room.room_type,
            Room_Price:room.price,
            Room_Image:room.image
        }
    }
    )
  };

  const handleSearch = () => {
    if (!checkIn || !checkOut || guests < 1) {
      alert("Please fill all fields before searching.");
      return;
    }
    setDisplayRoomsLeft(true);
  };

  return (
    <>
    <Navbar/>
    <div className="Hotel_Book">
      <h1>EXPERIENCE INDIA WITH THE FORTUNE</h1>
      <div className="About_Hotel">
        <div className="Hotel_Image">
          <img
            src={`${Url_Host}/images/${hotel_detail.hotel_image}`}
            alt="Hotel"
          />
        </div>
        <div className="Hotel_desc">
          <h2>
            {hotel_detail.hotel_name}, {hotel_detail.hotel_location}
          </h2>
          <p>{hotel_detail.hotel_description}</p>
          <div className="contact">
          <p>Contact: </p>
            <p className="alpha">{hotel_detail.hotel_contact_1}</p>
            <p className="alpha">{hotel_detail.hotel_contact_2}</p>
          </div>
        </div>
      </div>
      <div className="booking-navbar">
        <label>
          Check-in Date:
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </label>
        <label>
          Check-out Date:
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </label>
        <label>
          Number of Guests:
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="Stays_Live">
        <h2>Stay & Live</h2>
        <div className="Stay_Types">
          {Room_list.map((room) => (
            <div className="Each_Stay" key={room._id}>
              <div className="Stay_image">
                <img src={`${Url_Host}/images/${room.image}`} alt="Room" />
              </div>
              <div className="Stay_desc">
                <h2 className="Room-title">{room.room_type}</h2>
                <p className="Room-description">{room.description}</p>
                <p className="Room-rating">Rating: {room.rating}/5</p>
                {display_roomsleft && (
                  <p className="hotel-rooms-left">{room.rooms_left} rooms left</p>
                )}
                <div className="Room-footer">
                  <span className="Room-price">Rs {room.price}/Night</span>
                  <button onClick={(e)=>{handleBooking(e,room)}} className="Room-button">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default HotelBook;

import "./HotelBook.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from '../../components/loading/Loading';
import { useQuery } from "@tanstack/react-query";
import { getHotel, getRooms } from "../../api/Api";

const HotelBook = () => {
  const navigate = useNavigate();
  const [display_roomsleft, setDisplayRoomsLeft] = useState(false);
  const { Token, checkIn, checkOut, setCheckIn, setCheckOut, setGuests, guests, Url_Host } = useContext(StoreContext);
  const { hotel_location } = useParams();

  useEffect(() => {
    sessionStorage.setItem("checkIn", checkIn);
    sessionStorage.setItem("checkOut", checkOut);
    sessionStorage.setItem("guests", guests);
  }, [checkIn, checkOut, guests]);

  const { data: hotel, isLoading: hotelLoading, isError: hotelError, error: hotelApiError } = useQuery({
    queryKey: ['hotel', hotel_location],
    queryFn: () => getHotel(hotel_location),
    enabled: !!hotel_location,
  });


  const { data: rooms, isLoading: roomLoading, isError: roomError, error: roomsApiError } = useQuery({
    queryKey: ['rooms'],
    queryFn:getRooms
  });

  if (hotelLoading || roomLoading) return <Loading />;

  if (hotelError || roomError) {
    console.error("API Error:", hotelApiError || roomsApiError);
    return <div>Error Fetching Data: {hotelApiError?.message || roomsApiError?.message || "An unknown error occurred."}</div>;
  }


  const handleBooking = (e, room) => {
    e.preventDefault();
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
    navigate(`./${room.room_type}/payment`, {
      state: {
        Room_Type: room.room_type,
        Room_Price: room.price,
        Room_Image: room.image,
      },
    });
  };

  const handleSearch = () => {
    if (!checkIn || !checkOut || guests < 1) {
      alert("Please fill all fields before searching.");
      return;
    }
    setDisplayRoomsLeft(true);
  };

  return (
    <div className="Hotel_Book">
      <h1>EXPERIENCE INDIA WITH THE FORTUNE</h1>
      {hotel && (
        <div className="About_Hotel">
          <div className="Hotel_Image">
            <img src={`${Url_Host}/images/${hotel.hotel_image}`} alt="Hotel" />
          </div>
          <div className="Hotel_desc">
            <h2>{hotel.hotel_name}, {hotel.hotel_location}</h2>
            <p>{hotel.hotel_description}</p>
            <div className="contact">
              <p>Contact: </p>
              <p className="alpha">{hotel.hotel_contact_1}</p>
              <p className="alpha">{hotel.hotel_contact_2}</p>
            </div>
          </div>
        </div>
      )}
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
          {rooms && rooms.map((room) => (
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
                  <button onClick={(e) => { handleBooking(e, room) }} className="Room-button">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelBook;
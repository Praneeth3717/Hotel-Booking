import "./HotelBook.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from '../../components/loading/Loading';
import { useQuery } from "@tanstack/react-query";
import { getHotel, getRooms, API_URL } from "../../api/Api";
import { useAuthStore, useBookingStore } from "../../store/store";

const HotelBook = () => {
  const token = useAuthStore((state) => state.token);
  const [data, setData] = useState({
    CheckIn: '',
    CheckOut: '',
    Guests: 1,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "CheckIn" || name === "CheckOut") {
      sessionStorage.removeItem("orderDates");
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const setCheckIn = useBookingStore((state) => state.setCheckIn);
  const setCheckOut = useBookingStore((state) => state.setCheckOut);
  const setTotalGuests = useBookingStore((state) => state.setTotalGuests);

  const navigate = useNavigate();
  const [displayRoomsLeft, setDisplayRoomsLeft] = useState(false);
  const { hotel_location } = useParams();

  const { data: hotel, isLoading: hotelLoading, isError: hotelError, error: hotelApiError } = useQuery({
    queryKey: ["hotel", hotel_location],
    queryFn: () => getHotel(hotel_location),
    enabled: !!hotel_location,
  });

  const { data: rooms, isLoading: roomLoading, isError: roomError, error: roomsApiError } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  if (hotelLoading || roomLoading) return <Loading />;

  if (hotelError || roomError) {
    console.error("API Error:", hotelApiError || roomsApiError);
    return <div>Error Fetching Data: {hotelApiError?.message || roomsApiError?.message || "An unknown error occurred."}</div>;
  }

  const handleBooking = (e, room) => {
    e.preventDefault();
    if (!token) {
      navigate("/SignIn");
      return;
    }
    if (!data.CheckIn || !data.CheckOut) {
      alert("Please select both Check-in and Check-out dates.");
      return;
    }
    if (new Date(data.CheckOut) <= new Date(data.CheckIn)) {
      alert("Check-out date must be after the Check-in date.");
      return;
    }
    if (data.Guests < 1) {
      alert("Add number of Guests");
      return;
    }

    navigate(`./${room.room_type}/payment`, {
      state: {
        Room_Image: room.image,
        Room_Type:room.room_type,
        Room_Price:room.price
      },
    });
  };

  const handleSearch = () => {
    if (!data.CheckIn || !data.CheckOut || data.Guests < 1) {
      alert("Please fill all fields before searching.");
      return;
    }
    sessionStorage.removeItem("orderDates");

    setCheckIn(data.CheckIn);
    setCheckOut(data.CheckOut);
    setTotalGuests(data.Guests);

    setData({
      CheckIn: data.CheckIn,
      CheckOut: data.CheckOut,
      Guests: data.Guests,
    });

    setDisplayRoomsLeft(true);
  };

  return (
    <div className="Hotel_Book">
      {hotel && (
        <div className="About_Hotel">
          <div className="Hotel_Image">
            <img src={`${API_URL}/images/${hotel.hotel_image}`} alt="Hotel" />
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
          <input type="date" name="CheckIn" value={data.CheckIn} onChange={onChangeHandler} />
        </label>
        <label>
          Check-out Date:
          <input type="date" name="CheckOut" value={data.CheckOut} onChange={onChangeHandler} />
        </label>
        <label>
          Number of Guests:
          <input type="number" name="Guests" min="1" value={data.Guests} onChange={onChangeHandler} />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="Stays_Live">
        <h2>Stay & Live</h2>
        <div className="Stay_Types">
          {rooms &&
            rooms.map((room) => (
              <div className="Each_Stay" key={room._id}>
                <div className="Stay_image">
                  <img src={`${API_URL}/images/${room.image}`} alt="Room" />
                </div>
                <div className="Stay_desc">
                  <h2 className="Room-title">{room.room_type}</h2>
                  <p className="Room-description">{room.description}</p>
                  <p className="Room-rating">Rating: {room.rating}/5</p>
                  {displayRoomsLeft && <p className="hotel-rooms-left">{room.rooms_left} rooms left</p>}
                  <div className="Room-footer">
                    <span className="Room-price">Rs {room.price}/Night</span>
                    <button onClick={(e) => handleBooking(e, room)} className="Room-button">
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
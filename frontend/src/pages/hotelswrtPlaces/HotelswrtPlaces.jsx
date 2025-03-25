import './HotelswrtPlaces.css';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { HotelswrtPlace,API_URL } from '../../api/Api';

const HotelswrtPlaces = () => {
  const { place_name } = useParams();

  const { data: hotels, isLoading, isError, error } = useQuery({
    queryKey: ['hotels', place_name],
    queryFn: () => HotelswrtPlace(place_name),
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="HotelswrtPlaces">
      <h1>Experience our Hotels at {place_name}</h1>
      {hotels && hotels.map((hotel) => (
        <div className="All-Hotels" key={hotel._id}>
          <div className="Hotel-Image">
            <img src={`${API_URL}/images/${hotel.hotel_image}`} alt="Hotel" />
          </div>
          <div className="Hotel-description">
            <div className="Hotel-About">
              <h1>{hotel.hotel_name}, {hotel.hotel_location}</h1>
              <p>{hotel.hotel_description}</p>
            </div>
            <div className="Hotel-Location">
              <h4>Our Location</h4>
              <p>{hotel.hotel_location}</p>
            </div>
            <div className="Hotel-Contact">
              <h4>Get in Touch</h4>
              <p>{hotel.hotel_contact_1}</p>
              <p>{hotel.hotel_contact_2}</p>
            </div>
            <div className="Hotels-Booking">
              <Link to={`./${hotel.hotel_location}/Book`}>
                <button>Book Now</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelswrtPlaces;

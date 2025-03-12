import './HotelswrtPlaces.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'

const HotelswrtPlaces = () => {
  const {Url_Host}=useContext(StoreContext)
    const [hotels,sethotels]=useState([])
    const {place_name}=useParams()
    useEffect(()=>{
        axios.get(`${Url_Host}/hotels/getHotelswrtPlaces/${place_name}`)
        .then((response)=>{
          sethotels(response.data.data)
        })
        .catch((error)=>{
          console.log(error)
        })
      },[place_name,Url_Host])
  return (
    <>
    <div className='HotelswrtPlaces'>
      <h1>Experience our Hotels at {place_name}</h1>
      {hotels.map((hotel)=>{
        return(
            <div className='All-Hotels' key={hotel._id}>
            <div className='Hotel-Image'>
                <img src={`${Url_Host}/images/${hotel.hotel_image}`} alt="Hyd" />
            </div>
            <div className='Hotel-description'>
                <div className='Hotel-About'>
                    <h1>{hotel.hotel_name},{hotel.hotel_location}</h1>
                    <p>{hotel.hotel_description}</p>
                </div>
                <div className='Hotel-Location'>
                    <h4>Our Location</h4>
                    <p>{hotel.hotel_location}</p>
                </div>
                <div className='Hotel-Contact'>
                    <h4>Get in Touch</h4>
                    <p>{hotel.hotel_contact_1}</p>
                    <p>{hotel.hotel_contact_2}</p>
                </div>
                <div className='Hotels-Booking'>
                    <Link to={`./${hotel.hotel_location}/Book`}>
                        <button>Book Now</button>
                    </Link>
                </div>
            </div>
          </div>            
        )
      })}
    </div>
    </>
  )
}

export default HotelswrtPlaces

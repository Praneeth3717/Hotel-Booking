import './OurHotels.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import placesData from '../../data/places.json'
import hotelsData from '../../data/hotels.json'

const OurHotels = () => {
    const [active,setactive]=useState("Places")
  return (
    <div className='OurHotels'>
        <div className='OurHotels-Heading'>
            <p>Our Hotels</p>
        </div>
        <div className='OurHotels-List'>
            <p className={active === "Places" ? "active" : ""} onClick={() => setactive("Places")}>Places</p>
            <p className={active === "AllHotels" ? "active" : ""} onClick={() => setactive("AllHotels")}>All Hotels</p>
        </div>
        <div className='Display-List'>
            <div className={active!=="Places"?"Change-Content Places-List":"Places-List"}>
                {placesData.map((places)=>{
                    return (
                    <Link to={"/"+places.place_name} className='Card-List'  key={places.place_name}>
                        <div className='Image-List'>
                            <img src={`/${places.place_image}`} alt="hyd" />
                        </div>
                        <p>{places.place_name}</p>
                    </Link>
                    )
                })}
            </div>
            <div className={active!=="AllHotels"?"Change-Content All-Hotels-List":"All-Hotels-List" }>
                {hotelsData.map((hotel)=>{
                    return(
                        <Link to={`/`+hotel.place_name+`/`+hotel.hotel_location+`/Book`} className='Card-List' key={hotel.hotel_name}>
                        <div className='Image-List'>
                        <img src={`${hotel.hotel_image}`} alt={hotel.hotel_name} />
                        </div>
                        <p>{hotel.place_name} - {hotel.hotel_location}</p>
                        </Link>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default OurHotels

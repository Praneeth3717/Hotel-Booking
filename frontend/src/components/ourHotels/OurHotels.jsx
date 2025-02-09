import './OurHotels.css'
import { StoreContext } from '../../context/StoreContext'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

const OurHotels = () => {
    const [active,setactive]=useState("Places")
    const {Hotel_list,Place_list}=useContext(StoreContext)
  return (
    <div className='OurHotels'>
        <div className='OurHotels-Heading'>
            <p>Our Hotels</p>
        </div>
        <div className='OurHotels-List'>
            <p onClick={()=>setactive("Places")}>Places</p>
            <p onClick={()=>setactive("AllHotels")}>All Hotels</p>
        </div>
        <div className='Display-List'>
            <div className={active!=="Places"?"Change-Content Places-List":"Places-List"}>
                {Place_list.map((places)=>{
                    return (
                    <Link to={`/`+places.place_name} className='Card-List'  key={places._id}>
                        <div className='Image-List'>
                            <img src={`http://localhost:3000/images/${places.place_image}`} alt="hyd" />
                        </div>
                        <p>{places.place_name}</p>
                    </Link>
                    )
                })}
            </div>
            <div className={active!=="AllHotels"?"Change-Content All-Hotels-List":"All-Hotels-List" }>
                {Hotel_list.map((hotel)=>{
                    return(
                        <Link to={`/`+hotel.place_name+`/`+hotel.hotel_location+`/Book`} className='Card-List' key={hotel._id}>
                        <div className='Image-List'>
                        <img src={`http://localhost:3000/images/${hotel.hotel_image}`} alt={hotel.hotel_name} />
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

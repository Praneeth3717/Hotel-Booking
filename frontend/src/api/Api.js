import axios from "axios"

const api=axios.create({
    baseURL:"https://hotel-booking-backend-gne4.onrender.com"
})

export const HotelswrtPlace=async(place_name)=>{
    const res=await api.get(`/hotels/getHotelswrtPlaces/${place_name}`)
    return res.data.data
}

export const getHotel=async(hotel_location)=>{
    const res=await api.get(`/hotels/getHotel/${hotel_location}`)
    return res.data.data
}

export const getRooms=async()=>{
    const res=await api.get('/rooms/getRooms')
    return res.data.data
}

export const getRegistered=async(UserData)=>{
    const res=await api.post('/user/register',UserData)
    return res.data
}

export const getLoggedIn=async(UserData)=>{
    const res=await api.post('/user/verifyUser',UserData)
    return res.data
}

export const BookingData=async(details)=>{
    const res=await api.post('/user/orderdone',details)
    return res.data
}

export const getUser=async()=>{
    const token=localStorage.getItem("token")
    if(token){
        const config={
            headers: {Authorization:`Bearer ${token}`}
        }
        const res=await api.get('/user/getUser',config)
        return res.data.data
    }
}
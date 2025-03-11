const express=require('express')
const {getHotels,getHotel,getPlaces,getHotelswrtPlace}=require('../controllers/hotelController')

const HotelRouter=express.Router()

HotelRouter.get('/getHotels',getHotels)
HotelRouter.get('/getHotelswrtPlaces/:place_name',getHotelswrtPlace)
HotelRouter.get('/getHotel/:hotel_location',getHotel)

module.exports=HotelRouter
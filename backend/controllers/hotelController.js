const HotelsModel=require('../models/hotelModel')
const PlaceModel=require('../models/placeModel')

const getPlaces=async(req,res)=>{
    try {
        const Places=await PlaceModel.find({})
        res.json({success:true,data:Places})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}
const getHotels=async(req,res)=>{
    try {
        const hotels=await HotelsModel.find({})
        res.json({success:true,data:hotels})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}
const getHotelswrtPlace=async(req,res)=>{
    const place_name=req.params.place_name
    try {
        const hotelswrtPlace=await HotelsModel.find({place_name})
        res.json({success:true,data:hotelswrtPlace})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}
const getHotel=async(req,res)=>{
    const hotel_location=req.params.hotel_location
    try {
        const gethotel=await HotelsModel.findOne({hotel_location})
        res.json({success:true,data:gethotel})
    } catch (error) {
        res.json({success:false,message:"Error"})
    }
}

module.exports={getHotels,getHotel,getPlaces,getHotelswrtPlace}
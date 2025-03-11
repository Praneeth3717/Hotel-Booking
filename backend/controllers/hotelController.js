const HotelsModel=require('../models/hotelModel')

const getHotels=async(req,res)=>{
    try {
        const hotels=await HotelsModel.find({})
        res.json({success:true,data:hotels})
    } catch (error) {
        console.error("Error fetching Hotels:",error);
        res.status(500).json({success:false,message:"Failed to fetch hotels",error: error.message });
    }
}
const getHotelswrtPlace=async(req,res)=>{
    const place_name=req.params.place_name
    try {
        const hotelswrtPlace=await HotelsModel.find({place_name})
        res.json({success:true,data:hotelswrtPlace})
    } catch (error) {
        console.error("Error fetching hotel wrt place:",error);
        res.status(500).json({success:false,message:"Failed to fetch Hotel wrt place",error: error.message });
    }
}
const getHotel=async(req,res)=>{
    const hotel_location=req.params.hotel_location
    try {
        const gethotel=await HotelsModel.findOne({hotel_location})
        res.json({success:true,data:gethotel})
    } catch (error) {
        console.error("Error fetching hotel data:",error);
        res.status(500).json({success:false,message:"Failed to fetch Hotel ",error: error.message });
    }
}

module.exports={getHotels,getHotel,getHotelswrtPlace}
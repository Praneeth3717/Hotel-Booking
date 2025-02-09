const mongoose=require('mongoose')

const HotelSchema=new mongoose.Schema({
    place_name:String,
    hotel_name:String,
    hotel_location:String,
    hotel_description:String,
    hotel_contact_1:String,
    hotel_contact_2:String,
    hotel_image:String
})

const HotelsModel=mongoose.models.hotels || mongoose.model("hotels",HotelSchema)

module.exports=HotelsModel
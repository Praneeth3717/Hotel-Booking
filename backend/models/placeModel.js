const mongoose=require('mongoose')

const PlaceSchema=new mongoose.Schema({
    place_name:String,
    place_image:String,
})

const PlaceModel=mongoose.models.places || mongoose.model("places",PlaceSchema)

module.exports=PlaceModel
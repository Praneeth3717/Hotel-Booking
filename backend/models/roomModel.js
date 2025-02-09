const mongoose =require('mongoose')

const RoomSchema=new mongoose.Schema({
    room_type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    rooms_left:{
        type:Number
    },
    image:{
        type:String,
        required:true
    }
})

const RoomModel=mongoose.models.Rooms || mongoose.model("Rooms",RoomSchema)

module.exports=RoomModel
const RoomModel= require('../models/roomModel')
const fs=require('fs')

const addRoom=async(req,res)=>{
    let image_filename = `${req.file.filename}`;

    const Room=new RoomModel({
        room_type:req.body.room_type,
        description:req.body.description,
        price:req.body.price,
        rating:req.body.rating,
        rooms_left:req.body.rooms_left,
        image:image_filename
    })
    try{
        await Room.save()
        res.json({success:true,message:"Room Added"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const getRooms=async(req,res)=>{
    try {
        const Rooms=await RoomModel.find({})
        res.json({success:true,data:Rooms})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

module.exports={addRoom,getRooms}
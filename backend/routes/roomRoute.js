const express= require('express') 
const {addRoom,getRooms} =require('../controllers/roomController')
const multer =require('multer')

const roomRouter=express.Router()

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,callback)=>{
        return callback(null,`${Date.now()}${file.originalname}`)
    }
})

const uploads=multer({storage:storage})

roomRouter.post('/addRoom',uploads.single("image"),addRoom)
roomRouter.get('/getRooms',getRooms)

module.exports=roomRouter
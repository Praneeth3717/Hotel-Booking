const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const roomRouter=require('./routes/roomRoute')
const cors = require('cors')
const HotelRouter = require('./routes/hotelRoute')
const userRouter  = require('./routes/userRoute')

const app=express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))


const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then(()=>{
        console.log("DB Connected Successfully")
        app.listen(PORT,()=>{
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    }
)
.catch((error)=>{
    console.log("Error in connecting to DB",error)
})

app.use('/rooms',roomRouter)
app.use('/hotels',HotelRouter)
app.use('/images',express.static('uploads'))
app.use('/user',userRouter)
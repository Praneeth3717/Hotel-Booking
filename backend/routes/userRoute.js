const express=require('express')
const {loginUser,registerUser,getUserbyEmail}=require('../controllers/userController')
const createBooking=require('../controllers/orderController')
const userRouter=express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/verifyUser',loginUser)
userRouter.get('/getUser',getUserbyEmail)
userRouter.post('/orderdone',createBooking)

module.exports=userRouter
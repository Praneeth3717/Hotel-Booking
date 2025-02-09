const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  country: String,
  state: String,
  city: String,
  street: String,
  pinCode: String,
  paymentMethod: String,
  checkIn: String,
  checkOut: String,
  guests: Number,
  Room_Type: String,
  Room_Price: String,
  totalPrice: String
}, { timestamps: true });


const orderModel=mongoose.models.orders || mongoose.model('Booking', BookingSchema);

module.exports = orderModel

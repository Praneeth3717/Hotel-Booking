const orderModel = require('../models/OrderModel');

const createBooking = async (req, res) => {
    try {
        const newBooking = new orderModel(req.body);
        await newBooking.save();
        res.status(201).json({ message: "Booking successful!" });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ message: "Server error. Booking failed." });
    }
};

module.exports = createBooking ;

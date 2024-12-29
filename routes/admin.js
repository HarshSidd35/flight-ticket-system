const express = require('express');
const router = express.Router();
const { isUser, isAdmin } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// Admin: Get customers on a specific flight
router.get('/customers/:flightId', [isUser, isAdmin], async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.flightId);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    const bookings = await Booking.find({ flightRef: req.params.flightId }).populate('userRef');
    const customers = bookings.map((booking) => ({
      userId: booking.userRef._id,
      username: booking.userRef.username,
      passengers: booking.passengers,
    }));

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

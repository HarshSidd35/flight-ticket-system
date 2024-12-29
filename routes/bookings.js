const express = require('express');
const router = express.Router();
const { isUser } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const redisClient = require('../utils/redisClient');

// Create a booking
router.post('/', isUser, async (req, res) => {
  try {
    const { flightId, passengers } = req.body;

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    if (flight.availableSeats < passengers.length) {
      return res.status(400).json({ message: 'Not enough available seats' });
    }

    const booking = new Booking({
      userRef: req.user._id,
      flightRef: flightId,
      passengers,
      paymentStatus: 'PENDING',
    });

    await booking.save();
    flight.availableSeats -= passengers.length;
    await flight.save();

    // Update Redis cache for flight
    const cacheKey = `flight:${flightId}`;
    await redisClient.setEx(cacheKey, 600, JSON.stringify(flight));

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

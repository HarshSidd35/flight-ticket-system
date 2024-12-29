const express = require('express');
const router = express.Router();
const { isUser } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Ticket = require('../models/Ticket');

// Initiate payment
router.post('/', isUser, async (req, res) => {
  try {
    const { bookingId, totalPay } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.paymentStatus === 'SUCCESS') {
      return res.status(400).json({ message: 'Payment already completed' });
    }

    // Simulate payment success (add real payment gateway integration here)
    booking.paymentStatus = 'SUCCESS';
    await booking.save();

    // Generate ticket
    const ticket = new Ticket({
      bookingDate: new Date(),
      totalPay,
      bid: booking._id,
      ticketNumber: `TICKET-${Date.now()}`,
    });
    await ticket.save();

    booking.ticketsRef = ticket._id;
    await booking.save();

    res.status(201).json({ message: 'Payment successful', ticket });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

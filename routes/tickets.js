const express = require('express');
const router = express.Router();
const { isUser } = require('../middleware/auth');
const Ticket = require('../models/Ticket');

// Retrieve ticket details by booking ID
router.get('/:bookingId', isUser, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ bid: req.params.bookingId });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

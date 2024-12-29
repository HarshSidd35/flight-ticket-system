const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  bookingDate: { type: Date, default: Date.now },
  totalPay: { type: Number, required: true },
  bid: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  ticketNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Ticket', TicketSchema);

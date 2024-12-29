const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  passengers: [
    {
      pname: { type: String, required: true },
      age: { type: Number, required: true },
      gender: { type: String, required: true },
    },
  ],
  paymentStatus: { type: String, enum: ['PENDING', 'SUCCESS'], default: 'PENDING' },
  ticketsRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
});

module.exports = mongoose.model('Booking', BookingSchema);

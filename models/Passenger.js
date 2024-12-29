const PassengerSchema = new mongoose.Schema({
    pname: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
  });
  
  module.exports = PassengerSchema;
  
const mongoose = require('mongoose');

// Define the pet schema
const petSchema = new mongoose.Schema({
  code: { type: String, required: true, index: true },
  name: { type: String, required: true },
  petType: { type: String, required: true },
  petAge: { type: Number, required: true },
  amountDays: { type: Number, required: true },
  amountDue: { type: Number, required: true },
  image: { type: String, required: true }
});

// define collection
const Pet = mongoose.model('pets', petSchema);
module.exports = Pet;

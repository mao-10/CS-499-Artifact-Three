// Bring in the DB connection and the Pet schema
const Mongoose = require('./db');
const Pet = require('./petHotel');

// Read seed data from json file
var fs = require('fs');
var petData = JSON.parse(fs.readFileSync('./data/pets.json', 'utf8'));

// delete any existing records, then insert seed data
const seedDB = async () => {
  await Pet.deleteMany({});
  await Pet.insertMany(petData);
};

// close the MongoDB connection and exit
seedDB().then(async () => {
  await Mongoose.connection.close();
  process.exit(0);
});

const mongoose = require('mongoose');
const Pet = require('../models/petHotel');
// register model
const Model = mongoose.model('pets');

// GET: /pets - list all pets
// regardless of outcome, response must include HTML status code
// and JSON message to reuqesting client
const petsList = async(req, res) => {
  // no filter, return all records
  const q = await Model.find({}).exec();
  if (!q) {
    // Database returned no data
    return res.status(404).json(err);
  }
  else {
    // return resulting pet list
    return res.status(200).json(q);
  }
};

// GET: /pets/:petCode - lists a single pet
// regardless of outcome, must include HTML status code
// and json message to requesting client
const petsFindByCode = async(req, res) => {
  // return single record
  const q = await Model.find({'code': req.params.petCode }).exec();

  if (!q) {
    // database returned no data
    return res.status(404).json(err);
  }
  else {
    // return resulting pet list
    return res.status(200).json(q);
  }
};

// POST: /pets - Adss a new pet
// regardless of outcome, must include HTML status code
// and json message to requesting client
const petsAddPet = async(req, res) => {
  const newPet = new Pet({
    code: req.body.code,
    name: req.body.name,
    petType: req.body.petType,
    petAge: req.body.petAge,
    amountDays: req.body.amountDays,
    amountDue: req.body.amountDue,
    image: req.body.image
  });

  const q = await newPet.save();

    if(!q) {
      // database returned no data
      return res.status(400).json(err);
    }
    else {
      return res.status(201).json(q);
    }
};

// PUT: /pets/:petCode - updates a pet
// regardless of outcome, must include HTML status code
// and json message to requesting client
const petsUpdatePet = async(req, res) => {
  const q = await Model
    .findOneAndUpdate(
      { 'code' : req.params.petCode },
      {
        code: req.body.code,
        name: req.body.name,
        petType: req.body.petType,
        petAge: req.body.petAge,
        amountDays: req.body.amountDays,
        amountDue: req.body.amountDue,
        image: req.body.image
      }
    )
    .exec();

    if(!q) {
      // database returned no data
      return res.status(400).json(err);
    }
    else {
      // return resulting updated pet
      return res.status(200).json(q);
    }
};

module.exports = {
  petsList,
  petsFindByCode,
  petsAddPet,
  petsUpdatePet
};

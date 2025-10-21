// add a route to the controller
// so that webserver will know how to process a specific request

// express app
const express = require("express");
// router logic
const router = express.Router();

// import the controllers to route
const petsController = require("../controllers/pets");

// define route for pets endpoint
// GET methof routes petsList
// POST Method adds a trip
router.route("/pets")
.get(petsController.petsList)
.post(petsController.petsAddPet);

// GET method routes petsFindByCode - requires parameter
router.route('/pets/:petCode')
.get(petsController.petsFindByCode)
.put(petsController.petsUpdatePet);

module.exports = router;

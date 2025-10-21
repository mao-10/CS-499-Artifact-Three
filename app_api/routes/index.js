const jwt = require('jsonwebtoken'); // enable JSON web tokens
// add a route to the controller
// so that webserver will know how to process a specific request

// express app
const express = require("express");
// router logic
const router = express.Router();

// import the controllers to route
const petsController = require("../controllers/pets");
const authController = require("../controllers/authentication");

// Method to authenticate JWT
function authenticateJWT(req, res, next) {
  // console.log('In Middleware');

  const authHeader = req.headers['authorization'];
  // console.log('Auth Header: ' + authHeader);

  if (authHeader == null) {
    console.log('Auth Header Required byt NOT PRESENT');
    return res.sendStatus(401);
  }

  let headers = authHeader.split(' ');
  if(headers.length < 1) {
    console.log('Not enough tokens in auth header: ' + headers.length);
    return res.sendStatus(501);
  }

  const token = authHeader.split(' ')[1];
  // console.log('Token: ' + token);

  if (token == null) {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
  }
  // console.log(process.env.JWT_SECRET);
  // console.log(jwt.decode(token));

  const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      return res.sendStatus(401).json('Token Validation Error');
    }
    // set the auth param to the decoded object
    req.auth = verified;
  });
  // continue or hang forever
  next();

}

// ass router for login and register
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// define route for pets endpoint
// GET methof routes petsList
// POST Method adds a trip
router.route("/pets")
.get(petsController.petsList)
.post(authenticateJWT, petsController.petsAddPet);

// GET method routes petsFindByCode - requires parameter
router.route('/pets/:petCode')
.get(petsController.petsFindByCode)
.put(authenticateJWT, petsController.petsUpdatePet);

module.exports = router;

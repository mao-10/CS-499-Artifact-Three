const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');

const register = async(req, res) => {
  // Validate message to ensure that all params are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({"message": "All fields required"});
  }

  const user = new User(
    {
      // set user name, email
      // start with empty password
      name: req.body.name,
      email: req.body.email,
      password: ''
    });
  // set user password
  user.setPassword(req.body.password)
  const q = await user.save();

  if(!q) {
    // database returned no data
    return res.status(400).json(err);
  }
  else {
    // return new user token
    const token = user.generateJWT();
    return res.status(200).json(token);
  }
};

const login = (req, res) => {
  // validate message to ensure email and password are present
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({"message": "All fields required"});
  }
  // delegate authentication to passport module
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // error in authentication process
      return res.status(404).json(err);
    }
    if (user) {
      // auth succeeded - generate JWT and return to caller
      const token = user.generateJWT();
      res.status(200).json({token});
    }
    else {
      // auth failed return error
      res.status(401).json(info);
    }
  }) (req, res);
};

// export methods that drive endpoints
module.exports = {
  register,
  login
};

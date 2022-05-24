'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user/user.js')

exports.register = function(request, response) {
  let newUser = new User(request.body);
  newUser.hash_password = bcrypt.hashSync(request.body.password, 10);
  newUser.save(function(error, user) {
    if (error) {
      return response.status(400).send({message: error});
    } else {
      user.hash_password = undefined;
      return response.json(user);
    }
  });

};

exports.sign_in = function(request, response) {
  User.findOne({
    username: request.body.username,
  },
  function(error, user) {
    if (error) throw error;
    if (!user || !user.comparePassword(request.body.password)) {
      return response.status(401).json('Authentication Failed');
    }
    return response.json({token: jwt.sign({username: user.username, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
  },
  );
};

exports.loginRequired = function(request, response, next) {
  if (request.user) {
    next();
  } else {
    return response.status(401).json({message: 'Unauthorized User!'});
  }
};

exports.profile = function(request, response, next) {
  if (request.user) {
    response.send(request.user);
    next();
  } else {
    return response.status(401).json({message: 'Invalid Token'});
  }
};

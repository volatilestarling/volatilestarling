var User = require('../models/userModel');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var create;
    var newUser;

    var findOne = Q.nbind(User.findOne, User);

    // check to see if user already exists
    findOne({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          // make a new user if not one
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            password: password
          };
          return create(newUser);
        }
      })
      .then(function (user) {
        // create token to send back for auth
        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header if any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },

  addUserLocation: function (req, res, next) {
    console.log(req.body)
    var user = req.body.user;
    var location = req.body.location;
    console.log('this is user', user)
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: user})
      .then(function(foundUser) {
        if(foundUser) {
          console.log('hello')
          console.log(foundUser);
          //initialize to an empty array to hold itinerary
          foundUser.locations[location] = [];
          console.log('added location');
          console.log(foundUser.locations);
          res.status(201);
        } else {
          console.error('Could not find user');
          res.status(404);
        }
      })

  },

  getUserLocation: function (req, res, next) {
    var user = req.params.user;
    console.log(user);
    console.log(req.body);
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: user})
      .then(function(foundUser) {
        if(foundUser) {
          //send back user's locations object
          res.status(200).send(foundUser.locations);
        } else {
          console.error('Could not find user');
          res.status(404);
        }
      })
  }
};

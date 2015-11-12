var Location = require('../models/locationModel');
var User = require('../models/userModel');
var Q = require('q');
var cheerio = require('cheerio');

module.exports = {
  retrieveData: function (req, res, next) {
    var username = req.body.username;
    var city = req.body.city;
    var country = req.body.country;

    var url = 'http://travel.state.gov/content/passports/en/country/' + country.toLowerCase() + '.html';

    var findCity = Q.nbind(Location.findOne, Location);
    findCity({ city: city })
      .then(function (location) {
        if (!location) {
          next(new Error('Location does not exist'));
        } else {
          request(url, function(error, response, html){
            if(!error){
              var $ = cheerio.load(html);
              var data;

              $('#content').filter(function() {
                var content = $(this);
                // select facts and add to data object
              });

              res.status(200).send(location);
            }
          });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },
  addCity: function (req, res, next) {
    var city = req.body.city;
    var country = req.body.country;
    var coords = req.body.coords;
    var username = req.body.username;
    // need to fetch attractions from trip advisor api

    // need to add location to userSchema too
    var findUser = Q.nbind(User.findOne, User);
    var findCity = Q.nbind(Location.findOne, Location);
    findCity({ city: city, country: country })
      .then(function (location) {
        if (!location) {
          var create = Q.nbind(Location.create, Location);
          var newLocation = {
            city: city,
            country: country,
            attractions: []
          };

          create(newLocation);

          findUser({ username: username })
            .then(function (user) {
              if (!user) {
                next(new Error('User does not exist'));
              } else {
                // double check model to see if we should query city and/or country
                if (!user.locations[city]) {
                  user.locations[city] = [];
                  // initialize attractions array only if location not already added
                }
                res.status(200).send(newLocation);
              }
            });

        } else {
          findUser({ username: username })
            .then(function (user) {
              if (!user) {
                next(new Error('User does not exist'));
              } else {
                // double check model to see if we should query city and/or country
                if (!user.locations[city]) {
                  user.locations[city] = [];
                  // initialize attractions array only if location not already added
                }
                res.status(200).send(location);
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};

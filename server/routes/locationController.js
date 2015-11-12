var Location = require('../models/locationModel');
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
    // scrape data
    // add coords and other stuff
    var city = req.body.city;
    var country = req.body.country;
    var coords = req.body.coords;
    // modify schema to store coordinates
    // need to fetch attractions from trip advisor api

    // need to add location to userSchema too
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

          return create(newLocation);
        } else {
          res.status(200).send(location);
          // not actually an error, just don't have to add it
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};

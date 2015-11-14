var Location = require('../models/locationModel');
var User = require('../models/userModel');
var Q = require('q');
var cheerio = require('cheerio');
var request = require('request');

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
              var data = {
                location: location,
                info: {}
              };

              for (var i = 1; i <= 6; i++) {
                var selector = '.quick_fact' + i;

                $(selector).filter(function () {
                  var content = $(this);
                  data[content.children().first().text()] = content.children().last().text();
                });
              }

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
    var place = req.body.place;
    var city = req.body.city;
    var country = req.body.country;
    var username = req.body.username;
    // need to fetch attractions from trip advisor api

    // need to add location to userSchema too
    var findUser = Q.nbind(User.findOne, User);
    var findCity = Q.nbind(Location.findOne, Location);

    findUser({ username: username })
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          findCity({ city: city, country: country })
            .then(function (location) {

              var newLocation;
              if (!location) {
                var create = Q.nbind(Location.create, Location);

                newLocation = {
                  city: city,
                  country: country,
                  attractions: []
                };

                var fetchCB = function(err, response, body) {
                  //array of attractions (objects)
                  var toDoList = JSON.parse(body);
    
                  for(var place in toDoList) { 
                    newLocation.attractions.push(toDoList[place])
                  }
                  create(newLocation);
                };


                if(newLocation.city === "") {
                  module.exports.fetchAttractions(newLocation.country, fetchCB);
                } else {
                  module.exports.fetchAttractions(newLocation.country, fetchCB, newLocation.city);
                }
        
              // double check model to see if we should query city and/or country
              if (!user.locations[place]) {
                // initialize attractions array only if location not already added
                user.locations[place] = [];
              }
              location = location ? newLocation : location;
              res.status(200).send(location);
            } else {
              console.log('location already exists');
            }
          });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  fetchAttractions: function (country, callback, city) {
    //consider white space cases
    country = country.replace(/\s/g, '-');
    var url;

    if(city === undefined) {
      url = "http://www.kimonolabs.com/api/ondemand/6fndw1y6?apikey=ZFsa5estp95igf9lGTKDK8u2iuAfzbOW&kimpath1=" + country + "&kimmodify=1";
    } else {
      city = city.replace(/\s/g, '-');
      url = "https://www.kimonolabs.com/api/ondemand/eg6pzbee?apikey=ZFsa5estp95igf9lGTKDK8u2iuAfzbOW&kimpath1=" + country + "&kimpath2=" + city + "&kimmodify=1";
    }

    request(url, function(err, response, body) {
      if(err) {
        console.error(err);
      } else {
        /*
        body is obj with following structure:
        "0": {
            "Attraction": "National Palace Museum",
            "Description": "Home to the world's largest and arguably finest collection of Chinese art, this vast collection covers treasures in painting, calligraphy, statuary, bronzes, laquerware, ceramics, jade and religious objects...",
            "City": "Taipei",
            "Type": "Museums & Galleries"
          }
        */
        callback(err, response, body);
      }
    })
  }
};

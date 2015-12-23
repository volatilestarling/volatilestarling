var Location = require('../models/locationModel');
var User = require('../models/userModel');
var Q = require('q');
var request = require('request');

module.exports = {
	/**
	 * Request handler to retrieve location information including attractions and travel state information
	 * @param req
	 * @param res
	 * @param next
	 */
	retrieveData: function (req, res, next) {
		// Sample GET request from front end: /api/location?city=shanghai&country=china&user=kaijie@gmail.com
		console.log('params', req.query)
		var username = req.query.user;
		var city = req.query.city;
		var country = req.query.country;

		var findCity = Q.nbind(Location.findOne, Location);
		findCity({city: city})
			.then(function (location) {
				if (!location) {
					next(new Error('Location does not exist'));
				} else {
					res.status(200).send(location);
				}
			})
			.fail(function (error) {
				next(error);
			});
	},
	/**
	 * Request handler for new locations. Creates a new location document with top attractions.
	 * @param req
	 * @param res
	 * @param next
	 */
	addCity: function (req, res, next) {
		console.log('addCity', req.body)
		var place = req.body.place;
		var city = req.body.city;
		var country = req.body.country;
		var username = req.body.username;

		// need to add location to userSchema too
		var findUser = Q.nbind(User.findOne, User);
		var findCity = Q.nbind(Location.findOne, Location);

		console.log('adding city now');

		findUser({username: username})
			.then(function (user) {
				if (!user) {
					next(new Error('User does not exist'));
				} else {
					findCity({city: city, country: country})
						.then(function (location) {

							var newLocation;
							if (!location) {
								var create = Q.nbind(Location.create, Location);
								console.log('creating city')
								newLocation = {
									city: city,
									country: country,
									attractions: [],
									info: null
								};

								var fetchCB = function (err, response, body) {
									//array of attractions (objects)
									var toDoList = JSON.parse(body);

									for (var place in toDoList) {
										newLocation.attractions.push(toDoList[place])
									}

									create(newLocation)
								};

								if (newLocation.city === "") {
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
				/* Used to delay the addStateInfo call due to Kimono Lab request limits */
				setTimeout(function() {
					next();
				}, 9000);
			})
			.fail(function (error) {
				next(error);
			});
	},

	/**
	 * Request handler called after location has been added to the database to retrieve and update location with state info
	 * @param req
	 * @param res
	 */
	addStateInfo: function(req, res) {
		var country = req.body.country;

		var getInfo = Q.nfcall(module.exports.fetchStateInfo, country);
		var findCity = Q.nbind(Location.findOne, Location);

		findCity({country: country})
			.then(function(location) {
				getInfo
					.then(function(info) {
						location.info = JSON.parse(info.body).results['QUICK FACTS'][0];
						location.save();
					})
			})
			.then(function() {
				res.status(201);
			})
			.catch(function(err) {
				console.error('Error in fetching state info', err);
			})

	},
	/**
	 * Makes call to Kimono Scraping API for Lonely Planet information based on city and country or country.
	 * @param country
	 * @param callback
	 * @param city
	 * @returns example body of response:
	 * "0": {
				 "Attraction": "National Palace Museum",
				 "Description": "Home to the world's largest and arguably finest collection of Chinese art, this vast collection covers treasures in painting, calligraphy, statuary, bronzes, laquerware, ceramics, jade and religious objects...",
				 "City": "Taipei",
				 "Type": "Museums & Galleries",
				 "Link": "http://www.lonelyplanet.com/australia/sights/historic/historic-port-echuca/item-a-1164731-id"
				 }
	 */

	fetchAttractions: function (country, callback, city) {
		//consider white space cases
		country = country.replace(/\s/g, '-');
		var url;

		if (city === undefined) {
			url = "http://www.kimonolabs.com/api/ondemand/6fndw1y6?apikey=ZFsa5estp95igf9lGTKDK8u2iuAfzbOW&kimpath1=" + country + "&kimmodify=1";
		} else {
			city = city.replace(/\s/g, '-');
			url = "https://www.kimonolabs.com/api/ondemand/eg6pzbee?apikey=ZFsa5estp95igf9lGTKDK8u2iuAfzbOW&kimpath1=" + country + "&kimpath2=" + city + "&kimmodify=1";
		}

		request(url, function (err, response, body) {
			if (err) {
				console.error(err);
			} else {
				callback(err, response, body);
			}
		})
	},
	/**
	 * Makes call to Kimono Scraping API for information from travel.state.gov
	 * @param country
	 * @param callback
	 * @returns Response from call will be an object that contains a results property holding necessary information listed under 'QUICK FACTS'
	 *  { 'PASSPORT VALIDITY': 'Must be valid for at least three months beyond your planned date of departure from the Schengen area.',
      VACCINATIONS: 'None',
     'BLANK PASSPORT PAGES': 'One page required for entry stamp',
     'TOURIST VISA REQUIRED': 'Not required for stays less than 90 days in Spain.  Not required for stays less than three months in Andorra.',
     'CURRENCY RESTRICTIONS FOR ENTRY': 'None',
     'CURRENCY RESTRICTIONS FOR EXIT': 'None' },
	 */
	fetchStateInfo: function (country, callback) {
		var url = "http://www.kimonolabs.com/api/ondemand/ebbvwtwk?apikey=ZFsa5estp95igf9lGTKDK8u2iuAfzbOW&kimpath5=" + country.toLowerCase() + ".html";

		request(url, function (err, response) {
			if(err) {
				console.error(err);
			} else {
				callback(err, response);
			}
		})
	}
};
var locationController = require('./locationController.js');

module.exports = function (app) {
  app.get('/api/location', locationController.retrieveData);
  app.post('/api/location', locationController.addCity);
};

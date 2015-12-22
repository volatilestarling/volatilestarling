var locationController = require('./locationController.js');

module.exports = function (app) {
  app.get('/', locationController.retrieveData);
  app.post('/', locationController.addCity, locationController.addStateInfo);
};

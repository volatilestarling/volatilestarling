var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  city: String,
  country: String,
  attractions: Array,
  info: Schema.Types.Mixed
});

var Location = mongoose.model('Location', locationSchema);

module.exports = Location;

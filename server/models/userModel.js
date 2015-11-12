var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String
  },
  locations: {
    /* example
      locations: {
        bangkok: [...],
        sydney: [...],
        etc: [...]
      }
    */
    type: Schema.Types.Mixed
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;

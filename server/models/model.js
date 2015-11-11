var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var docSchema = new Schema({
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
  whereToList: {
    type: Array
  },
  beenToList: {
    type: Array
  }
});

var User = mongoose.model('User', docSchema)
//docSchema presave - hash password


module.exports = User;
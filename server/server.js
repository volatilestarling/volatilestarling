var express = require('express');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

var port  = process.env.PORT || 3000;
var app = express();

var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
};

var mongodbUri = 'mongodb://heroku_q2tbs7nz:vip6tj89t803bf8vnala6oa9g8@ds053964.mongolab.com:53964/heroku_q2tbs7nz';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

// require('server/routes/routes.js')(app);
require('./config/middleware.js')(app, express);

app.listen(port);
console.log('App listening on port ' + port);

module.exports = app;

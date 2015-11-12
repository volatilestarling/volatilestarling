var express = require('express');
var mongoose = require('mongoose');

var port  = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/whereto');

// require('server/routes/routes.js')(app);
require('./config/middleware.js')(app, express);

app.listen(port);
console.log('App listening on port ' + port);

module.exports = app;

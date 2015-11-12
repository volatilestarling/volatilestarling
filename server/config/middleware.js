var morgan = require('morgan');
var bodyParser = require('body-parser');
var helpers = require('./helpers.js');
// var methodOverride = require('method-override');

module.exports = function (app, express) {
  var userRouter = express.Router();
  // var linkRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));
  // app.use(bodyParser.text());
  // app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
  // app.use(methodOverride());


  app.use('/api/users', userRouter);

  // app.use('/api/links', linkRouter); // user link router for link request
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  require('../users/userRoutes.js')(userRouter);
  // require('../links/linkRoutes.js')(linkRouter);
};

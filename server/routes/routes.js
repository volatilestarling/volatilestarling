//define backend routes here
var utils = require('../config/helpers');
var User = require('../models/model')

// app.get('/api/users')
module.exports = function(app) {
  app.post('/api/signup', function(req, res) {

    var user = req.body.username;
    var pass = req.body.password;

    User.findOne({ username: user }, function(err, found) {
      if(err) {
        console.error(err);
      }
      if(!found) {
        var newUser = new User({
            username: user,
            password: pass
          });
          // newUser.hashPassword(function (){
            newUser.save();
            // util.createSession(req, res, newUser);
          // });
        
        res.send('OKAY!')
      } else {
        console.log('Account already exists');
        // res.redirect('/signup');
      }
    })


  app.post('/api/signin', function(req, res) {
    console.log(req.body)
    var user = req.body.username;
    var pass = req.body.password;

    User.findOne({ username: user }, function(err, found) {
      if(err) {
        console.error(err);
      }
      if(!found) {
        res.send('Did not find user, please sign up')
      } else {
        res.send('Logging in!')
      }
    })

  })
});

  app.get('*', function(req, res) {
    res.sendfile('../../client/index.html'); 
  });

}
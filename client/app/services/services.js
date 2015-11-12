angular.module('where-to.services', [])
.factory('MapService', function($http){
  var googleMapService = {};

  // googleMapService.init = function () {
  //    var map = new google.maps.Map(document.getElementById('mapdisplay'), {
  //           zoom: 3,
  //           center: new google.maps.LatLng(0,0)
  //       });
  // }

  return googleMapService;
})
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.whereto');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.whereto');
    $state.go('login');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
// .factory('DataService', function($http) {
//   var getLocations = function () {
//     return $http({
//       method: 'GET',
//       url: '/api/users'
//     })
//     .then(function (resp) {
//       return resp.data;
//     });
//   };

//   var addLocations = function (coordinates) {
//     return $http({
//       method: 'POST',
//       url: '/api/users',
//       data: coordinates
//     })
//     .then(function (resp) {
//       return resp.data;
//     });
//   };

//   return {
//     getLocations: getLocations,
//     addLocations: addLocations
//   };    
// })

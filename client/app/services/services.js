angular.module('where-to.services', [])
.factory('MapService', function($http){

  var styles = [{
      "featureType": "water",
      "elementType": "all",
      "stylers": [{
          "hue": "#008285"
      }, {
          "saturation": 100
      }, {
          "lightness": -66
      }, {
          "visibility": "on"
      }]
  }, {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [{
          "hue": "#CAFCE4"
      }, {
          "saturation": 85
      }, {
          "lightness": 0
      }, {
          "visibility": "on"
      }]
  }, {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [{
          "hue": "#61C273"
      }, {
          "saturation": 2
      }, {
          "lightness": -27
      }, {
          "visibility": "on"
      }]
  }, {
      "featureType": "road",
      "elementType": "all",
      "stylers": [{
          "hue": "#B0C4C7"
      }, {
          "saturation": -83
      }, {
          "lightness": 26
      }, {
          "visibility": "on"
      }]
  }]

  function initMap() {
    var map = new google.maps.Map(document.getElementById('mapdisplay'), {
        zoom: 2,
        center: new google.maps.LatLng(0, 0)
    });

    map.setOptions({
        styles: styles
    });
  }
  

  return {
    initMap: initMap
  }
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
})
.factory('Location', function($http) {
  var getLocations = function () {
    return $http({
      method: 'GET',
      url: '/api/users'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addLocations = function (location) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: location
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getLocations: getLocations,
    addLocations: addLocations
  };    
})

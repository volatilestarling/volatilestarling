angular.module('where-to.services', [])
  .factory('MapService', function($http) {

    var styles = [{
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "visibility": "on"
        }]
    }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "color": "#84afa3"
        }, {
            "lightness": 52
        }]
    }, {
        "featureType": "all",
        "elementType": "all",
        "stylers": [{
            "saturation": -17
        }, {
            "gamma": 0.36
        }]
    }, {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
            "color": "#3f518c"
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
    return map;
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
      //or request to /signedin?
      //or set up root route on backend to handle this call?
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

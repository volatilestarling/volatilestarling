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
    }];

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
  };
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
  var getLocations = function (user) {
    return $http({
      method: 'GET',
      url: '/api/users',
      params: user
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addLocations = function (data) {
    return $http({
      method: 'POST',
      url: '/api/location',
      data: data
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
.factory('Detail', function($http) {
  var info;
  var attractions;
  var itinerary;

  var addToDo = function(todo) {
    return $http({
      method: 'POST',
      url: '/api/users',
      data: todo //location and todo
    })
    .then(function (resp) {
      return resp.data;
    });
  };
  

  //may not need this
  var getToDo = function(location) {
    return $http({
      method: 'GET',
      url: '/api/users',
      params: location
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var locationDetails = function(data) {
    return $http({
      method: 'GET',
      url: '/api/location',
      data: data //user, city, country
    })
    .then(function (resp) {
      info = resp.data.info;
      attractions = resp.data.attractions;
      return resp.data;
    });
  };

  return {
    addToDo: addToDo,
    getToDo: getToDo,
    locationDetails: locationDetails,
    info: info,
    attractions: attractions,
    itinerary: itinerary
  }
});

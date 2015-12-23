angular.module('whereTo.map', [])
//TODO: only able to pin first result, scope.location undefined
.controller('MapController', function($scope, $state, MapService, Location, Detail, $rootScope) {
  $scope.location = '';
  $scope.locations;
  $scope.tab = 1;

/*---------------- INITIALIZE MAP ---------------*/
  var map = MapService.initMap();
  var autocomplete = new google.maps.places.Autocomplete((document.getElementById('search')), {
        types: ["geocode"]
    });

  /*-------------- FETCH SAVED LOCATIONS -------------*/

  $scope.fetchMarkers = function() {
    console.log($rootScope.user);
    Location.getLocations($rootScope.user)
      .then(function(locations) {
        console.log('users locations:', locations)
        $scope.locations = locations;
        for(var place in locations) {
          $scope.pinMap(place);
        }
      });
  };

  $scope.fetchMarkers();
  console.log('locations', $scope.locations)

/*------------------- USER INPUT ------------------*/
  $scope.pinMap = function(location) {
    var result = autocomplete.getPlace();

    //location passed from call in fetchMarkers or user input
    if(!result) {
      location = location
    } else {
      location = result.name
    }

    $scope.location = location;

    //send to geocoder in mapservice
    var geocoder = new google.maps.Geocoder();

/*---------------- USER INPUT ---------------*/
    //reference to user places list

    $scope.tab = 1;
    $scope.showTab = function(num) {
      $scope.tab = num;
    }

    geocoder.geocode({
        address: $scope.location
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              animation: google.maps.Animation.DROP,
              icon: './assets/airplane.png'
          });

        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });

    //if it is a new location, add it to the user's list
    if(result !== undefined && result.name !== undefined) {
      var data = {
        place: location,
        username: $rootScope.user
      };
      //result is autocomplete object
      var components = result.address_components

      for(var i = 0; i < components.length; i++) {
       for(var j = 0; j < components[i].types.length; j++) {
         if(components[i].types[j] === 'country') {
           data.country = components[i].long_name;
         } else if(components[i].types[j] === 'locality') {
           data.city = components[i].long_name;
         }
       }
      }

      Location.addLocations(data);
      Location.addUserLocation(data);
      
    }
//TODO: Clear input field after submit
    $scope.location = '';
  };

  $scope.getLocData = function(loc) {
    //TODO: handle city vs country
    console.log('clicked', loc)
    //need to pass user, city, country as query string to GET request
    Detail.locationDetails({user: $rootScope.user, country: loc});
  }

});

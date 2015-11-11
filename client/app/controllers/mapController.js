angular.module('whereTo.map', [])

.controller('MapController', function($scope, $state, $stateParams) {
    var fbRef = new Firebase("URL HERE");

    //check if user is authorized, if not redirect to login
    var authData = fbRef.getAuth();

    $scope.fetchMarkers = function() {
      fbRef.child('users').child(authData.uid).once('value', function(snapshot) {
          var places = snapshot.val().whereToList;
          console.log(places)

          for (var key in places) {
              console.log(places[key])
              $scope.pinMap(places[key]);
          }

          setTimeout(function() {
              for (var i = 0; i < leftOut.length; i++) {
                  $scope.pinMap(leftOut[i]);
              }
          }, 30000)

      }, function(errorObject) {
          console.log("The read failed: " + errorObject.code);
      });
    }


    //******************************************************//
    //**************** MAP ******************//   
    //******************************************************// 

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

    var map = new google.maps.Map(document.getElementById('mapdisplay'), {
        zoom: 2,
        center: new google.maps.LatLng(0, 0)
    });

    map.setOptions({
        styles: styles
    });
    //******************************************************//
    //******************************************************//   
    //******************************************************//    

    var leftOut = [];
    $scope.pinMap = function(location) {
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
          address: location
      }, function(results, status) {
          console.log('here', location, status, google.maps.GeocoderStatus.OK)
          if (status == google.maps.GeocoderStatus.OK) {

              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: './assets/airplane.png'
              });
          } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
              leftOut.push(location);
              console.log(leftOut)
          }
      });
    }

    if (authData === null) {
        $state.go('login')
    } else {
        $scope.fetchMarkers();
    }

    $scope.location;

    $scope.findLoc = function() {
      $scope.location = $scope.map.location
          //send to geocoder in mapservice
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
          address: $scope.location
      }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: './assets/airplane.png'
              });
              //function to insert coordinates into database
              fbRef.child('users').child(authData.uid).child('whereToList').push($scope.location)

          } else {
              alert("Geocode was not successful for the following reason: " + status);
          }
      })
      $scope.map.location = ''
    }

});
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

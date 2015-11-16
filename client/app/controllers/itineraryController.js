angular.module('whereTo.itinerary', [])
.controller('ItineraryController', ['$scope', '$state', 'Itinerary', function($scope, $state, Itinerary) {
  
  $scope.events;

  $scope.addEvent = function (data) {
    Itinerary.addToDo(data);
      .then(function (events) {
        $scope.events = events;
      })
  }
}
angular.module('whereTo.itinerary', [])
.controller('ItineraryController', ['$scope', '$state', 'Detail', function($scope, $state, Detail) {
  
  $scope.events = [];
  $scope.event = '';

  $scope.addEvent = function (data) {
    $scope.events.push($scope.event)
    $scope.event = '';
    Detail.addToDo(data)
      .then(function (events) {
        $scope.events = events;
      })
  };
}]);
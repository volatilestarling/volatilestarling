angular.module('', [])
  .controller('AttractionsCtrl', ['$scope', 'Detail', function($scope, Detail) {
    
    $scope.attractionsList = Detail.attractions;

    //called when tab is clicked
    // $scope.getList = function() {
    //   Detail.locationDetails()
    //     .then(function(data) {
    //       $scope.attractionsList = data
    //     });
    // };

  }]);

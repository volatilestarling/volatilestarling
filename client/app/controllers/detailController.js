angular.module('where-to.detail', [])
  .controller('DetailController', ['$scope', 'Detail', function($scope, Detail) {
    
    $scope.attractionsList = Detail.attractions;


  }]);

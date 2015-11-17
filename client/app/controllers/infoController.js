angular.module('where-to.info', [])
  .controller('InfoController', ['$scope', 'Detail', function($scope, Detail) {
    
    $scope.info = Detail.info;

  }]);

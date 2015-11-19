angular.module('whereTo.auth', [])
.controller('AuthController', ['$scope', '$state', 'Auth', '$rootScope', '$window', function($scope, $state, Auth, $rootScope, $window) {

  $scope.user = {};
  $scope.signedIn = false;

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.whereto', token);
        $rootScope.user = $scope.user.username;
        $state.go('map');
      })
      .catch(function (error) {
        console.error(error);
      });
    $scope.signedIn = true;
    console.log($scope.signedIn)
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.whereto', token);
        $rootScope.user = $scope.user.username;
        $state.go('map');
        $scope.signedIn = true;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.logout = function () {
    Auth.signout();
    $rootScope.user = null;
     $scope.signedIn = false;
  };

}]);

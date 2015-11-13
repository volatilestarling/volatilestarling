angular.module('whereTo.auth', [])
.controller('AuthController', ['$scope', '$state', 'Auth', function($scope, $state, Auth) {

  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.whereto', token);
        $rootScope.user = $scope.user.email
        $state.go('map');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.whereto', token);
        $rootScope.user = $scope.user.email
        $state.go('map');
      })
      .catch(function (error) {
        console.error(error);
      });
  };  

  $scope.logout = function () {
    Auth.signout();
    $rootScope.user = null;
  }

}])
angular.module('whereTo.auth', ['firebase'])
.controller('AuthController', ['$scope', '$state', 'Auth', function($scope, $state, Auth) {

  //on authentication, redirect to map
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.whereto', token);
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
        $state.go('map');
      })
      .catch(function (error) {
        console.error(error);
      });
  };  

  //signout?

}])
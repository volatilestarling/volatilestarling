angular.module('whereto', ['whereTo.map', 'where-to.services', 'whereTo.auth', 'ui.router'])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/map');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/views/signup.html',
      controller: 'AuthController'
    })
    .state('map', {
      url: '/map',
      templateUrl: 'app/views/map.html',
      controller: 'MapController'
    });

    $httpProvider.interceptors.push('AttachTokens');

}])
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $state, $location, Auth) {
  $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
    if (toState.name !== 'signup' && toState.name !== 'login' && !Auth.isAuth()) {
      $location.path('/login');
    }
  });
});

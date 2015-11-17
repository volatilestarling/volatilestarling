angular.module('whereto', ['whereTo.map', 'where-to.services', 'whereTo.auth', 'where-to.attr', 'where-to.detail', 'whereTo.itinerary', 'where-to.info', 'ui.router'])

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
    })
    .state('detail', {
      url: '/detail',
      templateUrl: 'app/views/detail.html',
      controller: 'DetailController'
    })
    .state('detail.itinerary', {
      url: '/itinerary',
      templateUrl: 'app/views/detail.itinerary.html',
      controller: 'itineraryController'
    })
    .state('detail.info', {
      url: '/info',
      templateUrl: 'app/views/detail.info.html',
      controller: 'InfoController'
    })
    .state('detail.attractions', {
      url: '/attractions',
      templateUrl: 'app/views/detail.attractions.html',
      controller: 'AttractionsController'
    });


    $httpProvider.interceptors.push('AttachTokens');

}])
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.whereto');
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

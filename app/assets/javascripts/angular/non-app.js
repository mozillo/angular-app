var app = angular.module("app", [
  'templates',
  'ui.router',
  'oc.lazyLoad'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('');
  $stateProvider
    .state('index', {
      url: '',
      templateUrl: 'index/_index.html',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['assets/controllers/IndexCtrl.js']);
        }]
      }
    })
    ;
}]);

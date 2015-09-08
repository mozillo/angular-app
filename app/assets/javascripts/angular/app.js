var app = angular.module("app", [
  'templates',
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  'ngResource',
  'ngStorage',
  'oc.lazyLoad',
  'Devise'
]);

app.config(
  ['$controllerProvider', '$httpProvider' , '$compileProvider', '$filterProvider', '$provide',
  function ($controllerProvider,  $httpProvider, $compileProvider,   $filterProvider,   $provide) {

      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
      // lazy controller, directive and service
      app.controller = $controllerProvider.register;
      app.directive  = $compileProvider.directive;
      app.filter     = $filterProvider.register;
      app.factory    = $provide.factory;
      app.service    = $provide.service;
      app.constant   = $provide.constant;
      app.value      = $provide.value;
  }
]);

app.constant('JQ_CONFIG', {
    easyPieChart:   ['assets/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline:      ['assets/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot:           ['assets/jquery/charts/flot/jquery.flot.min.js',
                        'assets/jquery/charts/flot/jquery.flot.resize.js',
                        'assets/jquery/charts/flot/jquery.flot.tooltip.min.js',
                        'assets/jquery/charts/flot/jquery.flot.spline.js',
                        'assets/jquery/charts/flot/jquery.flot.orderBars.js',
                        'assets/jquery/charts/flot/jquery.flot.pie.min.js'],
    slimScroll:     ['assets/jquery/slimscroll/jquery.slimscroll.min.js'],
    sortable:       ['assets/jquery/sortable/jquery.sortable.js'],
    nestable:       ['assets/jquery/nestable/jquery.nestable.js',
                        'assets/jquery/nestable/nestable.css'],
    filestyle:      ['assets/jquery/file/bootstrap-filestyle.min.js'],
    slider:         ['assets/jquery/slider/bootstrap-slider.js',
                        'assets/jquery/slider/slider.css'],
    chosen:         ['assets/jquery/chosen/chosen.jquery.min.js',
                        'assets/jquery/chosen/chosen.css'],
    TouchSpin:      ['assets/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                        'assets/jquery/spinner/jquery.bootstrap-touchspin.css'],
    wysiwyg:        ['assets/jquery/wysiwyg/bootstrap-wysiwyg.js',
                        'assets/jquery/wysiwyg/jquery.hotkeys.js'],
    dataTable:      ['assets/jquery/datatables/jquery.dataTables.min.js',
                        'assets/jquery/datatables/dataTables.bootstrap.js',
                        'assets/jquery/datatables/dataTables.bootstrap.css'],
    vectorMap:      ['assets/jquery/jvectormap/jquery-jvectormap.min.js',
                        'assets/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                        'assets/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                        'assets/jquery/jvectormap/jquery-jvectormap.css'],
    footable:       ['assets/jquery/footable/footable.all.min.js',
                        'assets/jquery/footable/footable.core.css']
    }
);

app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'datepickerConfig', 'datepickerPopupConfig',
function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, datepickerConfig, datepickerPopupConfig){

  datepickerPopupConfig.currentText = "今天";
  datepickerPopupConfig.clearText = "清空";
  datepickerPopupConfig.closeText = "关闭";

  $ocLazyLoadProvider.config({
      debug:  true,
      events: true,
      modules: [
      ]
  });

  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/auth', '/auth/login');

  $stateProvider
        .state('auth', {
          url: '/auth',
          templateUrl: 'app/_auth.html'
        })
        .state('auth.login', {
            url: '/login',
            templateUrl: 'app/_auth_login.html',
            resolve: {
              deps: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load([
                  '/assets/controllers/LoginCtrl.js'
                ]);
              }]
            }
        })
        .state('auth.register', {
            url: '/register',
            templateUrl: 'app/_auth_register.html',
            resolve: {
              deps: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load([
                  '/assets/controllers/RegisterCtrl.js'
                ]);
              }]
            }
        })
        .state('activity', {
            url: '/activity',
            templateUrl: 'app/_activity.html'
        })
        .state('activity.create', {
            url: '/create',
            templateUrl: 'app/_activity_create.html',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load([
                            '/assets/controllers/ActivityCreateCtrl.js',
                            '/assets/factories/activity.js'
                        ]);
                    }
                ]
            }
        })
        .state('app', {
          url: '',
          templateUrl: 'app/_app.html',
        })
        .state('app.home', {
          url: '/home',
          templateUrl: 'app/_app_home.html',
          resolve: {
            deps: ['$ocLazyLoad',
              function( $ocLazyLoad ){
                return $ocLazyLoad.load([
                  '/assets/controllers/HomeCtrl.js'
                ])
                ;
            }]
          }
        })
    ;
}]);

app.controller('AppCtrl', ['$scope', '$localStorage', '$window', 'Auth', '$state', 'RailsUser',
  function( $scope,   $localStorage, $window, Auth, $state, RailsUser) {

        Auth.currentUser().then(function(user){
          RailsUser.user = user;
        }, function(error){
          $state.go('auth');
        });

        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

        // config
        $scope.app = {
          name: '婚格商家',
          version: '1.3.3',
          // for chart colors
          color: {
            primary: '#7266ba',
            info:    '#23b7e5',
            success: '#27c24c',
            warning: '#fad733',
            danger:  '#f05050',
            light:   '#e8eff0',
            dark:    '#3a3f51',
            black:   '#1c2b36'
          },
          settings: {
            themeID: 8,
            navbarHeaderColor: 'bg-info dker',
            navbarCollapseColor: 'bg-info dker',
            asideColor: 'bg-light dker b-r',
            headerFixed: true,
            asideFixed: true,
            asideFolded: false,
            asideDock: false,
            container: false
          }
        };

        // if ( angular.isDefined($localStorage.settings) ) {
        //   $scope.app.settings = $localStorage.settings;
        // } else {
        //   $localStorage.settings = $scope.app.settings;
        // }
        // $scope.$watch('app.settings', function(){
        //   if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
        //     $scope.app.settings.headerFixed = true;
        //   }
        //
        //   $localStorage.settings = $scope.app.settings;
        // }, true);


        function isSmartDevice( $window )
        {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

}]);

;

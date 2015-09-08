angular.module('app')
   .controller('LoginCtrl' , ['$scope', 'Auth', '$state', '$http', function($scope, Auth, $state, $http){

        Auth.currentUser().then(function(user) {
         if(user) {
           $state.go('app.home');
         }
        }, function(error) {

        });

        $scope.login = function() {
            var credentials = $scope.user;
            var config = {
               headers: {
                   'X-HTTP-Method-Override': 'POST'
               }
            };

            Auth.login(credentials, config).then(function(user) {
              $state.go('app.home');
            }, function(error) {

            });
        };
   }]);

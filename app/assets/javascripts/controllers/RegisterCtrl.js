angular
.module('app')
.controller('RegisterCtrl', ['$scope', 'Auth', '$state', function($scope, Auth, $state){

    $scope.signUp = function() {
        $scope.user.password_confirmation = $scope.user.password;
        var credentials = $scope.user;
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };
        Auth.register(credentials, config).then(function(registeredUser) {
            $state.go('app.home');
        }, function(error) {
            $scope.auth_errors = error.data;
        });
        $scope.$on('devise:new-registration', function(event, user) {

        });
    };


}]);

var app = angular.module('app')
.controller('HomeCtrl', ['$scope', 'Auth', '$state', 'RailsUser', function($scope, Auth, $state, RailsUser){

  $scope.user = RailsUser.user;
}]);

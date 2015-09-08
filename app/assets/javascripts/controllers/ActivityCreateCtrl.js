angular
.module('app')
.controller('ActivityCreateCtrl', ['$scope', 'RailsUser', 'Activity', function($scope, RailsUser, Activity){

    $scope.at = new Activity();
    var activities = Activity.query(function(){ console.log(activities);});
    $scope.today = function() {$scope.dt = new Date();};
    $scope.today();
    $scope.clear = function () {$scope.dt = null;};
    $scope.disabled = function(date, mode) {return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );};
    $scope.toggleMin = function() {$scope.minDate = $scope.minDate ? null : new Date();};
    $scope.toggleMin();
    $scope.open = function($event, type) {
      $event.preventDefault();
      $event.stopPropagation();
      if(type == 'start') $scope.start_opened = $scope.start_opened ? false : true;
      else if(type == 'end') $scope.end_opened = $scope.end_opened ? false : true;
    };
    $scope.dateOptions = {formatYear: 'yy',startingDay: 1,class: 'datepicker'};
    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'yyyy.MM.dddd', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.save = function() {
      $scope.at.$save(function(){});
    };

}]);

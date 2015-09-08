angular.module('app')
   .factory('Activity', function($resource) {
      return $resource('/api/activities/:id');
   });

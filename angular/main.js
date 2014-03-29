angular.module('ShortlyApp', [])
.controller('MainController', function($scope, $http){
  $scope.person = {
    name: 'test'
  };

  $scope.getLinks = function () {
    var promise = $http({
      method: 'GET',
      url: 'http://127.0.0.1:4568/links',
    });
    promise.then(function(data){
      console.log('inside getLinks promise: ', data);
      $scope.links = data.data;
    }); 
  };
  $scope.getLinks();
});
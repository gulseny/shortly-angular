angular.module('ShortlyApp', ['ngRoute'])

// configuring for routing
.config(['$routeProvider', function($routeProvider) {
  console.log('inside configuration');
  $routeProvider
    .when('/create', {
      templateUrl: 'angular/createLink.html',
      controller: 'ShortenController'
    })
    .otherwise({
      template: '<h3>otherwise</h3>',
      controller: 'ShortenController'
    });
}])

// main controller for getting links
.controller('MainController', function($scope, $http){
  $scope.person = {
    name: 'test'
  };

  $scope.getLinks = function () {
    var promise = $http({
      method: 'GET',
      url: '/links',
    });
    promise.then(function(data){
      console.log('inside getLinks promise: ', data);
      $scope.links = data.data;
    }); 
  };
  // $scope.getLinks();
})

// controller for shortening and posting links
.controller('ShortenController', function($scope, $http, $routeParams) {
  $scope.shortenLink = function () {
    var promise = $http({
      method: 'POST',
      url: '/links',
      // wrap in obj? {url: urlLink}
      data: JSON.stringify({url: $scope.urlLink})
    });
    promise.then(function(link){
      console.log('inside shorten promise: ', link);
      // $scope.links = link.data;
    }); 
  };
});

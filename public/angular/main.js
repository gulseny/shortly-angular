angular.module('ShortlyApp', ['ngRoute'])

// configuring for routing
.config(['$routeProvider', function($routeProvider) {
  console.log('inside configuration');
  $routeProvider
    .when('/create', {
      templateUrl: 'angular/createLink.html',
      controller: 'ShortenController'
    })
    .when('/', {
      templateUrl: 'angular/allLinks.html',
      controller: 'MainController'
    })
    .otherwise({
      redirectTo: '/'
    });
}])

// main controller for getting links
.controller('MainController', function($scope, $http){
  console.log('is mainController executed?');
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
  $scope.getLinks();
})

// controller for shortening and posting links
.controller('ShortenController', function($scope, $http) {
  console.log('is shortenController executed?');
  $scope.validUrl = true;

  var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

  var isValidUrl = function(url) {
    return url.match(rValidUrl);
  };

  $scope.shortenLink = function () {
    if (isValidUrl($scope.urlLink)) {
      $scope.validUrl = true;
      var promise = $http({
        method: 'POST',
        url: '/links',
        // wrap in obj? {url: urlLink}
        data: JSON.stringify({url: $scope.urlLink})
      });
      promise.then(function(link){
        console.log('inside shorten promise: ', link);
        $scope.newLink = link.data;
      });

    } else {
      $scope.validUrl = false;
    } 
  };
});

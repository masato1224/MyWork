angular.module('App', ['ngRoute', 'LocationBar'])
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('../html/index.html', {
      templateUrl: '../html/index-tmpl'
    })
    .when('/new', {
      templateUrl: 'new-tmpl'
    })
    .when('/sheet/:id', {
      templateUrl: 'sheet-tmpl'
    })
    .otherwise({
      redirectTo: ''
    });
}]);

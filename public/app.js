angular.module('myApp',['ngRoute']);
angular.module('myApp').run(function ($rootScope, $http, authService) {
    authService.loggedin();
});
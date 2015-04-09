
angular.module('myApp').run(function($rootScope,$http,authService) {
    authService.loggedin();
});


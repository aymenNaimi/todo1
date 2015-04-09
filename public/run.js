
angular.module('myApp').run(function($rootScope,$http,logoutService) {
    logoutService.loggedin();
});


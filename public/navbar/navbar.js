angular.module('myApp').controller('myCtrl3', function ($scope, $http, $location, authService) {
    var self = this;
    self.logout = function () {
        authService.logout();
    }
});

angular.module('myApp').controller('myCtrl3', function ($scope, $http, $location,logoutService) {

  var self =this ;

    self.logout =function()
    {

        logoutService.logout();

    }



});
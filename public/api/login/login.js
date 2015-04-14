angular.module('myApp').controller('myCtrl2', function ($scope, $http, $location,$rootScope) {
    var self = this;
    self.connect = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/users/login',
            headers: {
                'Content-Type': 'application/json'
            }, data: {username: self.username, password: self.password}
        }).success(function (data, status) {
            $rootScope.connected=  true;
            $location.path('/todos');
        });
    }

});
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    $scope.connect = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'Content-Type': 'application/json'
            }, data: {username: $scope.username, password: $scope.password}
        }).success(function (data, status) {
            console.log("status :" + status);
            console.log("data  :" + JSON.stringify(data));
        });
    }
});
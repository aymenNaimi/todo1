angular.module('myApp').run(function($rootScope,$http,$location) {
    $rootScope.logout = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/users/logout',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status) {
            if (status === 200) {
                console.log(" logout success ");
                self.todos = [];
                $rootScope.connected= false;
            }
        });
    };
    $http.get('/todos/loggedin')
        .success(function (user) {
            if (user !== '0') { //self.username=user.username;
                $rootScope.connected = true;
            }
            else {
                $rootScope.connected = false;
            }
        });
});
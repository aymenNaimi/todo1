angular.module('myApp').factory('authService', function ($http, $location, $rootScope, $q) {
    return {
        logout: function () {
            $http({
                method: 'GET',
                url: 'http://localhost:3000/users/logout',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(function (data, status) {
                if (status === 200) {
                    $rootScope.connected = false;
                    $location.path('/login');
                    console.log(" logout success ");
                }
            }).error(function (data, status) {
                console.log('error in function logout function');
            });
        },
        checkLoggedin: function () {
            var deferred = $q.defer();
            try {
                $http.get('/todos/loggedin')
                    .success(function (user) {
                        // Authenticated
                        if (user !== '0') { //self.username=user.username;
                            $rootScope.connected = true;
                            deferred.resolve(user);
                        }
                        else {
                            $rootScope.connected = false;
                            deferred.reject();
                            $location.path('/login');
                        }
                    }).error(function (data, status) {
                        deferred.reject();
                    });
                return deferred.promise;
            }
            catch (ex) {
                deferred.reject();
                return deferred.promise;
            }
        },
        loggedin: function () {
            $http.get('/todos/loggedin')
                .success(function (user) {
                    if (user !== '0') { //self.username=user.username;
                        $rootScope.connected = true;
                    }
                    else {
                        $rootScope.connected = false;
                    }
                });
        }

    }
});
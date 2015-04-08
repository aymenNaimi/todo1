var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
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
};


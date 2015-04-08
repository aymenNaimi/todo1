var checkLoggedin= function ($q, $timeout, $http, $location) {
    // Initialize a new promise
    var deferred = $q.defer();
    // Make an AJAX call to check if the user is logged in
    $http.get('/todos/loggedin').success(function (user) {
        // Authenticated
        if (user !== '0') { //self.username=user.username;
            // self.iduser=user._id ;
            deferred.resolve(user);
        }
        // Not Authenticated
        else {
            deferred.reject();
            $location.path('/login');
        }
    });
    return deferred.promise;
};


/*
angular.module('myApp').factory('logoutService', function($http) {

    function logoutFunction() {


        $http({
            method: 'GET',
            url: 'http://localhost:3000/users/logout',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status) {
            if (status === 200) {
                console.log(" logout success ");
             //   self.todos = [];
              //  $rootScope.connected= false;
                return data;
            }
        }).error(function(data,status){
            console.log('error in function logout function');

        }) ;


        return '';

    }
});
*/

// Create the 'Authentication' service/*
/*
angular.module('myApp').factory('logoutService', [
    function($http) {


        $http({
            method: 'GET',
            url: 'http://localhost:3000/users/logout',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status) {
            if (status === 200) {
                console.log(" logout success ");
           //     self.todos = [];
               // $rootScope.connected= false;
            }
            return  status ;
        }).error(function(data,status){
            console.log('error in function logout function');
            return  status ;
        }) ;

    }
]);
/*

 */
angular.module('myApp').factory('logoutService',   function($http,$location,$rootScope,$q) {




        /*
        $http({
            method: 'GET',
            url: 'http://localhost:3000/users/logout',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status) {
            if (status === 200) {
                console.log(" logout success ");
                //     self.todos = [];
                // $rootScope.connected= false;
            }
        }).error(function(data,status){
            console.log('error in function logout function');

        }) ;
*/
  //  console.log(' log in services logoutservice');

   // console.log(' log in services logoutservice');
    return { logout : function() {console.log ('hello aymen');
        $http({
            method: 'GET',
            url: 'http://localhost:3000/users/logout',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status) {
            if (status === 200) {
                console.log(" logout success ");
                //     self.todos = [];
                // $rootScope.connected= false;
            }
        }).error(function(data,status){
            console.log('error in function logout function');

        }) ;
$rootScope.connected= false ;
$location.path('/login');
        console.log ('hello aymen aymen');

    },
        checkLoggedin : function(){


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

        }
        , loggedin : function(){
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
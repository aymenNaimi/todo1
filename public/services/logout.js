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
angular.module('myApp').factory('logoutService',   function($http,$location,$rootScope) {




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
    return function() {console.log ('hello aymen');
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

    }
}


);
angular.module('myApp').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'api/login/login.html',
                controller: 'myCtrl2',
                controllerAs: 'mycl'
            }).
            when('/todos', {
                templateUrl: 'api/todos/todos.html',
                controller: 'myCtrl',
                controllerAs: 'mycl',
                resolve: {
                    loggedin: function (authService) {
                        return authService.checkLoggedin();
                    }
                }
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);
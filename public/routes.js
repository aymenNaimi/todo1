app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: '/login/login.html',
                controller: 'myCtrl2',
                controllerAs: 'mycl'
            }).
            when('/todos', {
                templateUrl: '/todos/todos.html',
                controller: 'myCtrl',
                controllerAs: 'mycl',
                resolve: { loggedin: checkLoggedin }
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);
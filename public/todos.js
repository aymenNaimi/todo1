var app = angular.module('myApp',
    ['ngRoute']);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: '/login.html',
                controller: 'myCtrl2',
                controllerAs: 'mycl'
            }).
            when('/todos', {
                templateUrl: '/todos.html',
                controller: 'myCtrl',
                controllerAs: 'mycl',
                resolve: { loggedin: checkLoggedin }
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);
var checkLoggedin = function ($q, $timeout, $http, $location) {
    // Initialize a new promise
    var deferred = $q.defer();
    // Make an AJAX call to check if the user is logged in
    $http.get('/loggedin').success(function (user) {
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
app.controller('myCtrl', function ($scope, $http, $location, loggedin) {
    var self = this;
    self.mode = '';
    self.user = loggedin;
    self.firstName = "John";
    $http({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (data, status) {
        self.todos = data;
    }).error(function (data, status) {
    });
    self.add = function () {
        return $http({
            method: 'POST',
            url: 'http://localhost:3000/todos',
            headers: {
                'Content-Type': 'application/json'
            }, data: {title: self.titleup, description: self.descriptionup}
        }).success(function (data, status) {
            self.todos.push(data);
        });
    }
    self.delete = function (id) {
        if (confirm('do you what to delete this from todo from database?')) {
            // Save it!

        $http({
            method: 'DELETE',
            url: 'http://localhost:3000/todos/' + id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status) {
            if (status === 200) {
                var jj = 0;
                while (self.todos[jj]) {
               var     notdeleted=true;
                    if (self.todos[jj]._id == id && notdeleted) {
                        self.todos.splice(jj, 1);
                        notdeleted=false;
                    }
                    jj = jj + 1;
                }
            }
        });

        }
    }
    self.done = function (id, p) {
        var x = !(p.done);
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/todos/' + id,
            headers: {
                'Content-Type': 'application/json'
            }, data: {done: x}
        }).success(function (data, status) {
            console.log("status :" + status);
            if (status === 200) {
                p.done = x;
            }
        });
    }
    self.clear = function () {
        self.idup = "";
        self.titleup = "";
        self.descriptionup = "";
        self.doneup = "";
    };
    self.update2 = function () {
        return $http({
            method: 'PUT',
            url: 'http://localhost:3000/todos/' + self.idup,
            headers: {
                'Content-Type': 'application/json'
            }, data: { title: self.titleup, description: self.descriptionup, done: self.doneup}
        }).success(function (data, status) {
            var jj = 0;
            if (status === 200) {
                var notmodfied = true ;
                while (self.todos[jj] && notmodfied) {
                    if (self.todos[jj]._id == self.idup) {
                        self.todos[jj].title = self.titleup;
                        self.todos[jj].description = self.descriptionup;
                        self.todos[jj].done = self.doneup;
                        notmodfied=false ;

                    }
                    jj = jj + 1;
                }
            }
        });

    };
    self.logout = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/logout',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status) {
            if (status === 200) {
                console.log(" logout success ");
                self.todos = [];
            }
            $location.path('/login');
        });
    };
    self.connect = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'Content-Type': 'application/json'
            }, data: {username: self.username, password: self.password}
        }).success(function (data, status) {
            console.log("data  :" + JSON.stringify(data)+"status :" + status);
        });
    }
    self.setmode = function (mode, p) {
        self.clear();
        self.mode = mode;
        self.title_window=mode+" todo";
        if (mode == 'update') {
                self.idup = p._id;
            self.titleup = p.title;
            self.descriptionup = p.description;
            self.doneup = p.done;

        }
    }
    self.save = function () {

        if (self.mode == 'add') {
            self.add().success(function () {
                self.setmode('', '');
            });
        }
        if (self.mode == 'update') {
            self.update2().success(function () {
                self.setmode('', '');
            });
        }

    }
    })
app.controller('myCtrl2', function ($scope, $http, $location) {
    var self = this;
    self.connect = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'Content-Type': 'application/json'
            }, data: {username: self.username, password: self.password}
        }).success(function (data, status) {
            $location.path('/todos');
        });
    }
})
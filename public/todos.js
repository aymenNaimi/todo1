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
/*
$(".idnavhome").on("click", function(){
    // $(".nav").find(".active").removeClass("active");
    $(this).addClass("active");
});
*/

app.run(function($rootScope,$http) {
    $rootScope.logout = function () {
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
    // you can inject any instance here
});
app.controller('myCtrl', function ($scope, $http, $location, loggedin) {
    var self = this;
    self.mode = '';
    self.user = loggedin;
    $('#id_alert').hide();





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
        console.log("log in http get in controller in block error " + "status = " + status + "data =" + JSON.stringify(data));
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
        }).error(function (data, status) {
            if (status === 400) {

                console.log("log in function add in block error " + "status = " + status + "data =" + JSON.stringify(data));
                if (data.errors.description) {
                    self.errdescription = data.errors.description.message;
                }
                if (data.errors.title) {
                    self.errtitle = data.errors.title.message;
                }
                //        alert(((data.errors.title)? (data.errors.title.message): '')+' , '+((data.errors.description)? (data.errors.description.message): ''));
            }
            else {
                alert('error in server');
            }
        });


    }
    self.delete = function (id) {


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
                        var notdeleted = true;
                        if (self.todos[jj]._id == id && notdeleted) {
                            self.todos.splice(jj, 1);
                            notdeleted = false;
                        }
                        jj = jj + 1;
                    }
                }
                $('#id_alert').hide();
                self.idup="" ;
                self.titleup="" ;


            }).error(function (data, status) {
                console.log("log in function delete in block error " + "status = " + status + "data =" + JSON.stringify(data));
            });


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
        }).error(function (data, status) {
            console.log("log in function done in block error " + "status = " + status + "data =" + JSON.stringify(data));
        });
    }
    self.clear = function () {
        self.idup = "";
        self.titleup = "";
        self.descriptionup = "";
        self.doneup = "";
        self.errtitle = "";
        self.errdescription = "";


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
                var notmodfied = true;
                while (self.todos[jj] && notmodfied) {
                    if (self.todos[jj]._id == self.idup) {
                        self.todos[jj].title = self.titleup;
                        self.todos[jj].description = self.descriptionup;
                        self.todos[jj].done = self.doneup;
                        notmodfied = false;

                    }
                    jj = jj + 1;
                }
            }
        }).error(function (data, status) {
            if (status === 400) {

                console.log("log in function update in block error " + "status = " + status + "data =" + JSON.stringify(data));
                if (data.errors.description) {
                    self.errdescription = data.errors.description.message;
                }
                if (data.errors.title) {
                    self.errtitle = data.errors.title.message;
                }
                //   alert(((data.errors.title)? (data.errors.title.message): '')+' , '+((data.errors.description)? (data.errors.description.message): ''));
            }
            else {
                alert('error in server');
            }
        });

    };
    /*
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
    */
    self.connect = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/login',
            headers: {
                'Content-Type': 'application/json'
            }, data: {username: self.username, password: self.password}
        }).success(function (data, status) {
            console.log("data  :" + JSON.stringify(data) + "status :" + status);
        });
    };

    self.ready_delete = function(id,title) {
        self.idup=id ;
        self.titleup=title ;
         $('#id_alert').show();

    }


    self.hide_alert = function(){
        $('#id_alert').hide();
        self.idup="" ;
        self.titleup=" ;"
    }

    self.setmode = function (mode, p) {
        self.clear();
        self.mode = mode;
        self.title_window = mode + " todo";
        if (mode == 'Update') {
            self.idup = p._id;
            self.titleup = p.title;
            self.descriptionup = p.description;
            self.doneup = p.done;

        }
    };
    self.save = function (form) {
        if (form.$valid) {
            var save = self.mode == 'Add' ? self.add : self.update2;
            save().success(function () {
                self.setmode('', '');
            });
        }
    }
});
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
    /*
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
    */
})





angular.module('myApp').controller('myCtrl', function ($scope, $http, $location, loggedin) {
    var self = this;
    self.mode = '';
    self.user = loggedin;
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
            }
            else {
                alert('error in server');
            }
        });
    }
    self.delete = function (id) {
       if (confirm('do you want to delete this todo'))
        {
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
        }).error(function (data, status) {
            console.log("log in function delete in block error " + "status = " + status + "data =" + JSON.stringify(data));
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
            }
            else {
                alert('error in server');
            }
        });
    };
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
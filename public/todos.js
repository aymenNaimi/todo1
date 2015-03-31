var app = angular.module('myApp',
    []);
app.controller('myCtrl', function ($scope, $http) {
   var self=this ;
    self.firstName = "John";
    console.log('hh1');
    $http({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (data, status) {
        self.todos = data;
        var ii = 0;
        while (data[ii]) {
            console.log("data ii :" + ii + JSON.stringify(data[ii]));
            ii = ii + 1;
        }
    });
    self.add = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/todos',
            headers: {
                'Content-Type': 'application/json'
            }, data: {title: self.title, description: self.description}
        }).success(function (data, status) {
            console.log("status :" + status);
            self.todos.push(data);
            console.log("****todos****" + JSON.stringify(self.todos));
            console.log("data  :" + JSON.stringify(data));
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
            console.log("status :" + status);
            if (status === 200) {
                console.log("delete succes and status =" + status);
                var jj = 0;
                while (self.todos[jj]) {
                    if (self.todos[jj]._id == id) {
                        self.todos.splice(jj, 1);
                    }
                    jj = jj + 1;
                }
            }
            else {
                console.log("delete failed and status =" + status);
            }
        });
        console.log("log in function delete and id = " + id);
    }
    self.done = function (id, p) {
        p.done = !(p.done);
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/todos/' + id,
            headers: {
                'Content-Type': 'application/json'
            }, data: {done: p.done}
        }).success(function (data, status) {
            console.log("status :" + status);
            if (status === 200) {

                console.log("done succes and status =" + status + 'data = ' + JSON.stringify(data));
            }
            else {
                console.log("done failed and status =" + status + 'data = ' + JSON.stringify(data));
            }
        });
        console.log("log in function done and id = " + id);
    }
    self.update1 = function (p) {
        self.idup = p._id;
        self.titleup = p.title;
        self.descriptionup = p.description;
        self.doneup = p.done;
    }
    self.clear = function () {
        self.idup = "";
        self.titleup = "";
        self.descriptionup = "";
        self.doneup = "";
    }
    self.update2 = function (id) {
        $http({
            method: 'PUT',
            url: 'http://localhost:3000/todos/' + self.idup,
            headers: {
                'Content-Type': 'application/json'
            }, data: { title: self.titleup, description:self.descriptionup, done: self.doneup}
        }).success(function (data, status) {
            console.log("succes in update2 function" + "  data =" + JSON.stringify(data));
            var jj = 0;
            console.log(" log in update 2");
            while (self.todos[jj]) {
                console.log(" log in update 2 in while loop");

                if (self.todos[jj]._id == self.idup) {
                    console.log(" log in update 2 in if- block");
                    console.log("self.todos[jj].title  = "+self.todos[jj].title);

                    console.log("title = " + self.titleup);
                    self.todos[jj].title = self.titleup;
                    console.log("self..todos[jj].title  = "+self.todos[jj].title);

                    console.log("title = " + self.titleup);
                    self.todos[jj].description =self.descriptionup;
                    self.todos[jj].done = self.doneup;
                }
                jj = jj + 1;
            }
        });
        console.log("id = " + self.idup);
        console.log("title = " + self.titleup);
        console.log("description = " + self.descriptionup);
        console.log("done = " + self.doneup);
    }

})
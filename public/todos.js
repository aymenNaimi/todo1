//var app = angular.module('myApp', []);

var app = angular.module('myApp',
    []);
app.controller('myCtrl', function ($scope, $http) {
    $scope.firstName = "John";
    console.log('hh1');
    $http({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            'Content-Type': 'application/json'
        }
    }).success(function (data, status) {

        $scope.todos = data;
        var ii = 0;
        while (data[ii]) {
            /*
             var t = document.createElement("p");
             t.innerHTML = "title " + ii + "  : " + data[ii].title + " description " + " : " + data[ii].description + " done : " + data[ii].done;
             var btn = document.createElement("button");
             var nodtext = document.createTextNode("delete this todo");
             btn.appendChild(nodtext);
             //    btn.setAttribute("id", data[ii].title);
             //   btn.className= data[ii].title ;
             //    document.getElementsByClassName(data[ii].title);
             console.log("btn id :"+btn.id);
             console.log("btn className :"+btn.className);
             var div = document.createElement("div");
             div.appendChild(t);
             div.appendChild(btn);
             div.setAttribute("id", data[ii].title);
             document.getElementsByTagName('body')[0].appendChild(div);
             //   document.getElementById(data[ii].title).style.visibility = 'hidden';
             */
            console.log("data ii :" + ii + JSON.stringify(data[ii]));
            ii = ii + 1;
        }
        //    document.getElementById("go to the house").style.visibility = 'hidden';
    });
    $scope.add = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/todos',
            headers: {
                'Content-Type': 'application/json'
            }, data: {title: $scope.title, description: $scope.description}
        }).success(function (data, status) {
            console.log("status :" + status);
            $scope.todos.push(data);


            console.log("****todos****" + JSON.stringify($scope.todos));


            /*
             if (status === 201) {

             var t = document.createElement("p");
             t.innerHTML = "title " + "ii " + "  : " + data.title + " description " + " : " + data.description + " done : " + data.done;
             document.getElementsByTagName('body')[0].appendChild(t);
             }
             */
            console.log("data  :" + JSON.stringify(data));
        });
    }
    $scope.delete = function (id) {


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
                while ($scope.todos[jj]) {
                    if ($scope.todos[jj]._id == id) {
                        $scope.todos.splice(jj, 1);
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
    $scope.done = function (id, p) {
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

    $scope.update1 = function (p) {
        $scope.idup = p._id;
        $scope.titleup = p.title;
        $scope.descriptionup = p.description;
        $scope.doneup = p.done;
    }

    $scope.clear = function () {
        $scope.idup = "";
        $scope.titleup = "";
        $scope.descriptionup = "";
        $scope.doneup = "";


    }

    $scope.update2 = function (id) {

        $http({
            method: 'PUT',
            url: 'http://localhost:3000/todos/'+$scope.idup,
            headers: {
                'Content-Type': 'application/json'
            }, data: { title: $scope.titleup , description: $scope.descriptionup , done:$scope.doneup}
        }).success(function (data, status) {


            console.log("succes in update2 function" + "  data =" +JSON.stringify(data) );
            /*
            p.tilte = $scope.title ;
            p.description = $scope.description;
            p.done = $scope.done ;
*/
            var jj = 0;
            while ($scope.todos[jj]) {
                if ($scope.todos[jj]._id == id) {
                    $scope.todos[jj].title=$scope.title;
                    $scope.todos[jj].description=$scope.description;
                    $scope.todos[jj].doneup=$scope.doneup;
                }

                jj = jj + 1;

            }




        }) ;


     //   console.log("id = "+id);
        console.log("id = "+$scope.idup);
     //   console.log("title = "+title);
        console.log("title = "+$scope.titleup);
    //    console.log("description = "+description);
        console.log("description = "+$scope.descriptionup);
     //   console.log("done = "+done);
        console.log("done = "+$scope.doneup);
    }













})
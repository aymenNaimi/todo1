describe('PasswordController', function () {
    beforeEach(module('myApp'));
    var $controller , $httpBackend, $rootScope, createController;
    beforeEach(inject(function ($injector) {
        jasmine.addMatchers({
            toEqualData: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });


        var $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');

        // var  $service =$injector.get('$service');

        // The injector unwraps the underscores (_) from around the parameter names when matching
        createController = function () {
            return $controller('myCtrl', {'$scope': $rootScope, loggedin: {username: 'aymen', password: 'allmas', _id: '5527d02e1d0a2ee9d14f5307' } });
        };
        /*
         createService = function() {
         return $service('authService', {'$scope' : $rootScope });
         };
         */

    }));
    describe('add todo test', function () {
        it(' adding todo', function () {

            var todo = {title: 'alooo', description: 'helo', done: false};
            //controller.titleup ='ayyyymen';
            //controller.descriptionup ='allmas';
            var todos = [todo];
            $httpBackend.expectGET('/todos/loggedin').respond(200);

            $httpBackend.expectGET('http://localhost:3000/todos/').respond(200, todos);
//var data = {  title : controller.titleup , description :controller.descriptionup , done : false } ;
            //    var todosend = {  title : controller.titleup , description :controller.descriptionup  };

            // controller.todos.push(data);
            //$httpBackend.expectPOST('http://localhost:3000/todos/',todosend).respond(200);
            //controller.add();


            //expect(controller.todos).toBe([]) ;
            var controller = createController();
            $httpBackend.flush();
            expect(controller.todos).toEqualData(todos);

            //  expect(todos[0].description).toBe(controller.description) ;
        });
    });
});


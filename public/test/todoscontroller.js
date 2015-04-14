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
        createController = function () {
            return $controller('myCtrl', {'$scope': $rootScope, loggedin: {username: 'aymen', password: 'allmas', _id: '5527d02e1d0a2ee9d14f5307' } });
        };
    }));
    describe(' todo test', function () {
        it('get todo test', function () {
            var todo = {title: 'todo11', description: 'desc11', done: false};
            var todos = [todo];
            $httpBackend.expectGET('/todos/loggedin').respond(200);
            $httpBackend.expectGET('http://localhost:3000/todos/').respond(200, todos);
            var controller = createController();
            $httpBackend.flush();
            expect(controller.todos).toEqualData(todos);
        });
    });
    it('add todo test', function () {
        var addedtodo = {title: 'todo11', description: 'desc11', done: false};
        var todos = [];
        var added = [addedtodo];
        $httpBackend.expectGET('/todos/loggedin').respond(200);
        $httpBackend.expectGET('http://localhost:3000/todos/').respond(200, todos);
        $httpBackend.expectPOST('http://localhost:3000/todos/', {title: 'todo11', description: 'desc11'}).respond(200, addedtodo);
        var controller = createController();
        controller.titleup = 'todo11';
        controller.descriptionup = 'desc11';
        controller.add();
        $httpBackend.flush();
        expect(controller.todos).toEqualData(added);
    });
});


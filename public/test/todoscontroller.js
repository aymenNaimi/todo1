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
    /*
     it('delete todo test', function () {
     var todo = {title: 'todo11', description: 'desc11', done: false, _id : "5527d0618e3702d1321a319a" };
     var todos = [todo];
     var after = [];
     $httpBackend.expectGET('/todos/loggedin').respond(200);
     $httpBackend.expectGET('http://localhost:3000/todos/').respond(200, todos);

     $httpBackend.expectDELETE('http://localhost:3000/todos/'+"5527d0618e3702d1321a319a" ).respond(200, todo);

     var controller = createController();
     //  controller.delete("5527d0618e3702d1321a319a" );
     spyOn(window, 'confirm').and.returnValue(true) ;
     $httpBackend.flush();
     expect(controller.todos).toEqualData(after);
     });
     */
    it('update todo test', function () {
        var todo = {title: 'todo11', description: 'desc11', done: false, _id: "5527d0618e3702d1321a319a"};
        var updated = {title: 'todo1122', description: 'desc1133', done: true};
        var updatedid = {title: 'todo1122', description: 'desc1133', done: true, _id: "5527d0618e3702d1321a319a"};
        var array = [updatedid];
        var todos = [todo];
        $httpBackend.expectGET('/todos/loggedin').respond(200);
        $httpBackend.expectGET('http://localhost:3000/todos/').respond(200, todos);
        $httpBackend.expectPUT('http://localhost:3000/todos/' + todo._id, updated).respond(200, updatedid);
        var controller = createController();
        controller.idup = updatedid._id;
        controller.titleup = updatedid.title;
        controller.descriptionup = updatedid.description;
        controller.doneup = updatedid.done;
        controller.update2();
        $httpBackend.flush();
        expect(controller.todos).toEqualData(array);
    });
    it('done todo test', function () {
        var todo = {title: 'todo11', description: 'desc11', done: false, _id: "5527d0618e3702d1321a319a"};
        var todos = [todo];
        var updated = {title: 'todo11', description: 'desc11', done: true, _id: "5527d0618e3702d1321a319a"};
        $httpBackend.expectGET('/todos/loggedin').respond(200);
        $httpBackend.expectGET('http://localhost:3000/todos/').respond(200, todos);
        $httpBackend.expectPUT('http://localhost:3000/todos/' + todo._id, {done: true}).respond(200, updated);
        var controller = createController();
        controller.done(todo._id, todo);
        $httpBackend.flush();
        expect(todo).toEqualData(updated);
    });
    it('clear todo test', function () {
        var todo = {title: 'todo11', description: 'desc11', done: false};
        var todos = [todo];
        $httpBackend.expectGET('/todos/loggedin').respond(200);
        $httpBackend.expectGET('http://localhost:3000/todos/').respond(200, todos);
        var controller = createController();
        controller.clear();
        $httpBackend.flush();
        expect(controller.idup).toBe("");
        expect(controller.titleup).toBe("");
        expect(controller.descriptionup).toBe("");
        expect(controller.errtitle).toBe("");
        expect(controller.errdescription).toBe("");
    });
    it('setmode function test', function () {
        var todo = {title: 'todo11', description: 'desc11', done: false};
        var todos = [todo];
        var id, title, description, done;
        var mode = 'Update';
        $httpBackend.expectGET('/todos/loggedin').respond(200);
        $httpBackend.expectGET('http://localhost:3000/todos/').respond(200, todos);
        var controller = createController();
        if (mode == 'Update') {
            id = todo._id;
            title = todo.title;
            description = todo.description;
            done = todo.done;
        }
        else {
            id = '';
            title = '';
            description = '';
            done = '';
        }
        controller.setmode(mode, todo);
        $httpBackend.flush();
        expect(controller.mode).toBe(mode);
        expect(controller.idup).toBe(id);
        expect(controller.titleup).toBe(title);
        expect(controller.descriptionup).toBe(description);
        expect(controller.doneup).toBe(done)
        expect(controller.title_window).toBe(mode + ' todo');
    });

});


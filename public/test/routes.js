describe('Testing login Routing', function() {
    beforeEach(module('myApp'));
    it('Should map a "list" route', function() {
        inject(function($route) {
            expect($route.routes['/login'].templateUrl).
                toEqual('api/login/login.html');
            expect($route.routes['/todos'].templateUrl).
                toEqual('api/todos/todos.html');




        });
    });
});
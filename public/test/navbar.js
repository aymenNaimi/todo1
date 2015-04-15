describe('navbar Controller', function () {
    beforeEach(module('myApp'));
    var $controller, $httpBackend, $rootScope, createController;
    beforeEach(inject(function ($injector) {
        var $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        createController = function () {
            return $controller('myCtrl3', {'$scope': $rootScope });
        };
    }));
    describe(' testing logout ', function () {
        it(' testing logout', function () {
            var controller = createController();
            $httpBackend.expectGET('/todos/loggedin').respond(200);
            $httpBackend.expectGET('http://localhost:3000/users/logout').respond(200);
            controller.logout();
            $httpBackend.flush();
            expect($rootScope.connected).toBe(false);
        });
    });
});

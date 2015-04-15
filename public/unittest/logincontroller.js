
describe('Testing login Controller', function() {
    beforeEach(module('myApp'));
    var $controller,$httpBackend,$rootScope, createController;
        beforeEach(inject(function($injector){
        var $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        createController = function() {
            return $controller('myCtrl2', {'$scope' : $rootScope });
        };
    }));
    describe('testing connect function', function() {
        it(' testing connect function', function() {
            var controller = createController();
             controller.username ='ayyyymen';
             controller.password ='allmas';
            $httpBackend.expectGET('/todos/loggedin').respond(200);
            $httpBackend.expectPOST('http://localhost:3000/users/login',{username : controller.username , password :controller.password  }).respond(200);
            controller.connect();
            $httpBackend.flush();
            expect($rootScope.connected).toBe(true) ;

        });
    });
});


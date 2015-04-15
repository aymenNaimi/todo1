
describe('Testing login Controller', function() {
    beforeEach(module('myApp'));
    var $controller ,result,$httpBackend,$rootScope, createController;
        beforeEach(inject(function($injector){
        var $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        // The injector unwraps the underscores (_) from around the parameter names when matching
        createController = function() {
            return $controller('myCtrl2', {'$scope' : $rootScope });
        };
    }));
    describe('$scope.connect', function() {
        it(' testing that some variable are clear', function() {
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


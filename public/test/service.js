describe('Testing authService Service', function () {
    var _auth;
    beforeEach(function () {
        module('myApp');
        inject(function (authService) {
            _auth = authService;
        });
    });
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
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        createController = function () {
            return $controller('myCtrl', {'$scope': $rootScope, loggedin: {username: 'aymen', password: 'allmas', _id: '5527d02e1d0a2ee9d14f5307' } });
        };
    }));
    it('Should be registered', function () {
        expect(_auth).toBeDefined();
    });
    it('Should include logout loggedin checkLoggedin check methods', function () {
        expect(_auth.checkLoggedin).toBeDefined();
        expect(_auth.loggedin).toBeDefined();
        expect(_auth.logout).toBeDefined();
    });
    it('test logout ', function () {
        var data = '';
        _auth.logout();
        $httpBackend.expectGET('/todos/loggedin').respond(200);
        $httpBackend.expectGET('http://localhost:3000/users/logout').respond(200, data);
        $httpBackend.flush();
    });

});

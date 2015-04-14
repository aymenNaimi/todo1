describe('PasswordController', function() {
    beforeEach(module('myApp'));

    var $controller ,result,$httpBackend,$rootScope, createController;

    beforeEach(function (done) {
        window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        setTimeout(function () {
            console.log('inside timeout');
            done();
        }, 500);
    });
/*
    it('passes', function () {
        expect({}).toBeDefined();
    });
*/
        beforeEach(inject(function($injector){


            jasmine.addMatchers({
                toEqualData : function(util, customEqualityTesters) {
                    return {
                        compare: function(actual, expected) {
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

console.log('aaaaaaaaaaaaaaaa');
            $httpBackend.expectPOST('http://localhost:3000/users/login',{username : controller.username , password :controller.password  }).respond(200);
            console.log('bbbbbbbbbbbbbbb');
            controller.connect();
            console.log('ccccccccccccc');
            $httpBackend.flush();
            console.log('ddddddddddddd');
            expect(controller.ctd).toBe(true);

        });
    });
});


/*
describe('Testing Articles Controller', function() {
    var _scope, ArticlesController;
    beforeEach(function() {
        module('mean');
        jasmine.addMatchers({
            toEqualData: function(util, customEqualityTesters) {
                return {
                    compare: function(actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });
        inject(function($rootScope, $controller) {
            _scope = $rootScope.$new();
            ArticlesController = $controller('myCtrl', {
                $scope: _scope
            });
        });
    });
    it('Should have a find method that uses $resource to retrieve a list of articles', inject(function(Todos) {
    inject(function($httpBackend) {

        $httpBackend.expectGET('api/todos').respond(sampleArticles);
     //   _scope.find();
        $httpBackend.flush();
        expect(_scope.todos).toEqualData(sampleArticles);
    });
}));

});
    */
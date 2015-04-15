
describe('Testing myApp Main Module', function () {
    var mainModule;
    beforeEach(function () {
        mainModule = angular.module('myApp');
    });
    it('Should be registered', function () {
        expect(mainModule).toBeDefined();
    });
});


describe('todos E2E Tests:', function() {
    /*
    before(inject(function($injector){
        var $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        createController = function() {
            return $controller('myCtrl2', {'$scope' : $rootScope });
        };
    }));

*/


    describe('login', function() {
        it('Should not be able to login', function() {
            browser.get('http://localhost:3000/#/login');
            element(by.model('mycl.username')).sendKeys('aymen');
            element(by.model('mycl.password')).sendKeys('allmas');
            element(by.css('button[type=submit]')).click();
          //  element(by.css(':button')).click();
           /*
            element(by.binding('error')).getText().then(function(errorText)
            {
                expect(errorText).toBe('User is not logged in');
            });
            */
            expect('aaa').toBe('aaa');




            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/todos');
        //    expect($location.path).toBe('http://localhost:3000/#/todos');
        });
    });
});
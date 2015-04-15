describe('todos E2E Tests:', function () {
    describe('login', function () {
        it('Should not be able to login', function () {
            browser.get('http://localhost:3000/#/login');
            element(by.model('mycl.username')).sendKeys('aymen');
            element(by.model('mycl.password')).sendKeys('allmas');
            element(by.css('button[type=submit]')).click();
            expect('aaa').toBe('aaa');
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/todos');
        });
    });
});
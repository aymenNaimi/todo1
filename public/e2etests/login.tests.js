describe('login E2E Tests:', function () {

    describe('login tests', function () {
        it('Should not be able to get todos ', function () {
            browser.get('http://localhost:3000/#/todos');
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/login');
        });
        it('Should not be able to go to the home page', function () {
            browser.get('http://localhost:3000/#/login');
            element(by.linkText('Home')).click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/login');
        });
        it('Should  able to login and logout', function () {
            browser.get('http://localhost:3000/#/login');
            element(by.model('mycl.username')).sendKeys('aymen');
            element(by.model('mycl.password')).sendKeys('allmas');
            element(by.css('button[type=submit]')).click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/todos');
            element(by.linkText('logout')).click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/login');
        });
        it('testing title to be Togo Management', function () {
            browser.get('http://localhost:3000/#/login');
            expect(browser.getTitle()).toBe('Todo Management');
            element(by.model('mycl.username')).sendKeys('aymen');
            element(by.model('mycl.password')).sendKeys('allmas');
            element(by.css('button[type=submit]')).click();
            expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/todos');
            expect(browser.getTitle()).toBe('Todo Management');
        });
    });
});
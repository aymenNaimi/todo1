app.run(function($rootScope,$http) {
    $rootScope.logout = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/users/logout',
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (data, status) {
            if (status === 200) {
                console.log(" logout success ");
                self.todos = [];
                $rootScope.connected= false;
            }
        });
    };
    $rootScope.connected= false;
});
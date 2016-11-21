var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
    function ($scope, $http) {
        console.log('Hello from the Controller.js');
        function refresh() {
            $http.get('/contactlist').success(function (res) {
                console.log('I received the data sent by server.js');
                $scope.contactlist = res;
            });
        };

        function clear() {
            $scope.contact = "";
            refresh();
        }

        clear();

        $scope.addContact = function () {
            console.log($scope.contact);
            // Post request to the database;
            $http.post('/contactlist', $scope.contact);
            clear();
        };

        $scope.deleteContact = function (id) {
            console.log("Delete this: " + id);
            $http.delete('/contactlist/' + id).success(
                function () {
                    clear();
                }
            );
        };

        $scope.edit = function (id) {
            console.log(id);
            $http.get('/contactlist/'+ id).success(function (res) {
                $scope.contact = res;
            });
        };

        $scope.update = function () {
            console.log($scope.contact._id);
            $http.put('/contactlist/'+$scope.contact._id, $scope.contact).success(
                function () {
                    clear();
                });
        };

        $scope.clear = function () {
            clear();
        };
    }]
);

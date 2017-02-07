'use strict';

var app = angular.module('swagger', ['ngSanitize', 'swaggerUi'

]).config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope) {
        return {
            'request': function (config) {
                if ($rootScope.token) {
                    config.headers.Authorization = 'JWT ' + $rootScope.token;
                }
                return config || $q.when(config);
            },
            'response': function (response) {
                return response || $q.when(response);
            },
            'responseError': function (rejection) {
                return $q.reject(rejection);
            },
            'requestError': function (rejection) {
                return $q.reject(rejection);
            }
        };
    });
})

        .controller('MyCtrl', function ($scope) {
            // init form
            $scope.isLoading = false;
            $scope.url = $scope.swaggerUrl = 'api/swagger.json';
            // error management
            $scope.myErrorHandler = function (data, status) {
                console.log('failed to load swagger: ' + status + '   ' + data);
            };
        });
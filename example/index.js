var navbar = require('../');
var app = angular.module('app', ['navigationBar']);

app.controller('IndexCtrl', function($scope) {

  var baseStatus = {
    backLabel: null,
    actionLabel: 'Next',
    onBack: function() {
      var newIndex = statuses.indexOf($scope.status) - 1;
      if (newIndex > -1) {
        $scope.status = statuses[newIndex];
        $scope.status.move = 'ltr';
        if (newIndex > 0) {
          $scope.status.backLabel = statuses[newIndex-1].title;
        }
      }
    },
    onAction: function() {
      var newIndex = statuses.indexOf($scope.status) + 1;
      if (newIndex < statuses.length) {
        $scope.status = statuses[newIndex];
        $scope.status.move = 'rtl';
        $scope.status.backLabel = statuses[newIndex-1].title;
        if (!statuses[newIndex+1]) {
          $scope.status.actionLabel = null;
        }
      }
    }
  };

  var statuses = [
    angular.extend({title: 'Settings'}, baseStatus),
    angular.extend({title: 'Groups'}, baseStatus),
    angular.extend({title: 'MyGroup'}, baseStatus),
    angular.extend({title: 'Person'}, baseStatus)
  ];

  $scope.status = statuses[0];
});

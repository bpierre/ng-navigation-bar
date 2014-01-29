var navbar = require('../');
var app = angular.module('app', ['navigationBar']);

app.controller('IndexCtrl', function($scope) {
  var screens = [
    'Settings',
    'Groups',
    'MyGroup',
    'Person'
  ];
  var currentScreen = 0;

  function onAction() {
    if (currentScreen < screens.length-1) currentScreen++;
    $scope.navigationBarStatus = navbarStatus(
      screens[currentScreen],
      'Edit',
      (currentScreen > 0)? screens[currentScreen-1] : null,
      'rtl'
    );
  }
  function onBack() {
    if (currentScreen > 0) currentScreen--;
    $scope.navigationBarStatus = navbarStatus(
      screens[currentScreen],
      'Edit',
      (currentScreen > 0)? screens[currentScreen-1] : null,
      'ltr'
    );
  }

  function navbarStatus(title, action, back, move) {
    return {
      title: title,
      actionLabel: action,
      backLabel: back,
      move: move,
      onAction: onAction,
      onBack: onBack
    };
  }

  $scope.navigationBarStatus = navbarStatus(screens[0], 'Edit', null, 'none');

  $scope.directions = [
    'rtl',
    'ltr',
    'none'
  ];

  $scope.statuses = [];
  for (var i = 0; i < 5; i++) {
    $scope.statuses.push({
      backLabel: 'First Title',
      actionLabel: 'Action',
      title: 'New Title',
      move: $scope.directions[0],
      onBack: function() {},
      onAction: function() {}
    });
  }

  $scope.reset = function() {
    $scope.beforeRtl = false;
    $scope.beforeLtr = false;
    $scope.showRtl = false;
    $scope.showLtr = false;
  };
  $scope.reset();

  $scope.updateStatus = function(index) {
    $scope.navigationBarStatus = angular.copy($scope.statuses[index]);
  };
});

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var navbar = angular.module('navigationBar');

var template = ' \
<div class="navbar-screen"> \
  <div class="navbar-title"> \
    <h1>{{status.title}}</h1> \
  </div> \
  <div class="navbar-back"> \
    <a role="button" ng-show="showBack" ng-click="status.onBack()"> \
      {{status.backLabel}} \
    </a> \
  </div> \
  <div class="navbar-action"> \
    <a role="button" ng-show="showAction" ng-click="status.onAction()"> \
      {{status.actionLabel}} \
    </a> \
  </div> \
</div>';

module.exports = navbar.directive('navigationBarScreen', function() {
  return {
    restrict: 'E',
    replace: true,
    template: template,
    scope: {
      status: '='
    },
    require: '^navigationBar',
    link: function(scope, elt, attrs, navigationBarCtrl) {
      scope.$watch('status', function(status, oldStatus) {
        scope.showBack = !!(status && status.onBack && status.backLabel);
        scope.showAction = !!(status && status.onAction && status.actionLabel);
      }, true);
    }
  };
});

},{}],2:[function(require,module,exports){
var navbar = angular.module('navigationBar');

var template = ' \
<nav class="navbar" ng-class="{ \
    \'before-rtl\': beforeRtl, \
    \'before-ltr\': beforeLtr, \
    \'show-rtl\': showRtl, \
    \'show-ltr\': showLtr \
  }"> \
  <navigation-bar-screen status="status" class="current"></navigation-bar-screen> \
  <navigation-bar-screen status="prevStatus" class="previous"></navigation-bar-screen> \
</nav>';

module.exports = navbar.directive('navigationBar', function() {
  return {
    restrict: 'E',
    replace: true,
    template: template,
    scope: {
      /* status is an object containing the following properties:
       * String title
       * String backLabel
       * String actionLabel
       * String ('ltr', 'rtl', 'none') move
       * Function onBack
       * Function onAction
       */
      status: '='
    },
    controller: function() {
      // Necessary for the directive dependency
    },
    link: function(scope, elt, attrs) {

      function resetAnim() {
        scope.beforeRtl = false;
        scope.beforeLtr = false;
        scope.showRtl = false;
        scope.showLtr = false;
      }

      // scope.$evalAsync fixes a Chrome 30.0.1599 transition bug: the X
      // position of the text moves at the end of the transition. OK on Safari 7.0
      // requestAnimationFrame fixes a Firefox 28.0a2 transition bug: the transition
      // is not always applied.
      function forceDomApply(fn) {
        window.requestAnimationFrame(function(){
          scope.$evalAsync(fn);
        });
      }

      scope.prevStatus = null;

      resetAnim();

      scope.$watch('status', function(status, prevStatus) {

        if (!status || status === prevStatus) return;

        // No anim
        if (status.move === 'none') {
          scope.prevStatus = null;
          return;
        }

        // Right-to-left / left-to-right anims
        resetAnim();
        scope.prevStatus = prevStatus;

        scope.beforeRtl = (status.move === 'rtl');
        scope.beforeLtr = (status.move === 'ltr');

        forceDomApply(function(){
          scope.showRtl = scope.beforeRtl;
          scope.showLtr = scope.beforeLtr;
        });
      }, true);
    }
  };
});

},{}],3:[function(require,module,exports){
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

},{"../":4}],4:[function(require,module,exports){
module.exports = angular.module('navigationBar', []);

require('./directives/navigation-bar');
require('./directives/navigation-bar-screen');

},{"./directives/navigation-bar":2,"./directives/navigation-bar-screen":1}]},{},[3])
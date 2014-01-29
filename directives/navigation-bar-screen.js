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

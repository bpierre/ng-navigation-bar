app.directive('navigationBarScreen', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'directives/navigation-bar/navigation-bar-screen/template.html',
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

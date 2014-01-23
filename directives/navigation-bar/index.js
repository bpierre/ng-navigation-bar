app.directive('navigationBar', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'directives/navigation-bar/template.html',
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
        $timeout(function(){
          scope.showRtl = scope.beforeRtl;
          scope.showLtr = scope.beforeLtr;
        }, 10);
      }, true);
    }
  };
});

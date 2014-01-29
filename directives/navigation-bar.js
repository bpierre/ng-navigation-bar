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

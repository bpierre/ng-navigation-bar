# ng-navigation-bar

## npm installation

```shell
$ npm install ng-navigation-bar
```

## Usage

### Load the Angular Module

If you are using Browserify, you just need to `require()` the module:

```javascript
var navbar = require('ng-navigation-bar');
```

Otherwise, you can load `dist/navigation-bar.js` in your HTML:

```html
<script src="ng-navigation-bar/dist/navigation-bar.js"></script>
```

Then, add `'navigationBar'` to your app requirements:

```javascript
var app = angular.module('app', ['navigationBar']);
```

### Add the Styles

If you are using [Stylus](http://learnboost.github.io/stylus/) (and you
should!), you can require the Stylus module, which will allows you to define
some parameters:

```stylus
// Each parameter is optional
navbar-title-color = rgb(0, 0, 0) // Title color
navbar-button-color = rgb(21, 125, 251) // Buttons color
navbar-anim-duration = 0.6s // Animation duration
navbar-timing-function = cubic-bezier(.1, .7, .1, 1) // Animation easing

// Make sure that you define the parameters before the @import
@import 'ng-navigation-bar'
```

If you are not using Stylus, load `dist/navigation-bar.css` into your app, and
have a look inside it if you need to change animation settings.

### Use the `navigation-bar` directive

Add a `navigation-bar` element into your template, and a `status` attribute on
it, which is an object containing the following properties:

- title: the current title (`String`)
- backLabel: the “Back” button label (optional, `String`)
- actionLabel: the “Action” button label (optional, `String`)
- onBack: the function to call when the “Back” button is clicked (`Function`)
- onAction: the function to call when the “Action” button is clicked (`Function`)
- move: the current animation, left-to-right or right-to-left ('ltr', 'rtl' or 'none', `String`)

## Example

```javascript
require('ng-navigation-bar'); // Only with Browserify

var app = angular.module('app', ['navigationBar']);

app.controller('MyCtrl', function($scope) {

  var baseStatus = {
    backLabel: 'Back',
    actionLabel: 'Next',
    onBack: function() {
      var newIndex = statuses.indexOf($scope.status) - 1;
      if (newIndex > -1) {
        $scope.status = statuses[newIndex];
        $scope.status.move = 'ltr';
        $scope.navigationBarStatus = $scope.status;
      }
    },
    onAction: function() {
      var newIndex = statuses.indexOf($scope.status) + 1;
      if (newIndex < statuses.length) {
        $scope.status = statuses[newIndex];
        $scope.status.move = 'rtl';
        $scope.navigationBarStatus = $scope.status;
      }
    }
  };

  var statuses = [
    angular.extend({title: 'Screen 1'}, baseStatus),
    angular.extend({title: 'Screen 2'}, baseStatus),
    angular.extend({title: 'Screen 3'}, baseStatus)
  ];

  $scope.status = statuses[0];
});
```

```html
<body ng-app="app">
  <div ng-controller="MyCtrl">
    <navigation-bar status="status"></navigation-bar>
  </div>
</body>
```

## License

[MIT](http://pierre.mit-license.org/)

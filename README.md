define.js
=========

define.js is a minimalist module system for js

```js
define(function one() {
  return 1;
});

define(function two(one) {
  return one + one;
});
```


```js
// modules may be anonymous
define(function(window, one, two) {
  window.console.log('The sum of one and two is ', one + two);
});
```


```js
// modules may be stateful
define(function counter() {
  var calls = 0;
  return function() { return ++calls; };
});

define(function(window, counter) {
  window.console.log(counter(), counter());
});
```


```js
// modules may be safe
define(function(notDefined) {
  // throws an error!
});
```

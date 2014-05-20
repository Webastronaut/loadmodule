loadmodule
==========

Dependency loader plugin (only 491 bytes minified). Loads plugin dependencies (JS/CSS) and initializes plugins if related DOM elements are available.

Needs [basket.js](https://github.com/addyosmani/basket.js) and [rsvp.js](https://github.com/tildeio/rsvp.js) to work properly.

## Example usage:

```JavaScript
$(function() {

  /** Only if .fancybox is available loadModule will load the dependencies and invoke the callback
   * 
   * @param {array} Dependencies - JS or CSS files
   * @param {function} Callback - Gets invoked when all dependencies are loaded
   * @param {string} Unique - Used for cache busting; if you want loadmodule to fetch
   * the desired script from the server rather than from the local storage change this value
   */
	$('.fancybox').loadModule([
		'path/to/fancybox/jquery.fancybox.css', 
		'path/to/fancybox/jquery.fancybox.pack.js'
	],
	function() {
		$(this).fancybox();
	}, '1.0');
	
});
```

The code is available under MIT Licence, so do whatever you want to do with it.

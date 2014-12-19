/** Dependency loading plugin based on basket.js and rsvp.js
 *
 * @desc Checks if given jQuery element is in dom and loads related dependencies and fires the given callback when done
 *
 * @param {array} dependecies - The dependecies to load; can be JS and/or CSS
 * @param {function} callback - The callback to fire after all dependencies have been loaded; The given dom element is assigned to this callback
 * @param {string|int} unique - Used for basket; if the value differs from the stored value basket will load the JS from the given URL
 *
 * @this {object} - jQuery Element
 * @return {object}
 *
 */
;(function($) {
	$.fn.loadModule = function(dependencies, callback, unique) {
		var self = {
				$that : $(this),
				isLtIE9 : navigator.userAgent.indexOf('MSIE 8') // check if we have an ie8
			};

		if(self.$that.length === 0) {
			return;
		}

		if(!window.loadedDependencies) {
			window.loadedDependencies = []; // array to store already loaded dependencies in
		}

		/** Recursively loads all dependencies and fires the callback when all dependencies are available
		 *
		 * @param {array} arr - Dependencies array
		 */
 		self.getDependencies = function(arr) {
			var defer, basketOptions = {};

			if(arr.length === 0) {
				// fire the callback and assign this to it
				callback.call(self.$that, $);

				return;
			} else {
				// If we have a CSS file to load create a new link element in the header and put it to the top
				if(arr[0].indexOf('.css') !== -1) {
					if($.inArray(arr[0], window.loadedDependencies) < 0) {
						defer = $.when($('<link>').prependTo('head')
							.attr({
								'type' : 'text/css',
								'rel' : 'stylesheet'
							}).attr('href', arr[0]));
					} else {
						defer = $.Deferred();
						defer.resolve();
					}
				} else {
					// IF we have an ie8 load JS the oldschool way
					if(self.isLtIE9 >= 0) {
						defer = $.getScript(arr[0]);
					} else {
						// for the party people load it from the localstorage
						basketOptions.url = arr[0];

						if(!!unique) {
							basketOptions.unique = unique;
						}

						defer = basket.require(basketOptions);
					}
				}

				// store the loaded dependency
				if($.inArray(arr[0], window.loadedDependencies) < 0) {
					window.loadedDependencies.push(arr[0]);
				}
			}

			// Load the next dependency
			defer.then(function() {
				arr.shift();

				self.getDependencies(arr);
			}, function() {
				console.error('Could not resolve path: ' + arr[0]);
			});
		};

		self.getDependencies(dependencies);

		return self;
	};
})(jQuery);

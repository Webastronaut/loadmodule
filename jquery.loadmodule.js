;(function($) {
	$.fn.loadModule = function(dependencies, callback) {
		var self = {
				$that : $(this)
			};

		if(self.$that.length === 0) {
			return;
		}

		if(!window.loadedDependencies) {
			window.loadedDependencies = [];
		}

 		self.getDependencies = function(arr) {
			var defer;

			if(arr.length === 0) {
				callback.call(self.$that, $);

				return;
			} else {
				if(arr[0].indexOf('css') !== -1) {
					if($.inArray(arr[0], window.loadedDependencies) < 0) {
						defer = $.when($('<link>').prependTo('head')
							.attr({
								'type' : 'text/css',
								'rel' : 'stylesheet',
								'href' : arr[0]
							}));
					} else {
						defer = $.Deferred();
						defer.resolve();
					}
				} else {
					defer = basket.require({ url : arr[0] });
				}

				if($.inArray(arr[0], window.loadedDependencies) < 0) {
					window.loadedDependencies.push(arr[0]);
				}
			}

			defer.then(function() {
				arr.shift();

				self.getDependencies(arr);
			}, function(err) {
				console.error(err + ': Could not resolve path:' + arr[0]);
			});
		};

		self.getDependencies(dependencies);

		return self;
	};
})(jQuery);

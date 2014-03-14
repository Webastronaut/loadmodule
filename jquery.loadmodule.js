;(function($) {
	$.fn.loadModule = function(dependencies, callback, order) {
		var self = {
				$that : $(this)
			};
			
		if(self.$that.length === 0) {
			return;
		}
		
 		self.getDependencies = function(arr) {
			var defer;
			
			if(arr.length === 0) {
				callback.call(self.$that);
				
				return;
			} else {
				if(arr[0].indexOf('css') !== -1) {
					defer = $.when($('<link>')
						.attr('rel', 'stylesheet')
						.attr('type', 'text/css')
						.attr('href', arr[0])
						.appendTo('head'));
				} else {
					defer = basket.require({ url : arr[0] });
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

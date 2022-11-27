/*!
 * Lazy-loading - img, picture
*/
/*const lazyImg = () => {
	$('img[data-src]').each(function () {
		let img = $(this);
		img.attr('src', img.attr('data-src'));
		img.on('load', function () {
			img.removeAttr('data-src');
		});
	});
}*/
app.lazyLoad = {
	define(el) {
		let observer = new window.IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				if (!el.data('loaded')) {
					this.show(el);
					//console.log('enter')
					el
						.data('loaded', true)
						.addClass('loaded');
				}
				return;
			}
		}, {
			root: null,
			threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
		})

		observer.observe(el.get(0));
	},
	show(el) {
		if (el.is('img')) {
			el.attr('src', el.attr('data-src'));
			el.on('load', function () {
				el.removeAttr('data-src');
			});
		}
		if (el.is('picture')) {
			let img = el.find('img'),
				source = el.find('source');

			img.attr('src', img.attr('data-src'));

			source.each(function() {
				$(this).attr('srcset', $(this).attr('data-srcset'));
			});
		}
	},
	init() {
		/*for (var i=0;i<$('.lazyImg').length;i++) {
			this.define($('.lazyImg').eq(i))
		}*/
		let _this = this;

		$('.lazyLoad').each(function (e, el) {
			_this.define($(el));
		});
	}
}
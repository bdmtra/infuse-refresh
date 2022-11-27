'use strict';

//=include ../../node_modules/jquery/dist/jquery.js
//=include ../../node_modules/device.js/dist/device.umd.js
//=include ../modules/fancybox/fancybox.js

/*
 * Cheg UI 3.0.0
*/
const app = {
	options: {
		winWidth: 0,
		winHeight: 0,

		sbWidth: 0,

		scrollOffset: 60,
		scrollPos: 0,
		popupOpened: false,
		scrollLockPos: 0,

		animDuration: 200,

		pageLoaded: false,

		menuOpened: false,
	},
	deviceIs: device.device
};

//=include ../modules/cheg.units/functions.js

//=include ../modules/cheg.scrollto/functions.js

//=include ../modules/cheg.tabs/functions.js
//=include ../modules/cheg.accordions/functions.js
//=include ../modules/cheg.expand/functions.js

//=include ../modules/cheg.scrolllock/functions.js
//=include ../modules/cheg.popups/functions.js

//=include ../modules/cheg.lazyload/functions.js

//=include ../modules/cheg.menu/functions.js

//=include ../modules/cheg.waypoint/functions.js

//=include ../modules/cheg.checkwebp/functions.js

//=include ../modules/search/search.js

/*!
 * Checking if matches media query
*/
app.matches = (query) => {
	return window.matchMedia(`(${query})`).matches
}

/*!
 * Header
*/
app.header = {
	location() {
		$(document).on('click', '.header__location-trigger', function() {
			$('body').toggleClass('body--location');

			$('.header__menu-item')
				.removeClass('active')
				.find('.header__menu-sublist').slideUp(200);
		});

		$(document).on('click', '.header__location-close', function() {
			$('body').removeClass('body--location');
		});
	},
	menu() {
		// Click on burger
		$(document).on('click', '.header__toggle', function () {
			!app.options.menuOpened ? app.menu.open() : app.menu.close();
		});

		$(document).on('click', '.header__menu-arr', function() {
			let item = $(this).closest('.header__menu-item');

			if (!item.hasClass('active')) {
				item.find('.header__menu-sublist').slideDown(200);
				item.addClass('active');

				$('body').removeClass('body--location');
			} else {
				item.find('.header__menu-sublist').slideUp(200);
				item.removeClass('active');
			}
		});
	},
	init() {
		this.location();
		this.menu();
	}
}

/*!
 * Load file
*/
app.loadFile = {
	loaded: [],
	js(opts) {
		let _this = this;

		opts = $.extend({
			src: '',
			target: 'body',
			pos: 'end',
			cb: function() {}
		}, opts);

		if (!_this.loaded.includes(opts.src)) {
			let script = document.createElement('script'),
				target = document.body;

			script.setAttribute('src', opts.src);

			if (opts.target !== 'body') {
				target = document.getElementsByTagName('head')[0];
			}

			if (opts.pos == 'end') {
				target.append(script);
			} else {
				target.prepend(script);
			}

			// now wait for it to load.
			script.onload = () => {
				_this.loaded.push(opts.src);

				_this.callback(opts.cb);
			}
		} else {
			_this.callback(opts.cb);
		}
	},
	css(opts) {
		let _this = this;

		opts = $.extend({
			src: '',
			target: 'head',
			pos: 'end',
			cb: function() {}
		}, opts);

		if (!_this.loaded.includes(opts.src)) {
			let link = document.createElement('link'),
				target = document.getElementsByTagName('head')[0];
			
			link.setAttribute('rel', 'stylesheet');
			link.setAttribute('href', opts.src);

			if (opts.target !== 'head') {
				target = document.body;
			}

			if (opts.pos == 'end') {
				target.append(link);
			} else {
				target.prepend(link);
			}

			_this.loaded.push(opts.src);
		}

		_this.callback(opts.cb);
	},
	callback(cb) {
		if (cb && typeof cb == 'function') {
			cb.call();
		}
	}
}

/*!
 * Init
*/
app.init = () => {
	// Units
	app.units.all();

	// Img lazy-load
	app.lazyLoad.init();

	// Tabs
	$('.ui-tabs').not('.custom').each(function () {
		if ($(this).data('tabsInit') !== true) {
			app.tabs.init($(this));
		}
	});
	app.tabs.bind();

	// Accordions
	$('.ui-accordion').not('.custom').each(function () {
		if ($(this).data('accordionInit') !== true) {
			app.accordions($(this));
		}
	});

	// Expandable blocks
	$('.ui-expand').not('.custom').each(function () {
		if ($(this).data('expandInit') !== true) {
			app.expand($(this));
		}
	});

	// Popups
	$('.popup').each(function () {
		if ($(this).data('popupsInit') !== true) {
			app.popups.init($(this));
		}
	});
	app.popups.bind();

	// HubSpot forms
	$('.hbspt-form').not('.custom').each(function () {
		if ($(this).data('hbsptInit') !== true) {
			let form = $(this);
			app.loadFile.js({
				src: 'https://js.hsforms.net/forms/v2.js',
				cb: function() {
					hbspt.forms.create(JSON.parse(form.attr('data-hbspt')));

					form.removeAttr('data-hbspt');
				}
			});

			form.data('hbsptInit', true);
		}
	});
}

app.deviceIs.addClasses(document.documentElement);

(function () {
	app.deviceIs.touch ? $('html').addClass('touch') : $('html').addClass('no-touch');

	app.options.winWidth = $(window).width();
	app.options.winHeight = $(window).height();
	app.options.scrollPos = $(window).scrollTop();

	// Init
	app.init();

	// Header
	app.header.init();

	// Search
	app.search.init();

	app.waypoint({
		position:50,
		onDown: function() {
			$('body').addClass('body--scrolled');
			$('.header').addClass('header--scrolled');
		},
		onUp: function() {
			$('body').removeClass('body--scrolled');
			$('.header').removeClass('header--scrolled');
		}
	})

	//app.popups.open('request');



	if (app.deviceIs.desktop) {
		$(window).on('resize', function () {
			app.units.all();
		});
	} else {

	}

	if (app.deviceIs.mobile || app.deviceIs.tablet) {
		$(window).on('orientationchange', function () {
			app.units.vh();
		}).on('resize', function () {
			app.units.mobile();
		});
	}

	$(window).on('resize', function () {
		app.options.winWidth = $(window).width();
		app.options.winHeight = $(window).height();
		app.options.scrollPos = $(window).scrollTop();

		app.options.menuOpened && app.matches('min-width:1280px') ? app.menu.close() : null;
	}).on('scroll', function () {
		app.options.scrollPos = $(window).scrollTop();
	}).trigger('resize').trigger('scroll');

	// Scroll to element
	$(document).on('click', 'a[href^="#"], .scrollTo', function (e) {
		e.preventDefault();
		let el = $(this).attr('href') || $(this).attr('data-scrollto-target');

		app.scrollTo(el, app.options.scrollOffset);
	});
})(jQuery);

$(window).on('load', function () {
	setTimeout(function () {
		$('body').addClass('body--page-loaded');
		app.options.pageLoaded = true;
		$(window).trigger('scroll');
	}, 300);
});
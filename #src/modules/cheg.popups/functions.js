/*!
 * Popups
*/
app.popups = {
	bind() {
		let _this = this;

		// Open popup
		$(document).on('click', '[data-popup]', function () {
			let id = $(this).attr('data-popup');
			if (!$(this).attr('data-popup-video')) {
				_this.open(id, {
					form: $(this).attr('data-popup-form') || '',
					ttl: $(this).attr('data-popup-header') || '',
					text: $(this).attr('data-popup-text') || '',
					btn: $(this).attr('data-popup-btn') || ''
				});
			} else {
				_this.video(id, {
					video: $(this).attr('data-popup-video')
				});
				
			}
		});

		// Close popup on clicking cross
		$(document).on('click', '.popup__close, [data-popup-close]', function () {
			_this.close();
		});

		// Close popup on clicking outside popup
		$(document).on('click', '.popup', function (e) {
			if (!$(e.target).closest('.popup__content').length) {
				_this.close();
				e.stopPropagation();
			}
		});

		// Close popup with pressing ESC
		$(document).on('keyup', function (e) {
			if (e.key === 'Escape') {
				if (app.options.popupOpened) {
					_this.close();
				}
			}
		});
	},

	/*! Open popup */
	open(id, opts) {
		if ($('#' + id).length) {
			$('body').addClass('body--popup-opened');
			app.scrollLock();

			$('.popup').removeClass('active');
			let popup = $('.popup#' + id);

			if (id == 'request') {
				let ttl = opts?.ttl ? 
						opts.ttl : 
						'Оставить заявку',
					text = opts?.text ? 
						opts.text : 
						'Оставьте заявку, и&nbsp;наш специалист свяжется с&nbsp;вами в&nbsp;ближайшее время',
					btn = opts?.btn ? 
						opts.btn : 
						'Отправить';

				popup.find('.popup-head__title').html(ttl);
				popup.find('.popup-head__subtitle').html(text);
				popup.find('.ui-btn__text').html(btn);
			}

			popup.scrollTop(0).addClass('active');
			app.options.popupOpened = true;
		}
	},

	/*! Open video popup */
	video(id, opts) {
		let _this = this;

		_this.open(id);

		if ($('#' + id).length && opts?.video) {
			let popup = $('.popup#' + id);
			popup
				.find('.popup__video')
					.html(`<iframe src="${opts.video}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`);
		}
	},

	/*! Close popups */
	close() {
		$('.popup').removeClass('active');
	
		setTimeout(function () {
			app.scrollLock('unlock');
			$('body').removeClass('body--popup-opened');
		}, app.options.animDuration);

		$('.popup__video').html('');
	
		$('.popup .ui-form').each(function () {
			app.forms.clear($(this));
		});
	
		app.options.popupOpened = false;
	},

	/*! Thank-you popup */
	thx(thx) {
		if (!thx) {
			thx = 'thx';
		}
		this.open(thx);
	
		$('.popup .ui-form').each(function () {
			app.forms.clear($(this));
		});
	},

	/*! Init */
	init(popup) {
		let mod = popup.attr('data-popup-close') ? 'popup__close--' + popup.attr('data-popup-close') : '';
		popup.find('.popup__close-container')
			.prepend(`<div class="ui-crossbtn popup__close ${mod} noselect" />`);
	
		popup.data('popupsInit', true);
	}
}
/*! Popups */
const popups = {
	/*! Open popup */
	open(id, form, h1, h2, btn) {
		if ($('#' + id).length) {
			$('body').addClass('body--popup-opened');
			scrollLock();

			$('.popup').removeClass('active');
			let popup = $('.popup#' + id);

			if (id == 'request') {
				let defH1 = 'Оставить заявку',
					defH2 = 'Оставьте заявку, и&nbsp;наш специалист свяжется с&nbsp;вами в&nbsp;ближайшее время',
					defBtn = 'Оставить заявку';

				if (h1) {
					popup.find('.popup-head__title').html(h1);
				} else {
					popup.find('.popup-head__title').html(defH1);
				}

				if (h2) {
					popup.find('.popup-head__subtitle').html(h2);
				} else {
					popup.find('.popup-head__subtitle').html(defH2);
				}

				if (btn) {
					popup.find('.ui-btn__text').html(btn);
				} else {
					popup.find('.ui-btn__text').html(defBtn);
				}

				if (form) {
					def.formTitle = form;
				}
			}

			popup.scrollTop(0).addClass('active');
			def.popupOpened = true;
		}
	},
	/*! Open video popup */
	video(id, videoUrl) {
		if ($('#' + id).length) {
			$('body').addClass('body--popup-opened');
			scrollLock();
	
			$('.popup').removeClass('active');
			
			let popup = $('.popup#' + id);
			popup
				.find('.popup__video')
					.html(`<iframe src="${videoUrl}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`);
			popup.scrollTop(0).addClass('active');
			def.popupOpened = true;
		}
	},
	/*! Close popups */
	close() {
		$('.popup').removeClass('active');
	
		setTimeout(function () {
			scrollLock('unlock');
			$('body').removeClass('body--popup-opened');
		}, def.animDuration);

		$('.popup__video').html('');
	
		$('.popup .send-form').each(function () {
			clearForm($(this));
		});
	
		def.popupOpened = false;
	},
	thx(thx) {
		$('.popup').removeClass('active');
		if (!thx) {
			thx = 'thx';
		}
		this.open(thx);
	
		$('.popup .send-form').each(function () {
			clearForm($(this));
		});
	},
	/*! Init */
	init(popup) {
		let mod = popup.attr('data-popup-close') ? 'popup__close--' + popup.attr('data-popup-close') : '';
		popup.find('.popup__close-container')
			.prepend(`<div class="cross-btn popup__close ${mod} noselect" />`);
	
		popup.data('popupsInit', true);
	}
}
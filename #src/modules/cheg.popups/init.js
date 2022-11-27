	// Open popup
	$(document).on('click', '[data-popup-open]', function () {
		let id = $(this).attr('data-popup-open') || '',
			formtitle = $(this).attr('data-popup-formtitle') || '',
			header = $(this).attr('data-popup-header') || '',
			text = $(this).attr('data-popup-text') || '',
			btnText = $(this).attr('data-popup-btn') || '';

		popups.open(
			id,
			formtitle,
			header,
			text,
			btnText
		);
	});

	// Close popup on clicking cross
	$(document).on('click', '.popup__close', function () {
		popups.close();
	});

	// Close popup on clicking outside popup
	$(document).on('click', '.popup', function (e) {
		if (!$(e.target).closest('.popup__content').length) {
			popups.close();
			e.stopPropagation();
		}
	});

	// Close popup with pressing ESC
	$(document).keyup(function (e) {
		if (e.key === 'Escape') {
			if (def.popupOpened) {
				popups.close();
			}
		}
	});
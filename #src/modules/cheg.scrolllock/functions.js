/*!
 * Scroll lock
*/
app.scrollLock = (type) => {
	if (type == 'unlock') {
		app.deviceIs.ios ? $(window).scrollTop(app.options.scrollLockPos) : null;

		$('body').removeClass('body--fixed');
	} else {
		app.options.scrollLockPos = $(window).scrollTop();

		$('body').addClass('body--fixed');
	}
}
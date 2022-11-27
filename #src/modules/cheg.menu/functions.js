/*!
 * Menu
*/
app.menu = {
	/*! Open menu */
	open() {
		$('body').addClass('body--menu-opened');
		app.scrollLock();

		app.options.menuOpened = true;
	},
	
	/*! Close menu */
	close() {
		$('body').removeClass('body--menu-opened');
		app.scrollLock('unlock');

		app.options.menuOpened = false;
	}
}
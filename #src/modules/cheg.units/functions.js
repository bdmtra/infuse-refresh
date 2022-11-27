/*!
 * Units
*/
app.units = {
	vh() {
		$('body').append('<div class="vh-fix" style="position:fixed;width:1px;left:-9999px;top:0;bottom:0;pointer-events:none;opacity:0;visibility:hidden;" />');

		let vh = $('.vh-fix').height() * 0.01;
		document.documentElement.style.setProperty('--vh', vh + 'px');

		$('.vh-fix').remove();

		return vh;
	},
	inW2() {
		let inW2 = $('.inner').first().width();
		document.documentElement.style.setProperty('--inW2', inW2 + 'px');

		return inW2;
	},
	inOff() {
		let inOff = ($(window).width() - $('.inner').first().width()) / 2;
		document.documentElement.style.setProperty('--inOff', inOff + 'px');

		return inOff;
	},
	sb() {
		let div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
		$('body').append(div);
		let w1 = $('div', div).innerWidth();
		div.css('overflow-y', 'scroll');
		let w2 = $('div', div).innerWidth();
		$(div).remove();

		let bodyHeight = parseInt($('.app').height());

		if (bodyHeight > app.options.winHeight) {
			app.options.sbWidth = w1 - w2;
		} else {
			app.options.sbWidth = 0;
		}

		document.documentElement.style.setProperty('--sbW', app.options.sbWidth + 'px');

		return app.options.sbWidth;
	},
	all() {
		this.vh();
		this.mobile();
	},
	mobile() {
		this.inW2();
		this.inOff();
		this.sb();
	}
}
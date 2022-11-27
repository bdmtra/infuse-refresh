app.insights = (block) => {
		let slider1 = block.find('.insights__slider--1'),
			slider2 = block.find('.insights__slider--2'),
			slider3 = block.find('.insights__slider--3'),
			sizer = block.find('.insights__sizer'),
			slider1S, slider2S, slider3S,
			articles = JSON.parse(block.find('.insights__block').attr('data-insights')),
			opts = {
				slidesPerView: 'auto',
				spaceBetween: 20,
				speed: 500,
				loop: true,
				preloadImages: false,
				lazy: {
					checkInView: true,
					loadOnTransitionStart: true,
					loadPrevNext: true,
					loadPrevNextAmount: 6,
				},
				watchSlidesProgress: true,
				grabCursor: true,
				init: true,
				/*controller: {
					by: 'container'
				}*/
			},
			type = '',
			cut = 0;
		block.find('.insights__block').removeAttr('data-insights');
		$.each(articles, function(i) {
			let art = articles[i],
				mod = '',
				bot = `
				<div class="insights__item-pop">
					<div class="insights__item-text">
						${art.text}
					</div>
				</div>
				<div class="insights__item-bot">
					<div class="insights__item-more">
						Read more
					</div>
					<div class="insights__item-arr ui-inline-arrow" style="--uiaC:#fff;"></div>
				</div>
			`,
				isWide = false,
				isWebinar = false,
				color = art.color ? ' style="--iiC:' + art.color + '"' : '';
			if (art.wide && art.wide == true) {
				isWide = true;
			}
			if (art.video && art.video == true) {
				bot = `
				<div class="insights__item-bot">
					<div class="insights__item-icon"></div>
				</div>
			`;
				isWebinar = true;
			}
			slider3.find('.swiper-wrapper').append(`
		<a class="swiper-slide insights__item" data-wide="${isWide}" data-webinar="${isWebinar}" href="${art.url}" data-insight="${(i+1)}"${color}>
			<div class="insights__item-img">
				<img class="swiper-lazy" data-src="${art.img}" alt="${art.title}" />
			</div>
			<div class="insights__item-type">
				${art.type}
			</div>
			<h6 class="insights__item-ttl">
				${art.title}
			</h6>
			<div class="insights__item-descr">
				${art.descr}
			</div>
			${bot}
		</a>
		`);
			sizer.append(`
			<div class="insights__item" data-wide="${isWide}" data-webinar="${isWebinar}" data-insight="${(i+1)}"></div>
		`);
		});
		sizer.find('.insights__item').each(function(i) {
			let appendTo;
			if ($(this).position().top > 1) {
				appendTo = slider2.find('.swiper-wrapper');
			} else {
				appendTo = slider1.find('.swiper-wrapper');
			}
			slider3.find('.swiper-slide[data-insight="' + (i + 1) + '"]')
				.clone()
				.appendTo(appendTo);
		});
		//sizer.remove();
		function defWidth(id) {
			let sw = 0;
			/*block.find('.insights__slider--'+id+' .insights__item').each(function() {
				sw = sw + $(this).outerWidth() + 20;
			});*/
			block.find('.insights__slider--' + id + ' .insights__item[data-wide="true"]').each(function() {
				sw = sw + 723 + 20;
			});
			block.find('.insights__slider--' + id + ' .insights__item[data-wide="false"]').each(function() {
				sw = sw + 351.5 + 20;
			});
			return (sw - 20);
		}
		if (defWidth(1) != defWidth(2)) {
			if (defWidth(1) > defWidth(2)) {
				block.find('.insights__slider--1 .insights__item[data-wide="false"]').last().remove();
			}
			if (defWidth(1) < defWidth(2)) {
				block.find('.insights__slider--2 .insights__item[data-wide="false"]').last().remove();
			}
			if (defWidth(1) > defWidth(2)) {
				block.find('.insights__slider--1 .insights__item[data-wide="false"]').last().remove();
			}
			if (defWidth(1) < defWidth(2)) {
				block.find('.insights__slider--2 .insights__item[data-wide="false"]').last().remove();
			}
		}
		$(window).on('resize', function() {
			if (app.matches('min-width:1280px')) {
				if (type !== 'lg') {
					if (typeof slider1S == 'object') {
						slider1S.destroy();
					}
					if (typeof slider2S == 'object') {
						slider2S.destroy();
					}
					if (typeof slider3S == 'object') {
						slider3S.destroy();
					}
					block.find('.ui-nav-dots').html('');
					let opts1 = $.extend(JSON.parse(JSON.stringify(opts)), {
							navigation: {
								nextEl: block.find('.ui-nav-arrow--next').get(0),
								prevEl: block.find('.reviews__bot .ui-nav-arrow--prev').get(0),
							},
							controller: {
								by: 'container'
							},
							pagination: {
								el: block.find('.ui-nav-dots').get(0),
								clickable: true,
								renderBullet: function(i, className) {
									return '<div class="ui-nav-dots__item ' + className + '"></div>';
								}
							}
						}),
						opts2 = $.extend(JSON.parse(JSON.stringify(opts)), {
							controller: {
								by: 'container'
							}
						});
					slider1S = new Swiper(slider1.get(0), opts1);
					slider2S = new Swiper(slider2.get(0), opts2);
					slider1S.controller.control = slider2S;
					slider2S.controller.control = slider1S;
					type = 'lg';
					//console.log(opts);
				}
			}
			if (app.matches('max-width:1279px') /*&& app.matches('min-width:768px')*/ ) {
				if (type !== 'md') {
					if (typeof slider1S == 'object') {
						slider1S.destroy();
					}
					if (typeof slider2S == 'object') {
						slider2S.destroy();
					}
					if (typeof slider3S == 'object') {
						slider3S.destroy();
					}
					block.find('.ui-nav-dots').html('');
					let opts3 = $.extend(JSON.parse(JSON.stringify(opts)), {
						loop: false,
						navigation: {
							nextEl: block.find('.ui-nav-arrow--next').get(0),
							prevEl: block.find('.reviews__bot .ui-nav-arrow--prev').get(0),
						},
						pagination: {
							el: block.find('.ui-nav-dots').get(0),
							clickable: true,
							renderBullet: function(i, className) {
								return '<div class="ui-nav-dots__item ' + className + '"></div>';
							}
						},
						breakpoints: {
							1: {
								slidesPerView: 1,
								slidesPerGroup: 1,
								grid: {
									fill: 'column',
									rows: 4
								},
								allowTouchMove: false,
							},
							768: {
								slidesPerView: 2,
								slidesPerGroup: 2,
								grid: {
									fill: 'column',
									rows: 2
								},
								allowTouchMove: true,
							}
						}
					});
					slider3S = new Swiper(slider3.get(0), opts3);
					type = 'md';
				}
			}
		}).trigger('resize');
		block.data('insightsInit', true);
	}
	(function() {
		// Init
		$('.insights--index').each(function() {
			if ($(this).data('.insightsInit') !== true) {
				app.insights($(this));
			}
		});
	})(jQuery)
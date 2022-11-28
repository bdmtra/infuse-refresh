app.search = {
	// ошибка что ASP не определен, все скрипты которые относятся к поиску идут до app https://i.imgur.com/OuhVpQF.png
	/*init() {
		let _this = this;
		$(".insights-filters .searchsettings").appendTo(".insights-filters .search-filter-options-inner");

		$(".search-filter-header").on('click', function () {
			var toggle = $(this);
			$(this).parent().find('.search-filter-options').slideToggle("fast", function () {
				toggle.toggleClass('open').toggleClass('closed');
			});
		});
		$(".asp_filter_generic > legend").each(function (index) {
			$(this).append('<input class="filter_toogle_all_generic" name="filter_toogle_all_generic_' + index + '" id="filter_toogle_all_generic_' + index + '" type="checkbox" checked="checked" ><label for="filter_toogle_all_generic_' + index + '"></label>');
		});
	
		$(document).on("change", ".filter_toogle_all_generic", function () {
			var value = $(this).is(':checked');
			$(this).closest('.asp_filter_generic').find('.asp_option input[type="checkbox"]').prop('checked', value);
			var settingEl = $(this).closest('.searchsettings');
			var id = settingEl.data('id');
			ASP.api(id, "searchFor", $('#ajaxsearchpro' + id + '_1 .orig').val());
		});
	
		$(".header__nav-link-search, .header__search").on('click', function (e) {
			e.preventDefault();
			$('.main-search').slideToggle("fast");
			$(this).toggleClass('active');
			$('#search-overlay').toggleClass('active');
			if (!$(this).hasClass('active')) {
				ASP.api(2, "closeResults");
			}
			return false;
		});
	
		_this.positioMainSearchSettings();
	
		$("#search-overlay").on('click', function () {
			_this.hideMainSearch();
		});
	
		$(".header__nav-item.has-children").on('hover', function () {
			_this.hideMainSearch();
		});
	
		$(window).on("resize", function () {
			var input = $('.ajaxsearchpro input[type="search"]');
			if ($(window).width() < 500) {
				input.attr("placeholder", "Search by keyword");
			} else {
				input.attr("placeholder", "Search by keyword, article title, category, etc.");
			}
		
			_this.positioMainSearchSettings();
		}).trigger('resize');
		
		$(window).on('scroll', function () {
			_this.hideMainSearch();
		});
	},
	hideMainSearch() {
		$('.main-search').hide();
		$('.header__search').removeClass('active');
		$('#search-overlay').removeClass('active');
		ASP.api(2, "closeResults");
	},
	positioMainSearchSettings() {
		var mainSearchSettings = $(".main-header .searchsettings");
		if ($(window).width() < 1280) {
			if (!mainSearchSettings.length) {
				mainSearchSettings = $("#ajaxsearchprores2_1 .searchsettings");
			}
			if (mainSearchSettings.length) {
				mainSearchSettings.appendTo(".main-header .search-filter-options-inner");
			}
		} else {
			if (!mainSearchSettings.length) {
				mainSearchSettings = $(".main-header .search-filter-options-inner .searchsettings");
			}
			if (mainSearchSettings.length) {
				mainSearchSettings.appendTo("#ajaxsearchprores2_1");
			}
		}
	}*/
}
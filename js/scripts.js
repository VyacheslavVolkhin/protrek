//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')
function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}
function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}
function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}
for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.querySelector('.button-title').innerHTML = ''
			popupElementButton.querySelector('.button-title').insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.querySelector('.button-title').innerHTML = ''
				popupElementButton.querySelector('.button-title').insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})



//mobile menu
const menuButton = document.querySelectorAll('.popup-menu-wrap li a');
for (i = 0;i < menuButton.length;i++) {
	menuButton[i].addEventListener('click', function(e) {
		if (innerWidth < 1024) {
			if (this.parentElement.classList.contains('submenu')) {
				this.parentElement.classList.toggle('open')
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		}
	})
}


//btn tgl
let tglButtons = document.querySelectorAll('.js-btn-tgl')
for (i = 0;i < tglButtons.length;i++) {
	tglButtons[i].addEventListener('click', function(e) {
		this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}


$(document).ready(function(){


	//filter toggle
	$('.main-filter-box .field-ext a').on('click', function() {
		if ($('.main-filter-box').hasClass('show-ext'))  {
			$('.main-filter-box').removeClass('show-ext')
			$('body').removeClass('filter-show');
			if ($(window).innerWidth() > 1023) {
				$('.main-filter-box').find('.filter-ext-wrap').slideUp(200);
			}
		} else {
			$('.main-filter-box').addClass('show-ext')
			$('body').addClass('filter-show');
			if ($(window).innerWidth() > 1023) {
				$('.main-filter-box').find('.filter-ext-wrap').slideDown(200);
			}
		}
		return false;
	})
	$('.main-filter-box .js-filter-close').on('click', function() {
		$('.main-filter-box').removeClass('show-ext')
		$('body').removeClass('filter-show');
		return false;
	})
	
		
	//catalog-slider-box
	if (!!$('.catalog-slider-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.catalog-slider-box .slider').slick({
				dots: false,
				slidesToShow: 5,
				slidesToScroll: 5,
				touchThreshold: 100,
				variableWidth: false,
				infinite: false,
				adaptiveHeight: false,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
						}
					},
				]
			});
		}
	}


	//rangeSlider
	if (!!$('#rangeSlider').offset()) {
		let rangeSliderMin = parseInt($('#rangeSlider').attr('data-min'));
		let rangeSliderMax = parseInt($('#rangeSlider').attr('data-max'));
		let rangeSliderMinCurrent = parseInt($('#rangeSlider').attr('data-min-current'));
		let rangeSliderMaxCurrent = parseInt($('#rangeSlider').attr('data-max-current'));
		$('#rangeSlider').slider({
			range: true,
			min: rangeSliderMin,
			max: rangeSliderMax,
			values: [rangeSliderMinCurrent, rangeSliderMaxCurrent],
			slide: function (event, ui) {
				$('[data-range-slider-min="rangeSlider"]').val(ui.values[0]);
				$('[data-range-slider-max="rangeSlider"]').val(ui.values[1]);
			}
		})
	}
	if (!!$('#rangeSlider2').offset()) {
		let rangeSlider2Min = parseInt($('#rangeSlider2').attr('data-min'));
		let rangeSlider2Max = parseInt($('#rangeSlider2').attr('data-max'));
		let rangeSlider2MinCurrent = parseInt($('#rangeSlider2').attr('data-min-current'));
		let rangeSlider2MaxCurrent = parseInt($('#rangeSlider2').attr('data-max-current'));
		$('#rangeSlider2').slider({
			range: true,
			min: rangeSlider2Min,
			max: rangeSlider2Max,
			values: [rangeSlider2MinCurrent, rangeSlider2MaxCurrent],
			slide: function (event, ui) {
				$('[data-range-slider-min="rangeSlider2"]').val(ui.values[0]);
				$('[data-range-slider-max="rangeSlider2"]').val(ui.values[1]);
			}
		})
	}
	if (!!$('#rangeSlider3').offset()) {
		let rangeSlider3Min = parseInt($('#rangeSlider3').attr('data-min'));
		let rangeSlider3Max = parseInt($('#rangeSlider3').attr('data-max'));
		let rangeSlider3MinCurrent = parseInt($('#rangeSlider3').attr('data-min-current'));
		let rangeSlider3MaxCurrent = parseInt($('#rangeSlider3').attr('data-max-current'));
		$('#rangeSlider3').slider({
			range: true,
			min: rangeSlider3Min,
			max: rangeSlider3Max,
			values: [rangeSlider3MinCurrent, rangeSlider3MaxCurrent],
			slide: function (event, ui) {
				$('[data-range-slider-min="rangeSlider3"]').val(ui.values[0]);
				$('[data-range-slider-max="rangeSlider3"]').val(ui.values[1]);
			}
		})
	}
	if (!!$('#rangeSlider4').offset()) {
		let rangeSlider4Min = parseInt($('#rangeSlider4').attr('data-min'));
		let rangeSlider4Max = parseInt($('#rangeSlider4').attr('data-max'));
		let rangeSlider4MinCurrent = parseInt($('#rangeSlider4').attr('data-min-current'));
		let rangeSlider4MaxCurrent = parseInt($('#rangeSlider4').attr('data-max-current'));
		$('#rangeSlider4').slider({
			range: true,
			min: rangeSlider4Min,
			max: rangeSlider4Max,
			values: [rangeSlider4MinCurrent, rangeSlider4MaxCurrent],
			slide: function (event, ui) {
				$('[data-range-slider-min="rangeSlider4"]').val(ui.values[0]);
				$('[data-range-slider-max="rangeSlider4"]').val(ui.values[1]);
			}
		})
	}
	$('[data-range-slider-min]').each(function() {
		$(this).val($('#' + $(this).attr('data-range-slider-min')).slider('values', 0))
	})
	$('[data-range-slider-max]').each(function() {
		$(this).val($('#' + $(this).attr('data-range-slider-max')).slider('values', 1))
	})
	
	$('[data-range-slider-min]').bind('focusout', function () {
		if ($(this).val() > $('#' + $(this).attr('data-range-slider-min')).slider('values', 1)) {
			$(this).val($('#' + $(this).attr('data-range-slider-min')).slider('values', 0));
		}
		if ($(this).val() < parseInt($('#' + $(this).attr('data-range-slider-min')).attr('data-min'))) {
			$(this).val($('#' + $(this).attr('data-range-slider-min')).attr('data-min'));
		}
		$('#' + $(this).attr('data-range-slider-min')).slider('values', 0, $(this).val());
	})
	$('[data-range-slider-max]').bind('focusout', function () {
		if ($(this).val() < $('#' + $(this).attr('data-range-slider-max')).slider('values', 0)) {
			$(this).val($('#' + $(this).attr('data-range-slider-max')).slider('values', 1));
		}
		if ($(this).val() > parseInt($('#' + $(this).attr('data-range-slider-max')).attr('data-max'))) {
			$(this).val($('#' + $(this).attr('data-range-slider-max')).attr('data-max'));
		}
		$('#' + $(this).attr('data-range-slider-max')).slider('values', 1, $(this).val());
	})
	$('#widget').draggable();
	
});


//js tabs
const tabsNav = document.querySelectorAll('.js-tabs-nav')
const tabsBlocks = document.querySelectorAll('.js-tab-block')
const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
const tabsButtonContent = document.querySelectorAll('.js-tab-content')
function tabsActiveStart() {
	for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
		if (tabsBlocks[iTab].classList.contains('active')) {
			tabsBlocks[iTab].classList.remove('active')
		}
	}
	for (i = 0; i < tabsNav.length; i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
			if (tabsNavElements[iElements].classList.contains('active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0; j < tabsBlocks.length; j++) {
					if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
						console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
						tabsBlocks[j].classList.add('active')
					}
				}
			}
		}
	}
	
}
for (i = 0; i < tabsButtonTitle.length; i++) {
	tabsButtonTitle[i].addEventListener('click', function (e) {
		this.classList.toggle('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < tabsNav.length; i++) {
	tabsNav[i].addEventListener('click', function (e) {
		if (e.target.closest('[data-tab]')) {
			let tabsNavElements = this.querySelector('[data-tab].active')
			tabsNavElements ? tabsNavElements.classList.remove('active') : false
			e.target.closest('[data-tab]').classList.add('active')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
}
tabsActiveStart()


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
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
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
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
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


//catalog view toggle
const catalogViewRows = document.querySelectorAll('.js-catalog-view-rows')
const catalogViewTiles = document.querySelectorAll('.js-catalog-view-tiles')
const catalogItems = document.querySelectorAll('.catalog-box')
for (i = 0;i < catalogViewRows.length;i++) {
	
	catalogViewRows[0].addEventListener('click', function(e) {
		if (this.classList.contains('active')) {
			// this.classList.remove('active')
			// catalogItems[0].classList.remove('view-rows')
			// catalogViewTiles[0].classList.add('active')
		} else {
			this.classList.add('active')
			catalogItems[0].classList.add('view-rows')
			catalogViewTiles[0].classList.remove('active')
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0;i < catalogViewTiles.length;i++) {

	catalogViewTiles[0].addEventListener('click', function(e) {
		if (this.classList.contains('active')) {
			// this.classList.remove('active')
			// catalogItems[0].classList.add('view-rows')
			// catalogViewRows[0].classList.add('active')
		} else {
			this.classList.add('active')
			catalogItems[0].classList.remove('view-rows')
			catalogViewRows[0].classList.remove('active')
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}


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


// filter toggle
const mainFilterBox = document.querySelector('.js-filter');
const mainFilterBoxOpen = document.querySelector('.js-filter-open');
const mainFilterBoxToggle = document.querySelectorAll('.js-filter-section-toggle');
if (mainFilterBoxOpen) {
	mainFilterBoxOpen.addEventListener('click', function(event) {
		mainFilterBox.classList.add('show-ext');
		  document.body.classList.add('filter-show');
		  event.preventDefault()
		  event.stopPropagation()
		  return false
	  });
}
if (mainFilterBoxToggle) {
	for (i=0;i<mainFilterBoxToggle.length;i++) {
		mainFilterBoxToggle[i].addEventListener('click', function(event) {
			this.classList.toggle('active')
			  event.preventDefault()
			  event.stopPropagation()
			  return false
		  });
	}
}
if (mainFilterBox) {
	mainFilterBox.addEventListener('click', function(event) {
		if (event.target.matches('.field-ext a')) {
		  const isOpen = mainFilterBox.classList.toggle('show-ext');
		  document.body.classList.toggle('filter-show');
		  if (window.innerWidth > 1023) {
			  mainFilterBox.querySelector('.filter-ext-wrap').style.display = isOpen ? 'block' : 'none';
		  }
		  event.preventDefault()
		  event.stopPropagation()
		  return false
		} else if (event.target.matches('.js-filter-close')) {
		  mainFilterBox.classList.remove('show-ext');
		  document.body.classList.remove('filter-show');
		  event.preventDefault()
		  event.stopPropagation()
		  return false
		} else if (event.target.matches('.js-filter-open')) {
		  mainFilterBox.classList.add('show-ext');
		  document.body.classList.add('filter-show');
		  event.preventDefault()
		  event.stopPropagation()
		  return false
		}
	  });
}




$(document).ready(function(){
	
		
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


	//gallery slider
	if (!!$('.photos-slider-box').offset()) {
		let pSlider = $('.photos-slider-box .slider-wrap .slider').slick({
			dots: false,
			slidesToShow: 1,
			infinite: true,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						dots: true,
					}
				},
			]
		});
		let pSliderPreview = $('.photos-slider-box .slider-preview-wrap .slider').slick({
			dots: false,
			slidesToShow: 3,
			vertical: true,
			infinite: false,
			prevArrow: false,
			nextArrow: false,
		});
		//pSlider.slick('refresh');
		//pSliderPreview.slick('refresh');
		$('.photos-slider-box .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$('.photos-slider-box .slider-preview-wrap .elm-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
		});
		$('.photos-slider-box .slider-preview-wrap .slider .elm-photo').click(function () {
			let newSlide = $(this).attr('data-slide');
			$('.photos-slider-box .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$(this).parent().addClass('active');
			$('.photos-slider-box .slider-wrap .slider').slick('slickGoTo', newSlide);
			return false;
		})
		$('.js-popup-open').on('click', function() {
			if ($(this).attr('data-popup') == 'popup-card') {
				pSlider.slick('refresh');
				pSliderPreview.slick('refresh');
			}
		})
	}
	//VARIABLE
	if (!!$('.VARIABLE').offset()) {
		$('.VARIABLE .slider').slick({
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			touchThreshold: 100,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
					}
				},
			]
		});
		
	}


	//compare
	$('.compare-box .tbl-title-wrap').on('click', function() {
		$(this).toggleClass('active');
		return false;
	})

	//frm counter   
	$('.js-counter .js-button-counter-minus').on('click', function(){
		var cnt=$(this).parents('.js-counter').find('.js-input-counter').val();
		cnt=parseInt(cnt);
		if (cnt>0) {
			$(this).parents('.js-counter').find('.js-input-counter').val(cnt-1);
		}
		return false;
	})
	$('.js-counter .js-button-counter-plus').on('click', function(){
		var cnt=$(this).parents('.js-counter').find('.js-input-counter').val();
		$(this).parents('.js-counter').find('.js-input-counter').val(cnt-1+2);
		return false;
	})


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


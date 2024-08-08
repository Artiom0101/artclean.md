'use strict';

function getPosition(el) {
	var xPos = 0;
	var yPos = 0;

	while (el) {
		if (el.tagName == 'BODY') {
			// deal with browser quirks with body/window/document and page scroll
			var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
			var yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += el.offsetLeft - xScroll + el.clientLeft;
			yPos += el.offsetTop - yScroll + el.clientTop;
		} else {
			// for all other non-BODY elements
			xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
			yPos += el.offsetTop - el.scrollTop + el.clientTop;
		}

		el = el.offsetParent;
	}
	return {
		x: xPos,
		y: yPos,
	};
}

function isVisible(elem) {
	var sT = window.pageYOffset,
		sH = document.documentElement.clientHeight,
		eT = getPosition(elem),
		eTg = eT.y + window.pageYOffset,
		eH = elem.clientHeight;

	if (eTg < sT + sH && eTg + eH > sT + 50) {
		return true;
	} else {
		return false;
	}
}

function animShow(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (isVisible(arr[i]) && !arr[i].classList.contains('show')) {
			arr[i].classList.add('show');
			arr.splice(i, 1);
			i--;
		}
	}
}

function removeOpen(arr) {
	for (var i = 0; i < arr.length; i++) {
		arr[i].classList.remove('open');
	}
}

document.addEventListener('DOMContentLoaded', function (event) {
	//ANIM ELEM IN SCROLL
	var animEl = document.getElementsByClassName('anim');
	var animEl = [].slice.call(animEl);

	if (animEl.length == 0) animEl = [];

	if (document.documentElement.clientWidth >= 960) {
		setTimeout(function () {
			animShow(animEl);
		}, 300);
	}

	// SHOW-HIDE ELEM IN CLICK
	var burgerEl = document.querySelector('.burger'),
		burgerMenuEl = document.querySelector('.burger_menu'),
		htmlEl = document.querySelector('html');

	if (burgerEl) {
		burgerEl.addEventListener(
			'click',
			function (e) {
				e.preventDefault();
				if (this.classList.contains('active')) {
					this.classList.remove('active');
					burgerMenuEl.classList.remove('show');
					htmlEl.classList.remove('show');
					document.querySelector('.ng-scope').style.overflowY = "auto";
				} else {
					this.classList.add('active');
					burgerMenuEl.classList.add('show');
					htmlEl.classList.add('show');
					document.querySelector('.ng-scope').style.overflowY = "hidden";
				}
			},
			false,
		);
	}
	//TABS
	var cleanRoomEls = document.getElementsByClassName('cleaning_room');
	for (var i = 0; i < cleanRoomEls.length; i++) {
		cleanRoomEls[i].addEventListener(
			'click',
			function (e) {
				var thisEl = this;
				if (thisEl.classList.contains('open')) return false;

				var siblingsEl = this.parentElement.getElementsByClassName('tabs_btn'),
					indexEl;
				for (var i = 0; i < siblingsEl.length; i++) {
					if (siblingsEl[i] == thisEl) {
						indexEl = i;
						break;
					}
				}

				var parEl = (function (thisEl) {
					var res = thisEl.parentElement;
					do {
						if (res.classList.contains('tabs_wrap')) break;
						else res = res.parentElement;
					} while (!res.tagName == 'BODY');
					return res;
				})(thisEl);
				var tabsContWrap = parEl.getElementsByClassName('tabs_content_wrap')[0];

				removeOpen(tabsContWrap.getElementsByClassName('open'));
				removeOpen(this.parentElement.getElementsByClassName('open'));

				tabsContWrap.getElementsByClassName('tabs_content')[indexEl].classList.add('open');
				siblingsEl[indexEl].classList.add('open');
			},
			false,
		);
	}
	var addServicesEls = document.getElementsByClassName('tabs_btn');
	for (var i = 0; i < addServicesEls.length; i++) {
		addServicesEls[i].addEventListener(
			'click',
			function (e) {
				var thisEl = this;
				if (thisEl.classList.contains('open')) return false;

				var siblingsEl = this.parentElement.getElementsByClassName('tabs_btn'),
					indexEl;

				for (var i = 0; i < siblingsEl.length; i++) {
					if (siblingsEl[i] == thisEl) {
						var linkBorder = document.querySelector('.for_office_btn');

						// if(i == 0) {
						// 	linkBorder.innerHTML = 'Home cleaning';
						// 	linkBorder.setAttribute('href','checkout.html?for=home');
						// }
						//           if(i == 1) {
						//               linkBorder.innerHTML = 'Office cleaning';
						//               linkBorder.setAttribute('href','checkout.html?for=office');
						//           }

						indexEl = i;
						break;
					}
				}

				var parEl = (function (thisEl) {
					var res = thisEl.parentElement;
					do {
						if (res.classList.contains('tabs_wrap')) break;
						else res = res.parentElement;
					} while (!res.tagName == 'BODY');
					return res;
				})(thisEl);
				var tabsContWrap = parEl.getElementsByClassName('tabs_content_wrap')[0];

				removeOpen(tabsContWrap.getElementsByClassName('open'));
				removeOpen(this.parentElement.getElementsByClassName('open'));

				tabsContWrap.getElementsByClassName('tabs_content')[indexEl].classList.add('open');
				siblingsEl[indexEl].classList.add('open');
				//setTimeout(function(){
				jQuery('.pricing_item_content').each(function () {
					if (jQuery(this).hasClass('open')) {
						jQuery(this).find('.anim').addClass('show');
					} else {
						jQuery(this).find('.anim').removeClass('show');
					}
				});
				//}, 200);
			},
			false,
		);
	}
	var changePageBtn = document.querySelectorAll('.tabs_btn_page');

	for (var i = 0; i < changePageBtn.length; i++) {
		changePageBtn[0].addEventListener('click', function (e) {
			e.preventDefault();
			this.classList.add('open');
			var perPage = document.querySelector('.tabs_page_home');
			var perPageOffice = document.querySelector('.tabs_page_office');
			perPage.classList.add('open');
			perPageOffice.classList.remove('open');
			changePageBtn[1].classList.remove('open');
		});

		changePageBtn[1].addEventListener('click', function (e) {
			e.preventDefault();
			this.classList.add('open');
			var perPage = document.querySelector('.tabs_page_home');
			var perPageOffice = document.querySelector('.tabs_page_office');
			perPageOffice.classList.add('open');
			perPage.classList.remove('open');
			changePageBtn[0].classList.remove('open');
		});
	}

	setTimeout(function () {
		jQuery('.pricing_item_content').each(function () {
			if (!jQuery(this).hasClass('open')) {
				jQuery(this).find('.anim').removeClass('show');
			}
		});
	}, 400);

	window.onscroll = function () {
		if (document.documentElement.clientWidth >= 960) {
			setTimeout(function () {
				animShow(animEl);
			}, 400);
		}
	};

	if (jQuery('.slider_1').length) {
		var slider_reviews = jQuery('.slider_1'),
			slider_reviews_nav = jQuery('.slider_2');
		slider_reviews_nav.slick({
			dots: false,
			infinite: true,
			arrows: false,
			centerMode: true,
			centerPadding: '0',
			focusOnSelect: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			asNavFor: '.slider_1',
			responsive: [
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 3,
					},
				},
			],
		});
		slider_reviews.slick({
			dots: false,
			infinite: true,
			arrows: false,
			adaptiveHeight: true,
			asNavFor: '.slider_2',
		});
	}
});
// if($(document).width() > 500){
// 	$('.header_form .enter_post').focus(function(){
// 		$('.header_form').css('box-shadow', '0px 0px 0px 1.5px #f8e71c, 0 0 30px 0 rgba(0, 0, 0, .13)');
// 	});
// 	$('.header_form .enter_post').blur(function(){
// 		$('.header_form').css('box-shadow', '0 0 30px 0 rgba(0, 0, 0, .13)');
// 	})
// }else{
// 	$('.enter_post').focus(function(){
// 		$('.enter_post').css('border', '1.5px solid #f8e71c');
// 	});
// 	$('.enter_post').blur(function(){
// 		$('.enter_post').css('border', 'none');
// 	})
// }

// change input
$('.square__btn input').focus(function () {
	$(this).addClass('active');
});

$('.square__btn input').blur(function () {
	if (!!$(this).val() == false) {
		$(this).removeClass('active');
	}
});

// counter
$('.minus').on('click', function (e) {
	e.preventDefault();
	var elemVal = $(this).siblings('input').val() - 1;

	if (elemVal < 0) {
		$(this).siblings('input').val(0);
	} else {
		$(this).siblings('input').val(elemVal);
	}
});
$('.plus').on('click', function (e) {
	e.preventDefault();
	var elemVal = +$(this).siblings('input').val() + 1;

	$(this).siblings('input').val(elemVal);
});

/*----------------------
Script for modal tooltip
----------------------*/
if (jQuery('.container__tooltip').length) {
	jQuery('.container__tooltip').mCustomScrollbar({
		theme: 'rounded-dots',
		autoHideScrollba: true,
	}); // end mCustomScrollbar
}
var btn__tooltip = document.querySelectorAll('.works_item .btn');

for (var i = 0; i < btn__tooltip.length; i++) {
	btn__tooltip[i].addEventListener('click', function (event) {
		var numberClick__btn = event.target.attributes[1].value;
		var tooltipArea = document.querySelectorAll('.container__tooltip');
		if (tooltipArea[numberClick__btn].classList.contains('container__tooltip-active')) {
			tooltipArea[numberClick__btn].classList.remove('container__tooltip-active');
			tooltipArea[numberClick__btn].classList.remove('tooltip__down');
			tooltipArea[numberClick__btn].classList.remove('tooltip__down-2');
			tooltipArea[numberClick__btn].classList.remove('tooltip__down-3');
			return false;
		}
		for (var j = 0; j < tooltipArea.length; j++) {
			tooltipArea[j].classList.remove('container__tooltip-active');
			tooltipArea[j].classList.remove('tooltip__down');
			tooltipArea[j].classList.remove('tooltip__down-2');
			tooltipArea[j].classList.remove('tooltip__down-3');
		}
		tooltipArea[numberClick__btn].classList.add('container__tooltip-active');

		//if (tooltipArea[numberClick__btn].classList.contains() != 'container__tooltip-active') {

		if (numberClick__btn < 3) {
			tooltipArea[numberClick__btn].classList.add('tooltip__down');
			//tooltipArea[numberClick__btn].style.animationName = 'tooltip__down';
		}
		if (numberClick__btn >= 3 && numberClick__btn < 6) {
			tooltipArea[numberClick__btn].classList.add('tooltip__down_2');
			//tooltipArea[numberClick__btn].style.animationName = 'tooltip__down-2';
		}
		if (numberClick__btn > 5) {
			tooltipArea[numberClick__btn].classList.add('tooltip__down_3');
			//tooltipArea[numberClick__btn].style.animationName = 'tooltip__down-3';
		}
		//};
	});
}
jQuery('.subscrible_wrap').submit(function (e) {
	e.preventDefault();
	jQuery(this).find('input[type="email"]').val('');

	var message = 'subscription successful';

	jQuery(this).find('.message').remove();
	jQuery(this).append('<p class="message">' + message + '</p>');
	jQuery(this).find('.message').fadeIn();
	setTimeout(function () {
		jQuery('.subscrible_wrap').find('.message').fadeOut();
	}, 2000);
});

jQuery('.pricing_plans_header').click(function () {
	var pricingList = jQuery(this).parents('.pricing_plans'),
		pricingListHeader = jQuery(this),
		pricingListBody = jQuery(this).parents('.pricing_plans').children('.pricing_plans_body');

	if (pricingList.hasClass('open')) {
		pricingList.removeClass('open');
		pricingListBody.height(0);
	} else {
		pricingList.addClass('open');
		pricingListBody.height(pricingListBody.children().outerHeight(true) * 3);
	}
});

// change list_item icon
$('.list_item').click(function () {
	$(this).parent().find('li.active').removeClass('active');
	$(this).addClass('active');
	var imageSrc = $(this).data('img');
	console.log(imageSrc);
	$('.left_img img').attr('src', imageSrc);
});

$('.checkout_step_next').click(function () {
	console.log(1);
	$('html, body').animate({ scrollTop: 0 }, 600);
	return false;
});

$('.verify_postcode .postcode').blur(function () {
	if ($(this).val() == '1111') {
		$(this).removeClass('error');
		$(this).addClass('fine');
		$('.verify_postcode div .error-icon').css('display', 'none');
		$('.verify_postcode div .correct-icon').css('display', 'block');
	}
	if ($(this).val() == '') {
		$(this).removeClass('fine');
		$('.verify_postcode div .correct-icon').css('display', 'none');
	}
});

$('.verify_postcode input[type="submit"]').click(function (e) {
	if ($('.postcode').val() != '1111') {
		$('.postcode').addClass('error');
		$('.verify_postcode .error-text').css('display', 'block');
		$('.verify_postcode div .error-icon').css('display', 'block');
		e.preventDefault();
	}
});

$('.moveStep').click(function (e) {
	if ($('.enter_post').val() == '') {
		e.preventDefault();
	}
});

$('.package-offer__questions_label').click(function () {
	$(this).closest('.package-offer__questions_item').toggleClass('active');
});

$('.package-offer__item').click(function () {
	$('.package-offer__item').removeClass('active');
	$(this).toggleClass('active');
});

$('.package-offer__form_phone').on('keydown', function (e) {
	if (e.key.length == 1 && e.key.match(/[^0-9'".]/)) {
		if ((e.ctrlKey && e.keyCode == 86) || (e.keyCode == 91 && e.keyCode == 86)) {
			return true;
		} else {
			return false;
		}
	}
});

var flagForm = 0,
	submitBtn = $('.package-offer__form_submit');

$('.package-offer__form_input, .package-offer__form_check-box input ').on('keydown change', function () {
	$('.package-offer__form_input').each(function () {
		if ($(this).val() == '') {
			flagForm++;
			submitBtn.addClass('package-offer__form_submit-disabled');
			submitBtn.attr('disabled', true);
		}
	});

	var checkboxForm = $('.package-offer__form_check-box input');
	if (flagForm == 0 && checkboxForm.is(':checked')) {
		submitBtn.removeClass('package-offer__form_submit-disabled');
		submitBtn.attr('disabled', false);
	} else {
		submitBtn.addClass('package-offer__form_submit-disabled');
		submitBtn.attr('disabled', true);
	}

	flagForm = 0;
});

$('.contact__form textarea, .contact__form .form-label-email input').on('keyup', function (e) {
	if ($(this).val() != '') {
		$(this).closest('.form-label').find('label').addClass('valid');
	} else {
		$(this).closest('.form-label').find('label').removeClass('valid');
	}
});

$('.package-offer__form_field textarea').on('keyup', function (e) {
	if ($(this).val() != '') {
		$(this).closest('.package-offer__form_field').find('label').addClass('valid');
	} else {
		$(this).closest('.package-offer__form_field').find('label').removeClass('valid');
	}
});

$('.package-offer__form_input').blur(function () {
	if ($(this).val() == '') {
		$(this).addClass('notValid');
	} else {
		$(this).removeClass('notValid');
	}
});

$('.package-offer__form_submit').click(function (e) {
	e.preventDefault();
	$('.message-modal').addClass('show');
	setTimeout(function () {
		$('.message-modal').removeClass('show');
	}, 2000);
});

$('.package-offer__form_field label').click(function () {
	$(this).closest('.package-offer__form_field').find('.package-offer__form_focus').focus();
});

$('.contact__form  label').click(function () {
	$(this).closest('.form-label').find('input').focus();
});

$('.contact__form  .form-label-textarea label').click(function () {
	$(this).closest('.form-label').find('textarea').focus();
});

$('.contact__form  .form-label-email label').click(function () {
	$(this).closest('.form-label').find('input').focus();
});

if ($('form').is('.contact__form')) {
	$('#subject').select2({});
}

var fileInput = document.querySelector('.input-file'),
	button = document.querySelector('.input-file-trigger'),
	the_return = document.querySelector('.file-return'),
	fileName = document.querySelector('.file-return .file');

$(button).on('keydown', function (event) {
	if (event.keyCode == 13 || event.keyCode == 32) {
		fileInput.focus();
	}
});
$(button).on('click', function (event) {
	fileInput.focus();
	return false;
});
$(fileInput).on('change', function (event) {
	fileName.innerHTML = this.value.substring(this.value.lastIndexOf('\\') + 1, this.value.length);
	the_return.classList.add('show');
	fileInput.classList.add('hide');
	button.classList.add('hide');
});

$('body').on('click', '.file-return .delete', function () {
	the_return.classList.remove('show');
	fileInput.classList.remove('hide');
	button.classList.remove('hide');
	$(fileInput).val('');
});

$('.form-label-textarea textarea').on('keyup', function () {
	var commentLength = $(this).val().length;
	$(this).closest('.form-label-textarea').find('.contact__comment-counter span').text(commentLength);
	if (commentLength == 500) {
		$('.contact__comment-counter').addClass('limit');
	} else {
		$('.contact__comment-counter').removeClass('limit');
	}
});

$('.contact__form').submit(function (e) {
	e.preventDefault();
	$('.notification-contact-form').addClass('show');
	setTimeout(function () {
		$('.notification-contact-form').removeClass('show');
	}, 3000);
});

if ($('.location-map').length > 0) {
	$('.footer_location > a').click(function (e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 600);
		return false;
	});
}

var cooldownTimer = 60;
var cooldown;

$('.send-again').click(function (e) {
	e.preventDefault();
	cooldownTimer = 60;
	$('.sms-cooldown span').text('01:00');
	$('.sms-cooldown').addClass('show');
	$('.dont_code_wrap').removeClass('show');
	smsCooldown();
});

function smsCooldown() {
	cooldown = setInterval(function () {
		cooldownTimer--;
		if (cooldownTimer < 10) {
			$('.sms-cooldown span').text('00:0' + cooldownTimer);
		} else {
			$('.sms-cooldown span').text('00:' + cooldownTimer);
		}
		if (cooldownTimer == 0) {
			clearInterval(cooldown);
			$('.sms-cooldown').removeClass('show');
			$('.dont_code_wrap').addClass('show');
		}
	}, 1000);
}

if ($('div').is('.verify_sms_wrap')) {
	smsCooldown();
}

$('.sign-in-page .topbar__close').click(function (e) {
	e.preventDefault();
	$('.sign-in-page .topbar').addClass('hide');
});

$('.sign-in-modal__forgot, .topbar__create-pass').click(function (e) {
	e.preventDefault();
	$('.sign-in-enter').hide();
	$('.sign-in-reset').show();
	$('.sign-in-page .topbar').addClass('hide');
});

$('.back-to-sign-in').click(function (e) {
	e.preventDefault();
	$('.sign-in-enter').show();
	$('.sign-in-reset').hide();
});

$('.new-pass-open').click(function (e) {
	e.preventDefault();
	$('.create-password').show();
	$('.reset-done').hide();
});

$('.sign-in-open').click(function (e) {
	e.preventDefault();
	$('.sign-in-enter').show();
	$('.create-done').hide();
});

$('.sign-in-modal__field input').focus(function () {
	$(this).parent().removeClass('error');
});

$('.sign-in-modal form').on('submit', function (e) {
	e.preventDefault();
	var fields = $(this).find('.sign-in-modal__field');

	fields.each(function () {
		if ($(this).find('input').val().length === 0) {
			$(this).addClass('error');
		}
	});
});

$('.sign-in-reset form').on('submit', function (e) {
	e.preventDefault();
	var fields = $(this).find('.sign-in-modal__field');

	fields.each(function () {
		if ($(this).find('input').val().length === 0) {
			$(this).addClass('error');
		} else {
			$('.sign-in-reset').hide();
			$('.reset-done').show();
		}
	});
});

$('.create-password form').on('submit', function (e) {
	e.preventDefault();
	var fields = $(this).find('.sign-in-modal__field');

	fields.each(function () {
		if ($(this).find('input').val().length === 0) {
			$(this).addClass('error');
		} else {
			$('.create-password').hide();
			$('.create-done').show();
		}
	});
});

$('.cookies-popup__button').click(function () {
	$('.cookies-popup').removeClass('show');
});

$('.no_thanks').click(function () {
	$('.cookies-popup').removeClass('show');

	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments); }

	gtag('consent', 'update', {
		'ad_storage': 'denied',
		'ad_user_data': 'denied',
		'ad_personalization': 'denied',
		'analytics_storage': 'denied'
	});
	gtag('set', 'url_passthrough', true);
	gtag('set', 'ads_data_redaction', true);
});

// Cleaning-price Tabs
$('.js-cleaning-price-tab').on('click', function () {
	console.log($(this));
	let data = $(this).data('cleaning'),
		cleaningPriceItems = $('.cleaning-price__items');
	$('.cleaning-price__tab').removeClass('cleaning-price__tab--active');
	$(this).addClass('cleaning-price__tab--active');
	cleaningPriceItems.each(function () {
		let cleaningData = $(this).data('cleaning');
		if (cleaningData === data) {
			cleaningPriceItems.addClass('cleaning-price__items--hide');
			$(this).removeClass('cleaning-price__items--hide');
		}
	});
});

$('.new-main .comments__slider').on('init', function (event, slick) {
	$('.new-main .comments__slider').addClass('show');
});

$('.new-main .comments__slider').slick({
	dots: false,
	infinite: true,
	arrows: true,
	adaptiveHeight: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 991,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				arrows: false,
				centerMode: true
			},
		},
		{
			breakpoint: 400,
			settings: {
				slidesToShow: 1,
				arrows: false,
				centerMode: true,
			}
		},
	],
});

// todo cashback modal
$(document).on('submit', '.header_form, .js-form-book-now, .cashback-modal_form, .book-now, .book-cleaning, .advertaising__form, .prices__form', function (e) {
	e.preventDefault();
	var $form = $(this);
	$form.find('.js-error_code').hide();
	var postcode = $form.find('.js-enter-post').val() || $form.find('.enter_post').val();
	//if (postcode.replace(/\s/g, '').length < 5) {
	//	$form.find('.js-error_length').show();
	//	return;
	//}

	$.ajax({
		url: '/home/GetLocationInfo',
		data: {
			postcode,
		},
		success: function (response) {
			if (response) {
				const data = JSON.parse(response)
				if (data.success) {
					savePlacePostcode(data.content.placeId, data.content.postcode);
					if (location.pathname == "/") {
						$('.form__button').addClass('gtag_enter_postcode')
						fireEvent('Main_EnterPostcode', '', 'gtag_enter_postcode')
					} else {
						$('.form__button').addClass('gtag_rest_enter_postcode')
						fireEvent('TheRest_EnterPostcode', '', 'gtag_rest_enter_postcode')
					}
					var url = '/checkout.html?postcode=' + postcode.replace(/ /g, '');
					location.href = url;
				}
				if (data.error) {
					$form.find('.js-error_area')[0].style.display = 'block';
					$form.find('.js-error_length')[0].style.display = 'block';
					$form.find('.js-error_area')[0].innerText = data.error;
				}
			} else {
				$form.find('.js-error_area').show();
			}
		},
	});
});


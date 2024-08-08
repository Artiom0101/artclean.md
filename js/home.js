function HomeController($scope, $cookies, $http) {
    var promoId = urlParam('promoId');
    if (promoId) {
        promoId: $cookies.put('promoId', promoId);
    } else {
        $cookies.remove('promoId');
    }

    if ($(document).fileupload) {
        $('.files-field #my-file[type=file]').fileupload({
            url: '/File/Upload',
            dataType: 'json',
            done: function(e, data) {
                var filename = data.result.uploadedFileName.replace(/.*\\/, "");
                $scope.feedback.fileName = data.result.fileName;
                $scope.feedback.uploadedFileName = filename;
                $('.input-file-trigger').addClass('hide');
                $('.file-return').addClass('show');
                $('.file-return .file').text(filename);
            }
        });

        $(document).on("click",
            ".files-field .delete",
            function() {
                $scope.feedback.fileName = null;
                $scope.feedback.uploadedFileName = null;
                $scope.$apply();
                $('.input-file-trigger').removeClass('hide');
                $('.file-return').removeClass('show');
            });
    }

    // $http({
    //     url: '/api/checkout/isuserhasorders'
    // }).then(function(response) {
    //     if (response.data) {
    //         showDiscountModal(discountModals.invite);
    //     } else {
    //         showDiscountModal(discountModals.sale);
    //     }
    // });

    // $http({
    //     url: '/api/checkout/IsUserLogged'
    // }).then(function (response) {
    //     // if (response.data) {
    //     //     showDiscountModal(discountModals.cashback, 10000);
    //     // } else{
    //     //     showDiscountModal(discountModals.sale, 10000);
    //     // }
    //     showDiscountModal(discountModals.cashback, 10000);
    // });

    $scope.goToBookNow = function (e) {
        e.preventDefault();
        hideDiscountModal(discountModals.disinfection);
        $("html, body").animate({ scrollTop: 0 }, 600);
    }

    if (!window.skipReviewLoading) {
        $http({
            url: '/api/data/getreviews?id=' +
                window.boroughId +
                '&limit=' +
                ((typeof window.limit === 'undefined') ? 5 : window.limit)
        }).then(function(response) {
                $scope.reviews = response.data.reviews;
                $scope.reviewRequestFinised = true;
                $('.comments__container').css('display', '');
                $('.main.second_main').css('display', '');
            },
            function() {
                $scope.reviewRequestFinised = true;
                $('.comments__container').css('display', '');
                $('.main.second_main').css('display', '');
            });
    }

    $scope.range = function (n) {
        return new Array(n);
    };

    $scope.addEmail = function (e) {
        e.preventDefault();

        var form = $('.footer_subscrible form.subscrible_wrap');
        var emailEl = jQuery(form).find('input[type="email"]');
        var email = emailEl.val();
        emailEl.val('');

        var message = 'subscription successful';

        jQuery(form).find('.message').remove();
        $http({
            url: '/api/Data/AddEmail',
            method: 'POST',
            data: {
                email: email
            }
        }).then(function () {
            if (!(typeof fbq === 'undefined')) {
                fbq('trackCustom', 'subscribe_newsletter');
            }
            jQuery(form).append('<p class="message">' + message + '</p>');
            jQuery(form).find('.message').fadeIn();
            setTimeout(function () {
                jQuery('.subscrible_wrap').find('.message').fadeOut();
            }, 2000);
        });

    }

    $scope.feedback = {
    };

    $scope.leaveFeedback = function (e) {
        e.preventDefault();

        $scope.feedback.subject = $('#subject').val();

        $http({
            url: '/api/PrivateOffice/LeaveFeedback',
            method: 'POST',
            data: $scope.feedback
        }).then(function () {
            $scope.feedback.bookingId = null;
            $scope.feedback.message = null;
            $scope.feedback.fileName = null;
            $scope.feedback.uploadedFileName = null;
            $scope.feedback.name = null;
            $scope.feedback.email = null;
            $('.input-file-trigger').removeClass('hide');
            $('.file-return').removeClass('show');
            $('.notification-contact-form').addClass('show');
            setTimeout(function () {
                $('.notification-contact-form').removeClass('show');
            }, 3000)
        });
            
    }
}

angular.module('app', ['ngCookies', 'ngSanitize'])
    .controller('HomeController', HomeController);

$(document).on('click', '.zsiq_custommain', function() {
    if (!(typeof fbq === 'undefined')) {
        fbq('trackCustom', 'chat_start');
    }
});
function initCarousels() {
	const carousels = document.body.querySelectorAll('.js-carousel');

	carousels.forEach(carouselContainer => {
		const carouselBody = carouselContainer.querySelector('.js-carousel-body');
		const btnPrev = carouselContainer.querySelector('.js-carousel-prev');
		const btnNext = carouselContainer.querySelector('.js-carousel-next');
		// btnPrev.classList.add('disabled');
		btnPrev.style.display = 'none';

		if (carouselBody.scrollWidth == carouselBody.clientWidth) {
			btnPrev.style.display = 'none';
			btnNext.style.display = 'none';
		}

		carouselBody.addEventListener("scroll", function(e) {
			if (carouselBody.scrollLeft > 0) {
			//   btnPrev.classList.remove('disabled');
			  btnPrev.style.display = 'block';
			} else {
			//   btnPrev.classList.add('disabled');
			  btnPrev.style.display = 'none';
			}

			if (carouselBody.scrollLeft + carouselBody.clientWidth + 1 >= carouselBody.scrollWidth) {
			//   btnNext.classList.add('disabled');
			  btnNext.style.display = 'none';
			} else {
			//   btnNext.classList.remove('disabled');
			  btnNext.style.display = 'block';
			}
		  })

		btnPrev.addEventListener('click', () => {
			let newScrollPosition = carouselBody.scrollLeft - (carouselBody.clientWidth / 100) * 85;
			newScrollPosition = newScrollPosition >= 10 ? newScrollPosition : 0;
			carouselBody.scrollTo({
				left: newScrollPosition >= 0 ? newScrollPosition : 0,
				behavior: 'smooth',
			});
		});

		btnNext.addEventListener('click', () => {
			let newScrollPosition = carouselBody.scrollLeft + (carouselBody.clientWidth / 100) * 85;
			newScrollPosition =
				newScrollPosition >= carouselBody.scrollWidth + carouselBody.clientWidth
					? carouselBody.scrollWidth + carouselBody.clientWidth
					: newScrollPosition;

			carouselBody.scrollTo({
				left:
					newScrollPosition + 10 >= carouselBody.scrollWidth + carouselBody.clientWidth
						? carouselBody.scrollWidth + carouselBody.clientWidth
						: newScrollPosition,
				behavior: 'smooth',
			});
		});
	});
}

$(document).ready(function () {
	initCarousels();
});

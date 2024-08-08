const SEE_MORE_ROWS = 4;
const SEE_MORE_ROWS_MOBILE = 3;
const SEE_MORE_BULLET_OPTIONS = 2;
const SEE_MORE_LOCATIONS_ROWS = 3;
const SEE_MORE_LOCATIONS_BULLET_OPTIONS = 5;
const SEE_MORE_LOCATIONS_BULLET_OPTIONS_MOBILE = 0;
let locationsToggle = false;
let servicesToggle = false;
let servicePricesToggle = false;

function seeMoreTextListener() {
	const blocks = document.querySelectorAll('.js-text-more');

	blocks.forEach(block => {
		if (block.nodeName == 'DIV' || block.nodeName == 'P') {
			if (block.clientHeight > window.getComputedStyle(block).lineHeight.replace(/px/, '') * SEE_MORE_ROWS) {
				block.parentNode.insertBefore(getSeeMoreBtn(block, block.nodeName), block.nextSibling);
			}
		}

		if (block.nodeName == 'UL' || block.nodeName == 'OL') {
			const children = block.querySelectorAll('li');

			if (children.length > SEE_MORE_BULLET_OPTIONS) {
				block.parentNode.insertBefore(getSeeMoreBtn(block, block.nodeName), block.nextSibling);
			}
		}
	});
}

function seeMoreLocations() {


	if (window.innerWidth > 991) {
		const blocks = document.querySelectorAll('.see-more-locations');
		blocks.forEach(block => {
			const children = block.querySelectorAll('li');
				block.parentNode.insertBefore(getSeeMoreBtnLocation(block, block.nodeName), block.nextSibling);
		})
	} else {
		const blocks = document.querySelectorAll('.see-more-locations-mobile');
		const servicesBlock = document.querySelectorAll('.our-services_mobile');
		const servicePricesBlock = document.querySelectorAll('.header-prices_mobile');
		blocks.forEach(block => {
			const children = block.querySelectorAll('li');
			if (children.length > SEE_MORE_LOCATIONS_BULLET_OPTIONS_MOBILE) {
				block.parentNode.insertBefore(getSeeMoreBtnLocationsMobile(block, block.nodeName), block.nextSibling);
			}
		});
		servicesBlock.forEach(block => {
			const children = block.querySelectorAll('li');
			if (children.length > SEE_MORE_LOCATIONS_BULLET_OPTIONS_MOBILE) {
				block.parentNode.insertBefore(getSeeMoreServicesMobile(block, block.nodeName), block.nextSibling);
			}
		});
		servicePricesBlock.forEach(block => {
			const children = block.querySelectorAll('li');
			if (children.length > SEE_MORE_LOCATIONS_BULLET_OPTIONS_MOBILE) {
				block.parentNode.insertBefore(getSeeMoreServicePricesMobile(block, block.nodeName), block.nextSibling);
			}
		});
	}
}

$(document).ready(function () {
	seeMoreTextListener();
	seeMoreLocations();
});

// -------------- "Private" functions
const getSeeMoreBtn = block => {
	const link = document.createElement('a');

	link.href = '';
	link.classList.add('js-see-more-link');
	link.addEventListener('click', e => {
		e.preventDefault();
		block.classList.add('js-text-more-expanded');
		link.remove();
		block.parentNode.insertBefore(getSeeLessBtn(block), block.nextSibling);
	});

	if (block.nodeName == 'DIV' || block.nodeName == 'P') {
		block.classList.add('js-text-more-toggled');
		block.classList.remove('js-text-more-expanded');
		if (window.innerWidth > 991) {
			block.style['-webkit-line-clamp'] = SEE_MORE_ROWS;
			//block.style.height = window.getComputedStyle(block).lineHeight.replace(/px/, '') * SEE_MORE_ROWS + 'px';
		}
		else {
			block.style['-webkit-line-clamp'] = SEE_MORE_ROWS_MOBILE;
			//block.style.height = window.getComputedStyle(block).lineHeight.replace(/px/, '') * SEE_MORE_ROWS_MOBILE + 30 + 'px';
		}

		link.textContent = 'See more';
	}

	if (block.nodeName == 'UL' || block.nodeName == 'OL') {
		const children = block.querySelectorAll('li');
		children.forEach((x, i) => {
			if (i + 1 > SEE_MORE_BULLET_OPTIONS) {
				x.style.display = 'none';
			}
		});

		link.textContent = (children.length - SEE_MORE_BULLET_OPTIONS) + ' more';
	}

	return link;
};

const getSeeMoreBtnLocation = block => {
	const link = document.createElement('a');
	var city = $(location).attr('pathname');
	city.indexOf(1);
	city = city.split("/")[1];
	link.href = '';
	link.classList.add('js-see-more-link-location');
	link.addEventListener('click', e => {
		e.preventDefault();
		if (city == "birmingham" || city == "edinburgh" || city == "manchester" || city == "st-albans") {
			window.location.pathname = `${city}/cleaning-locations`;
		} else {
			window.location.href = '/cleaning-locations';

		}
	});

	if (block.nodeName == 'UL' || block.nodeName == 'OL') {
		const children = block.querySelectorAll('li');

		link.textContent = 'See more locations';
	}


	return link;
};

const getSeeLessBtnLocations = block => {
	const link = document.createElement('a');

	link.textContent = 'See less locations';
	link.href = '';
	link.classList.add('js-see-less-link');
	link.addEventListener('click', e => {
		e.preventDefault();
		block.classList.remove('js-text-more-expanded');
		link.remove();

		block.parentNode.insertBefore(getSeeMoreBtnLocation(block), block.nextSibling);
	});

	if (block.nodeName == 'DIV' || block.nodeName == 'P') {
		block.classList.remove('js-text-more-locationsToggled');
		block.classList.add('js-text-more-expanded');
		block.style['-webkit-line-clamp'] = 'initial';
		block.style.height = 'auto';
	}

	if (block.nodeName == 'UL' || block.nodeName == 'OL') {
		const children = block.querySelectorAll('li');
		children.forEach((x, i) => {
			x.style.display = 'list-item';
		});
	}

	return link;
};

const getSeeMoreBtnLocationsMobile = block => {
	const locationLink = document.getElementsByClassName('location_mobile')[0]
	locationLink.href = '';
	const children = block.querySelectorAll('li');

	locationLink.addEventListener('click', (e) => {
		e.preventDefault();
		locationsToggle = !locationsToggle;
		showLocations(block, locationsToggle);
	})

	if (!locationsToggle) {
	children.forEach((x) => {
		x.style.display = 'none';
	});
	}
	return locationLink;
};


const showLocations = (block,locationsToggle) => {
	const children = block.querySelectorAll('li');
    const parent = document.getElementsByClassName('location_mobile')[0]

	if (locationsToggle) {
		children.forEach((x, i) => {
			x.style.display = 'block';
		});
		//block.parentNode.insertBefore(getSeeMoreBtnLocation(block), block.nextSibling)
		//block.style.marginBottom = "40px"
	    parent.classList.add('active-nav-link-mobile');
	} else {
		const link = document.querySelector(".js-see-more-link-location")
		children.forEach((x) => {
				x.style.display = 'none';
		});
		//block.style.marginBottom = "0"
		parent.classList.remove('active-nav-link-mobile');
		link.remove()
	}
}

const getSeeLessBtn = block => {
	const link = document.createElement('a');

	link.textContent = 'See less';
	link.href = '';
	link.classList.add('js-see-less-link');
	link.addEventListener('click', e => {
		e.preventDefault();
		block.classList.remove('js-text-more-expanded');
		link.remove();

		block.parentNode.insertBefore(getSeeMoreBtn(block), block.nextSibling);
	});

	if (block.nodeName == 'DIV' || block.nodeName == 'P') {
		block.classList.remove('js-text-more-toggled');
		block.classList.add('js-text-more-expanded');
		block.style['-webkit-line-clamp'] = 'initial';
		block.style.height = 'auto';
	}

	if (block.nodeName == 'UL' || block.nodeName == 'OL') {
		const children = block.querySelectorAll('li');
		children.forEach((x, i) => {
			x.style.display = 'list-item';
		});
	}

	return link;
};

const showServices = (block, servicesToggle) => {
	const children = block.querySelectorAll('li');
    const parent = document.getElementsByClassName('our-service-mobile')[0]

	if (servicesToggle) {
		children.forEach((x) => {
			x.style.display = 'block';
		});
	    parent.classList.add('active-nav-link-mobile');
	} else {
		children.forEach((x) => {
			x.style.display = 'none';
		});
	    parent.classList.remove('active-nav-link-mobile');
	}
}

const showServicePrices = (block, servicePricesToggle) => {
	const children = block.querySelectorAll('li');
	const parent = document.getElementsByClassName('header-prices-mobile')[0]

	if (servicePricesToggle) {
		children.forEach((x) => {
			x.style.display = 'block';
		});
		parent.classList.add('active-nav-link-mobile');
	} else {
		children.forEach((x) => {
			x.style.display = 'none';
		});
		parent.classList.remove('active-nav-link-mobile');
	}
}

const getSeeMoreServicesMobile = block => {
	const locationLink = document.getElementsByClassName('our-service-mobile')[0]
	locationLink.href = '';
	const children = block.querySelectorAll('li');

	locationLink.addEventListener('click', (e) => {
		e.preventDefault();
		servicesToggle = !servicesToggle;
		showServices(block, servicesToggle);
	})

	if (!servicesToggle) {
		children.forEach((x) => {
			x.style.display = 'none';
		});
	}
	return locationLink;
};


const getSeeMoreServicePricesMobile = block => {
	const locationLink = document.getElementsByClassName('header-prices-mobile')[0]
	locationLink.href = '';
	const children = block.querySelectorAll('li');

	locationLink.addEventListener('click', (e) => {
		e.preventDefault();
		servicePricesToggle = !servicePricesToggle;
		showServicePrices(block, servicePricesToggle);
	})

	if (!servicePricesToggle) {
		children.forEach((x) => {
			x.style.display = 'none';
		});
	}
	return locationLink;
};
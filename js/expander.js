function initExpanders() {
	const expanders = document.body.querySelectorAll('.js-expander');
	expanders.forEach(expander => {
		const expanderBtn = expander.querySelector('.js-expander-btn');
		const expanderBody = expander.querySelector('.js-expander-body');
		expanderBtn.addEventListener('click', () => {
			expanderBtn.classList.toggle('expanded');
			expanderBody.classList.toggle('expanded');
		});
	});
}

$(document).ready(function () {
	initExpanders();
});

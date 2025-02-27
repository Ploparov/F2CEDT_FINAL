const pan_left_button = document.getElementById('nav-bar-pan-left');
const pan_right_button = document.getElementById('nav-bar-pan-right');
const page_length = 4;
let isNavigate = false;
let timeoutID;

pan_left_button.addEventListener('click', (event) => {
	pan_left(event);
});

pan_right_button.addEventListener('click', (event) => {
	pan_right(event);
});

const nav_bar_buttons = document
	.getElementById('nav-bar-link')
	.getElementsByTagName('button');

for (let i = 0; i < nav_bar_buttons.length; i++) {
	nav_bar_buttons[i].addEventListener('click', (event) => {
		pan_to_page(i);
	});
}

function pan_left(event) {
	const current_page = document.getElementsByClassName('content-on-show')[0];
	const page_id = parseInt(current_page.id.match`[a-z]*([0-9]+)`[0]);
	const next_page_id = (page_id - 1 + page_length) % page_length;
	const next_page = document.getElementById(`page-id-${next_page_id}`);

	next_page.style.transition = 'none';
	requestAnimationFrame(() => {
		next_page.classList.add('content-on-left');
		next_page.classList.remove('content-on-right');
		requestAnimationFrame(() => {
			next_page.style = null;
			requestAnimationFrame(() => {
				next_page.classList.remove('content-on-left');
				next_page.classList.add('content-on-show');
			});
		});
	});

	current_page.classList.remove('content-on-show');
	current_page.classList.add('content-on-right');
	updatenavbar(next_page_id);
}

function pan_right(event) {
	const current_page = document.getElementsByClassName('content-on-show')[0];
	const page_id = parseInt(current_page.id.match`[a-z]*([0-9]+)`[0]);
	let next_page_id = (page_id + 1) % page_length;
	const next_page = document.getElementById(`page-id-${next_page_id}`);

	next_page.style.transition = 'none';
	requestAnimationFrame(() => {
		next_page.classList.add('content-on-right');
		next_page.classList.remove('content-on-left');
		requestAnimationFrame(() => {
			next_page.style = null;
			requestAnimationFrame(() => {
				next_page.classList.remove('content-on-right');
				next_page.classList.add('content-on-show');
			});
		});
	});

	current_page.classList.add('content-on-left');
	current_page.classList.remove('content-on-show');
	updatenavbar(next_page_id);
}

function pan_to_page(nextpage_id) {
	const current_page = document.getElementsByClassName('content-on-show')[0];
	const page_id = parseInt(current_page.id.match`[a-z]*([0-9]+)`[0]);
	let next_page_id = parseInt(nextpage_id);
	const next_page = document.getElementById(`page-id-${next_page_id}`);

	next_page.style.transition = 'none';
	if (page_id < next_page_id) {
		requestAnimationFrame(() => {
			next_page.classList.add('content-on-right');
			next_page.classList.remove('content-on-left');
			requestAnimationFrame(() => {
				next_page.style = null;
				requestAnimationFrame(() => {
					next_page.classList.remove('content-on-right');
					next_page.classList.add('content-on-show');
				});
			});
		});

		current_page.classList.add('content-on-left');
		current_page.classList.remove('content-on-show');
	} else if (page_id > next_page_id) {
		requestAnimationFrame(() => {
			next_page.classList.add('content-on-left');
			next_page.classList.remove('content-on-right');
			requestAnimationFrame(() => {
				next_page.style = null;
				requestAnimationFrame(() => {
					next_page.classList.remove('content-on-left');
					next_page.classList.add('content-on-show');
				});
			});
		});

		current_page.classList.remove('content-on-show');
		current_page.classList.add('content-on-right');
	}
	updatenavbar(next_page_id);
}

function updatenavbar(current_page_id) {
	const nav_bar = document.getElementById('nav-bar-link');
	const nav_bar_links = nav_bar.getElementsByTagName('button');
	for (let i = 0; i < nav_bar_links.length; i++) {
		nav_bar_links[i].classList.remove('text-selected');
	}
	nav_bar_links[current_page_id].classList.add('text-selected');

	isNavigate = true;
	clearTimeout(timeoutID);

	timeoutID = setTimeout(() => {
		isNavigate = false;
		displayNone(current_page_id);
	}, 1000);
}

function displayNone(page_id) {
	if (!isNavigate) {
		for (let i = 0; i < page_length; i++) {
			if (i == page_id) {
				document.getElementById(`page-id-${i}`).style.display = null;
			} else {
				document.getElementById(`page-id-${i}`).style.display = 'none';
			}
		}
	}
}

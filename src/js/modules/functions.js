import lockPage from './lockPage.js';

export function isWebp() {
	// Проверка поддержки webp
	function testWebp(callback) {
		const webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
	}

	// Добавление класса _webp или _no-webp для HTML
	testWebp(function (support) {
		const className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

export function setSkillsRate() {
	document.querySelectorAll('.skills__line--top').forEach((skill) => {
		setTimeout(() => {
			skill.style.width = `${skill.dataset.length}%`;
		}, 500);
	});
}

export function setLang() {
	const langWrapper = document.querySelector('.lang-group');
	const links = document.querySelectorAll('.lang-group__link');

	langWrapper.addEventListener('click', async ({ target }) => {
		if (target?.closest('.lang-group__link')) {
			location.href = target.getAttribute('href');
			await fetchLanguages();

			if (location.hash === target.getAttribute('href')) {
				links.forEach((link) => link.classList.remove('active'));
				target.classList.add('active');
			}
		}
	});
}

export function changeURLLang() {
	const allLang = ['#en', '#ru', '#uk'];
	const { hash, pathname } = location;

	if (allLang.includes(hash)) {
		document.querySelector(`a[href="${hash}"]`).classList.add('active');
	} else {
		location.href = `${pathname}#en`;
		document.querySelector(`a[href="#en"]`).classList.add('active');
		location.reload();
	}
}

export async function fetchLanguages() {
	const title = document.querySelector('title');
	const hash = location.hash.slice(1);

	lockPage(true);

	try {
		const local = 'files/data.json';
		const gitHub = 'https://starkelessar.github.io/my-resume/files/data.json';
		const url = process.env.NODE_ENV === 'development' ? local : gitHub;

		const response = await fetch(url);
		const { languages } = await response.json();

		title.innerText = languages['title'][hash];
		for (let key in languages) {
			const elements = document.querySelectorAll(`[data-lang="${key}"]`);

			if (elements) {
				elements.forEach((element) => {
					element.innerText = languages[key][hash];
				});
			}
		}

		lockPage(false);
	} catch (error) {
		console.log(error);
	}
}

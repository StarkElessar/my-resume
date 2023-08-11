const lockPage = (isLock) => {
	const loader = document.querySelector('.loader-container');
	const pageWrapper = document.querySelector('.wrapper');
	const lockPaddingValue = window.innerWidth - pageWrapper.offsetWidth;

	document.documentElement.classList.toggle('lock', isLock);
	document.body.style.paddingRight = isLock ? `${lockPaddingValue}px` : '0px';
};

export default lockPage;

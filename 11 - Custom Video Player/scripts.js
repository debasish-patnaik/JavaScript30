const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const toggle = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const rangeSliders = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('.player__button');

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateButton() {
	const icon = video.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function updateProgress(e) {
	const currentProgress = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${currentProgress}%`;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	if (!mouseDown) return;
	video[this.name] = this.value;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach((skipButton) => skipButton.addEventListener('click', skip));

let mouseDown = false;
rangeSliders.forEach((rangeSlider) =>
	rangeSlider.addEventListener('change', handleRangeUpdate)
);
rangeSliders.forEach((rangeSlider) =>
	rangeSlider.addEventListener('mousemove', handleRangeUpdate)
);
rangeSliders.forEach((rangeSlider) =>
	rangeSlider.addEventListener('mousedown', () => (mouseDown = true))
);
rangeSliders.forEach((rangeSlider) =>
	rangeSlider.addEventListener('mouseup', () => (mouseDown = false))
);
rangeSliders.forEach((rangeSlider) =>
	rangeSlider.addEventListener('mouseout', () => (mouseDown = false))
);

let scrubMouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => scrubMouseDown && scrub(e));
progress.addEventListener('mousedown', () => (scrubMouseDown = true));
progress.addEventListener('mouseup', () => (scrubMouseDown = false));
progress.addEventListener('mouseout', () => (scrubMouseDown = false));

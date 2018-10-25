export function formatSessionLifetime(value) {
	if (!value) {
		return '00:00';
	}

	let minutes = 0;
	let seconds = 0;
	let minutesToReturn = 0;
	let secondsToReturn = 0;

	minutes = Math.floor(value / 60);
	seconds = value - minutes * 60;

	if (minutes < 10) {
		minutesToReturn = `0${minutes}`;
	} else {
		minutesToReturn = minutes;
	}

	if (seconds < 10) {
		secondsToReturn = `0${seconds}`;
	} else {
		secondsToReturn = seconds;
	}

	return `${minutesToReturn}:${secondsToReturn}`;
}

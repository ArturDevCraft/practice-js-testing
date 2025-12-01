export default function randomNumber(min, max) {
	if (typeof min !== 'number' || typeof max !== 'number') {
		throw new Error('Scope schould be expressed as a number');
	}
	const number = Math.random() * (max - min) + min;
	return Math.round(number);
}

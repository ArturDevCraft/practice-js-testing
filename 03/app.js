export default function randomNumber(min, max) {
	const number = Math.random() * (max - min) + min;
	return Math.round(number);
}

import randomNumber from './app';

it('When scope 1 - 1 return 1', () => {
	const number = randomNumber(1, 1);
	expect(number).toBe(1);
});

it('When min value is not number throw error', () => {
	function number() {
		randomNumber('a', 1);
	}
	expect(number).toThrow('Min value schould be expressed as a number');
});

it('When max value is not number throw error', () => {
	function number() {
		randomNumber(1, 'a');
	}
	expect(number).toThrow('Max value schould be expressed as a number');
});

it('When min > max throw error', () => {
	function number() {
		randomNumber(3, 1);
	}
	expect(number).toThrow();
});

it('Check number is between min and max', () => {
	const min = 1;
	const max = 10;
	const number = randomNumber(min, max);
	expect(number).toBeLessThanOrEqual(max);
	expect(number).toBeGreaterThanOrEqual(min);
});

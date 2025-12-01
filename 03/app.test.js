import randomNumber from './app';

it('When scope 1 - 1 return 1', () => {
	const number = randomNumber(1, 1);
	expect(number).toBe(1);
});

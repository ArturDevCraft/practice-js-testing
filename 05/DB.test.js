import DB from './DB';

describe('insert, select', () => {
	it('Check insert and select works', () => {
		expect.assertions(1);
		const db = new DB();
		return db.insert({ id: 2 }).then((data) => {
			const promise = db.select(2);
			return promise.then((data) => {
				expect(data.id).toBe(2);
			});
		});
	});

	it('Error when id is not number', () => {
		expect.assertions(1);
		const db = new DB();
		const promise = db.insert({ id: 'aa' });
		return promise.catch((err) => {
			expect(err).toBe('ID can be only number!');
		});
	});

	it('Error when id is duplicated', () => {
		expect.assertions(1);
		const db = new DB();
		return db.insert({ id: 1 }).then((data) => {
			const promise = db.insert({ id: 1 });
			return promise.catch((err) => {
				expect(err).toBe("ID can't be duplicated!");
			});
		});
	});

	it('Error when value not found', () => {
		expect.assertions(1);
		const db = new DB();
		const promise = db.w(99999);
		return promise.catch((err) => {
			expect(err).toBe('ID not found');
		});
	});
});

import DB from './DB';

describe('Add and get data ', () => {
	it('Check insert and select works', () => {
		expect.assertions(2);
		const db = new DB();
		return db.insert({ id: 2 }).then((data) => {
			expect(data.id).toBe(2);
			const promise = db.select(2);
			return promise.then((data) => {
				expect(data.id).toBe(2);
			});
		});
	});

	it('getRows()', () => {
		expect.assertions(2);
		const db = new DB();
		const id = 899;
		return db.insert({ id: id }).then((data) => {
			const promise = db.getRows();
			return promise.then((data) => {
				expect(data.length).toBe(1);
				expect(data[0].id).toBe(id);
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
		const promise = db.select(99999);
		return promise.catch((err) => {
			expect(err).toBe('ID not found');
		});
	});
});

describe('Update and delete data', () => {
	it('remove', () => {
		expect.assertions(2);
		const db = new DB();
		const id = 125;

		//insert example data
		return db.insert({ id }).then((data) => {
			//remove element
			const promise = db.remove(id);
			return promise
				.then((data) => {
					expect(data).toBe('Item was remove!');
				})
				.then(() => {
					//check element doesn't exist in db
					const promise = db.select(id);
					return promise.catch((err) => expect(err).toBe('ID not found'));
				});
		});
	});

	it('update', () => {
		expect.assertions(2);
		const db = new DB();
		const id = 125;
		const updatedData = { data: 'test' };

		//insert example data
		return db.insert({ id }).then((data) => {
			//update element
			const promise = db.update({ id, ...updatedData });
			return promise
				.then((data) => {
					expect(data.id).toBe(id);
				})
				.then(() => {
					//check element exists in db
					const promise = db.select(id);
					return promise.then((data) =>
						expect(data.data).toBe(updatedData.data)
					);
				});
		});
	});

	it('Error when updating id not found', () => {
		expect.assertions(1);

		const db = new DB();
		return db
			.update({ id: 23, data: 'test' })
			.catch((err) => expect(err).toBe('ID not found!'));
	});

	it('Error when removing item not found', () => {
		expect.assertions(1);

		const db = new DB();
		return db.remove(23).catch((err) => expect(err).toBe('Item not exist!'));
	});

	it('truncate', () => {
		expect.assertions(2);
		const db = new DB();
		const id = 125;

		//insert example data
		return db.insert({ id }).then((data) => {
			//truncate
			const promise = db.truncate();
			return promise
				.then((data) => {
					expect(data).toBe(true);
				})
				.then(() => {
					//check db is empty
					const promise = db.getRows();
					return promise.then((data) => expect(data.length).toBe(0));
				});
		});
	});
});

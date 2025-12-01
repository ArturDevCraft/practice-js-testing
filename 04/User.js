export default class User {
	constructor({ email, password }) {
		this.setEmail(email);
		this.setPassword(password);
	}

	setEmail(email) {
		if (!email.includes('@')) {
			throw new Error('Email is incorrect');
		}
		this.email = email;
	}

	setPassword(pass) {
		if (pass.length < 8) {
			throw new Error('Password is incorrect');
		}
		this.password = pass;
	}

	getEmail() {
		return this.email;
	}

	getPassword() {
		return this.password;
	}

	login() {
		if (this.email.includes('devmentor.pl')) {
			return true;
		}
		return false;
	}
}

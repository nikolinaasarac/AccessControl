import {Injectable} from '@nestjs/common';
import admin from 'firebase-admin';

@Injectable()
export class AuthService {
	async login(email: string, password: string) {
		const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ email, password, returnSecuredToken: true }),
		});
		const data = await response.json();
		if (data.error) {
			throw new Error(data.error.message || JSON.stringify(data.error));
		}
		const customToken = await admin.auth().createCustomToken(data.localId);
		console.log(customToken);

		return { token: customToken }
	}
}

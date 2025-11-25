import {BadRequestException, Injectable} from '@nestjs/common';
import admin from 'firebase-admin';
import {UserDto} from "./dto/userDto";

@Injectable()
export class AuthService {
	async login(userDto: UserDto) {
		const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: userDto.email,
				password: userDto.password,
				returnSecureToken: true
			}),
		});
		const data = await response.json();
		if (data.error) {
			throw new BadRequestException(data.error.message || JSON.stringify(data.error));
		}
		const customToken = await admin.auth().createCustomToken(data.localId);
		console.log(customToken);

		return { token: customToken }
	}
}

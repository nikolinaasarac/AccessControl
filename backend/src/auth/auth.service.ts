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

		const user = {
			id: data.localId,
			email: data.email
		};

		return {
			token: data.idToken,
			refreshToken: data.refreshToken,
			expiresIn: data.expiresIn,
			user,
		};
	}

	async getMe(uid: string) {
		try {
			const userRecord = await admin.auth().getUser(uid);
			return {
				uid: userRecord.uid,
				email: userRecord.email,
				displayName: userRecord.displayName,
				photoURL: userRecord.photoURL,
			};
		} catch (error) {
			throw new BadRequestException('Failed to get user info');
		}
	}
}

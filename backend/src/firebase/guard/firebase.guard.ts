import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers.authorization;

		if (!authHeader?.startsWith('Bearer ')) return false;

		const token = authHeader.split(' ')[1];

		try {
			const decodedToken = await admin.auth().verifyIdToken(token);
			request.user = { uid: decodedToken.uid };
			return true;
		} catch (err) {
			return false;
		}
	}
}
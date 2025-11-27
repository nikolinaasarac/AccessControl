import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import {IS_PUBLIC_KEY} from "../../shared/decorators/public.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) return true;

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
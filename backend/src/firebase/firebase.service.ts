import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
	private app: admin.app.App;
	private db: FirebaseFirestore.Firestore;

	constructor() {

		const firebaseConfig = {
			type: process.env.TYPE,
			project_id: process.env.PROJECT_ID,
			private_key_id: process.env.PRIVATE_KEY_ID,
			private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
			client_email: process.env.CLIENT_EMAIL,
			client_id: process.env.CLIENT_ID,
			auth_uri: process.env.AUTH_URI,
			token_uri: process.env.TOKEN_URI,
			auth_provider_x509_cert_url: process.env.AUTH_CERT_URL,
			client_x509_cert_url: process.env.CLIENT_CERT_URL,
			universe_domain: process.env.UNIVERSAL_DOMAIN,
		} as admin.ServiceAccount;

		this.app = admin.apps.length
			? admin.app()
			: admin.initializeApp({
				credential: admin.credential.cert(firebaseConfig),
				databaseURL: process.env.FIREBASE_DATABASE_URL,
			});

		this.db = this.app.firestore();
	}

	get firestore(): admin.firestore.Firestore {
		return this.db;
	}
}
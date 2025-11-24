import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
	#db: FirebaseFirestore.Firestore;
	#collection: FirebaseFirestore.CollectionReference;

	constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
		this.#db = firebaseApp.firestore();
		this.#collection = this.#db.collection('<collection_name>');
	}

	async testConnection(): Promise<string> {
		try {
			await this.#db.listCollections();
			return 'Firebase connected!';
		} catch (err) {
			return `Firebase connection failed: ${err.message}`;
		}
	}
}
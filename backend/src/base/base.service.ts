import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class BaseService<T> {
	constructor(
		protected readonly firebaseService: FirebaseService,
		private readonly collectionName: string,
	) {
	}
	async getAll(): Promise<T[]> {
		const collectionRef = this.firebaseService.firestore.collection(this.collectionName);
		const snapshot = await collectionRef.get();
		return snapshot.docs.map((doc) => doc.data() as T);
	}

	async create(data: Partial<T>): Promise<string> {
		console.log(data);
		const docRef = this.firebaseService.firestore
			.collection(this.collectionName)
			.doc(); // auto-ID
		console.log(data);
		await docRef.set(data);
		return docRef.id;
	}

}
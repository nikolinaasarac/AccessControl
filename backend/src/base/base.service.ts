import {Injectable} from '@nestjs/common';
import {FirebaseService} from '../firebase/firebase.service';
import {firestore} from "firebase-admin";
import CollectionReference = firestore.CollectionReference;

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

	async query(filters: any): Promise<T[]> {
		let collectionRef = this.firebaseService.firestore.collection(this.collectionName);

		const queryFilters = Array.isArray(filters) ? filters : [filters];

		for (const filter of queryFilters) {
			collectionRef = collectionRef.where(filter.field, filter.operator, filter.value) as CollectionReference;
		}

		const snapshot = await collectionRef.get();
		return snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data()
		})) as T[];
	}

	async getById(id: string): Promise<T | null> {
		const docRef = this.firebaseService.firestore
			.collection(this.collectionName)
			.doc(id);

		const doc = await docRef.get();

		return doc.exists ? (doc.data() as T) : null;
	}

	async create(data: Partial<T>): Promise<string> {

		const docRef = this.firebaseService.firestore
			.collection(this.collectionName)
			.doc();

		await docRef.set(data);
		return docRef.id;
	}

}
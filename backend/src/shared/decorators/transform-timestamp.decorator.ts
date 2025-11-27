// decorators/firestore-timestamp.decorator.ts
import { Transform } from 'class-transformer';
import { Timestamp } from 'firebase-admin/firestore';

export function TransformFirestoreTimestamp() {
	return Transform(({ value }) => {
		if (!value) {
			return Timestamp.now(); // ako polje nije postavljeno
		}
		// Ako je već Timestamp
		if (value instanceof Timestamp) return value;
		// Ako je string ISO ili Date, konvertuj u Firestore Timestamp
		const date = typeof value === 'string' ? new Date(value) : value;
		return Timestamp.fromDate(date);
	});
}
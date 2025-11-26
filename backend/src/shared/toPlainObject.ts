import { Timestamp } from 'firebase-admin/firestore';

function isPlainObject(value: any): value is Record<string, any> {
	return Object.prototype.toString.call(value) === '[object Object]';
}

function isFirestoreTimestamp(value: any): value is Timestamp {
	return value instanceof Timestamp;
}

export function toPlainObject(obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map(toPlainObject);
	}

	if (obj === null) {
		return null;
	}

	if (isFirestoreTimestamp(obj)) {
		return obj;
	}

	if (!isPlainObject(obj)) {
		return obj;
	}

	const result: Record<string, any> = {};
	for (const key of Object.keys(obj)) {
		result[key] = toPlainObject(obj[key]);
	}

	return result;
}

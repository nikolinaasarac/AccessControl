import { IsNotEmpty, IsString} from "class-validator";
import {firestore} from "firebase-admin";

export class Otc {
	@IsString()
	@IsNotEmpty()
	id: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	creatorId: string;

	@IsString()
	createdAt: firestore.Timestamp;

	@IsString()
	expiryDate: firestore.Timestamp;

	@IsString()
	code: string;
}

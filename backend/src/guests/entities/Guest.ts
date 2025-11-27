import {IsArray, IsDate, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {TransformFirestoreTimestamp} from "../../shared/decorators/transform-timestamp.decorator";
import {Type} from "class-transformer";

export class Guest {
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	phoneNumber: string;

	@IsOptional()
	@IsString()
	companyName?: string;

	@IsArray()
	@IsString({each: true})
	accessDays: string[];

	@IsOptional()
	@IsString()
	fromTime?: string;

	@IsOptional()
	@IsString()
	toTime?: string;

	@IsString()
	creatorId: string;

	@IsString()
	createdAt: string;
}

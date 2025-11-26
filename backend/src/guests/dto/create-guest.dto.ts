import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateGuestDto {
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
}

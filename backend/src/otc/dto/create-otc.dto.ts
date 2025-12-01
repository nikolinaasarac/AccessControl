import {IsNotEmpty, IsString} from "class-validator";

export class CreateOtcDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}

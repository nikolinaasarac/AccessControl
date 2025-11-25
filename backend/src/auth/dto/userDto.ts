import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";

export class UserDto {
	@IsEmail({}, {message: "Email is not valid"})
	email: string;

	@IsString()
	@IsNotEmpty({message: "Password is required"})
	@MinLength(6, {message: "Password must be at least 6 characters"})
	password: string;
}
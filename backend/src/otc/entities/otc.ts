import { IsNotEmpty, IsString} from "class-validator";

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
	createdAt: string;

	@IsString()
	expiryDate: string;

	@IsString()
	code: string;
}

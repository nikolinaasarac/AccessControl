import {
	Body,
	Controller, Delete,
	Get, Param, Patch,
	Post

} from '@nestjs/common';
import {CurrentUser} from "../shared/decorators/current-user.decorator";
import {OtcsService} from "./otcs.service";
import {CreateOtcDto} from "./dto/create-otc.dto";

@Controller('otcs')
export class OtcsController {
	constructor(private readonly otcsService: OtcsService) {
	}

	@Get() // /otcs
	async getAllOtcs() {
		return await this.otcsService.getAll();
	}

	@Post()
	async createOtcs(@CurrentUser() uid: string, @Body() createOtcDto: CreateOtcDto) {
		return await this.otcsService.createOtc(uid, createOtcDto);
	}

}

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

	@Get('/myOtcs')
	async getMyOtcs(@CurrentUser() uid: string) {
		return await this.otcsService.getMyOtcs(uid);
	}

	@Post()
	async createOtcs(@CurrentUser() uid: string, @Body() createOtcDto: CreateOtcDto) {
		return await this.otcsService.createOtc(uid, createOtcDto);
	}

	@Get(':id') // /guests
	async getOtcById(@Param('id') id: string) {
		return await this.otcsService.getOtcById(id);
	}

	@Delete(':id')
	async deleteOtc(@Param('id') id: string) {
		return await this.otcsService.deleteOtc(id);
	}

}

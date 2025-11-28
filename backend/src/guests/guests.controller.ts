import {
	Body,
	Controller,
	Get, Param, Patch,
	Post

} from '@nestjs/common';
import {GuestsService} from "./guests.service";
import {CreateGuestDto} from "./dto/create-guest.dto";
import {CurrentUser} from "../shared/decorators/current-user.decorator";
import {UpdateGuestDto} from "./dto/update-guest.dto";

@Controller('guests')
export class GuestsController {
	constructor(private readonly guestsService: GuestsService) {
	}

	@Get() // /guests
	async getAllGuests() {
		return await this.guestsService.getAll();
	}

	@Post()
	async createGuest(@CurrentUser() uid: string, @Body() createGuestDto: CreateGuestDto) {
		return await this.guestsService.createGuest(uid, createGuestDto);
	}

	@Get('/me')
	async getMyGuests(@CurrentUser() uid: string) {
		return await this.guestsService.getMyGuests(uid);
	}

	@Get(':id') // /guests
	async getGuestById(@Param('id') id: string) {
		return await this.guestsService.getGuestById(id);
	}

	@Patch(':id')
	async updateGuest(@Param('id') id: string, @Body() updateGuestDto: UpdateGuestDto) {
		return await this.guestsService.updateGuest(id, updateGuestDto);
	}
}

import {BadRequestException, Body, Controller, Get, InternalServerErrorException, Post} from '@nestjs/common';
import {GuestsService} from "./guests.service";
import {CreateGuestDto} from "./dto/create-guest.dto";
import {toPlainObject} from "../shared/toPlainObject";

@Controller('guests')
export class GuestsController {
	constructor(private readonly guestsService: GuestsService) {
	}

	@Get() // /guests
	async getAllGuests() {
		return this.guestsService.getAll();
	}

	@Post()
	async createGuest(@Body() createGuestDto: CreateGuestDto) {
		return await this.guestsService.create(toPlainObject(createGuestDto));
	}
}

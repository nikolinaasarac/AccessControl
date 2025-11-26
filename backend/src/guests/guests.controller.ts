import {Controller, Get} from '@nestjs/common';
import {GuestsService} from "./guests.service";

@Controller('guests')
export class GuestsController {
	constructor(private readonly guestsService: GuestsService) {
	}

	@Get() // /guests
	async getAllGuests() {
		return this.guestsService.getAll();
	}
}

import {
	BadRequestException,
	Body,
	Controller,
	Get,
	InternalServerErrorException, Param,
	Post, Query,
	UseGuards
} from '@nestjs/common';
import {GuestsService} from "./guests.service";
import {CreateGuestDto} from "./dto/create-guest.dto";
import {toPlainObject} from "../shared/toPlainObject";
import {firestore} from "firebase-admin";
import {CurrentUser} from "../shared/decorators/current-user.decorator";
import {FirebaseAuthGuard} from "../firebase/guard/firebase.guard";

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
}

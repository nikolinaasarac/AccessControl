import {BadRequestException, Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Guest} from "./entities/Guest";
import {FirebaseService} from "../firebase/firebase.service";
import {CreateGuestDto} from "./dto/create-guest.dto";
import {firestore} from "firebase-admin";
import {toPlainObject} from "../shared/toPlainObject";
import {UpdateGuestDto} from "./dto/update-guest.dto";
import {GuestStatus} from "../shared/enum/guest-status.enum";
import {UpdateGuestStatusDto} from "./dto/update-guest-status.dto";

@Injectable()
export class GuestsService extends BaseService<Guest> {
	constructor(firebaseService: FirebaseService) {
		super(firebaseService, 'guests');
	}

	async createGuest(uid: string, createGuestDto: CreateGuestDto): Promise<void> {
		const existingGuests = await this.query({
			field: 'phoneNumber',
			operator: '==',
			value: createGuestDto.phoneNumber,
		});

		if (existingGuests.length > 0) {
			throw new BadRequestException("Guest with this phone number already exists.");
		}

		const guestData = {
			...createGuestDto,
			status: GuestStatus.Inactive,
			creatorId: uid,
			createdAt: firestore.Timestamp.now(),
		}

		await super.create(toPlainObject(guestData));
	}

	async getMyGuests(uid: string): Promise<Guest[]> {
		return await super.query({field: "creatorId", operator: "==", value: uid});
	}

	async getGuestById(id: string): Promise<Guest | null> {
		return await super.getById(id);
	}

	async updateGuest(id: string, updateGuestDto: UpdateGuestDto): Promise<void> {
		const existingGuests = await this.query({
			field: 'phoneNumber',
			operator: '==',
			value: updateGuestDto.phoneNumber,
		});

		const otherGuests = existingGuests.filter(g => g.id !== id);

		if (otherGuests.length > 0) {
			throw new BadRequestException("Guest with this phone number already exists.");
		}
		return await super.update(id, toPlainObject(updateGuestDto));
	}

	async updateGuestStatus(id: string, status: UpdateGuestStatusDto): Promise<void> {
		return super.update(id, toPlainObject(status));
	}

	async deleteGuest(id: string): Promise<void> {
		return super.deleteById(id);
	}
}

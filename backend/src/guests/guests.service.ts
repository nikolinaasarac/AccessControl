import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Guest} from "./entities/Guest";
import {FirebaseService} from "../firebase/firebase.service";
import {CreateGuestDto} from "./dto/create-guest.dto";
import {firestore} from "firebase-admin";
import {toPlainObject} from "../shared/toPlainObject";

@Injectable()
export class GuestsService extends BaseService<Guest> {
	constructor(firebaseService: FirebaseService) {
		super(firebaseService, 'guests');
	}

	async createGuest(uid: string, createGuestDto: CreateGuestDto): Promise<string> {

		const guestData = {
			...createGuestDto,
			creatorId: uid,
			createdAt: firestore.Timestamp.now(),
		}

		return super.create(toPlainObject(guestData));
	}

	async getMyGuests(uid: string): Promise<Guest[]> {
		return await super.query({field: "creatorId", operator: "==", value: uid});
	}

	async getGuestById(id: string): Promise<Guest | null> {
		return await super.getById(id);
	}
}

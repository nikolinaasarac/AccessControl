import { Injectable } from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Guest} from "./entities/Guest";
import {FirebaseService} from "../firebase/firebase.service";

@Injectable()
export class GuestsService extends BaseService<Guest> {
	constructor(firebaseService: FirebaseService) {
		super(firebaseService, 'guests');
	}
}

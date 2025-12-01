import {BadRequestException, Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {FirebaseService} from "../firebase/firebase.service";
import {firestore} from "firebase-admin";
import {toPlainObject} from "../shared/toPlainObject";
import {Otc} from "./entities/otc";
import {CreateOtcDto} from "./dto/create-otc.dto";
import {GuestStatus} from "../shared/enum/guest-status.enum";

@Injectable()
export class OtcsService extends BaseService<Otc> {
	constructor(firebaseService: FirebaseService) {
		super(firebaseService, 'otcs');
	}

	async createOtc(uid: string, createOtcDto: CreateOtcDto): Promise<void> {
		const generateSixDigitCode = () => Math.floor(100000 + Math.random() * 900000);
		const expiryDate = firestore.Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

		const otcData = {
			...createOtcDto,
			creatorId: uid,
			createdAt: firestore.Timestamp.now(),
			expiryDate: expiryDate,
			code: generateSixDigitCode()
		};

		await super.create(toPlainObject(otcData));
	}

	async deleteOtc(id: string): Promise<void> {
		return super.deleteById(id);
	}
}

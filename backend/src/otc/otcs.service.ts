import {BadRequestException, Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {FirebaseService} from "../firebase/firebase.service";
import {firestore} from "firebase-admin";
import {toPlainObject} from "../shared/toPlainObject";
import {Otc} from "./entities/otc";
import {CreateOtcDto} from "./dto/create-otc.dto";
import {GuestStatus} from "../shared/enum/guest-status.enum";
import {Guest} from "../guests/entities/Guest";

@Injectable()
export class OtcsService extends BaseService<Otc> {
	constructor(firebaseService: FirebaseService) {
		super(firebaseService, 'otcs');
	}

	async getMyOtcs(uid: string): Promise<Otc[]> {
		return await super.query({field: "creatorId", operator: "==", value: uid});
	}

	async createOtc(uid: string, createOtcDto: CreateOtcDto): Promise<Otc> {
		const generateSixDigitCode = () => Math.floor(100000 + Math.random() * 900000);
		const expiryDate = firestore.Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

		const otcId = this.generateDocId();
		const otcData = {
			...createOtcDto,
			creatorId: uid,
			createdAt: firestore.Timestamp.now(),
			expiryDate: expiryDate,
			code: generateSixDigitCode().toString(),
			id: otcId
		};

		await super.create(toPlainObject(otcData), otcId);
		return otcData;
	}

	async deleteOtc(id: string): Promise<void> {
		return super.deleteById(id);
	}
}

import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {FirebaseService} from "../firebase/firebase.service";
import {firestore} from "firebase-admin";
import {toPlainObject} from "../shared/toPlainObject";
import {Otc} from "./entities/otc";
import {CreateOtcDto} from "./dto/create-otc.dto";

@Injectable()
export class OtcsService extends BaseService<Otc> {
	constructor(firebaseService: FirebaseService) {
		super(firebaseService, 'otcs');
	}

	async getMyOtcs(uid: string): Promise<Otc[]> {
		return await super.query({field: "creatorId", operator: "==", value: uid});
	}

	private async generateUniqueCode(): Promise<string> {
		const generateSixDigitCode = () => Math.floor(100000 + Math.random() * 900000).toString();
		let code: string;
		let existing: Otc[] = [];

		do {
			code = generateSixDigitCode();
			existing = await this.query({
				field: 'code',
				operator: '==',
				value: code,
			});
		} while (existing.some(e => e.expiryDate.toDate() > new Date()));

		return code;
	}

	async createOtc(uid: string, createOtcDto: CreateOtcDto): Promise<Otc> {
		const code = await this.generateUniqueCode();
		const expiryDate = firestore.Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
		const otcId = this.generateDocId();

		const otcData = {
			...createOtcDto,
			creatorId: uid,
			createdAt: firestore.Timestamp.now(),
			expiryDate,
			code,
			id: otcId
		};

		await super.create(toPlainObject(otcData), otcId);
		return otcData;
	}

	async getOtcById(id: string): Promise<Otc | null> {
		return await super.getById(id);
	}

	async deleteOtc(id: string): Promise<void> {
		return super.deleteById(id);
	}
}

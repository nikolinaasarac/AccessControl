import {CreateOtcDto} from "@/dto/create-otc.dto";
import {Otc} from "@/models/otc.model";
import BaseService from "@/lib/service/base.service";

export default class OtcsService {
	static readonly ENDPOINT = '/otcs';

	static async createOtc(otcData: CreateOtcDto): Promise<Otc> {
		return BaseService.create<Otc>(this.ENDPOINT, otcData);
	}


}
import {CreateOtcDto} from "@/dto/create-otc.dto";
import {Otc} from "@/models/otc.model";
import BaseService from "@/lib/service/base.service";

export default class OtcsService {
	static readonly ENDPOINT = '/otcs';

	static async getMyOtcs() {
		return BaseService.fetchList<Otc[]>(this.ENDPOINT + '/myOtcs');
	}

	static async createOtc(otcData: CreateOtcDto): Promise<Otc> {
		return BaseService.create<Otc>(this.ENDPOINT, otcData);
	}

	static async getOtcById(id: string): Promise<Otc> {
		return BaseService.fetch<Otc>(`${this.ENDPOINT}/${id}`);
	}

	static async deleteOtc(id: string): Promise<void> {
		return BaseService.delete(`${this.ENDPOINT}/${id}`);
	}
}
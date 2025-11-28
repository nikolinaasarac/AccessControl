import QueryParams from "@/models/QueryParams.model";
import BaseService from "@/lib/service/base.service";
import {Guest} from "@/models/Guest.model";
import {UpdateGuestDto} from "@/dto/update-guest.dto";

export default class GuestsService {
	static readonly ENDPOINT = '/guests';

	static async getGuests(queryParams: QueryParams = {}) {
		return BaseService.fetchList<Guest[]>(this.ENDPOINT)
	}

	static async getMyGuests() {
		return BaseService.fetchList<Guest[]>(this.ENDPOINT + '/me');
	}

	static async createGuest(guestData: Guest): Promise<Guest> {
		return BaseService.create<Guest>(this.ENDPOINT, guestData);
	}

	static async getGuestById(id: string): Promise<Guest> {
		return BaseService.fetch<Guest>(`${this.ENDPOINT}/${id}`);
	}
	static async updateGuest(id: string, updateGuestDto: UpdateGuestDto): Promise<void> {
		return BaseService.update(`${this.ENDPOINT}/${id}`, updateGuestDto);
	}
}
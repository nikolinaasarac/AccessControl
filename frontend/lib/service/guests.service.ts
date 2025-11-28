import QueryParams from "@/models/QueryParams.model";
import BaseService from "@/lib/service/base.service";
import {Guest} from "@/models/Guest.model";
import {UpdateGuestDto} from "@/dto/update-guest.dto";
import {GuestStatus} from "@/shared/enum/guest-status.enum";
import {CreateGuestDto} from "@/dto/create-guest.dto";

export default class GuestsService {
	static readonly ENDPOINT = '/guests';

	static async getGuests(queryParams: QueryParams = {}) {
		return BaseService.fetchList<Guest[]>(this.ENDPOINT)
	}

	static async getMyGuests() {
		return BaseService.fetchList<Guest[]>(this.ENDPOINT + '/me');
	}

	static async createGuest(guestData: CreateGuestDto): Promise<Guest> {
		return BaseService.create<Guest>(this.ENDPOINT, guestData);
	}

	static async getGuestById(id: string): Promise<Guest> {
		return BaseService.fetch<Guest>(`${this.ENDPOINT}/${id}`);
	}

	static async updateGuest(id: string, updateGuestDto: UpdateGuestDto): Promise<void> {
		return BaseService.update(`${this.ENDPOINT}/${id}`, updateGuestDto);
	}

	static async deleteGuest(id: string): Promise<void> {
		return BaseService.delete(`${this.ENDPOINT}/${id}`);
	}

	static async updateGuestStatus(id: string, status: GuestStatus): Promise<void> {
		return BaseService.update(`${this.ENDPOINT}/${id}/updateStatus`, { status });
	}
}
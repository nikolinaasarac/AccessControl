import QueryParams from "@/models/QueryParams.model";
import BaseService from "@/lib/service/base.service";
import {Guest} from "@/models/Guest.model";

export default class UserService {
	static readonly ENDPOINT = '/guests';

	static async getGuests(queryParams: QueryParams = {}) {
		return BaseService.fetchList<Guest[]>(this.ENDPOINT)
	}
}
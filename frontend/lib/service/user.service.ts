import BaseService from "@/lib/service/base.service";
import {User} from "@/models/user.model";

export default class UserService {
	static readonly ENDPOINT = '/auth';

	static async getCurrentUser(): Promise<User> {
		return BaseService.fetch<User>(`${this.ENDPOINT}/me`, {});
	}
}
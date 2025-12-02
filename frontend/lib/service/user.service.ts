import BaseService from "@/lib/service/base.service";
import {LoginResponse, User} from "@/models/user.model";

export default class UserService {
	static readonly ENDPOINT = '/auth';

	static async getCurrentUser(): Promise<User> {
		return await BaseService.fetch<User>(`${this.ENDPOINT}/me`, {});
	}

	static async login(email: string, password: string): Promise<LoginResponse> {
		return  await BaseService.create<LoginResponse>(
			`${this.ENDPOINT}/login`, { email, password });
	}
}
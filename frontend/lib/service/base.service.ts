import ApiClient from "@/lib/api/api-client";
import QueryParams from "@/models/QueryParams.model";

export default class BaseService {
	static async fetch<T>(endpoint: string, queryParams: QueryParams = {}, config = {}): Promise<T> {
		return ApiClient.get(endpoint, {}, {}).then((response) => response.data);
	}

	static async fetchList<T>(endpoint: string, queryParams: QueryParams = {}, config = {}): Promise<T> {
		return ApiClient.get(endpoint, queryParams, config).then((response) => response.data);
	}

	static async create<T>(endpoint: string, body: T | any, queryParams: QueryParams = {}): Promise<T> {
		return ApiClient.post(endpoint, body, queryParams).then((response) => response.data);
	}

	static async update<T>(endpoint: string, body: T | any, queryParams: QueryParams = {}): Promise<T> {
		return ApiClient.patch(endpoint, body, queryParams).then((response) => response.data);
	}

	static async delete<T>(endpoint: string): Promise<T> {
		return ApiClient.remove(endpoint).then((response) => response.data);
	}
}
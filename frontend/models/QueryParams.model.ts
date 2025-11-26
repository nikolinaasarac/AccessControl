export default interface QueryParams {
	sort?: string;
	limit?: number;
	page?: number;
	populate?: string;
	deleted?: boolean;
	lang?: string;
	from?: string;
	to?: string;
}
export interface Otc {
	id: string;
	name: string;
	creatorId: string;
	createdAt: DateOtc,
	expiryDate: DateOtc;
	code: string;
}

export interface DateOtc{
	_seconds: number;
	_nanoseconds: number;
}

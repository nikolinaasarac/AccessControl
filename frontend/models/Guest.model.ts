export interface Guest{
	firstName: string;
	lastName: string;
	phoneNumber: string;
	company?: boolean;
	companyName?: string;
	accessDays?: string[];
	anyTime?: boolean;
	fromTime?: string;
	toTime?: string;
	createdAt: string;
}
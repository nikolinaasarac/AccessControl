export interface UpdateGuestDto {
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	company?: boolean;
	companyName?: string | null;
	accessDays?: string[];
	anyTime?: boolean;
	fromTime?: string | null;
	toTime?: string | null;
}
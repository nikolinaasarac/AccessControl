import {GuestStatus} from "@/shared/enum/guest-status.enum";

export interface Guest{
	id?: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	company?: boolean;
	companyName?: string | null;
	accessDays?: string[];
	anyTime?: boolean;
	fromTime?: string | null;
	toTime?: string | null;
	createdAt?: Date | null;
	creatorId?: string;
	status: GuestStatus;
}
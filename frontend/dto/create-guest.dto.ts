import {GuestStatus} from "@/shared/enum/guest-status.enum";

export interface CreateGuestDto{
	firstName: string;
	lastName: string;
	phoneNumber: string;
	companyName?: string | null;
	accessDays?: string[];
	fromTime?: string | null;
	toTime?: string | null;
}
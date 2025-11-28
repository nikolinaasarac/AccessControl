import { IsEnum } from "class-validator";
import {GuestStatus} from "../../shared/enum/guest-status.enum";

export class UpdateGuestStatusDto {
	@IsEnum(GuestStatus)
	status: GuestStatus;
}
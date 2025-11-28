import * as React from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {GuestStatus} from "@/shared/enum/guest-status.enum";

interface GuestStatusSelectProps {
	value: GuestStatus;
	onChange: (value: GuestStatus) => void;
}

export function GuestStatusSelect({ value, onChange }: GuestStatusSelectProps) {
	return (
		<Select value={value} onValueChange={(val) => onChange(val as GuestStatus)}>
			<SelectTrigger>
				<SelectValue placeholder="Select status" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Status</SelectLabel>
					{Object.values(GuestStatus).map((status) => (
						<SelectItem key={status} value={status}>
							{status.charAt(0).toUpperCase() + status.slice(1)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
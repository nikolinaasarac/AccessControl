"use client";

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

const getTriggerClasses = (status: GuestStatus) => {
	switch (status) {
		case GuestStatus.Active:
			return "bg-green-100 text-green-800";
		case GuestStatus.Inactive:
			return "bg-yellow-100 text-yellow-800";
		case GuestStatus.Suspended:
			return "bg-red-100 text-red-800";
		default:
			return "";
	}
};

export function GuestStatusSelect({value, onChange}: GuestStatusSelectProps) {
	return (
		<Select value={value} onValueChange={(val) => onChange(val as GuestStatus)}>
			<SelectTrigger className={`${getTriggerClasses(value)}`}>
				<SelectValue placeholder="Select status"/>
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
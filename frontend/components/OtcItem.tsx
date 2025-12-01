"use client";

import { Card } from "@/components/ui/card";
import {DateOtc} from "@/models/otc.model";

interface OTCItemProps {
	id: string;
	name: string;
	code: string;
	validFrom: DateOtc;
	validTo: DateOtc;
}

export function OtcItem({ id, code, validFrom, validTo, name}: OTCItemProps) {

	function formatFirestoreDate(timestamp: DateOtc) {
		const date = new Date(timestamp._seconds * 1000);
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return date.toLocaleString("en-US", options);
	}

	return (
		<li className="w-full">
			<Card className="p-4 flex flex-col gap-1 shadow-sm border rounded-lg">
				<p className="text-sm text-gray-700"><strong>Code:</strong> {code}</p>
				<p className="text-sm text-gray-700"><strong>Name:</strong> {name}</p>
				<div className="text-sm text-gray-700">
					<strong>Valid to:</strong>{" "}{formatFirestoreDate(validTo)}
				</div>

			</Card>
		</li>
	);
}
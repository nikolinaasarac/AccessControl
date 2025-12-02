"use client";

import {Card} from "@/components/ui/card";
import {DateOtc} from "@/models/otc.model";
import {Clock} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation";

interface OTCItemProps {
	id: string;
	name: string;
	code: string;
	validFrom: DateOtc;
	validTo: DateOtc;
}

export function OtcItem({id, code, validFrom, validTo, name}: OTCItemProps) {
	const router = useRouter();

	const handleClick = () => {
		router.push(`guests/otc/${id}`);
	};

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

	const expiryDate = new Date(validTo._seconds * 1000);
	const today = new Date();

	const isExpired = expiryDate < today;

	return (
		<li className="w-full">
			<Card className={`hover:cursor-pointer p-4 flex flex-col gap-3 shadow-sm border rounded-xl  ${
						isExpired ? "bg-red-200" : "bg-green-200"
					}`} onClick={handleClick}>

				<p className="text-xl font-semibold text-center text-gray-900">
					{name}
				</p>

				<div className="flex justify-center">
					<Badge variant="secondary" className="text-base px-3 py-1 rounded-md">
						{code}
					</Badge>
				</div>

				<div
					className="flex items-center justify-center gap-2 text-sm mt-1"
				>
					<Clock size={16} />
					<span>
                        {isExpired ? "Expired:" : "Valid to:"} {formatFirestoreDate(validTo)}
                    </span>
				</div>

			</Card>
		</li>
	);
}
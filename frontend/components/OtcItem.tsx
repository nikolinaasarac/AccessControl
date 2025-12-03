"use client";

import {DateOtc} from "@/models/otc.model";
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
		return date.toLocaleString("en-US", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	const expiryDate = new Date(validTo._seconds * 1000);
	const isExpired = expiryDate < new Date();

	const statusLabel = isExpired ? "Expired" : "Valid";
	const statusDate = formatFirestoreDate(validTo);

	const getStatusClasses = () => {
		return isExpired
			? "bg-red-100 text-red-800"
			: "bg-green-100 text-green-800";
	};

	return (
		<li
			onClick={handleClick}
			className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer"
		>
			<div className="flex items-center gap-3 sm:gap-4">


				<div className="flex flex-col min-w-0">
					<span className="text-sm sm:text-base font-semibold text-gray-900 truncate">
						Code: {code}
					</span>
					{name && (
						<span className="text-xs sm:text-sm text-gray-500 truncate">
							Name: {name}
						</span>
					)}
				</div>
			</div>
			<div className="flex flex-col items-end">
				<span className={`px-2 py-1 text-xs sm:text-sm rounded-full font-semibold whitespace-nowrap ${getStatusClasses()}`}>
					{statusLabel}
				</span>

				<span className="text-[11px] sm:text-xs text-gray-500 mt-1 whitespace-nowrap">
					{isExpired ? "Expired at" : "Valid to"} {statusDate}
				</span>
			</div>
		</li>
	);
}
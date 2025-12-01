"use client";

import {useRouter} from "next/navigation";
import {GuestStatus} from "@/shared/enum/guest-status.enum";

type Props = {
	id: string | undefined;
	firstName: string;
	lastName: string;
	companyName?: string | null;
	status: GuestStatus;
};

const getStatusClasses = (status: GuestStatus) => {
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

export function GuestItem({id, firstName, lastName, companyName, status}: Props) {
	const router = useRouter();
	const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

	const handleClick = () => {
		router.push(`/guests/${id}`);
	};

	return (
		<li
			onClick={handleClick}
			className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer"
		>
			<div className="flex items-center gap-3 sm:gap-4">
				<div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 flex items-center justify-center bg-blue-500 text-white font-semibold rounded-full text-lg sm:text-xl">
					{initials}
				</div>

				<div className="flex flex-col min-w-0">
			<span className="text-sm sm:text-base font-semibold text-gray-900 truncate">
				{firstName} {lastName}
			</span>

					{companyName && (
						<span className="text-xs sm:text-sm text-gray-500 truncate">
					Company: {companyName}
				</span>
					)}
				</div>
			</div>

			<span
				className={`mt-2 sm:mt-0 px-2 py-1 text-xs sm:text-sm rounded-full font-semibold whitespace-nowrap ${getStatusClasses(status)}`}
			>
		{status.charAt(0).toUpperCase() + status.slice(1)}
	</span>
		</li>
	);
}
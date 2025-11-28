"use client";

import { useRouter } from "next/navigation";
import { GuestStatus } from "@/shared/enum/guest-status.enum";

type Props = {
	id: string | undefined;
	firstName: string;
	lastName: string;
	companyName?: string | null;
	status: GuestStatus;
};

// Funkcija za boje badge-a
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

export function GuestItem({ id, firstName, lastName, companyName, status }: Props) {
	const router = useRouter();
	const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

	const handleClick = () => {
		router.push(`/guests/${id}`);
	};

	return (
		<li
			onClick={handleClick}
			className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer"
		>
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-semibold rounded-full text-lg">
					{initials}
				</div>

				<div className="flex flex-col">
          <span className="text-base font-semibold text-gray-900">
            {firstName} {lastName}
          </span>

					{companyName && (
						<span className="text-sm text-gray-500">
              Company: {companyName}
            </span>
					)}
				</div>
			</div>

			<span
				className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusClasses(status)}`}
			>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
		</li>
	);
}
import {useRouter} from "next/navigation";

type Props = {
	id: string| undefined;
	firstName: string;
	lastName: string;
	companyName?: string | null;
};

export function GuestItem({id, firstName, lastName, companyName }: Props) {
	const router = useRouter();
	const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

	const handleClick = () => {
		router.push(`/guests/invite/${id}`);
	};

	return (
		<li onClick={handleClick}
			className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
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
		</li>
	);
}
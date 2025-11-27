type Props = {
	firstName: string;
	lastName: string;
	companyName?: string | null;
};

export function GuestItem({ firstName, lastName, companyName }: Props) {
	const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

	return (
		<li className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition">

			<div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-semibold rounded-full text-lg">
				{initials}
			</div>

			<div className="flex flex-col">
				<span className="text-base font-semibold text-gray-900">
					{firstName} {lastName}
				</span>

				{companyName && (
					<span className="text-sm text-gray-500">
						{companyName}
					</span>
				)}
			</div>
		</li>
	);
}
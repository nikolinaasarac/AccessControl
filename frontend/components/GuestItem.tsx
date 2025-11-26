
type Props = {
	firstName: string;
	lastName: string;
	company?: string;
}

export function GuestItem ({ firstName, lastName, company }:Props){
	return (
		<li className="border rounded p-2 flex justify-between">
			<span>{firstName} {lastName}</span>
			{company && <span className="text-gray-500">{company}</span>}
		</li>
	);
};
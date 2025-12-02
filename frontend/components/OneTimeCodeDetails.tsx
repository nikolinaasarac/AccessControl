import { DateOtc } from "@/models/otc.model";

type Props = {
	code: string;
	createdAt: DateOtc;
	expiryDate: DateOtc;
	name: string;
}

export function OneTimeCodeDetails({ code, createdAt, expiryDate, name }: Props) {
	const formatDate = (timestamp: DateOtc) =>
		new Date(timestamp._seconds * 1000).toLocaleString("en-US", {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});

	return (
		<div className="from-blue-50 to-white max-w-md mx-auto">
			<p className="text-gray-700 mb-4">
				Please share this code with <span className="font-semibold text-blue-700">{name}</span>. Keep in mind that this code is <span className="font-medium text-red-500">one-time use</span>.
			</p>

			<div className="bg-blue-100 p-4 rounded-lg text-center mb-4">
				<p className="text-3xl font-bold tracking-widest text-blue-800">{code}</p>
			</div>

			<div className="text-gray-600 text-sm space-y-1">
				<p><span className="font-medium text-gray-800">Activation:</span> {formatDate(createdAt)}</p>
				<p><span className="font-medium text-gray-800">Expires:</span> {formatDate(expiryDate)}</p>
			</div>
		</div>
	)
}
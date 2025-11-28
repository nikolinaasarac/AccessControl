"use client";

import { useEffect, useState } from "react";
import {useParams, useRouter} from "next/navigation";
import GuestForm from "@/components/GuestForm";
import GuestsService from "@/lib/service/guests.service";
import {Guest} from "@/models/Guest.model"
import {useAuth} from "@/context/auth-context";
import {Button} from "@/components/ui/button";

export default function EditGuestPage() {
	const router = useRouter();
	const {user} = useAuth();
	if(!user)
		return null;
	const { id } = useParams();
	const guestId = Array.isArray(id) ? id[0] : id;

	if (!guestId) return null;
	const [initialValues, setInitialValues] = useState<Guest | null>(null);

	useEffect(() => {
		const load = async () => {
			const g = await GuestsService.getGuestById(guestId);

			setInitialValues({
				firstName: g.firstName,
				lastName: g.lastName,
				company: !!g.companyName,
				companyName: g.companyName || "",
				phoneNumber: g.phoneNumber,
				accessDays: g.accessDays,
				anyTime: !g.fromTime,
				fromTime: g.fromTime ?? "00:00",
				toTime: g.toTime ?? "00:00",
			});
		};
		load();
	}, [id]);

	const handleSubmit = async (values: any) => {
		//await UserService.updateGuest(id, values);
		alert("Guest updated!");
	};

	if (!initialValues) return <p>Loading...</p>;

	return (<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
		<div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-xl font-bold">Edit Guest</h1>
				<Button className="px-4 py-2 hover:cursor-pointer" onClick={() => router.back()}>
					Back
				</Button>
			</div>
			<GuestForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />
		</div>
	</div>);
}

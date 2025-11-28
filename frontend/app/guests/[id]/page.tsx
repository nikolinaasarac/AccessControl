"use client";

import { useEffect, useState } from "react";
import {useParams, useRouter} from "next/navigation";
import GuestForm from "@/components/GuestForm";
import GuestsService from "@/lib/service/guests.service";
import {useAuth} from "@/context/auth-context";
import {Button} from "@/components/ui/button";
import {UpdateGuestDto} from "@/dto/update-guest.dto";
import {toast} from "sonner";

export default function EditGuestPage() {
	const router = useRouter();
	const {user} = useAuth();
	const {id} = useParams();
	if (!user)
		return null;
	const guestId = Array.isArray(id) ? id[0] : id;

	if (!guestId) return null;
	const [initialValues, setInitialValues] = useState<UpdateGuestDto | null>(null);

	useEffect(() => {
		const load = async () => {
			const g = await GuestsService.getGuestById(guestId);

			setInitialValues({
				firstName: g.firstName || "",
				lastName: g.lastName || "",
				company: !!g.companyName,
				companyName: g.companyName || "",
				phoneNumber: g.phoneNumber || "",
				accessDays: g.accessDays || [],
				anyTime: !(g.fromTime && g.toTime),
				fromTime: g.fromTime ?? "",
				toTime: g.toTime ?? "",
			});
		};
		load();
	}, [id]);

	const handleSubmit = async (values: UpdateGuestDto) => {
		console.log(values);
		try {
			await GuestsService.updateGuest(guestId, {
				firstName: values.firstName,
				lastName: values.lastName,
				phoneNumber: values.phoneNumber,
				companyName: values.company ? values.companyName : null,
				accessDays: values.accessDays,
				fromTime: values.anyTime ? null : values.fromTime,
				toTime: values.anyTime ? null : values.toTime
			});
			toast.success("Guest successfully created!");
			router.back();
		} catch (error) {
			console.error("Failed to update guest", error);
			toast.error("Failed to update guest. Please try again.");
		}
	}

		if (!initialValues) return <p>Loading...</p>;

		return (<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div
				className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-bold">Edit Guest</h1>
					<div className="flex gap-1">
					<Button className="px-4 py-2 hover:cursor-pointer" onClick={() => router.back()}>
						Delete Guest
					</Button>
					<Button className="px-4 py-2 hover:cursor-pointer" onClick={() => router.back()}>
						Back
					</Button>
					</div>
				</div>
				<GuestForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true}/>
			</div>
		</div>);
}

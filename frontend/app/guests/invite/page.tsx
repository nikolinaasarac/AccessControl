"use client"

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/context/auth-context";
import GuestsService from "@/lib/service/guests.service";
import GuestForm from "@/components/GuestForm";
import {toast} from "sonner";

export default function InvitePage() {
	const router = useRouter();
	const {user} = useAuth();
	if (!user)
		return null;

	const daysOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

	const initialValues = {
		firstName: "",
		lastName: "",
		company: false,
		companyName: "",
		phoneNumber: "",
		accessDays: [] as string[],
		anyTime: false,
		fromTime: "",
		toTime: "",
	};

	const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
		try {
			const sortedAccessDays = [...values.accessDays].sort(
				(a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
			);
			await GuestsService.createGuest({
				firstName: values.firstName,
				lastName: values.lastName,
				phoneNumber: values.phoneNumber,
				companyName: values.company ? values.companyName : null,
				accessDays: sortedAccessDays,
				fromTime: values.anyTime ? null : values.fromTime,
				toTime: values.anyTime ? null : values.toTime
			});
			resetForm();
			toast.success("Guest successfully created!");
			router.back();
		} catch (error: unknown) {
			const message =
				typeof error === "object" && error !== null && "message" in error
					? (error as any).message
					: "Unknown error occurred";
			toast.error("Failed to create guest. " + message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div
				className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-bold">Invite Guests</h1>
					<Button className="px-4 py-2 hover:cursor-pointer" onClick={() => router.back()}>
						Back
					</Button>
				</div>

				<GuestForm
					initialValues={initialValues}
					onSubmit={handleSubmit}
					isEdit={false}
				/>
			</div>
		</div>
	);
}
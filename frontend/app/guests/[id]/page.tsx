"use client";

import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import GuestForm from "@/components/GuestForm";
import GuestsService from "@/lib/service/guests.service";
import {useAuth} from "@/context/auth-context";
import {Button} from "@/components/ui/button";
import {UpdateGuestDto} from "@/dto/update-guest.dto";
import {toast} from "sonner";
import {GuestStatusSelect} from "@/components/GuestStatus";
import {GuestStatus} from "@/shared/enum/guest-status.enum";
import {EditGuestSkeleton} from "@/components/skeleton/EditGuestSkeleton";
import {ConfirmDialog} from "@/components/ConfirmDialog";

export default function EditGuestPage() {
	console.log('Edit Guest Page');
	const router = useRouter();
	const {user} = useAuth();
	const {id} = useParams();
	if (!user)
		return null;
	const guestId = Array.isArray(id) ? id[0] : id;

	if (!guestId) return null;

	const [initialValues, setInitialValues] = useState<UpdateGuestDto | null>(null);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState<GuestStatus>(GuestStatus.Inactive);
	const [showConfirm, setShowConfirm] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [pendingStatus, setPendingStatus] = useState<GuestStatus | null>(null);

	const handleStatusChange = (newStatus: GuestStatus) => {
		if (newStatus === status) return;
		setPendingStatus(newStatus);
		setShowConfirm(true);
	};

	const confirmStatusChange = async () => {
		if (!pendingStatus) return;

		try {
			await GuestsService.updateGuestStatus(guestId, pendingStatus);
			setStatus(pendingStatus);
			toast.success("Guest status updated!");
		} catch (err) {
			toast.error("Failed to update status. Please try again.");
		} finally {
			setPendingStatus(null);
			setShowConfirm(false);
		}
	};

	useEffect(() => {
		const load = async () => {
			const g = await GuestsService.getGuestById(guestId);
			console.error("Guests found!");
			if(!g) {
				console.error("Guests not found! Ova");
				router.push("/not-found");
				return;
			}

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
			setStatus(g.status || GuestStatus.Inactive);
			setLoading(false);
		};
		load();
	}, [id]);

	const handleSubmit = async (values: UpdateGuestDto) => {
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
			toast.success("Guest successfully updated!");
			router.back();
		} catch (error: unknown) {
			const message =
				typeof error === "object" && error !== null && "message" in error
					? (error as any).message
					: "Unknown error occurred";
			toast.error("Failed to update guest. " + message);
		}
	}

	const handleDelete = async () => {
		try {
			await GuestsService.deleteGuest(guestId);
			toast.success("Guest successfully deleted!");
			router.back();
		} catch (error) {
			toast.error("Failed to delete guest. Please try again.");
		}
	}

	if (loading) {
		return <EditGuestSkeleton />
	}

	return (
		<div className="bg-gray-100 p-6 flex items-center justify-center">
			<div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-bold">Edit Guest</h1>
					<div className="flex flex-wrap gap-2 justify-end">
						<GuestStatusSelect value={status} onChange={handleStatusChange} />
						<Button className="px-4 py-2 hover:cursor-pointer bg-red-700 hover:bg-red-800" onClick={() => setShowDelete(true)}>
							Delete Guest
						</Button>
						<Button className="px-4 py-2 hover:cursor-pointer" onClick={() => router.back()}>
							Back
						</Button>
					</div>
				</div>

				<GuestForm initialValues={initialValues} onSubmit={handleSubmit} isEdit={true} />

				<ConfirmDialog
					open={showConfirm}
					title="Confirm Status Change"
					confirmText="Confirm"
					cancelText="Cancel"
					description={
						<>
							Do you really want to change the status to <strong>{pendingStatus}</strong>?
						</>
					}
					onConfirm={confirmStatusChange}
					onCancel={() => setShowConfirm(false)}
				/>

				<ConfirmDialog
					open={showDelete}
					title="Delete Guest"
					description="This action cannot be undone. This will permanently delete this guest."
					confirmText="Delete"
					cancelText="Cancel"
					confirmColor="bg-red-600 hover:bg-red-700"
					onConfirm={handleDelete}
					onCancel={() => setShowDelete(false)}
				/>
			</div>
		</div>
	);
}

"use client"

import {useParams, useRouter} from "next/navigation";
import {useAuth} from "@/context/auth-context";
import {OneTimeCodeDetails} from "@/components/OneTimeCodeDetails";
import {useEffect, useState} from "react";
import {Otc} from "@/models/otc.model";
import OtcsService from "@/lib/service/otcs.service";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {ConfirmDialog} from "@/components/ConfirmDialog";
import {OtcDetailsSkeleton} from "@/components/skeleton/OtcDetailsSkeleton";

export default function OTCInfo() {
	const router = useRouter();
	const {user} = useAuth();
	const {id} = useParams();
	console.log(id);
	const otcId = Array.isArray(id) ? id[0] : id;
	console.log("otc Id: ", otcId);

	if (!otcId)
		return null;
	const [otc, setOtc] = useState<Otc | null>(null);
	const [loading, setLoading] = useState(true);

	const [showDelete, setShowDelete] = useState(false);

	const handleDelete = async () => {
		try {
			await OtcsService.deleteOtc(otcId);
			toast.success("OTC successfully deleted!");
			router.back();
		} catch (error) {
			toast.error("Failed to delete OTC. Please try again.");
		}
	}

	useEffect(() => {
		console.log("otcId: ", otcId);
		if (!user || !otcId) return;

		const fetchOtc = async () => {
			try {
				setLoading(true);
				const data = await OtcsService.getOtcById(otcId);
				setOtc(data);
			} catch (error) {
				console.error("Failed to fetch OTC", error);
			} finally {
				setLoading(false);
			}
		};

		fetchOtc();
	}, [otcId]);


	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div
				className="w-full min-h-[25vh] max-h-[60vh] max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold">
						One-Time Code
					</h1>
					<Button
						className="px-4 py-2 hover:cursor-pointer"
						onClick={() => router.back()}
					>
						Back
					</Button>
				</div>
				<div className="my-auto overflow-auto">
					{loading ? (
						<OtcDetailsSkeleton />
					) : !otc ? (
						<p className="text-center text-gray-600 py-4">OTC not found.</p>
					) : (
						<OneTimeCodeDetails
							code={otc.code}
							name={otc.name}
							expiryDate={otc.expiryDate}
							createdAt={otc.createdAt}
						/>
					)}
				</div>
				<div className="flex justify-center mt-4">
					<Button
						className="w-1/4 bg-red-600 hover:bg-red-700 hover:cursor-pointer"
						onClick={() => setShowDelete(true)}
					>
						Delete OTC
					</Button>
				</div>
				<ConfirmDialog
					open={showDelete}
					title="Delete OTC"
					description="This action cannot be undone."
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
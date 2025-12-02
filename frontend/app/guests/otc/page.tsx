"use client";

import {Formik, Form, Field, ErrorMessage} from "formik";
import {Button} from "@/components/ui/button";
import {LoadingButton} from "@/components/LoadingButton";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {otcSchema} from "@/schemas/otc.schema";
import GuestsService from "@/lib/service/guests.service";
import {toast} from "sonner";
import OtcsService from "@/lib/service/otcs.service";
import {values} from "eslint-config-next";
import {Otc} from "@/models/otc.model";
import {useState} from "react";
import {OneTimeCodeDetails} from "@/components/OneTimeCodeDetails";
import {OTCForm} from "@/components/OTCForm";

export default function OTCPage() {
	const router = useRouter();
	const initialValues = {
		name: ""
	};

	const [newOtc, setNewOtc] = useState<Otc | null>(null);

	const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
		try {
			const createdOtc = await OtcsService.createOtc({
				name: values.name,
			});
			resetForm();
			setNewOtc(createdOtc);
			toast.success("Otc successfully created!");
		} catch (error: unknown) {
			const message =
				typeof error === "object" && error !== null && "message" in error
					? (error as any).message
					: "Unknown error occurred";
			toast.error("Failed to create otc. " + message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div
				className="w-full min-h-[25vh] max-h-[60vh] max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold">
						Add One-Time Code
					</h1>
					<Button
						className="px-4 py-2 hover:cursor-pointer"
						onClick={() => router.back()}
					>
						Back
					</Button>
				</div>
				<div className="my-auto overflow-auto">
				{!newOtc ? (
					<OTCForm onSubmit={handleSubmit} initialValues={initialValues}/>
				) : (
					<OneTimeCodeDetails code={newOtc.code}
										createdAt={newOtc.createdAt}
										expiryDate={newOtc.expiryDate}
										name={newOtc.name}/>
				)}
				</div>
			</div>
		</div>
	);
}
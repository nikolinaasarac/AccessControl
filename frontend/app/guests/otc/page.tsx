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

export default function OTCForm() {
	const router = useRouter();
	const initialValues = {
		name: ""
	};

	const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
		try {
			await OtcsService.createOtc({
				name: values.name,
			});
			resetForm();
			toast.success("Otc successfully created!");
			router.back();
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
				className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-bold">Add One-Time Code</h1>
					<Button
						className="px-4 py-2 hover:cursor-pointer"
						onClick={() => router.back()}
					>
						Back
					</Button>
				</div>
				<div>
					<span className="text-l text-gray-500 italic">Use the one-time access codes for your non-recurring visitors,
						delivery drivers, car services, and other needs. Codes are valid
						for 30 days or until first use after creation. </span>
				</div>
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={otcSchema}
					onSubmit={handleSubmit}
				>
					{({errors, touched, isSubmitting}) => (
						<Form className="w-full flex flex-col gap-4">
							<div className="w-full">
								<label className="block my-3">Full Name or Company Name</label>
								<Field
									as={Input}
									name="name"
									placeholder="Enter name"
									className={`w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 
									${errors.name && touched.name ? "border-red-500 focus:ring-red-400" : 
										"border-gray-300 focus:ring-blue-400"}`}
								/>
								<div className="text-red-500 text-sm h-4 mt-1">
									<ErrorMessage name="name" component="span"/>
								</div>
							</div>

							<LoadingButton
								type="submit"
								loading={isSubmitting}
							>
								Generate Code
							</LoadingButton>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
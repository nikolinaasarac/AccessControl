"use client";

import {Formik, Form, Field, ErrorMessage} from "formik";
import {Input} from "@/components/ui/input";
import {LoadingButton} from "@/components/LoadingButton";
import {otcSchema} from "@/schemas/otc.schema";

type Props = {
	initialValues: { name: string };
	onSubmit: (values: any, helpers: any) => void;
}

export function OTCForm({initialValues, onSubmit}: Props) {
	return (
		<div>
			<div>
					<span className="text-l text-gray-500 italic">Use the one-time access codes for your non-recurring visitors,
						delivery drivers, car services, and other needs. Codes are valid
						for 30 days or until first use after creation. </span>
			</div>
			<Formik
				enableReinitialize
				initialValues={initialValues}
				validationSchema={otcSchema}
				onSubmit={onSubmit}
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
	);
}
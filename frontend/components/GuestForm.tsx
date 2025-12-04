"use client";

import {Formik, Form, Field, ErrorMessage} from "formik";
import {inviteGuestSchema} from "@/schemas/invite-guest.schema";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {SelectDay} from "@/components/SelectDay";
import {LoadingButton} from "@/components/LoadingButton";
import {MyCheckbox} from "@/components/Checkbox";

export default function GuestForm({initialValues, onSubmit, isEdit}: any) {
	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validationSchema={inviteGuestSchema}
			onSubmit={onSubmit}
		>
			{({values, setFieldValue, errors, touched, isSubmitting}) => (
				<Form className="w-full flex flex-col gap-0.5">
					<div className="flex flex-wrap items-center justify-between mb-6 gap-4">
						<div className="flex-1 min-w-30">
							<label className="block mb-1">First Name</label>
							<Field
								as={Input}
								name="firstName"
								className={`w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 
          								${errors.firstName && touched.firstName
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:ring-blue-400"}`}
								placeholder="Enter First Name"
							/>
							<div className="text-red-500 text-sm h-2 mt-1">
								<ErrorMessage name="firstName" component="span"/>
							</div>
						</div>

						<div className="flex-1 min-w-30">
							<label className="block mb-1">Last Name</label>
							<Field
								as={Input}
								name="lastName"
								className={`w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 
          								${errors.lastName && touched.lastName
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:ring-blue-400"}`}
								placeholder="Enter Last Name"
							/>
							<div className="text-red-500 text-sm h-2 mt-1">
								<ErrorMessage
									name="lastName"
									component="p"
									className="text-red-500 text-sm mt-1"
								/>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap items-center justify-between mb-6 w-full gap-4">
						<div className="flex-1 h-[60px]">
							<label className="block mb-2">Company?</label>
							<Switch
								id="company"
								checked={values.company}
								onCheckedChange={(val) => setFieldValue("company", val)}
								className="hover:cursor-pointer"
							/>
						</div>

						<div className="h-[60px] flex-1 min-w-30">
							{values.company && (
								<label className="block h-full">
									Company Name
									<Field
										as={Input}
										name="companyName"
										className={`w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2 
          								${errors.companyName && touched.companyName
											? "border-red-500 focus:ring-red-400"
											: "border-gray-300 focus:ring-blue-400"}`}
										placeholder="Enter Company Name"
									/>
									<div className="text-red-500 text-sm h-2 mt-1">
										<ErrorMessage
											name="companyName"
											component="p"
											className="text-red-500 text-sm mt-1"
										/>
									</div>
								</label>
							)}
						</div>
					</div>

					<div className="flex flex-wrap items-center justify-between mb-6 gap-4">
						<div className="flex-1">
							<label className="block mb-1">Phone Number</label>
							<Field
								as={Input}
								name="phoneNumber"
								className={`w-full border rounded-md px-2 py-1 focus:outline-none focus:ring-2  min-w-30
          								${errors.phoneNumber && touched.phoneNumber
									? "border-red-500 focus:ring-red-400"
									: "border-gray-300 focus:ring-blue-400"}`}
								placeholder="Enter Phone Number"
							/>
							<div className="text-red-500 text-sm h-2 mt-1">
								<ErrorMessage
									name="phoneNumber"
									component="p"
									className="text-red-500 text-sm mt-1"
								/>
							</div>
						</div>

						<div className="flex-1">
							<label className="block mb-1 min-w-30">Access Days</label>
							<SelectDay
								value={values.accessDays}
								onChange={(days) => setFieldValue("accessDays", days)}
								error={Boolean(errors.accessDays && touched.accessDays)}
							/>
							<div className="text-red-500 text-sm h-2 mt-1">
								<ErrorMessage
									name="accessDays"
									component="p"
									className="text-red-500 text-sm mt-1"
								/>
							</div>
						</div>
					</div>

					<MyCheckbox
						id={"anyTime"}
						checked={values.anyTime}
						onChange={(val) => setFieldValue("anyTime", val)}
						label={"Any time"}
						message={"Guest can access at any time"}
					/>

					<div className="flex flex-wrap items-center justify-between mb-6 gap-2">
						<div className="flex-1 min-w-30">
							<label>
								From:
								<input
									type="time"
									value={values.fromTime}
									onChange={(e) => setFieldValue("fromTime", e.target.value)}
									disabled={values.anyTime}
									className={`w-full p-2 rounded-lg border mt-1 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-500
          								${errors.fromTime && touched.toTime
										? "border-red-500 focus:ring-red-400"
										: "border-gray-300 focus:ring-blue-400"}`}
								/>
								<div className="text-red-500 text-sm h-2 mt-1">
									<ErrorMessage

										name="fromTime"
										component="p"
										className="text-red-500 text-sm mt-1"
									/>
								</div>
							</label>
						</div>

						<div className="flex-1 min-w-30">
							<label>
								To:
								<input
									type="time"
									value={values.toTime}
									onChange={(e) => setFieldValue("toTime", e.target.value)}
									disabled={values.anyTime}
									className={`w-full p-2 rounded-lg border mt-1 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-500
          								${errors.toTime && touched.toTime
										? "border-red-500 focus:ring-red-400"
										: "border-gray-300 focus:ring-blue-400"}`}
								/>
								<div className="text-red-500 text-sm h-2 mt-1">
									<ErrorMessage
										name="toTime"
										component="p"
										className="text-red-500 text-sm mt-1"
									/>
								</div>
							</label>
						</div>
					</div>
					<LoadingButton
						type="submit"
						className="mt-2 hover:cursor-pointer"
						loading={isSubmitting}
					>
						{isEdit ? "Save Guest" : "Invite Guest"}
					</LoadingButton>
				</Form>
			)}
		</Formik>
	);
}
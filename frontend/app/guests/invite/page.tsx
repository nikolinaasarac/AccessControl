"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SelectDay } from "@/components/SelectDay";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { inviteGuestSchema } from "@/schemas/inviteGuestSchema";

export default function InvitePage() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-bold">Invite Guests</h1>
					<Button className="px-4 py-2 hover:cursor-pointer" onClick={() => router.back()}>
						Back
					</Button>
				</div>

				<Formik
					initialValues={{
						firstName: "",
						lastName: "",
						company: false,
						companyName: "",
						phoneNumber: "",
						accessDays: [] as string[],
						anyTime: false,
						fromTime: "00:00",
						toTime: "00:00",
					}}
					validationSchema={inviteGuestSchema}
					onSubmit={(values) => {
						console.log("Form values:", values);
						// ovde ide Firebase logika
					}}
				>
					{({ values, setFieldValue, isSubmitting }) => (
						<Form className="w-full flex flex-col gap-4">
							<div className="flex items-center justify-between mb-6 gap-4">
								<div className="flex-1">
									<label className="block mb-1">First Name</label>
									<Field
										as={Input}
										name="firstName"
										className="w-full border px-2 py-1 rounded"
									/>
									<ErrorMessage
										name="firstName"
										component="p"
										className="text-red-500 text-sm mt-1"
									/>
								</div>

								<div className="flex-1">
									<label className="block mb-1">Last Name</label>
									<Field
										as={Input}
										name="lastName"
										className="w-full border px-2 py-1 rounded"
									/>
									<ErrorMessage
										name="lastName"
										component="p"
										className="text-red-500 text-sm mt-1"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between mb-6 w-full gap-4">
								<div className="flex-1 h-[60px]">
									<label className="block mb-2">Company?</label>
									<Switch
										id="company"
										checked={values.company}
										onCheckedChange={(val) => setFieldValue("company", val)}
										className="hover:cursor-pointer"
									/>
								</div>

								<div className="h-[60px] flex-1">
									{values.company && (
										<label className="block h-full">
											Company Name
											<Field
												as={Input}
												name="companyName"
												className="w-full border rounded mt-1 box-border"
											/>
											<ErrorMessage
												name="companyName"
												component="p"
												className="text-red-500 text-sm mt-1"
											/>
										</label>
									)}
								</div>
							</div>

							<div className="flex items-center justify-between mb-6 gap-4">
								<div className="flex-1">
									<label className="block mb-1">Phone Number</label>
									<Field
										as={Input}
										name="phoneNumber"
										className="w-full border px-2 py-1 rounded"
									/>
									<ErrorMessage
										name="phoneNumber"
										component="p"
										className="text-red-500 text-sm mt-1"
									/>
								</div>

								<div className="flex-1">
									<label className="block mb-1">Access Days</label>
									<SelectDay
										value={values.accessDays}
										onChange={(days) => setFieldValue("accessDays", days)}
									/>
									<ErrorMessage
										name="accessDays"
										component="p"
										className="text-red-500 text-sm mt-1"
									/>
								</div>
							</div>

							<label className="block mb-1">Access Time</label>
							<div className="flex-1 my-3">
								<div className="flex items-center gap-5">
									<input
										type="checkbox"
										checked={values.anyTime}
										onChange={() => setFieldValue("anyTime", !values.anyTime)}
										className="hover:cursor-pointer"
									/>
									<label>Any Time</label>
								</div>
								<ErrorMessage
									name="anyTime"
									component="p"
									className="text-red-500 text-sm mt-1"
								/>
							</div>

							<div className="flex items-center justify-between mb-6 gap-2">
								<div className="flex-1">
									<label>
										From:
										<input
											type="time"
											value={values.fromTime}
											onChange={(e) => setFieldValue("fromTime", e.target.value)}
											disabled={values.anyTime}
											className="w-full p-2 rounded-lg border mt-1 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-500"
										/>
										<ErrorMessage
											name="fromTime"
											component="p"
											className="text-red-500 text-sm mt-1"
										/>
									</label>
								</div>

								<div className="flex-1">
									<label>
										To:
										<input
											type="time"
											value={values.toTime}
											onChange={(e) => setFieldValue("toTime", e.target.value)}
											disabled={values.anyTime}
											className="w-full p-2 rounded-lg border mt-1 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-500"
										/>
										<ErrorMessage
											name="toTime"
											component="p"
											className="text-red-500 text-sm mt-1"
										/>
									</label>
								</div>
							</div>

							<Button type="submit" className="mt-2 hover:cursor-pointer">
								Save and Invite Guest
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
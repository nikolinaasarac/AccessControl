"use client"

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {SelectDay} from "@/components/SelectDay";
import {useState} from "react";

export default function InvitePage() {
	const router = useRouter();
	const [fromTime, setFromTime] = useState("00:00");
	const [toTime, setToTime] = useState("00:00");
	const [anyTime, setAnyTime] = useState(false);
	const [company, setCompany] = useState(false);
	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div
				className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-bold">Invite Guests</h1>
					<Button
						className="px-4 py-2 rounded hover:cursor-pointer"
						onClick={() => router.back()}
					>
						Back
					</Button>
				</div>
				<div>
					<div className="flex items-center justify-between mb-6 gap-4">
						<div className="flex-1">
							<label className="block mb-1">First Name</label>
							<Input
								type="text"
								name="firstName"
								className="w-full border px-2 py-1 rounded"
							/>
						</div>
						<div className="flex-1">
							<label className="block mb-1">Last Name</label>
							<Input
								type="text"
								name="lastName"
								className="w-full border px-2 py-1 rounded"
							/>
						</div>
					</div>
					<div className="flex items-center justify-between mb-6 w-full gap-4">
						<div className="flex-1 h-[60px]">
							<label className="block mb-2">Company?</label>
							<Switch id="company"
									checked={company}
									onCheckedChange={(checked) => setCompany(checked)}
									className="hover:cursor-pointer"
							/>
						</div>
						<div className="h-[60px] flex-1">
							{company && (
								<label className="block h-full">
									Company Name
									<Input
										type="text"
										name="companyName"
										className="w-full border rounded mt-1 box-border"
									/>
								</label>
							)}
						</div>
					</div>
					<div className="flex items-center justify-between mb-6 gap-4">
						<div className="flex-1">
							<label className="block mb-1">Phone Number</label>
							<Input
								type="text"
								name="phoneNumber"
								className="w-full border px-2 py-1 rounded"
							/>
						</div>
						<div className="flex-1">
							<label className="block mb-1">Access Days</label>
							<SelectDay/>
						</div>
					</div>
					<label className="block mb-1">Access Time</label>
					<div className="flex-1 my-3">
						<label className="flex items-center gap-5">
							<input
								type="checkbox"
								className="mt-1"
								checked={anyTime}
								onChange={() => setAnyTime(!anyTime)}

							/>
							Any Time
						</label>
					</div>
					<div className="flex items-center justify-between mb-6 gap-2">

						<div className="flex-1">
							<label>
								From:
								<input
									type="time"
									value={fromTime}
									onChange={(e) => setFromTime(e.target.value)}
									disabled={anyTime}
									className="w-full p-2 rounded-lg border mt-1 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-500"
									onFocus={(e) => (e.target.style.borderColor = "#007bff")}
									onBlur={(e) => (e.target.style.borderColor = "#ccc")}
								/>
							</label>
						</div>
						<div className="flex-1">
							<label>
								To:
								<input
									type="time"
									value={toTime}
									onChange={(e) => setToTime(e.target.value)}
									disabled={anyTime}
									className="w-full p-2 rounded-lg border mt-1 transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-500"
									onFocus={(e) => (e.target.style.borderColor = "#007bff")}
									onBlur={(e) => (e.target.style.borderColor = "#ccc")}
								/>
							</label>
						</div>
					</div>
					<Button className="mt-2 hover:cursor-pointer">Save and Invite Guest</Button>
				</div>
			</div>
		</div>
	)
}
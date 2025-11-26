"use client"

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {SelectDay} from "@/components/SelectDay";
import {useState} from "react";

export default function InvitePage() {
	const router = useRouter();
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
				<div className="my-6">
					<label>Full Name or Company Name</label>
					<Input
						type="text"
						name="firstName"
						className="w-full border px-2 py-1 rounded"
						placeholder="Enter name"
					/>
				</div>
				<Button className="mt-2 hover:cursor-pointer" type="submit">Generate code</Button>

			</div>
		</div>
	)
}
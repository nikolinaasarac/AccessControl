"use client"

import {GuestFormSkeleton} from "@/components/skeleton/GuestFormSkeleton";

export function EditGuestSkeleton() {
	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
				<div className="flex justify-between items-center mb-6">
					<div className="h-6 w-40 bg-gray-300 rounded"></div>
					<div className="flex gap-2">
						<div className="h-8 w-20 bg-gray-300 rounded"></div>
						<div className="h-8 w-20 bg-gray-300 rounded"></div>
						<div className="h-8 w-20 bg-gray-300 rounded"></div>
					</div>
				</div>
				<GuestFormSkeleton />
			</div>
		</div>
	);
}
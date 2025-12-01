"use client";

import {Skeleton} from "@/components/ui/skeleton";

export function GuestFormSkeleton() {
	return (
		<div className="w-full flex flex-col gap-4">

			<div className="flex items-center justify-between mb-6 gap-4">
				<div className="flex-1 flex flex-col gap-2">
					<Skeleton className="h-4 w-24"/>
					<Skeleton className="h-10 w-full"/>
				</div>
				<div className="flex-1 flex flex-col gap-2">
					<Skeleton className="h-4 w-24"/>
					<Skeleton className="h-10 w-full"/>
				</div>
			</div>

			<div className="flex items-center justify-between mb-6 w-full gap-4">
				<div className="flex-1 flex flex-col gap-2">
					<Skeleton className="h-4 w-20"/>
					<Skeleton className="h-6 w-12 rounded-full"/>
				</div>

				<div className="flex-1 flex flex-col gap-2">
					<Skeleton className="h-4 w-28"/>
					<Skeleton className="h-10 w-full"/>
				</div>
			</div>

			<div className="flex items-center justify-between mb-6 gap-4">
				<div className="flex-1 flex flex-col gap-2">
					<Skeleton className="h-4 w-28"/>
					<Skeleton className="h-10 w-full"/>
				</div>

				<div className="flex-1 flex flex-col gap-2">
					<Skeleton className="h-4 w-24"/>
					<Skeleton className="h-10 w-full"/>
				</div>
			</div>

			<div className="flex items-center gap-3 mb-4">
				<Skeleton className="h-5 w-5 rounded-sm"/>
				<Skeleton className="h-4 w-20"/>
			</div>

			<div className="flex items-center justify-between mb-6 gap-4">
				<div className="flex-1 flex flex-col gap-2">
					<Skeleton className="h-4 w-12"/>
					<Skeleton className="h-10 w-full"/>
				</div>

				<div className="flex-1 flex flex-col gap-2">
					<Skeleton className="h-4 w-12"/>
					<Skeleton className="h-10 w-full"/>
				</div>
			</div>

			<Skeleton className="h-10 w-full"/>
		</div>
	);
}
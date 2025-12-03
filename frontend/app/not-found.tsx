"use client";

import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";

export default function NotFound() {
	const router = useRouter();
	console.log("e sad ova");
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-6xl font-bold mb-4">404</h1>
			<p className="text-xl mb-6">Page Not Found</p>
			<Button
				onClick={() => router.push("/guests")}
				className="px-4 py-2  text-white rounded transition cursor-pointer"
			>
				Go Back Home
			</Button>
		</div>
	);
}
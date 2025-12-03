"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
	const router = useRouter();
	console.log("e sad ova");

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-6xl font-bold mb-4">404</h1>
			<p className="text-xl mb-6">Page Not Found</p>
			<button
				onClick={() => router.push("/guests")}
				className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
			>
				Go Back Home
			</button>
		</div>
	);
}
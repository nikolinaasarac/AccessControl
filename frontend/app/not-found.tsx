"use client";

import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export default function NotFound() {
	const router = useRouter();

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden px-4">

			<div
				className="relative backdrop-blur-xl bg-white/60 border border-white/30 shadow-xl rounded-3xl p-10 max-w-md w-full text-center animate-fadeScale">
				<div className="text-7xl mb-4 select-none">🚫</div>

				<h1 className="text-4xl font-semibold text-gray-900 mb-3">
					Page Not Found
				</h1>

				<p className="text-gray-700 mb-8 leading-relaxed">
					We could not find the page you are looking for.
					It might have been removed or the link is incorrect.
				</p>

				<Button
					onClick={() => router.push("/guests")}
					className="w-full h-11 text-base cursor-pointer"
				>
					Back to Home
				</Button>
			</div>
		</div>
	);
}
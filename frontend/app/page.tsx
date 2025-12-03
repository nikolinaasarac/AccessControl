"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
	const router = useRouter();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading) {
			if (user) {
				router.replace("/guests");
			} else {
				router.replace("/login");
			}
		}
	}, [user, isLoading, router]);

	if (isLoading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<Spinner className="w-12 h-12" />
			</div>
		);
	}

	return null;
}
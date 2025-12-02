"use client"
import {useEffect} from "react";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";
import {Spinner} from "@/components/ui/spinner";

export default function RootLayout({
									   children,
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	const {user, isLoading} = useAuth();
	const router = useRouter();


	return (
		children
	);
}

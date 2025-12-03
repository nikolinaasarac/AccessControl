"use client"
import {useEffect} from "react";
import {useAuth} from "@/context/auth-context";
import {useRouter} from "next/navigation";
import {Spinner} from "@/components/ui/spinner";
import Image from "next/image";

export default function RootLayout({
									   children,
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	const {user, isLoading} = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user && !isLoading)
			router.push("/login");
	}, [user, isLoading]);

	if (isLoading) {
		return <div className="h-screen flex justify-center items-center mb-6">
			<Spinner className="w-15 h-15" />
		</div>
	}

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div className="w-full flex flex-col">
				<div className="w-full flex justify-center ">
					<img
						src="/secure-login.png"
						width={160}
						height={160}
						alt="app-logo"
						className="select-none"
					/>
				</div>
				<div className="flex justify-center items-center gap-2 py-2">
					<div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
						{user?.email?.[0].toUpperCase()}
					</div>
					<p className="text-lg text-gray-600">{user?.email}</p>
				</div>
				<div className="px-4">
					{children}
				</div>
			</div>
		</div>
	);
}

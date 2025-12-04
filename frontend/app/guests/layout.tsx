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
			<Spinner className="w-15 h-15"/>
		</div>
	}

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-2xl  mx-auto flex flex-col">
				<div className="flex justify-between items-center mb-2 px-12">
					<div className="flex justify-center "><img src="/secure-login.png" width={55} height={55}
															   alt="app-logo" className="select-none"/></div>
					<div className="flex justify-center items-center gap-2 py-2">
						<div
							className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">             {user?.email?.[0].toUpperCase()}           </div>
						<p className="text-md text-gray-600">{user?.email}</p></div>
				</div>
				<div className="px-4">         {children}       </div>
			</div>
		</div>);

}

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

	useEffect(() => {
		if (!user && isLoading)
			router.push("/login");
	}, [user, isLoading]);

	if (isLoading || !user) {
		return <div className="h-screen flex justify-center items-center mb-6">
			<Spinner className="w-15 h-15" />
		</div>
	}

	return (
		children
	);
}

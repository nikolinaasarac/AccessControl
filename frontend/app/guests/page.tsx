"use client"

import {Button} from "@/components/ui/button";
import {signOut} from "@firebase/auth";
import {auth} from "@/lib/firebase";
import {useRouter} from "next/navigation";

export default function Guests(){
	const router = useRouter();
	const logout = async () => {
		try {
			await signOut(auth); // Odjava iz Firebase-a
			localStorage.removeItem("accessToken"); // Brišeš token iz lokalnog storage-a
			router.push("/login");
		} catch (err) {
			console.error("Logout failed", err);
		}
	};
	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold text-gray-700">Guests</h1>
				<div className="flex gap-2">
					<Button className="cursor-pointer">Invite guest</Button>
					<Button className="cursor-pointer">One time code</Button>
					<Button className="cursor-pointer" onClick={logout}>Log out</Button>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow p-4 min-h-[400px]">
				<p className="text-gray-400 text-center">Guest list will appear here...</p>
			</div>
			</div>
		</div>
	);
}
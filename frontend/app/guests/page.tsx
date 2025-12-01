"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {GuestItem} from "@/components/GuestItem";
import {useEffect, useState} from "react";
import {Guest} from "@/models/Guest.model";
import UserService from "@/lib/service/guests.service";
import {Loader} from "@/components/Loader";

export default function Guests(){
	const router = useRouter();
	const [guests, setGuests] = useState<Guest[]>([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGuests = async () => {
			try {
				const data = await UserService.getMyGuests();
				setGuests(data);
			} catch (err) {
				console.error("Failed to fetch guests", err);
			} finally {
				setLoading(false);
			}
		};

		fetchGuests();
	}, []);

	const logout = async () => {
		try {
			localStorage.removeItem("accessToken");
			router.push("/login");
		} catch (err) {
			console.error("Logout failed", err);
		}
	};

	const handleInvite= async () => {
		router.push("guests/invite");
	}

	const handleOTC= async () => {
		router.push("guests/otc");
	}

	return (
		<div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
			<div className="w-full max-w-md sm:max-w-lg md:max-w-lg lg:max-w-xl flex flex-col bg-white p-6 rounded-xl shadow-md">
			<div className="flex items-center justify-between mb-6 gap-2">
				<h1 className="text-xl font-bold">Guests</h1>
				<div className="flex flex-wrap gap-2 justify-end">
					<Button className="cursor-pointer" onClick={handleInvite}>Invite guest</Button>
					<Button className="cursor-pointer" onClick={handleOTC}>One time code</Button>
					<Button className="cursor-pointer" onClick={logout}>Log out</Button>
				</div>
			</div>
				<div className="bg-white rounded-lg shadow p-4 min-h-[400px]">
					{loading ? (
						<div className="flex justify-center items-center h-full">
							<Loader text="Loading..." />
						</div>
					) : guests.length === 0 ? (
						<p className="text-gray-500 text-center mt-10">
							There are no guests yet.
						</p>
					) : (
						<ul className="space-y-2">
							{guests.map((guest, index) => (
								<GuestItem
									key={index}
									id={guest.id}
									firstName={guest.firstName}
									lastName={guest.lastName}
									companyName={guest.companyName}
									status={guest.status}
								/>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
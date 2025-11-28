"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {GuestItem} from "@/components/GuestItem";
import {useEffect, useState} from "react";
import {Guest} from "@/models/Guest.model";
import UserService from "@/lib/service/guests.service";

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
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold text-gray-700">Guests</h1>
				<div className="flex gap-2">
					<Button className="cursor-pointer" onClick={handleInvite}>Invite guest</Button>
					<Button className="cursor-pointer" onClick={handleOTC}>One time code</Button>
					<Button className="cursor-pointer" onClick={logout}>Log out</Button>
				</div>
			</div>

			<div className="bg-white rounded-lg shadow p-4 min-h-[400px]">
				<ul className="space-y-2">
					{guests.map((guest) => (
						<GuestItem
							id={guest.id}
							firstName={guest.firstName}
							lastName={guest.lastName}
							companyName={guest.companyName}
						/>
					))}
				</ul>
			</div>
			</div>
		</div>
	);
}
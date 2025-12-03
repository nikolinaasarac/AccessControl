"use client"

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {GuestItem} from "@/components/GuestItem";
import {useEffect, useState} from "react";
import {Guest} from "@/models/Guest.model";
import UserService from "@/lib/service/guests.service";
import {Loader} from "@/components/Loader";
import {Otc} from "@/models/otc.model";
import OtcsService from "@/lib/service/otcs.service";
import {OtcItem} from "@/components/OtcItem";
import {useAuth} from "@/context/auth-context";

export default function Guests(){
	const router = useRouter();
	const [guests, setGuests] = useState<Guest[]>([]);
	const [otcs, setOtcs] = useState<Otc[]>([]);
	const {logout} = useAuth();

	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<"guests" | "otc">(
		(typeof window !== "undefined" && (localStorage.getItem("activeTab") as "guests" | "otc")) || "guests"
	);

	useEffect(() => {
		localStorage.setItem("activeTab", activeTab);
	}, [activeTab]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [guestData, otcData] = await Promise.all([
					UserService.getMyGuests(),
					OtcsService.getMyOtcs(),
				]);
				console.log(otcData);
				setGuests(guestData);
				setOtcs(otcData);
			} catch (err) {
				console.error("Failed to fetch data", err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

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
				<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold">Guests</h1>
				<div className="flex flex-wrap gap-2 justify-end">
					{activeTab === "guests" && (
						<Button className="cursor-pointer" onClick={handleInvite}>
							Invite guest
						</Button>)
					}
					{activeTab === "otc" && (
						<Button className="cursor-pointer" onClick={handleOTC}>One time code</Button>
					)}
					<Button className="cursor-pointer" onClick={logout}>Log out</Button>
				</div>
			</div>
				<div className="flex border-b mb-4">
					<button
						className={`px-4 py-2 font-medium ${
							activeTab === "guests"
								? "border-b-2 border-blue-500 text-blue-600"
								: "text-gray-500"
						}`}
						onClick={() => setActiveTab("guests")}
					>
						Invites
					</button>
					<button
						className={`px-4 py-2 font-medium ${
							activeTab === "otc"
								? "border-b-2 border-blue-500 text-blue-600"
								: "text-gray-500"
						}`}
						onClick={() => setActiveTab("otc")}
					>
						One-Time Codes
					</button>
				</div>
				<div className="bg-white rounded-lg min-h-[50vh] max-h-[50vh] overflow-y-auto">
					{loading ? (
						<div className="flex justify-center items-center h-full">
							<Loader text="Loading..." />
						</div>
					) : activeTab === "guests" ? (
						guests.length === 0 ? (
							<p className="text-gray-500 text-center mt-10">No guests yet.</p>
						) : (
							<ul className="space-y-2">
								{guests.map((g) => (
									<GuestItem
										key={g.id}
										id={g.id}
										firstName={g.firstName}
										lastName={g.lastName}
										companyName={g.companyName}
										status={g.status}
									/>
								))}
							</ul>
						)
					) : otcs.length === 0 ? (
						<p className="text-gray-500 text-center mt-10">No one-time codes yet.</p>
					) : (
						<ul className="space-y-2">
							{otcs.map((o) => (
								<OtcItem key={o.id}
										 name={o.name}
										 id={o.id}
										 code={o.code}
										 validFrom={o.createdAt}
										 validTo={o.expiryDate} />
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
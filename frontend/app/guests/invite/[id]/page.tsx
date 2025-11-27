"use client"

import GuestsService from "@/lib/service/guests.service";

export default function EditGuestPage()
{
	const guest = GuestsService.getGuestById("2ODbXnY6hIcUvqdMwVIF");
	console.log(guest);
}
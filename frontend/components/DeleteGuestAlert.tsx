"use client";

import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import {LoadingButton} from "@/components/LoadingButton";

export default function DeleteGuestAlert({ handleDelete }: { handleDelete: () => Promise<void> }) {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);
		try {
			await handleDelete();
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<LoadingButton
					loading={loading}
					className="px-4 py-2 bg-red-800 hover:bg-red-700"
				>
					Delete Guest
				</LoadingButton>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete this guest.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
					<LoadingButton
						loading={loading}
						className="bg-red-800 hover:bg-red-700"
						onClick={handleClick}
					>
						Delete
					</LoadingButton>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
"use client";

import * as React from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction
} from "@/components/ui/alert-dialog";
import {GuestStatus} from "@/shared/enum/guest-status.enum";

interface ConfirmStatusDialogProps {
	open: boolean;
	status: GuestStatus | null;
	onConfirm: () => void;
	onCancel: () => void;
}

export function ConfirmStatusDialog({open, status, onConfirm, onCancel}: ConfirmStatusDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onCancel}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
					<AlertDialogDescription>
						Do you really want to change the status to <strong>{status}</strong>?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="hover:cursor-pointer" onClick={onCancel}>Cancel</AlertDialogCancel>
					<AlertDialogAction className="bg-green-600 hover:bg-green-800 hover:cursor-pointer"
									   onClick={onConfirm}>Confirm</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
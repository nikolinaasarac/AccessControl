import * as React from "react";

interface ConfirmDialogProps {
	open: boolean;
	title: string;
	description: React.ReactNode;
	confirmText?: string;
	cancelText?: string;
	confirmColor?: string;
	onConfirm: () => Promise<void>;
	onCancel: () => void;
}
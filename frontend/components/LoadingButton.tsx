"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type ButtonProps = React.ComponentProps<typeof Button>;

interface LoadingButtonProps extends ButtonProps {
	loading?: boolean;
}

export function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
	return (
		<Button
			disabled={loading || props.disabled}
			{...props}
			className={`flex items-center justify-center ${props.className || ""}`}
		>
			{loading && <Spinner className="h-4 w-4 mr-2 animate-spin" />}
			{children}
		</Button>
	);
}
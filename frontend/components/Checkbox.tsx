"use client";

import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

type Props = {
	id: string;
	checked: boolean;
	onChange: (value: boolean) => void;
	label: string;
	message?: string;
};

export function MyCheckbox({id, checked, onChange, message, label}: Props) {
	return (
		<Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3
      has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 my-2  hover:cursor-pointer "
		>
			<Checkbox
				id={id}
				checked={checked}
				onCheckedChange={(checked) => onChange(Boolean(checked))}
				className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600
          data-[state=checked]:text-white"
			/>
			<div className="grid gap-1.5 font-normal">
				<p className="text-sm leading-none font-medium">{label}</p>
				<p className="text-muted-foreground text-sm">
					{message}
				</p>
			</div>
		</Label>
	);
}
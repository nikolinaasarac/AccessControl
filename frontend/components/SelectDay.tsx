"use client";

import {Button} from "@/components/ui/button";
import {
	Popover,
	PopoverTrigger,
	PopoverContent
} from "@/components/ui/popover";


const DAYS = [
	{label: "Mon", value: "mon"},
	{label: "Tue", value: "tue"},
	{label: "Wed", value: "wed"},
	{label: "Thu", value: "thu"},
	{label: "Fri", value: "fri"},
	{label: "Sat", value: "sat"},
	{label: "Sun", value: "sun"},
];

type Props = {
	value: string[];
	onChange: (value: string[]) => void;
};

export function SelectDay({value, onChange}: Props) {
	const available = DAYS.filter(d => !value.includes(d.value));

	function addDay(dayValue: string) {
		onChange([...value, dayValue]);
	}

	function removeDay(dayValue: string) {
		onChange(value.filter(d => d !== dayValue));
	}

	const daysOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

	const sortedValue = [...value].sort(
		(a, b) => daysOrder.indexOf(a) - daysOrder.indexOf(b)
	);

	const selectedLabels =
		sortedValue.length > 0
			? sortedValue.map(val => DAYS.find(d => d.value === val)?.label).join(", ")
			: "Select Access Days...";

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="w-full justify-between"
				>
					<span className={value.length === 0 ? "text-gray-500" : ""}>
						{selectedLabels}
					</span>
				</Button>
			</PopoverTrigger>

			<PopoverContent className="min-w-30 overflow-x-auto">
				<div className="flex flex-col gap-2">
					{value.length > 0 && (
						<div className="flex flex-wrap gap-2 mb-2">
							{sortedValue.map(day => {
								const dayObj = DAYS.find(d => d.value === day);
								return (
									<div key={day} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1 text-sm">
										{dayObj?.label}
										<button className="font-bold hover:text-red-500" onClick={() => removeDay(day)}>
											x
										</button>
									</div>
								);
							})}
						</div>
					)}
					{available.map(day => (
						<button
							key={day.value}
							onClick={() => addDay(day.value)}
							className="p-2 hover:bg-gray-100 rounded text-left"
						>
							{day.label}
						</button>
					))}

					{available.length === 0 && (
						<p className="text-gray-400 text-sm text-center">No more days</p>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
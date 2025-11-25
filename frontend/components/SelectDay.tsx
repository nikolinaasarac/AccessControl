import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";

type Props = {
	value: string;
	onChange: (value: string) => void;
}

export function SelectDay({ value, onChange } : Props) {
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select Access Days" />
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					<SelectLabel>Days</SelectLabel>
					<SelectItem value="any">Any Days</SelectItem>
					<SelectItem value="mon">Mon</SelectItem>
					<SelectItem value="tue">Tue</SelectItem>
					<SelectItem value="wed">Wed</SelectItem>
					<SelectItem value="thu">Thu</SelectItem>
					<SelectItem value="fri">Fri</SelectItem>
					<SelectItem value="sat">Sat</SelectItem>
					<SelectItem value="sun">Sun</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
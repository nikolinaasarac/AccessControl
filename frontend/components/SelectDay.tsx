import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";

export function SelectDay(){
	return(
	<Select>
		<SelectTrigger className="w-full">
			<SelectValue placeholder="Select Access Days" />
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<Select>
					<SelectLabel>Days</SelectLabel>
					<SelectItem value="any">Any Days</SelectItem>
					<SelectItem value="mon">Mon</SelectItem>
					<SelectItem value="tue">Tue</SelectItem>
					<SelectItem value="wed">Wed</SelectItem>
					<SelectItem value="thu">Thu</SelectItem>
					<SelectItem value="fri">Fri</SelectItem>
					<SelectItem value="sat">Sat</SelectItem>
					<SelectItem value="sun">Sun</SelectItem>
				</Select>
			</SelectGroup>
		</SelectContent>
	</Select>)
}
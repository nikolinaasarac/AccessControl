"use client";
import {
	Item,
	ItemContent,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item"
import {Spinner} from "@/components/ui/spinner"

type Props = {
	text: string
}

export function Loader({text}: Props) {
	return (
		<div className="w-full max-w-xs flex-col">
			<Item className="flex w-full max-w-xs flex-col bg-white justify-between" variant="muted">
				<ItemMedia>
					<Spinner className="h-10 w-10"/>
				</ItemMedia>

				<ItemContent>
					<ItemTitle className="line-clamp-1 text-lg">{text}</ItemTitle>
				</ItemContent>
			</Item>
		</div>
	)
}
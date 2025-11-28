import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
export default function DeleteGuestAlert({handleDelete}: {handleDelete: () => void}) {
	return (
	<AlertDialog>
		<AlertDialogTrigger asChild>
			<Button className="px-4 py-2 hover:cursor-pointer">
				Delete Guest
			</Button>
		</AlertDialogTrigger>

		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>Are you sure?</AlertDialogTitle>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete this guest.
				</AlertDialogDescription>
			</AlertDialogHeader>

			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction onClick={handleDelete}>
					Delete
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>)
}
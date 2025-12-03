export function OtcDetailsSkeleton() {
	return (
		<div className="animate-pulse space-y-4 max-w-md mx-auto">
			<div className="space-y-2">
				<div className="h-4 w-4/5 bg-gray-300 rounded"></div>
				<div className="h-4 w-3/5 bg-gray-300 rounded"></div>
			</div>

			<div className="bg-gray-300 p-3 rounded-lg text-center">
				<div className="h-11 w-2/3 mx-auto bg-gray-300 rounded"></div>
			</div>
			<div className="space-y-2">
				<div className="h-4 w-1/2 bg-gray-300 rounded"></div>
				<div className="h-4 w-2/3 bg-gray-300 rounded"></div>
			</div>
		</div>
	);
}
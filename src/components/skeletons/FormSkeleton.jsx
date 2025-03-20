import { Skeleton } from "@/components/ui/skeleton";

const FormSkeleton = () => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/20">
			<div className="w-full max-w-[670px] mx-auto bg-white rounded-lg shadow-sm p-6 space-y-6">
				{/* Header */}
				<div className="space-y-2">
					<Skeleton className="h-6 w-36" />
					<Skeleton className="w-48 h-3" />
				</div>

				{/* Personal Information */}
				<div className="space-y-4">
					<Skeleton className="w-32 h-4" />

					<div className="grid grid-cols-2 gap-4">
						<Skeleton className="w-full h-10 rounded-md" />
						<Skeleton className="w-full h-10 rounded-md" />
					</div>

					<div className="grid grid-cols-2 gap-4">
						<Skeleton className="w-full h-10 rounded-md" />
						<Skeleton className="w-full h-10 rounded-md" />
					</div>
				</div>

				{/* Booking Information */}
				<div className="space-y-4">
					<Skeleton className="w-32 h-4" />

					<Skeleton className="w-full h-10 rounded-md" />

					<div className="grid grid-cols-4 gap-4">
						<div className="col-span-2 space-y-3">
							<Skeleton className="w-32 h-4" />
							<Skeleton className="w-full h-10 rounded-md" />
						</div>
						<div className="space-y-3">
							<Skeleton className="w-32 h-4" />
							<Skeleton className="w-full h-10 rounded-md" />
						</div>
						<div className="space-y-3">
							<Skeleton className="w-32 h-4" />
							<Skeleton className="w-full h-10 rounded-md" />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-3">
							<Skeleton className="w-32 h-4" />
							<Skeleton className="w-full h-10 rounded-md" />
						</div>
						<div className="space-y-3">
							<Skeleton className="w-32 h-4" />
							<Skeleton className="w-full h-10 rounded-md" />
						</div>
					</div>
				</div>

				{/* Special Requests */}
				<div className="space-y-3">
					<Skeleton className="w-32 h-4" />
					<Skeleton className="w-full h-20 rounded-md" />
				</div>

				<div className="flex justify-end">
					<Skeleton className="w-32 h-10 rounded-md" />
				</div>
			</div>
		</div>
	);
};
export default FormSkeleton;

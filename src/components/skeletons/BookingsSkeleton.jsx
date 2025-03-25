import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function BookingSkeleton() {
	return (
		<Card className="overflow-hidden">
			<div className="flex flex-col md:flex-row">
				<div className="md:w-1/4">
					<Skeleton className="h-full w-full min-h-[200px]" />
				</div>
				<div className="flex flex-col p-4 space-y-4 md:w-3/4">
					<div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start">
						<div className="space-y-2">
							<Skeleton className="w-40 h-6" />
							<Skeleton className="w-32 h-4" />
						</div>
						<Skeleton className="w-24 h-6" />
					</div>

					<div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
						<div className="space-y-2">
							<Skeleton className="w-16 h-4" />
							<Skeleton className="w-32 h-5" />
						</div>

						<div className="space-y-2">
							<Skeleton className="w-16 h-4" />
							<Skeleton className="w-24 h-5" />
						</div>

						<div className="space-y-2">
							<Skeleton className="w-16 h-4" />
							<Skeleton className="h-5 w-36" />
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
						<div className="space-y-2">
							<Skeleton className="w-16 h-4" />
							<Skeleton className="w-32 h-5" />
						</div>

						<div className="space-y-2 md:col-span-2">
							<Skeleton className="w-32 h-4" />
							<Skeleton className="w-full h-5" />
						</div>
					</div>

					<div className="flex items-center justify-between pt-4 mt-4 border-t">
						<Skeleton className="w-20 h-6" />
						<div className="flex items-center gap-2">
							<Skeleton className="h-9 w-28" />
							<Skeleton className="w-32 h-9" />
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}

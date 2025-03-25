import { Skeleton } from "@/components/ui/skeleton";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";

export function myHotelsSkeleton() {
	return (
		<Card className="flex flex-col h-full overflow-hidden">
			<Skeleton className="w-full h-48" />
			<CardHeader className="space-y-2">
				<Skeleton className="w-40 h-6" />
				<Skeleton className="w-32 h-4" />
			</CardHeader>
			<CardContent className="flex-grow space-y-4">
				<div className="flex items-center space-x-2">
					<Skeleton className="w-16 h-4" />
					<Skeleton className="w-4 h-4 rounded-full" />
					<Skeleton className="w-16 h-4" />
				</div>

				<Skeleton className="w-full h-16" />

				<div className="space-y-2">
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-3/4 h-4" />
				</div>

				<div className="flex flex-wrap gap-1 mt-2">
					<Skeleton className="w-16 h-6 rounded-full" />
					<Skeleton className="w-20 h-6 rounded-full" />
					<Skeleton className="h-6 rounded-full w-14" />
				</div>
			</CardContent>
			<CardFooter>
				<Skeleton className="w-full h-10" />
			</CardFooter>
		</Card>
	);
}

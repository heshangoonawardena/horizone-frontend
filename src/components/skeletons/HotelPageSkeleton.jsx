import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "../ui/card";

const HotelPageSkeleton = () => {
	return (
		<div className="container min-h-screen px-4 py-8 mx-auto">
			<div className="grid gap-8 md:grid-cols-2">
				<div className="space-y-4">
					<Skeleton className="w-full h-[400px] rounded-lg" />
					<div className="flex space-x-2">
						<Skeleton className="w-24 h-6" />
						<Skeleton className="w-32 h-6" />
						<Skeleton className="h-6 w-28" />
					</div>
				</div>
				<div className="space-y-6">
					<div className="flex items-start justify-between">
						<div>
							<Skeleton className="w-64 h-8 mb-2" />
							<Skeleton className="w-48 h-4" />
						</div>
						<Skeleton className="w-10 h-10 rounded-full" />
					</div>
					<Skeleton className="h-4 w-36" />
					<div className="space-y-2">
						<Skeleton className="w-full h-4" />
						<Skeleton className="w-full h-4" />
						<Skeleton className="w-3/4 h-4" />
					</div>
					<Card>
						<CardContent className="p-4">
							<Skeleton className="w-32 h-6 mb-4" />
							<div className="grid grid-cols-2 gap-4">
								{[...Array(4)].map((_, index) => (
									<div key={index} className="flex items-center">
										<Skeleton className="w-5 h-5 mr-2" />
										<Skeleton className="w-24 h-4" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>
					<div className="flex items-center justify-between">
						<div>
							<Skeleton className="w-24 h-8 mb-1" />
							<Skeleton className="w-16 h-4" />
						</div>
						<Skeleton className="w-32 h-12" />
					</div>
				</div>
			</div>
		</div>
	);
};
export default HotelPageSkeleton;

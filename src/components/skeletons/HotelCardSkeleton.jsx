import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCardCard = () => {
	return (
		<div className="relative block">
			{/* Image skeleton */}
			<div className="relative aspect-[4/3] overflow-hidden rounded-xl">
				<Skeleton className="absolute w-full h-full" />
			</div>

			{/* Content skeleton */}
			<div className="mt-3 space-y-2">
				{/* Hotel name */}
				<Skeleton className="w-3/4 h-6" />

				{/* Location */}
				<div className="flex items-center">
					<Skeleton className="w-4 h-4 mr-1" />
					<Skeleton className="w-1/2 h-4" />
				</div>

				{/* Rating */}
				<div className="flex items-center space-x-1">
					<Skeleton className="w-4 h-4" />
					<Skeleton className="w-16 h-4" />
					<Skeleton className="w-24 h-4" />
				</div>

				{/* Price */}
				<div className="flex items-baseline space-x-2">
					<Skeleton className="w-20 h-6" />
				</div>
			</div>
		</div>
	);
};

export default SkeletonCardCard;

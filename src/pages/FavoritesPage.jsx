import HotelCardSkeleton from "@/components/skeletons/HotelCardSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useGetFavoritesQuery, useRemoveFavoriteMutation } from "@/lib/api";
import { format } from "date-fns";
import {
	Calendar,
	Heart,
	Hotel,
	MapPin,
	Star,
	UtensilsCrossed,
} from "lucide-react";
import { Link } from "react-router";

const FavoritesPage = () => {
	const {
		data: favorites,
		isFetching,
		refetch: reFetchFavorites,
	} = useGetFavoritesQuery();
	const [removeFavorite] = useRemoveFavoriteMutation();

	const removeFromFavorites = async (hotelId) => {
		try {
			await removeFavorite(hotelId);
			reFetchFavorites();
		} catch (error) {
			console.error("Failed to remove favorite:", error);
		}
	};

	return (
		<div className="container px-4 py-8 mx-auto">
			<div className="flex flex-col space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						My Favorite Hotels
					</h1>
					<p className="mt-2 text-muted-foreground">
						Your collection of saved hotels for future stays
					</p>
				</div>

				{isFetching ? (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{[...Array(3)].map((_, index) => (
							<HotelCardSkeleton key={index} />
						))}
					</div>
				) : favorites.length == 0  ? (
					<div className="py-12 space-y-4 text-center">
						<Heart className="w-16 h-16 mx-auto text-muted-foreground" />
						<h2 className="text-xl font-medium">No favorites yet</h2>
						<p className="max-w-md mx-auto text-muted-foreground">
							Browse hotels and click the heart icon to add them to your
							favorites for easy access later.
						</p>
						<Button asChild className="mt-4">
							{/* <a href="/">Browse Hotels</a> */}
							<Link to={`/`} className="relative block group">
								Browse Hotels
							</Link>
						</Button>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{favorites?.map((hotel) => (
							<Card
								key={hotel._id}
								className="flex flex-col h-full overflow-hidden"
							>
								<div className="relative w-full h-48 overflow-hidden">
									<img
										src={hotel.image || "/placeholder.svg"}
										alt={hotel.name}
										className="absolute object-cover w-full h-48 transition-transform hover:scale-105"
									/>
									<Button
										variant="destructive"
										size="icon"
										className="absolute top-2 right-2"
										onClick={() => removeFromFavorites(hotel._id)}
									>
										<Heart className="w-4 h-4 fill-current" />
									</Button>
								</div>
								<CardHeader>
									<CardTitle>{hotel.name}</CardTitle>
									<CardDescription>
										<div className="flex items-center">
											<MapPin className="w-4 h-4 mr-1" />
											{hotel.location}
										</div>
									</CardDescription>
								</CardHeader>
								<CardContent className="flex-grow">
									<div className="space-y-4">
										<div className="flex items-center">
											<Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
											<span className="font-medium">{hotel?.rating}/5</span>
											<span className="mx-2">•</span>
											<span className="font-medium">
												${hotel?.roomTypes[0].price}
											</span>
											<span className="text-sm text-muted-foreground">
												/night
											</span>
										</div>

										<p className="text-sm text-muted-foreground line-clamp-2">
											{hotel.description}
										</p>

										<div className="space-y-2">
											<div className="flex items-center text-sm">
												<Hotel className="w-4 h-4 mr-1 text-muted-foreground" />
												<span className="text-muted-foreground">
													Room Types:
												</span>
												<span className="ml-1 truncate">
													{hotel.roomTypes
														.map((room) => `${room.type}`)
														.join(", ")}
												</span>
											</div>

											<div className="flex items-center text-sm">
												<UtensilsCrossed className="w-4 h-4 mr-1 text-muted-foreground" />
												<span className="text-muted-foreground">
													Meal Plans:
												</span>
												<span className="ml-1 truncate">
													{hotel.mealPlans
														.slice(0, 2)
														.map((meal) => `${meal.type}`)
														.join(", ")}
												</span>
												{hotel.mealPlans.length > 2 && <span>...</span>}
											</div>
										</div>

										{hotel?.availableDates && (
											<div className="flex items-center text-sm">
												<Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
												<span className="text-muted-foreground">
													Available:
												</span>
												<span className="ml-1">
													{format(hotel?.availableDates.checkIn, "MMM d")} -{" "}
													{format(
														hotel?.availableDates.checkOut,
														"MMM d, yyyy"
													)}
												</span>
											</div>
										)}

										<div className="flex flex-wrap gap-1 mt-2">
											{hotel.amenities.slice(0, 3).map((amenity, index) => (
												<Badge
													key={index}
													variant="outline"
													className="text-xs"
												>
													{amenity}
												</Badge>
											))}
											{hotel.amenities.length > 3 && (
												<Badge variant="outline" className="text-xs">
													+{hotel.amenities.length - 3} more
												</Badge>
											)}
										</div>
									</div>
								</CardContent>
								<CardFooter>
									<Button asChild className="w-full">
										<Link
											to={`/hotels/${hotel._id}`}
											className="relative block group"
										>
											Book Now
										</Link>
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FavoritesPage;

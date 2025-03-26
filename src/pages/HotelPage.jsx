import AmenitiesList from "@/components/AmenitiesList";
import FormSkeleton from "@/components/skeletons/FormSkeleton";
import HotelPageSkeleton from "@/components/skeletons/HotelPageSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	useAddFavoriteMutation,
	useGetFavoritesQuery,
	useGetHotelByIdQuery,
	useRemoveFavoriteMutation,
} from "@/lib/api";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Heart, MapPin, Star } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router";

const CreateBookingForm = lazy(() =>
	import("@/components/CreateBookingForm").then((mod) => ({
		default: mod.CreateBookingForm,
	}))
);

const BookingDialog = lazy(() =>
	import("@/components/BookingDialog").then((mod) => ({
		default: mod.BookingDialog,
	}))
);

const HotelPage = () => {
	const { id } = useParams();
	const [bookingDetails, setBookingDetails] = useState(null);
	const [formDialogOpen, setFormDialogOpen] = useState(false);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const [addFavorite] = useAddFavoriteMutation();
	const [removeFavorite] = useRemoveFavoriteMutation();
	const {
		data: favorites,
		isSuccess: favoritesReceived,
		refetch: refetchFavorites,
		isLoading: FetchingFavorites,
	} = useGetFavoritesQuery();

	useEffect(() => {
		if (favoritesReceived && !FetchingFavorites) {
			setIsFavorite(favorites?.some((favorite) => favorite._id === id));
		}
	}, [favorites, favoritesReceived, FetchingFavorites, id]);

	const handleBookingSubmit = (details) => {
		setBookingDetails(details);
		setFormDialogOpen(false);
		setConfirmDialogOpen(true);
	};

	const handleAddFavorite = async () => {
		try {
			if (!isFavorite) {
				await addFavorite(id);
				refetchFavorites();
				setIsFavorite(true);
			}
		} catch (error) {
			console.error("Failed to add favorite:", error);
		}
	};

	const handleRemoveFavorite = async () => {
		try {
			if (isFavorite) {
				await removeFavorite(id);
				refetchFavorites();
				setIsFavorite(false);
			}
		} catch (error) {
			console.error("Failed to remove favorite:", error);
		}
	};

	const { isLoaded, isSignedIn } = useUser();

	const { data: hotel, isFetching, isError, error } = useGetHotelByIdQuery(id);

	const bookingButton = () => {
		return isLoaded && isSignedIn ? (
			<Button onClick={() => setFormDialogOpen(true)} size="lg">
				Book Now
			</Button>
		) : (
			<SignInButton mode="modal">
				<Button size="lg">Book Now</Button>
			</SignInButton>
		);
	};

	if (isFetching) return <HotelPageSkeleton />;

	if (isError) return <p className="text-red">Error: {error.message}</p>;

	return (
		<div className="container min-h-screen px-4 py-8 mx-auto">
			<div className="grid gap-8 md:grid-cols-2">
				<div className="space-y-4">
					<div className="relative w-full aspect-[3/4]">
						<img
							src={hotel.image}
							alt={hotel.name}
							className="absolute object-cover rounded-lg"
						/>
					</div>
				</div>
				<div className="space-y-6">
					<div className="flex items-start justify-between">
						<div>
							<h1 className="text-3xl font-bold">{hotel.name}</h1>
							<div className="flex items-center mt-2">
								<MapPin className="w-5 h-5 mr-1 text-muted-foreground" />
								<p className="text-muted-foreground">{hotel.location}</p>
							</div>
						</div>
						<Button
							variant="outline"
							size="icon"
							onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
						>
							<Heart
								className={`w-4 h-4 ${isFavorite ? "fill-primary" : ""}`}
							/>
							<span className="sr-only">
								{isFavorite ? "Remove from favorites" : "Add to favorites"}
							</span>
						</Button>
					</div>
					{hotel?.rating && (
						<div className="flex items-center space-x-1">
							<Star className="w-5 h-5 fill-primary text-primary" />
							<span className="font-bold">{hotel?.rating}</span>
							<span className="text-muted-foreground">
								({hotel.reviews?.toLocaleString()} reviews)
							</span>
						</div>
					)}
					<p className="text-muted-foreground">
						{hotel?.description ?? "No Description"}
					</p>
					<Card>
						<CardContent className="p-4">
							<h2 className="mb-4 text-xl font-semibold">Amenities</h2>
							<AmenitiesList amenities={hotel.amenities} />
						</CardContent>
					</Card>

					<div className="flex items-center justify-between">
						<div>
							<p className="text-2xl font-bold">
								Starting at ${hotel.roomTypes[0].price}
							</p>
							<p className="text-sm text-muted-foreground">per night</p>
						</div>
						{bookingButton()}
						{formDialogOpen && (
							<Suspense fallback={<FormSkeleton />}>
								<CreateBookingForm
									open={formDialogOpen}
									onOpenChange={setFormDialogOpen}
									onSubmit={handleBookingSubmit}
									hotelId={id}
								/>
							</Suspense>
						)}
						{/* <BookingDialog
							open={confirmDialogOpen}
							onOpenChange={setConfirmDialogOpen}
							bookingDetails={bookingDetails}
						/> */}
						{confirmDialogOpen && bookingDetails && (
							<Suspense fallback={<FormSkeleton />}>
								<BookingDialog
									open={confirmDialogOpen}
									onOpenChange={setConfirmDialogOpen}
									bookingDetails={bookingDetails}
								/>
							</Suspense>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HotelPage;

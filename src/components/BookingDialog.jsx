import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api";
import { format } from "date-fns";
import { Bed, Calendar, MapPin, Users, UtensilsCrossed } from "lucide-react";
import { toast } from "sonner";

export function BookingDialog({ open, onOpenChange, bookingDetails }) {
	const { data: hotel } = useGetHotelByIdQuery(bookingDetails.hotelId);
	const [createBooking, { isLoading }] = useCreateBookingMutation();

	const handleSubmit = async (bookingDetails) => {
		try {
			const {
				hotelId,
				requests,
				phoneNumber,
				checkIn,
				checkOut,
				roomType,
				mealPlan,
				adults,
				kids,
				totalAmount,
			} = bookingDetails;

			await createBooking({
				hotelId,
				phoneNumber,
				checkIn,
				checkOut,
				roomType,
				mealPlan,
				adults: parseInt(adults),
				kids: parseInt(kids),
				requests,
				totalAmount,
			}).unwrap();
			toast.success("Booking request sent successfully");
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Failed to submit the form. Please try again.");
		}
	};

	if (!bookingDetails) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Booking Quotation</DialogTitle>
				</DialogHeader>

				<Card className="border-0 shadow-none bg-inherit">
					<CardContent className="p-2 space-y-5">
						<div className="grid grid-cols-1 gap-1">
							<div className="font-medium">
								{bookingDetails.firstName} {bookingDetails.lastName}
							</div>
							<div className="text-sm text-muted-foreground">
								{bookingDetails.email}
							</div>
							<div className="text-sm text-muted-foreground">
								{bookingDetails.phoneNumber}
							</div>
						</div>

						<Separator />

						<div className="space-y-1">
							<div className="font-medium">{bookingDetails.hotelName}</div>
							<div className="flex items-center text-muted-foreground">
								<MapPin className="w-4 h-4 mr-1" />
								<span>{hotel?.location}</span>
							</div>
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1">
								<div className="text-sm text-muted-foreground">Check-in</div>
								<div className="flex items-center">
									<Calendar className="w-4 h-4 mr-1" />
									<span>
										{format(bookingDetails.checkIn, "EEE, MMM d, yyyy")}
									</span>
								</div>
							</div>

							<div className="space-y-1">
								<div className="text-sm text-muted-foreground">Check-out</div>
								<div className="flex items-center">
									<Calendar className="w-4 h-4 mr-1" />
									<span>
										{format(bookingDetails.checkOut, "EEE, MMM d, yyyy")}
									</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1">
								<div className="text-sm text-muted-foreground">Room Type</div>
								<div className="flex items-center">
									<Bed className="w-4 h-4 mr-1" />
									<span>{bookingDetails.roomType}</span>
								</div>
							</div>

							<div className="space-y-1">
								<div className="text-sm text-muted-foreground">Meal Plan</div>
								<div className="flex items-center">
									<UtensilsCrossed className="w-4 h-4 mr-1" />
									<span>{bookingDetails.mealPlan}</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1">
								<div className="text-sm text-muted-foreground">Guests</div>
								<div className="flex items-center">
									<Users className="w-4 h-4 mr-1" />
									<span>
										{bookingDetails?.adults}{" "}
										{bookingDetails.adults === 1 ? "Adult" : "Adults"}
										{bookingDetails?.kids > 0 &&
											`, ${bookingDetails?.kids} ${
												bookingDetails?.kids === 1 ? "Child" : "Children"
											}`}
									</span>
								</div>
							</div>

							<div className="space-y-1">
								<div className="text-sm text-muted-foreground">Duration</div>
								<div>
									{bookingDetails.days}
									{bookingDetails.days === 1 ? " Day" : " Days"}
								</div>
							</div>
						</div>

						<Separator />

						<div className="flex items-center justify-between font-semibold">
							<div className="text-lg">Total Amount</div>
							<div className="text-xl">
								${bookingDetails.totalAmount.toFixed(2)}
							</div>
						</div>
					</CardContent>
				</Card>

				<DialogFooter className="sm:justify-between">
					<DialogClose asChild>
						<Button variant="outline">Close</Button>
					</DialogClose>
					<Button
						type="submit"
						onClick={() => handleSubmit(bookingDetails)}
						disabled={isLoading}
					>
						{isLoading ? "Checking..." : "Confirm Booking"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

// Default export for lazy loading
export default { BookingDialog };

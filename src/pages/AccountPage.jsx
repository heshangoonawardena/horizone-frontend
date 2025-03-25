import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetBookingsQuery } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import { Bed } from "lucide-react";
import { Reply } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { UtensilsCrossed } from "lucide-react";
import { BedIcon } from "lucide-react";
import { Users } from "lucide-react";
import { Clock } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { XCircle } from "lucide-react";
import { Hotel } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const AccountPage = () => {
	const { data: bookings, isLoading } = useGetBookingsQuery();

	const { user } = useUser();
	// const [bookings, setBookings] = useState(null); // bookings
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedBookingId, setSelectedBookingId] = useState(null);

	const handleCancelBooking = () => {
		if (selectedBookingId) {
			setBookings(
				bookings?.map((booking) =>
					booking._id === selectedBookingId
						? { ...booking, status: "cancelled" }
						: booking
				)
			);
			setIsDialogOpen(false);
			setSelectedBookingId(null);
		}
	};

	const openCancelDialog = (id) => {
		setSelectedBookingId(id);
		setIsDialogOpen(true);
	};

	const getStatusBadge = (status) => {
		switch (status) {
			case "confirmed":
				return (
					<Badge className="bg-green-500 hover:bg-green-600">
						<CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed
					</Badge>
				);
			case "pending":
				return (
					<Badge className="bg-yellow-500 hover:bg-yellow-600">
						<Clock className="w-3 h-3 mr-1" /> Pending
					</Badge>
				);
			case "cancelled":
				return (
					<Badge className="bg-red-500 hover:bg-red-600">
						<XCircle className="w-3 h-3 mr-1" /> Cancelled
					</Badge>
				);
			default:
				return <Badge>{status}</Badge>;
		}
	};

	return (
		<div className="container max-w-6xl px-4 py-6 mx-auto">
			<div className="flex flex-col space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">My Account</h1>
				</div>

				<Tabs defaultValue="profile" className="w-full">
					<TabsList className="mb-4">
						<TabsTrigger value="profile">Profile</TabsTrigger>
						<TabsTrigger value="bookings">My Bookings</TabsTrigger>
					</TabsList>

					<TabsContent value="profile" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Profile</CardTitle>
								<CardDescription>Your personal information</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="grid grid-cols-1 gap-1">
									<div className="font-medium">Name: Heshan Goonawardena</div>
									<div>Email: heshangoonawardena@gmail.com</div>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="bookings" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>My Bookings</CardTitle>
								<CardDescription>
									View and manage your hotel bookings
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									{bookings?.length === 0 ? (
										<div className="py-6 text-center text-muted-foreground">
											You don't have any bookings yet.
										</div>
									) : (
										bookings?.map((booking) => (
											<Collapsible
												key={booking._id}
												className="overflow-hidden border rounded-lg"
											>
												<div className="flex flex-col md:flex-row">
													<div className="relative md:w-1/4 group">
														<Link to={`/hotels/${booking.hotel.id}`}>
															<img
																src={booking.hotel.image || "/placeholder.svg"}
																alt={booking.hotel.name}
																className="absolute object-cover w-full h-full transition-transform group-hover:scale-105"
															/>
														</Link>
													</div>
													<div className="flex flex-col p-4 md:w-3/4">
														<div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start">
															<div>
																<h3 className="text-lg font-bold">
																	{booking.hotel.name}
																</h3>
																<div className="flex items-center text-sm text-muted-foreground">
																	<MapPin className="w-4 h-4 mr-1" />
																	{booking.hotel.location}
																</div>
															</div>
															<div>{getStatusBadge(booking.status)}</div>
														</div>

														<div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
															<div>
																<div className="text-sm text-muted-foreground">
																	Dates
																</div>
																<div className="flex items-center">
																	<CalendarIcon className="w-4 h-4 mr-1" />
																	<span>
																		{format(booking.checkIn, "MMM d")} -{" "}
																		{format(booking.checkOut, "MMM d, yyyy")}
																	</span>
																</div>
															</div>

															<div>
																<div className="text-sm text-muted-foreground">
																	Room
																</div>
																<div className="flex items-center">
																	<Bed className="w-4 h-4 mr-1" />
																	<span>{booking.roomType}</span>
																</div>
															</div>

															<div>
																<div className="text-sm text-muted-foreground">
																	Meal Plan
																</div>
																<div className="flex items-center">
																	<UtensilsCrossed className="w-4 h-4 mr-1" />
																	<span>{booking.mealPlan}</span>
																</div>
															</div>
														</div>

														<div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
															<div>
																<div className="text-sm text-muted-foreground">
																	Guests
																</div>
																<div className="flex items-center">
																	<Users className="w-4 h-4 mr-1" />
																	<span>
																		{booking.adults}{" "}
																		{booking.adults === 1 ? "Adult" : "Adults"}
																		{booking.kids > 0 &&
																			`, ${booking.kids} ${
																				booking.kids === 1
																					? "Child"
																					: "Children"
																			}`}
																	</span>
																</div>
															</div>

															<div className="md:col-span-2">
																<div className="text-sm text-muted-foreground">
																	Special Requests
																</div>
																<div className="text-sm">
																	{booking?.requests || "-"}
																</div>
															</div>
														</div>

														<CollapsibleContent className="pt-4 mt-4 space-y-4 border-t">
															{booking?.ownerNote && (
																<div className="p-3 rounded-md bg-muted">
																	<div className="flex items-center mb-1 font-medium">
																		<MessageSquare className="w-4 h-4 mr-1" />
																		Note from Hotel
																	</div>
																	<div className="text-sm">
																		{booking?.ownerNote}
																	</div>
																</div>
															)}
														</CollapsibleContent>

														<div className="flex items-center justify-between pt-4 mt-4 border-t">
															<div className="font-semibold">
																${booking.totalAmount.toFixed(2)}
															</div>
															<div className="flex items-center gap-2">
																<CollapsibleTrigger asChild>
																	<Button variant="outline" size="sm">
																		View Details
																	</Button>
																</CollapsibleTrigger>
																{booking.status !== "cancelled" && (
																	<Button
																		variant="destructive"
																		size="sm"
																		onClick={() => openCancelDialog(booking._id)}
																	>
																		Cancel Booking
																	</Button>
																)}
															</div>
														</div>
													</div>
												</div>
											</Collapsible>
										))
									)}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Cancel Booking</AlertDialogTitle>
						<AlertDialogDescription>
							Are you sure you want to cancel this booking? This action cannot
							be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>No, keep booking</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleCancelBooking}
							className="bg-destructive text-destructive-foreground"
						>
							Yes, cancel booking
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default AccountPage;

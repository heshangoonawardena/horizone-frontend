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
	// console.log(bookings);
	// const bookings = [
	// 	{
	// 		_id: "67dbc07762d33184eafbfded",
	// 		userId: "user_2tyPqEaTTN4ex0V1xV7VgRyt7yX",
	// 		hotelId: "67d94f60294961d17c5f8d38",
	// 		phoneNumber: "+9411111111111",
	// 		checkIn: "2025-03-20T07:14:54.980Z",
	// 		checkOut: "2025-03-21T07:14:54.980Z",
	// 		roomType: "suite",
	// 		mealPlan: "breakfast",
	// 		adults: 1,
	// 		kids: 0,
	// 		requests: "",
	// 		totalAmount: 275,
	// 		status: "pending",
	// 		__v: 0,
	// 		hotel: {
	// 			id: "67d94f60294961d17c5f8d38",
	// 			name: "Sea View Resort",
	// 			location: "Miami, Florida",
	// 			image:
	// 				"https://images.unsplash.com/photo-1507876466758-bc54f384809c?q=80&w=1509&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 			description:
	// 				"Sea View Resort is a luxurious seaside retreat that offers guests an unforgettable experience with stunning ocean views. The resort features a variety of upscale amenities, including a spa, a fully-equipped gym, and a beautiful outdoor pool. Guests can enjoy fine dining at the on-site restaurant while overlooking the beach. The resort is perfect for a relaxing getaway, whether you're enjoying the sun, lounging by the pool, or exploring the vibrant local culture of Miami.",
	// 		},
	// 		ownerNote:
	// 			"Thank you for choosing Grand Hotel! We've noted your request for a room with a view and will do our best to accommodate it. Our front desk is open 24/7 for your late check-in.",
	// 		ownerReplies: [
	// 			{
	// 				id: "reply1",
	// 				message:
	// 					"We're pleased to confirm that we've reserved a room with an Eiffel Tower view for you. Our staff will be ready for your late check-in.",
	// 				timestamp: new Date(2025, 4, 30, 14, 25),
	// 			},
	// 		],
	// 	},
	// 	{
	// 		_id: "67dbceb636250012402ddf5f",
	// 		userId: "user_2tyPqEaTTN4ex0V1xV7VgRyt7yX",
	// 		hotelId: "67d94f93294961d17c5f8d62",
	// 		phoneNumber: "+94764468108",
	// 		checkIn: "2025-03-20T08:15:32.121Z",
	// 		checkOut: "2025-03-21T08:15:32.121Z",
	// 		roomType: "bungalow",
	// 		mealPlan: "fullBoard",
	// 		adults: 3,
	// 		kids: 2,
	// 		requests: "testing",
	// 		totalAmount: 740,
	// 		status: "pending",
	// 		__v: 0,
	// 		hotel: {
	// 			id: "67d94f93294961d17c5f8d62",
	// 			name: "Island Bliss Retreat",
	// 			location: "Bali, Indonesia",
	// 			image:
	// 				"https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 			description:
	// 				"Island Bliss Retreat is a tropical paradise on the beautiful island of Bali, offering a serene escape for guests seeking relaxation and rejuvenation. With its tranquil beachfront villas, lush tropical gardens, and stunning ocean views, this resort offers an idyllic setting for a romantic getaway or a peaceful retreat. The resort features a spa, an outdoor pool, and a restaurant that serves fresh local cuisine. Whether you’re enjoying a spa treatment, swimming in the crystal-clear waters, or simply soaking up the sun, Island Bliss is the ultimate place to unwind.",
	// 		},
	// 	},
	// 	{
	// 		_id: "67dbd22836250012402de046",
	// 		userId: "user_2tyPqEaTTN4ex0V1xV7VgRyt7yX",
	// 		hotelId: "67d94f8d294961d17c5f8d5c",
	// 		phoneNumber: "+94764468108",
	// 		checkIn: "2025-03-20T08:30:14.672Z",
	// 		checkOut: "2025-03-21T08:30:14.672Z",
	// 		roomType: "bungalow",
	// 		mealPlan: "halfBoard",
	// 		adults: 1,
	// 		kids: 4,
	// 		requests: "request",
	// 		totalAmount: 240,
	// 		status: "pending",
	// 		__v: 0,
	// 		hotel: {
	// 			id: "67d94f8d294961d17c5f8d5c",
	// 			name: "Jungle Paradise",
	// 			location: "Amazon Rainforest, Brazil",
	// 			image:
	// 				"https://images.unsplash.com/photo-1582719388123-e03e25d06d51?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 			description:
	// 				"Jungle Paradise is a hidden gem deep in the Amazon Rainforest, offering guests the chance to experience the untamed beauty of nature. This eco-luxury resort is designed for adventure lovers and nature enthusiasts, offering unique excursions like jungle safaris, wildlife spotting, and river cruises. The accommodations are comfortable and offer a connection to the natural world around you, with private bungalows surrounded by lush greenery. Enjoy delicious local cuisine, all while immersing yourself in the awe-inspiring Amazonian ecosystem.",
	// 		},
	// 	},
	// 	{
	// 		_id: "67dbe84b51d3c0a13aebb9f8",
	// 		userId: "user_2tyPqEaTTN4ex0V1xV7VgRyt7yX",
	// 		hotelId: "67d94f6b294961d17c5f8d3e",
	// 		phoneNumber: "+94764468108",
	// 		checkIn: "2025-03-20T10:04:14.890Z",
	// 		checkOut: "2025-03-21T10:04:14.890Z",
	// 		roomType: "bungalow",
	// 		mealPlan: "halfBoard",
	// 		adults: 10,
	// 		kids: 0,
	// 		requests:
	// 			"Late check-in around 10 PM. Would like a room with a view of the Eiffel Tower if possible.",
	// 		totalAmount: 700,
	// 		status: "pending",
	// 		__v: 0,
	// 		hotel: {
	// 			id: "67d94f6b294961d17c5f8d3e",
	// 			name: "Mountain Escape",
	// 			location: "Aspen, Colorado",
	// 			image:
	// 				"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470",
	// 			description:
	// 				"Mountain Escape is an exclusive mountain retreat nestled in the heart of Aspen. Surrounded by breathtaking mountain views, the resort offers cozy cabins that provide the perfect combination of comfort and nature. Whether you’re an outdoor enthusiast seeking adventure on the slopes or someone looking for peace and serenity, this retreat offers it all. With an on-site spa, a fireplace in every room, and exceptional dining options, Mountain Escape guarantees a memorable and rejuvenating experience.",
	// 		},
	// 	},
	// ];


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

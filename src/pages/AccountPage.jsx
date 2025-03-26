import { BookingSkeleton } from "@/components/skeletons/BookingsSkeleton";
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
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
	useGetBookingsForOwnerQuery,
	useGetBookingsForUserQuery,
	useGetHotelsForOwnersQuery,
	usePatchBookingStatusMutation,
} from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import {
	Bed,
	CalendarIcon,
	CheckCircle2,
	Clock,
	DollarSign,
	MapPin,
	MessageSquare,
	PenLine,
	Percent,
	Plus,
	Reply,
	Star,
	Users,
	UtensilsCrossed,
	XCircle,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const AccountPage = () => {
	const {
		data: myBookings,
		isSuccess: myBookingsFetched,
		refetch: fetchMyBookings,
		isLoading: myBookingsLoading,
	} = useGetBookingsForUserQuery();

	const {
		data: receivedBookings,
		isSuccess: receivedBookingsFetched,
		refetch: fetchReceivedBookings,
		isLoading: receivedBookingsLoading,
	} = useGetBookingsForOwnerQuery();
	const {
		data: ownedHotels,
		isSuccess: receivedOwnHotels,
		refetch: fetchOwnHotels,
	} = useGetHotelsForOwnersQuery();
	const { user } = useUser();
	const [patchBookingStatus] = usePatchBookingStatusMutation();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedBookingId, setSelectedBookingId] = useState(null);
	const [replyDialogOpen, setReplyDialogOpen] = useState(false);
	const [selectedBookingForReply, setSelectedBookingForReply] = useState(null);
	const [replyMessage, setReplyMessage] = useState("");
	const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
	const [hotelFilter, setHotelFilter] = useState("all");

	const [approveDialogOpen, setApproveDialogOpen] = useState(false);
	const [approveMessage, setApproveMessage] = useState(
		"Thank you for your booking. We're looking forward to welcoming you..."
	);
	const [selectedBookingForApproval, setSelectedBookingForApproval] =
		useState(null);

	const handleCancelBooking = async () => {
		if (selectedBookingId) {
			try {
				await patchBookingStatus({
					id: selectedBookingId,
					status: "cancelled",
				}).unwrap();
				toast.success("Booking cancelled successfully");
				fetchMyBookings();
				fetchReceivedBookings();
				setIsDialogOpen(false);
				setSelectedBookingId(null);
			} catch (error) {
				console.error("Failed to cancel booking", error);
				toast.error("Failed to cancel booking. Please try again.");
			}
		}
	};

	const openCancelDialog = (id) => {
		setSelectedBookingId(id);
		setIsDialogOpen(true);
	};

	const handleSendReply = () => {
		if (selectedBookingForReply && replyMessage.trim()) {
			const newReply = {
				id: `reply${Date.now()}`,
				message: replyMessage,
				timestamp: new Date(),
			};

			setBookings(
				bookings.map((booking) =>
					booking.id === selectedBookingForReply
						? {
								...booking,
								ownerReplies: [...(booking.ownerReplies || []), newReply],
						  }
						: booking
				)
			);

			setReplyDialogOpen(false);
			setSelectedBookingForReply(null);
			setReplyMessage("");
		}
	};

	const handleApproveBooking = async () => {
		if (selectedBookingForApproval) {
			try {
				await patchBookingStatus({
					id: selectedBookingForApproval,
					status: "confirmed",
					message: approveMessage,
				}).unwrap();
				toast.success("Booking approved successfully");
				fetchReceivedBookings();
				setApproveDialogOpen(false);
				setSelectedBookingForApproval(null);
			} catch (error) {
				console.error("Failed to approve booking", error);
				toast.error("Failed to approve booking. Please try again.");
			}
		}
	};

	const openReplyDialog = (id) => {
		setSelectedBookingForReply(id);
		setReplyDialogOpen(true);
	};

	const openApproveDialog = (id) => {
		setSelectedBookingForApproval(id);
		setApproveDialogOpen(true);
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

	const filteredOwnerBookings = receivedBookings?.filter((booking) => {
		const statusMatch =
			bookingStatusFilter === "all" || booking.status === bookingStatusFilter;
		const hotelMatch =
			hotelFilter === "all" || booking.hotel.id === hotelFilter;
		return statusMatch && hotelMatch;
	});

	return (
		<div className="container max-w-6xl px-4 py-6 mx-auto">
			<div className="flex flex-col space-y-6">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">My Account</h1>
				</div>

				<Tabs defaultValue="profile" className="w-full">
					<TabsList className="mb-4">
						<TabsTrigger value="profile">Profile</TabsTrigger>
						<TabsTrigger
							onClick={fetchMyBookings}
							value="bookings"
							className="flex items-center gap-2"
						>
							My Bookings
							<Badge variant="secondary" className="h-5 px-2 ml-1 text-xs">
								{myBookingsFetched && myBookings.length}
							</Badge>
						</TabsTrigger>
						{user?.publicMetadata?.role === "admin" && (
							<TabsTrigger
								onClick={fetchReceivedBookings}
								value="manage-bookings"
								className="flex items-center gap-2"
							>
								Manage Bookings
								<Badge variant="secondary" className="h-5 px-2 ml-1 text-xs">
									{(receivedBookingsFetched &&
										receivedBookings?.filter((b) =>
											ownedHotels?.some((h) => h._id === b.hotelId)
										).length) ||
										0}
								</Badge>
							</TabsTrigger>
						)}

						{user?.publicMetadata?.role === "admin" && (
							<TabsTrigger
								onClick={fetchOwnHotels}
								value="my-hotels"
								className="flex items-center gap-2"
							>
								My Hotels
								<Badge variant="secondary" className="h-5 px-2 ml-1 text-xs">
									{receivedOwnHotels && ownedHotels.length}
								</Badge>
							</TabsTrigger>
						)}
					</TabsList>

					<TabsContent value="profile" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Profile</CardTitle>
								<CardDescription>Your personal information</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="grid grid-cols-1 gap-1">
									<div className="font-medium">Name: {user.fullName}</div>
									<div>Email: {user.emailAddresses[0].emailAddress}</div>
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
									{myBookingsLoading ? (
										[...Array(3)].map((_, index) => (
											<BookingSkeleton key={index} />
										))
									) : myBookings.length === 0 ? (
										<div className="py-6 text-center text-muted-foreground">
											You don't have any bookings yet.
										</div>
									) : (
										myBookingsFetched &&
										myBookings.map((booking) => (
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
																	{booking?.requests || "None"}
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

															{booking?.ownerReply && (
																<div className="space-y-3">
																	<div className="font-medium">
																		Replies from Hotel
																	</div>
																	<div className="p-3 border-l-4 rounded-md bg-primary/5 border-primary">
																		<div className="flex items-center mb-1 text-sm text-muted-foreground">
																			<Reply className="w-4 h-4 mr-1" />
																			{/* {format(
																				booking?.ownerReply?.timestamp,
																				"MMM d, yyyy 'at' h:mm a"
																			)} */}
																		</div>
																		<div className="text-sm">
																			{booking?.ownerReply.message}
																		</div>
																	</div>
																</div>
															)}
														</CollapsibleContent>

														<div className="flex items-center justify-between pt-4 mt-4 border-t">
															<div className="font-semibold">
																${booking?.totalAmount.toFixed(2)}
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
																		onClick={() =>
																			openCancelDialog(booking._id)
																		}
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

					{/* Manage Bookings Tab (for hotel owners) */}
					<TabsContent value="manage-bookings" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Manage Bookings</CardTitle>
								<CardDescription>
									View and respond to bookings for your hotels
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-4 mb-6 md:flex-row">
									<div className="w-full md:w-1/2">
										<Label htmlFor="statusFilter">Filter by Status</Label>
										<Select
											value={bookingStatusFilter}
											onValueChange={setBookingStatusFilter}
										>
											<SelectTrigger id="statusFilter">
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">All Statuses</SelectItem>
												<SelectItem value="pending">Pending</SelectItem>
												<SelectItem value="confirmed">Confirmed</SelectItem>
												<SelectItem value="cancelled">Cancelled</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="w-full md:w-1/2">
										<Label htmlFor="hotelFilter">Filter by Hotel</Label>
										<Select value={hotelFilter} onValueChange={setHotelFilter}>
											<SelectTrigger id="hotelFilter">
												<SelectValue placeholder="Select hotel" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">All Hotels</SelectItem>
												{receivedOwnHotels &&
													ownedHotels?.map((hotel) => (
														<SelectItem key={hotel._id} value={hotel._id}>
															{hotel.name}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</div>
								</div>

								<div className="space-y-4">
									{receivedBookingsLoading ? (
										[...Array(3)].map((_, index) => (
											<BookingSkeleton key={index} />
										))
									) : filteredOwnerBookings?.length === 0 ? (
										<div className="py-6 text-center text-muted-foreground">
											No bookings match your current filters.
										</div>
									) : (
										filteredOwnerBookings?.map((booking) => (
											<Collapsible
												key={booking._id}
												className="overflow-hidden border rounded-lg"
											>
												<div className="flex flex-col md:flex-row">
													<div className="md:w-1/4">
														<img
															src={booking.hotel.image || "/placeholder.svg"}
															alt={booking.hotel.name}
															className="object-cover w-full h-full"
														/>
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

														<div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
															<div>
																<div className="text-sm text-muted-foreground">
																	Guest
																</div>
																<div className="font-medium">
																	{booking.user.name}
																</div>
																<div className="text-sm">
																	{booking.user.email}
																</div>
															</div>

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
														</div>

														<div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
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
														</div>

														<div className="mt-4">
															<div className="text-sm text-muted-foreground">
																Special Requests
															</div>
															<div className="p-2 mt-1 text-sm border rounded-md">
																{booking?.requests || "None"}
															</div>
														</div>

														<CollapsibleContent className="pt-4 mt-4 space-y-4 border-t">
															{booking?.ownerNote && (
																<div className="p-3 rounded-md bg-muted">
																	<div className="flex items-center mb-1 font-medium">
																		<MessageSquare className="w-4 h-4 mr-1" />
																		Your Note
																	</div>
																	<div className="text-sm">
																		{booking.ownerNote}
																	</div>
																</div>
															)}

															{booking?.ownerReply && (
																<div className="space-y-3">
																	<div className="font-medium">
																		Your Replies
																	</div>
																	<div className="p-3 border-l-4 rounded-md bg-primary/5 border-primary">
																		<div className="flex items-center mb-1 text-sm text-muted-foreground">
																			<Reply className="w-4 h-4 mr-1" />
																			{/* {format(
																				booking.ownerReply.timestamp,
																				"MMM d, yyyy 'at' h:mm a"
																			)} */}
																		</div>
																		<div className="text-sm">
																			{booking.ownerReply.message}
																		</div>
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

																<Button
																	variant="outline"
																	size="sm"
																	onClick={() => openReplyDialog(booking.id)}
																>
																	Send Reply
																</Button>

																{booking.status === "pending" && (
																	<Button
																		variant="default"
																		size="sm"
																		onClick={() =>
																			openApproveDialog(booking._id)
																		}
																	>
																		Approve
																	</Button>
																)}

																{booking.status !== "cancelled" && (
																	<Button
																		variant="destructive"
																		size="sm"
																		onClick={() =>
																			openCancelDialog(booking._id)
																		}
																	>
																		Cancel
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

					{/* My Hotels Tab (for hotel owners) */}
					<TabsContent value="my-hotels" className="space-y-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
								<div>
									<CardTitle>My Hotels</CardTitle>
									<CardDescription>Manage your properties</CardDescription>
								</div>
								<Button>
									<Plus className="w-4 h-4 mr-2" /> Add New Hotel
								</Button>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
									{receivedOwnHotels &&
										ownedHotels?.map((hotel) => (
											<Card key={hotel.id} className="overflow-hidden">
												<div className="w-full overflow-hidden aspect-video">
													<img
														src={hotel.image || "/placeholder.svg"}
														alt={hotel.name}
														className="object-cover w-full h-full"
													/>
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
												<CardContent>
													<div className="grid grid-cols-2 gap-4">
														<div className="space-y-1">
															<div className="text-sm text-muted-foreground">
																Rating
															</div>
															<div className="flex items-center">
																<Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
																<span>{hotel?.rating ?? "-"}/5</span>
															</div>
														</div>
														<div className="space-y-1">
															<div className="text-sm text-muted-foreground">
																Rooms
															</div>
															<div className="flex items-center">
																<Bed className="w-4 h-4 mr-1" />
																<span>{hotel?.rooms ?? "-"}</span>
															</div>
														</div>
														<div className="space-y-1">
															<div className="text-sm text-muted-foreground">
																Occupancy
															</div>
															<div className="flex items-center">
																<Percent className="w-4 h-4 mr-1" />
																<span>{hotel?.occupancyRate ?? "-"}%</span>
															</div>
														</div>
														<div className="space-y-1">
															<div className="text-sm text-muted-foreground">
																Revenue
															</div>
															<div className="flex items-center">
																<DollarSign className="w-4 h-4 mr-1" />
																<span>${hotel?.revenue?.toLocaleString()}</span>
															</div>
														</div>
													</div>
												</CardContent>
												<CardFooter className="flex justify-between">
													<div className="text-sm">
														<Badge variant="outline" className="mr-2">
															{hotel?.pendingBookings} pending
														</Badge>
														<Badge variant="outline">
															{hotel?.confirmedBookings} confirmed
														</Badge>
													</div>
													<Button variant="outline" size="sm">
														<PenLine className="w-4 h-4 mr-2" /> Edit
													</Button>
												</CardFooter>
											</Card>
										))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>

			{/* Cancel Booking Dialog */}
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

			{/* Reply Dialog */}
			<Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Send Reply to Guest</DialogTitle>
						<DialogDescription>
							Your message will be sent to the guest and added to the booking
							conversation.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4 space-y-4">
						<div className="space-y-2">
							<Label htmlFor="reply">Your Message</Label>
							<Textarea
								id="reply"
								placeholder="Type your reply here..."
								value={replyMessage}
								onChange={(e) => setReplyMessage(e.target.value)}
								className="min-h-[100px]"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={handleSendReply}>Send Reply</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Approve Booking Dialog */}
			<Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Approve Booking</DialogTitle>
						<DialogDescription>
							Add a confirmation message for the guest.
						</DialogDescription>
					</DialogHeader>
					<div className="py-4 space-y-4">
						<div className="space-y-2">
							<Label htmlFor="approveMessage">Confirmation Message</Label>
							<Textarea
								id="approveMessage"
								value={approveMessage}
								onChange={(e) => setApproveMessage(e.target.value)}
								className="min-h-[100px]"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setApproveDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button onClick={handleApproveBooking}>Approve Booking</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default AccountPage;

import { useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays, format } from "date-fns";
import {
	Bed,
	CalendarIcon,
	Mail,
	NotebookPen,
	Phone,
	Users,
	Utensils,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { PhoneInput } from "./ui/phone-input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { bookingFormSchema as formSchema } from "@/lib/schemas";

const CreateBookingForm = ({ open, onOpenChange, onSubmit, hotelId }) => {
	const { user } = useUser();
	const { data: hotel, isError, error } = useGetHotelByIdQuery(hotelId);
	const [createBooking, { isLoading }] = useCreateBookingMutation();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: user.firstName,
			lastName: user.lastName,
			emailAddress: user.emailAddresses[0]?.emailAddress,
			phoneNumber: user?.phoneNumbers[0],
			adults: "1",
			kids: "0",
			roomType: "",
			mealPlan: "",
			date: {
				from: new Date(),
				to: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
			},
			requests: "",
		},
	});

	const calculateTotal = (values) => {
		const selectedRoom = hotel?.roomTypes?.find(
			(room) => room.type === values.roomType
		);
		const selectedMeal = hotel?.mealPlans?.find(
			(meal) => meal.type === values.mealPlan
		);
		const numberOfDays = differenceInDays(values.date.to, values.date.from);
		const totalCost =
			selectedRoom?.price * numberOfDays +
			(selectedMeal?.price || 0) * values.adults * numberOfDays;

		return { totalCost, numberOfDays };
	};

	const handleSubmit = async (values) => {
		try {
			const { totalCost, numberOfDays } = calculateTotal(values);
			const { adults, kids, roomType, mealPlan, phoneNumber, requests } =
				values;

			const bookingDetails = {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.emailAddresses[0]?.emailAddress,
				phoneNumber,
				hotelId,
				checkIn: values.date.from,
				checkOut: values.date.to,
				roomType,
				mealPlan,
				adults: parseInt(adults),
				kids: parseInt(kids),
				totalAmount: totalCost,
				days: numberOfDays,
				requests
			};
			
			onSubmit(bookingDetails);

			// await createBooking(bookingDetails).unwrap();
			// toast.success("Hotel created successfully");
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Failed to submit the form. Please try again.");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-2xl max-w-[425px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Book Your Stay</DialogTitle>
					<DialogDescription>
						Fill in the details below to book your stay.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="max-w-3xl mx-auto space-y-8"
					>
						{/* <DialogHeader>
										<DialogTitle>Book Your Stay</DialogTitle>
										<DialogDescription>
											Fill in the details below to book your stay.
										</DialogDescription>
									</DialogHeader> */}

						{/* Personal Information Section */}
						<div className="space-y-4">
							<h2 className="text-lg font-bold">Personal Information</h2>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-6">
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name *</FormLabel>
												<FormControl>
													<Input disabled type="text" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-6">
									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name *</FormLabel>
												<FormControl>
													<Input disabled type="text" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-6">
									<FormField
										control={form.control}
										name="emailAddress"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email *</FormLabel>
												<div className="flex items-center">
													<Mail className="w-4 h-4 mr-2 text-muted-foreground" />

													<FormControl>
														<Input disabled type="email" {...field} />
													</FormControl>
												</div>
												<FormDescription>
													will send the receipt to this email
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-6">
									<FormField
										control={form.control}
										name="phoneNumber"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Phone number *</FormLabel>
												<div className="flex items-center">
													<Phone className="w-4 h-4 mr-2 text-muted-foreground" />

													<FormControl className="w-full">
														<PhoneInput {...field} defaultCountry="LK" />
													</FormControl>
												</div>
												<FormDescription>
													will contact you if needed
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>

						{/* Booking Information Section */}
						<div className="space-y-4">
							<h2 className="text-lg font-bold">Booking Information</h2>
							<div className="grid grid-cols-12 gap-4">
								<div className="col-span-6">
									<FormField
										control={form.control}
										name="date"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Check-in and Check-out Dates *</FormLabel>
												<div className="flex items-center">
													<CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={"outline"}
																	className={cn(
																		"w-full pl-3 text-left font-normal",
																		!field.value && "text-muted-foreground"
																	)}
																>
																	{field.value ? (
																		field.value.to ? (
																			`${format(
																				field.value.from,
																				"PP"
																			)} - ${format(field.value.to, "PP")}`
																		) : (
																			format(field.value.from, "PPP")
																		)
																	) : (
																		<span>Pick a date</span>
																	)}
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className="w-auto p-0"
															align="start"
														>
															<Calendar
																mode="range"
																selected={field.value}
																onSelect={field.onChange}
																initialFocus
															/>
														</PopoverContent>
													</Popover>
												</div>

												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-3">
									<FormField
										control={form.control}
										name="adults"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Adults *</FormLabel>
												<FormControl>
													<div className="flex items-center">
														<Users className="w-4 h-4 mr-2 text-muted-foreground" />
														<Input type="number" {...field} />
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-3">
									<FormField
										control={form.control}
										name="kids"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Kids</FormLabel>
												<FormControl>
													<div className="flex items-center">
														<Users className="w-4 h-4 mr-2 text-muted-foreground" />
														<Input type="number" {...field} />
													</div>
												</FormControl>
												<FormDescription>Age below 12 are kids</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-6">
									<FormField
										control={form.control}
										name="roomType"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Room Type *</FormLabel>
												<div className="flex items-center">
													<Bed className="w-4 h-4 mr-2 text-muted-foreground" />
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{hotel?.roomTypes?.map((room) => (
																<SelectItem key={room._id} value={room.type}>
																	{room.type} - ${room.price}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="col-span-6">
									<FormField
										control={form.control}
										name="mealPlan"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Meal Plan *</FormLabel>
												<div className="flex items-center">
													<Utensils className="w-4 h-4 mr-2 text-muted-foreground" />
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{hotel?.mealPlans?.map((meal) => (
																<SelectItem key={meal._id} value={meal.type}>
																	{meal.type} - ${meal.price}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>

						{/* Special Requests Section */}
						<div className="space-y-4">
							<h2 className="text-lg font-bold">Special Requests</h2>
							<FormField
								control={form.control}
								name="requests"
								render={({ field }) => (
									<FormItem>
										<div className="flex ">
											<NotebookPen className="w-4 h-4 mt-2 mr-2 text-muted-foreground" />
											<FormControl>
												<Textarea
													placeholder="Requests are always welcome"
													className="resize-none"
													{...field}
												/>
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? "Checking..." : "Check Availability"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export { CreateBookingForm };

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { amenitiesList } from "@/lib/amenities";
import { useCreateHotelMutation } from "@/lib/api";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BedSingle, Castle, Hotel } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createHotelSchema } from "@/lib/schemas";
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from "./ui/multi-select";

const CreateHotelForm = () => {
	const [createHotel, { loading }] = useCreateHotelMutation();
	const [roomTypes, setRoomTypes] = useState([]);
	const [mealPlans, setMealPlans] = useState([]);
	const { user } = useUser();

	const onSubmit = async (values) => {
		const {
			name,
			location,
			image,
			description,
			amenities,
			roomTypes,
			mealPlans,
			contactInfo,
		} = values;
		try {
			// await createHotel({
			// 	ownerId: user.id,
			// 	name,
			// 	location,
			// 	image,
			// 	description,
			// 	amenities,
			// 	roomTypes: roomTypes.map((type) => ({
			// 		type,
			// 		price: values.roomPrices[type],
			// 	})),
			// 	mealPlans: mealPlans.map((plan) => ({
			// 		type: plan,
			// 		price: values.mealPrices[plan],
			// 	})),
			// 	contactInfo,
			// }).unwrap();
			toast.success("Hotel created successfully");
		} catch (error) {
			toast.error(
				<>
					<div>Hotel creation failed</div> Error: {error.data.message}
				</>
			);
			console.error(error);
		}
	};

	const form = useForm({
		resolver: zodResolver(createHotelSchema),
		defaultValues: {
			roomTypes: [],
			roomPrices: {},
			mealPlans: [],
			mealPrices: {},
			amenities: [],
			contactInfo: {
				phone: "",
				email: user.emailAddresses[0].emailAddress,
				website: "",
			},
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="max-w-3xl py-10 mx-auto space-y-8"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hotel Name</FormLabel>
							<FormControl>
								<Input placeholder="Hotel Name" type="text" {...field} />
							</FormControl>
							<FormDescription>Enter the name of the hotel</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<FormControl>
										<Input placeholder="location" type="text" {...field} />
									</FormControl>
									<FormDescription>
										Enter the location of the hotel
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="col-span-6">
						<FormField
							control={form.control}
							name="image"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image URL</FormLabel>
									<FormControl>
										<Input placeholder="Image URL" type="text" {...field} />
									</FormControl>
									<FormDescription>
										Enter the url of the hotel image
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-12">
						<FormField
							control={form.control}
							name="roomTypes"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Room Types</FormLabel>
									<FormControl>
										<MultiSelector
											values={field.value}
											onValuesChange={(values) => {
												field.onChange(values);
												setRoomTypes(values);
											}}
											loop
											className="max-w-xs"
										>
											<MultiSelectorTrigger>
												<MultiSelectorInput placeholder="select room types" />
											</MultiSelectorTrigger>
											<MultiSelectorContent>
												<MultiSelectorList>
													<MultiSelectorItem value={"single"}>
														<div className="flex items-center justify-between w-full">
															Single
															<BedSingle />
														</div>
													</MultiSelectorItem>
													<MultiSelectorItem value={"double"}>
														<div className="flex items-center justify-between w-full">
															Double
															<div className="flex gap-1">
																<BedSingle />
																<BedSingle />
															</div>
														</div>
													</MultiSelectorItem>
													<MultiSelectorItem value={"triple"}>
														<div className="flex items-center justify-between w-full">
															Triple
															<div className="flex gap-1">
																<BedSingle />
																<BedSingle />
																<BedSingle />
															</div>
														</div>
													</MultiSelectorItem>
													<MultiSelectorItem value={"suite"}>
														<div className="flex items-center justify-between w-full">
															Suite
															<Hotel />
														</div>
													</MultiSelectorItem>
													<MultiSelectorItem value={"bungalow"}>
														<div className="flex items-center justify-between w-full">
															Bungalow
															<Castle />
														</div>
													</MultiSelectorItem>
												</MultiSelectorList>
											</MultiSelectorContent>
										</MultiSelector>
									</FormControl>
									<FormDescription>
										These are the rooms you offer
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{roomTypes.map((type) => (
						<div className="col-span-3" key={type}>
							<FormField
								control={form.control}
								name={`roomPrices.${type}`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{`${
											type.charAt(0).toUpperCase() + type.slice(1)
										} Room Price (LKR)`}</FormLabel>
										<FormControl>
											<Input placeholder="" type="number" {...field} />
										</FormControl>
										<FormDescription>{`${type} room per night`}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					))}
				</div>

				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-12">
						<FormField
							control={form.control}
							name="mealPlans"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Meal Plans</FormLabel>
									<FormControl>
										<MultiSelector
											values={field.value}
											onValuesChange={(values) => {
												field.onChange(values);
												setMealPlans(values);
											}}
											loop
											className="max-w-xs"
										>
											<MultiSelectorTrigger>
												<MultiSelectorInput placeholder="select meal plans" />
											</MultiSelectorTrigger>
											<MultiSelectorContent>
												<MultiSelectorList>
													<MultiSelectorItem value={"breakfast"}>
														Breakfast
													</MultiSelectorItem>
													<MultiSelectorItem value={"halfBoard"}>
														Half Board
													</MultiSelectorItem>
													<MultiSelectorItem value={"fullBoard"}>
														Full Board
													</MultiSelectorItem>
													<MultiSelectorItem value={"allInclusive"}>
														All Inclusive
													</MultiSelectorItem>
												</MultiSelectorList>
											</MultiSelectorContent>
										</MultiSelector>
									</FormControl>
									<FormDescription>
										These are the meal plans you offer
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{mealPlans.map((plan) => (
						<div className="col-span-3" key={plan}>
							<FormField
								control={form.control}
								name={`mealPrices.${plan}`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{`${
											plan.charAt(0).toUpperCase() + plan.slice(1)
										} Plan Price (LKR)`}</FormLabel>
										<FormControl>
											<Input placeholder="" type="number" {...field} />
										</FormControl>
										<FormDescription>{`${plan} plan per room`}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					))}
				</div>

				<FormField
					control={form.control}
					name="amenities"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amenities *</FormLabel>
							<FormControl>
								<MultiSelector
									values={field.value}
									onValuesChange={field.onChange}
									loop
									className="max-w-xs"
								>
									<MultiSelectorTrigger>
										<MultiSelectorInput placeholder="Select amenities" />
									</MultiSelectorTrigger>
									<MultiSelectorContent>
										<MultiSelectorList>
											{amenitiesList.map((amenity) => (
												<MultiSelectorItem
													key={amenity.value}
													value={amenity.value}
												>
													{amenity.label}
												</MultiSelectorItem>
											))}
										</MultiSelectorList>
									</MultiSelectorContent>
								</MultiSelector>
							</FormControl>
							<FormDescription>
								What attractive features you provide
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Description"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Enter what people should know about the hotel
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-4">
						<FormField
							control={form.control}
							name="contactInfo.phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input placeholder="Phone" type="text" {...field} />
									</FormControl>
									<FormDescription>
										Enter the contact phone number
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="col-span-4">
						<FormField
							control={form.control}
							name="contactInfo.email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email" type="email" {...field} />
									</FormControl>
									<FormDescription>
										Enter the contact email address
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="col-span-4">
						<FormField
							control={form.control}
							name="contactInfo.website"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Website</FormLabel>
									<FormControl>
										<Input placeholder="Website" type="text" {...field} />
									</FormControl>
									<FormDescription>
										Enter the website URL (optional)
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};

export default CreateHotelForm;

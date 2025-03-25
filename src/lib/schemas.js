import * as z from "zod";

export const createHotelSchema = z.object({
	name: z
		.string({ message: "Hotel name cannot be empty" })
		.min(1, { message: "Hotel name cannot be empty" }),
	location: z
		.string({ message: "Hotel location cannot be empty" })
		.min(1, { message: "Hotel location cannot be empty" }),
	image: z
		.string({ message: "Hotel image cannot be empty" })
		.url({ message: "Invalid image URL" }),
	description: z.string().optional(),
	rooms: z
		.string()
		.transform((value) => (value === "" ? "" : Number(value)))
		.refine((value) => !isNaN(Number(value)), {
			message: "Expected number, received string",
		}),
	roomTypes: z
		.array(z.string())
		.min(1, { message: "At least one room type must be selected" }),
	roomPrices: z.record(
		z.string({ message: "Price is required" }),
		z
			.string()
			.transform((value) => (value === "" ? "" : Number(value)))
			.refine((value) => !isNaN(Number(value)), {
				message: "Expected number, received string",
			})
	),
	mealPlans: z
		.array(z.string())
		.min(1, { message: "At least one meal plan must be selected" }),
	mealPrices: z.record(
		z.string({ message: "Price is required" }),
		z
			.string()
			.transform((value) => (value === "" ? "" : Number(value)))
			.refine((value) => !isNaN(Number(value)), {
				message: "Expected number, received string",
			})
	),
	amenities: z
		.array(z.string())
		.min(1, { message: "At least one amenity must be selected" }),
	contactInfo: z.object({
		phone: z
			.string({ message: "Phone number is required" })
			.min(1, { message: "Phone number is required" }),
		email: z
			.string({ message: "Email is required" })
			.email({ message: "Invalid email format" }),
		website: z.union([z.string().url(), z.literal("")]),
	}),
});

export const bookingFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	emailAddress: z.string(),
	phoneNumber: z
		.string({ message: "Phone number is required" })
		.min(10, { message: "Phone number is required" }),
	date: z.object({
		from: z.date({ message: "Arrival date is required" }),
		to: z.date({ message: "Departure date is required" }),
	}),
	roomType: z.string().min(1, { message: "select a room type" }),
	mealPlan: z.string().min(1, { message: "select a meal plan" }),
	adults: z
		.string()
		.transform((value) => (value === "" ? "" : Number(value)))
		.refine((value) => !isNaN(Number(value)), {
			message: "Expected number, received string",
		}),
	kids: z
		.string()
		.transform((value) => (value === "" ? "" : Number(value)))
		.refine((value) => !isNaN(Number(value)), {
			message: "Expected number, received string",
		}),
	requests: z.string().optional(),
});


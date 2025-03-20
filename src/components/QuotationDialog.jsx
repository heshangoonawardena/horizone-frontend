import { format, differenceInDays } from "date-fns";
import {
	Dialog,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogContent,
	DialogOverlay,
} from "./ui/dialog";
import { Button } from "./ui/button";

const QuotationDialog = ({ isOpen, onClose, form, hotel }) => {
	const handleGetQuotation = () => {
		const values = form.getValues();

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
		return {
			...values,
			hotelName: hotel?.name,
			location: hotel?.location,
			roomPrice: selectedRoom?.price,
			mealPrice: selectedMeal?.price,
			totalCost,
		};
	};

	const details = handleGetQuotation();

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogOverlay />
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Quotation Details</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					<div className="flex flex-col gap-1 text-base">
						<div className="grid grid-cols-8">
							<p className="col-span-2 font-extrabold">Hotel</p>
							<p>:</p>
							<p className="col-span-5">{details?.hotelName}</p>
						</div>
						<div className="grid grid-cols-8">
							<p className="col-span-2 font-extrabold">Location </p>
							<p>:</p>
							<p className="col-span-5">{details?.location}</p>
						</div>
						<div className="grid grid-cols-8">
							<p className="col-span-2 font-extrabold">Dates</p>
							<p>:</p>
							<p className="col-span-5">
								{format(details?.date.from, "PP")} -
								{format(details?.date.to, "PP")}
							</p>
						</div>
						<div className="grid grid-cols-8">
							<p className="col-span-2 font-extrabold">Room Type</p>
							<p>:</p>
							<p className="col-span-5">{details?.roomType}</p>
						</div>
						<div className="grid grid-cols-8">
							<p className="col-span-2 font-extrabold">Meal Plan</p>
							<p>:</p>
							<p className="col-span-5">{details?.mealPlan}</p>
						</div>
						<div className="grid grid-cols-8">
							<p className="col-span-2 font-extrabold">Adults</p>
							<p>:</p>
							<p className="col-span-5">{details?.adults}</p>
						</div>
						<div className="grid grid-cols-8">
							<p className="col-span-2 font-extrabold">Kids</p>
							<p>:</p>
							<p className="col-span-5">{details?.kids}</p>
						</div>
						<div className="grid grid-cols-8">
							<p className="col-span-2 font-extrabold">Total Cost</p>
							<p>:</p>
							<p className="col-span-5">${details?.totalCost}</p>
						</div>
					</div>
				</DialogDescription>
				<DialogFooter>
					<Button onClick={onClose}>Close</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export { QuotationDialog };

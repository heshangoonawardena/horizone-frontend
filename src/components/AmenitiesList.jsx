import {
  AirVent,
  CarFront,
  Cctv,
  Dumbbell,
  FlameKindling,
  Laptop2,
  Luggage,
  ParkingSquare,
  PersonStanding,
  Shirt,
  SprayCan,
  Store,
  Utensils,
  WashingMachine,
  Waves,
  Wifi,
} from "lucide-react";
import { amenitiesList } from "../lib/amenities";

const iconComponents = {
	Wifi,
	Waves,
	Dumbbell,
	PersonStanding,
	ParkingSquare,
	Utensils,
	AirVent,
	Shirt,
	SprayCan,
	Laptop2,
	WashingMachine,
	Cctv,
	FlameKindling,
	Luggage,
	CarFront,
	Store,
};

const AmenitiesList = ({ amenities }) => {
	const availableAmenities = amenitiesList.filter((amenity) =>
		amenities.includes(amenity.value)
	);

	return (
		<div className="grid grid-cols-3 gap-4">
			{availableAmenities.map((amenity) => {
				const IconComponent = iconComponents[amenity.icon];
				return (
					<div key={amenity.value} className="flex items-center">
						<IconComponent className="w-5 h-5 mr-2" />
						<span>{amenity.label}</span>
					</div>
				);
			})}
		</div>
	);
};

export default AmenitiesList;

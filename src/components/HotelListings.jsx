import { useGetHotelForSearchQueryQuery } from "@/lib/api";
import { AlertCircle, Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import SpotlightCard from "./reactBites/SpotLightCard";
import SkeletonListings from "./skeletons/HotelCardSkeleton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function HotelListings() {
	const [selectedLocation, setSelectedLocation] = useState("ALL");
	const [sortBy, setSortBy] = useState("price");
	const [order, setOrder] = useState("asc");
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(Infinity);
	const [tempMinPrice, setTempMinPrice] = useState(0);
	const [tempMaxPrice, setTempMaxPrice] = useState(Infinity);
	const searchValue = useSelector((state) => state.search.value);

	const {
		data: hotels,
		isFetching,
		isError,
		error,
		isSuccess,
	} = useGetHotelForSearchQueryQuery({
		query: searchValue,
		sortBy,
		order,
		minPrice,
		maxPrice,
	});

	const locations = isSuccess && [
		"ALL",
		...Array.from(
			new Set(
				hotels.map((hotel) => {
					if (hotel?.location) {
						const words = hotel.location.toUpperCase().split(" ");
						return words[words.length - 1];
					}
				})
			)
		).slice(0, 5),
	];

	const handleSelectLocation = (location) => {
		setSelectedLocation(location);
	};

	const handleSortChange = (e) => {
		const [newSortBy, newOrder] = e.split("-");
		setSortBy(newSortBy);
		setOrder(newOrder);
	};

	const handlePriceRangeChange = (e) => {
		const { name, value } = e.target;
		if (name === "minPrice") setTempMinPrice(value);
		if (name === "maxPrice") setTempMaxPrice(value);
	};

	const handleApplyFilters = () => {
		setMinPrice(tempMinPrice);
		setMaxPrice(tempMaxPrice === "" ? Infinity : tempMaxPrice);
	};

	const filteredHotels =
		selectedLocation === "ALL"
			? hotels
			: isSuccess &&
			  hotels.filter((hotel) =>
					hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())
			  );

	return (
		<section className="px-8 py-8 lg:py-16">
			<div className="mb-12">
				<h2 className="mb-4 text-3xl font-bold md:text-4xl">
					Top trending hotels worldwide
				</h2>
				<p className="text-lg text-muted-foreground">
					Discover the most trending hotels worldwide for an unforgettable
					experience.
				</p>
				<div className="flex gap-12 mt-4">
					<div className="flex flex-col gap-2">
						<Label className="font-bold">Sort By:</Label>
						<Select
							onValueChange={handleSortChange}
							defaultValue={`${sortBy}-${order}`}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="price-asc">Price (Low to High)</SelectItem>
								<SelectItem value="price-desc">Price (High to Low)</SelectItem>
								<SelectItem value="rating-asc">Rating (Low to High)</SelectItem>
								<SelectItem value="rating-desc">
									Rating (High to Low)
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-col gap-2">
						<Label className="font-bold">Min Price:</Label>
						<Input
							type="number"
							name="minPrice"
							value={tempMinPrice}
							onChange={handlePriceRangeChange}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label className="font-bold">Max Price:</Label>
						<Input
							type="number"
							name="maxPrice"
							value={tempMaxPrice === Infinity ? "" : tempMaxPrice}
							onChange={handlePriceRangeChange}
						/>
					</div>
					<Button className="mt-4 " cls onClick={handleApplyFilters}>
						Apply Filters
					</Button>
				</div>
			</div>
			{isFetching ? (
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{[...Array(8)].map((_, index) => (
						<SkeletonListings key={index} />
					))}
				</div>
			) : isError ? (
				<div className="text-center text-red-500">
					<AlertCircle className="w-12 h-12 mx-auto mb-4" />
					<p className="text-xl font-semibold">Oops! Something went wrong.</p>
					<p className="text-lg">{error}</p>
				</div>
			) : isSuccess && hotels.length === 0 ? (
				<div className="flex flex-col items-center justify-center text-center text-muted-foreground">
					<Search className="w-12 h-12 mb-4" />
					<p className="text-xl font-semibold">No hotels match your search.</p>
					<p className="text-lg">Try adjusting your search criteria.</p>
				</div>
			) : (
				<div>
					<div className="mb-2">
						{locations.map((location, i) => {
							return (
								<LocationTab
									key={i}
									location={location}
									onClick={handleSelectLocation}
									selectedLocation={selectedLocation}
								/>
							);
						})}
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						{filteredHotels.map((hotel) => {
							return (
								<SpotlightCard
									className="custom-spotlight-card"
									spotlightColor="rgba(112, 128, 144, 0.8)"
									key={hotel._id}
								>
									<HotelCard hotel={hotel} />
								</SpotlightCard>
							);
						})}
					</div>
				</div>
			)}
		</section>
	);
}

import { getHotels } from "@/lib/api/hotels";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useState } from "react";
import { Button } from "./ui/button";

export default function HotelListings() {
  const [hotels, setHotels] = useState([]);

  const locations = ["All", "New York", "Australia", "UK", "Paris"];

  const [selectedLocation, setSelectedLocation] = useState("All");

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const filteredHotels =
    selectedLocation === "All"
      ? hotels
      : hotels.filter((hotel) =>
          hotel.location
            .toLocaleLowerCase()
            .includes(selectedLocation.toLocaleLowerCase())
        );

  return (
    <section className="px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Top trending hotels worldwide
        </h2>
        <Button
          onClick={async () => {
            const hotels = await getHotels();
            setHotels(hotels);
          }}
        >
          Fetch Data
        </Button>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
      </div>
      <div className="mb-2">
        {locations.map((location) => (
          <LocationTab
            key={location}
            location={location}
            onClick={handleSelectLocation}
            selectedLocation={selectedLocation}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </section>
  );
}

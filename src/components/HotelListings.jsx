import { useGetHotelsQuery } from "@/lib/api";
import { useState } from "react";
import { useSelector } from "react-redux";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";

export default function HotelListings() {

  const { data: hotels, isLoading, isError, error } = useGetHotelsQuery();

  const { user } = useSelector((state) => state.user);

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

  isLoading;

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
      </div>
      <div className="mb-2">
        {locations.map((location) => {
          return (
            <LocationTab
              key={location}
              location={location}
              onClick={handleSelectLocation}
              selectedLocation={selectedLocation}
            />
          );
        })}
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {filteredHotels.map((hotel) => {
            return <HotelCard key={hotel._id} hotel={hotel} />;
          })}
        </div>
      )}
    </section>
  );
}

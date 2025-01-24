import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useState } from "react";

export default function HotelListings() {
  const hotels = [
    {
      _id: "1",
      name: "The Grand Hotel",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1570560258879-af7f8e1447ac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.5,
      reviews: "2049",
      price: "600",
    },
    {
      _id: "2",
      name: "Hotel Luxe",
      location: "London, UK",
      image:
        "https://media.glamourmagazine.co.uk/photos/673dde53f0a4ec2b20b6076e/master/w_1600%2Cc_limit/COURTYARD_DUSK_135698073_V2.jpg",
      rating: 4.7,
      reviews: "1927",
      price: "400",
    },
    {
      _id: "3",
      name: "Hotel Crown",
      location: "Paris, France",
      image:
        "https://media.architecturaldigest.com/photos/665dd5b2fec3359240899bf5/16:9/w_1600,c_limit/jcr_content%20(1).jpeg",
      rating: 4.9,
      reviews: "1899",
      price: "300",
    },
    {
      _id: "4",
      name: "Hotel H4",
      location: "Berlin, Germany",
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/118769167.jpg?k=405c933b82a50bbe1def3660ba4252ba1e1ebf406b6b4277490c2c4674ddf8c4&o=&hp=1",
      rating: 4.8,
      reviews: "1865",
      price: "500",
    },
    {
      _id: "5",
      name: "Hotel Estate",
      location: "Tokyo, Japan",
      image:
        "https://nightscape.tokyo/en/wp-content/uploads/2023/01/prince-hotel-room-02-1-1024x683.jpg",
      rating: 4.6,
      reviews: "1900",
      price: "700",
    },
    {
      _id: "6",
      name: "Hotel Residence",
      location: "Sydney, Australia",
      image:
        "https://www.crownsydney.com.au/getmedia/cb0ecca8-0dbf-49f4-8735-6a9999ef9ba6/210225-Crown-Sydney-Hotel-Deluxe-King-Room-4961x3307.jpg?width=1800",
      rating: 4.5,
      reviews: "1910",
      price: "800",
    },
  ];

  const locations = ["All", "New York", "London", "UK", "Paris"];

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

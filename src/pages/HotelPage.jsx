import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetHotelByIdQuery } from "@/lib/api";
import { Badge, Coffee, MapPin, MenuIcon, Star, Tv, Wifi } from "lucide-react";
import { useParams } from "react-router";

const HotelPage = () => {
  const { id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(id);

  if (isLoading)
    return (
      <div className="container min-h-screen px-4 py-8 mx-auto">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="w-full h-[400px] rounded-lg" />
            <div className="flex space-x-2">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <Skeleton className="w-64 h-8 mb-2" />
                <Skeleton className="w-48 h-4" />
              </div>
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>
            <Skeleton className="h-4 w-36" />
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>
            <Card>
              <CardContent className="p-4">
                <Skeleton className="w-32 h-6 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Skeleton className="w-5 h-5 mr-2" />
                      <Skeleton className="w-24 h-4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="w-24 h-8 mb-1" />
                <Skeleton className="w-16 h-4" />
              </div>
              <Skeleton className="w-32 h-12" />
            </div>
          </div>
        </div>
      </div>
    );

  if (isError) return <p className="text-red">Error: {error.message}</p>;

  return (
    <div className="container min-h-screen px-4 py-8 mx-auto">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative w-full h-[400px]">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="absolute object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary">Rooftop View</Badge>
            <Badge variant="secondary">French Cuisine</Badge>
            <Badge variant="secondary">City Center</Badge>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="w-5 h-5 mr-1 text-muted-foreground" />
                <p className="text-muted-foreground">{hotel.location}</p>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Star className="w-4 h-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 fill-primary text-primary" />
            <span className="font-bold">{hotel?.rating}</span>
            <span className="text-muted-foreground">
              ({hotel?.reviews?.toLocaleString() ?? "No"} reviews)
            </span>
          </div>
          <p className="text-muted-foreground">{hotel?.description ?? "No Description"}</p>
          <Card>
            <CardContent className="p-4">
              <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Wifi className="w-5 h-5 mr-2" />
                  <span>Free Wi-Fi</span>
                </div>
                <div className="flex items-center">
                  <MenuIcon className="w-5 h-5 mr-2" />
                  <span>Restaurant</span>
                </div>
                <div className="flex items-center">
                  <Tv className="w-5 h-5 mr-2" />
                  <span>Flat-screen TV</span>
                </div>
                <div className="flex items-center">
                  <Coffee className="w-5 h-5 mr-2" />
                  <span>Coffee maker</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">${hotel.price}</p>
              <p className="text-sm text-muted-foreground">per night</p>
            </div>
            <Button size="lg">Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;

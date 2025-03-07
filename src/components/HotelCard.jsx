import { MapPin, Star } from "lucide-react";
import  { Link } from "react-router";

const HotelCard = (props) => {
  
  const { _id, image, name, location, rating, reviews, price } = props.hotel;
  
  return (
    <Link to={`/hotels/${_id}`} key={_id} className="relative block group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="absolute object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>

      <div className="mt-3 space-y-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 fill-primary text-primary" />
          {rating ?? <span className="font-medium">{rating ?? "No ratings"}</span>}
          <span className="text-muted-foreground">
            ({reviews?.toLocaleString() ?? "No"} Reviews)
          </span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-xl font-bold">${price}</span>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;

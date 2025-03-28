import React from "react";
import { Button } from "./ui/button";

const LocationTab = (props) => {

  const handleClick = () => {
    props.onClick(props.location);
  };

  return (
    <Button variant={props.selectedLocation === props.location ? "default" : "ghost" } onClick={handleClick} className="mr-2 ">
      {props.location}
    </Button>
  );
};

export default LocationTab;

import React from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import HotelListings from "./components/HotelListings";

const App = () => {
  return (
    <>
      <Navigation />
      <div className="relative min-h-screen">
        <Hero />
        <img
          src="/assets/hero/hero_1.jpg"
          alt=""
          className="absolute top-0 left-0 object-cover w-full h-full -z-10"
        />
      </div>
      <HotelListings/>  
    </>
  );
};

export default App;

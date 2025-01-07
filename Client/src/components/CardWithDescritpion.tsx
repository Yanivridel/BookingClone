import React from "react";
import { Card, CardTitle, CardDescription } from "./ui/card";
import RandomImage from "../assets/images/image_bottom_aboutus.jpg";

function CardWithDescription() {
  return (
    <Card className="w-full max-w-[360px] sm:max-w-[450px]  mx-auto relative group rounded-xl ">
      <div className="relative w-full h-full">
        <img
          src={RandomImage}
          alt="Random"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute bottom-0 left-0 grid gap-2 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <CardTitle className="font-bold text-white text-2xl">
          New Year's Eve in New York City
        </CardTitle>
        <CardDescription className="font-bold text-white text-base">
          Ring in the new year with iconic moments and unforgettable memories in
          New York City
        </CardDescription>
      </div>
    </Card>
  );
}

export default CardWithDescription;

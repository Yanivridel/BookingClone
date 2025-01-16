import React from "react";
import { PiCarProfile } from "react-icons/pi";
import { IconGuest } from "./ui/Icons";
import { Button } from "./ui/button";

function CompleteProfile() {
  return (
    <div className="p-4 border flex">
      <div className="border w-[70%] flex flex-col gap-4">
        <h1 className="font-bold">Complete your profile</h1>
        <p className="text-sm">Complete your profile and use this information for your next booking</p>
        <div>
            <Button>Complete now</Button>
            <Button variant="ghost" className='text-blue-600 hover:bg-accent hover:text-blue-600'>Not now</Button>
            

        </div>
      </div>
      <div className="border w-[30%] flex">
        <div className="border p-9 bg-sky-100"><IconGuest className=" fill-blue-500 w-8 h-8" /></div>
      </div>
    </div>
  );
}

export default CompleteProfile;

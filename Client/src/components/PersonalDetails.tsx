import React, { useRef } from "react";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/utils/functions";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { IUser } from "@/types/userTypes";

function PersonalDetails() {
  const refs = {
    firstName: useRef(null),
    lastName: useRef(null),
    displayName: useRef(null),
    email: useRef(null),
    nationality: useRef(null),
    month: useRef(null),
    day: useRef(null),
    year: useRef(null),
    gender: useRef(null),
    country: useRef(null),
    city: useRef(null),
    postal: useRef(null),
    address: useRef(null),
    passportExpireDay: useRef(null),
    passportExpireMonth: useRef(null),
    passportExpireYear: useRef(null),
    passportFirstName: useRef(null),
    passportLastName: useRef(null),
    passportNumber: useRef(null),
  } as any;
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;
  const initials = getInitials(
    `${currentUser.fName || ""} ${currentUser.lName || ""}`.trim()
  );

  const handleSave = (key: string) => {
    switch (key) {
      case "name":
        console.log(refs["firstname"]);
        console.log();
    }
    const value = refs[key].current?.value || "";
    console.log(`${key}:`, value);
  };

  

  return (
    <div className="grid grid-cols-1 max-w-[1100px]">
      <div className="border-b-2 flex justify-between ">
        <div className=" flex flex-col gap-2">
          <h1 className="font-bold text-4xl">Personal details</h1>
          <p className="text-gray-500">
            Update your information and find out how it's used.
          </p>
        </div>
        <div className="p-2 max-w-[100px] max-h-[100px]">
          <Avatar className="w-full h-full border-2 border-[#f8b830] pointer-events-none ">
              <AvatarImage
                src={
                  currentUser.user_image
                    ? currentUser.user_image
                    : undefined
                }
                alt="user"
                loading="lazy"
              />
              <AvatarFallback className="text-white w-full h-full flex items-center justify-center">
                {initials || "User"}
              </AvatarFallback>
            </Avatar>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full p-4">
        <AccordionItem value="item-1" className="p-2">
          <AccordionTrigger>Name</AccordionTrigger>
          <p className="text-gray-500 text-sm">Let us know what to call you</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p className="font-semibold ">First name("s") *</p>
                <input
                  ref={refs.firstName}
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Last name("s") *</p>
                <input
                ref={refs.lastName}
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button onClick={() => handleSave("name")}>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="p-2">
          <AccordionTrigger>Display name</AccordionTrigger>
          <p className="text-gray-500 text-sm">Choose a display name</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Display name *</p>
              <input
                ref={refs.displayName}
                type="text"
                className="p-2 rounded-lg border-black border"
              />
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="p-2">
          <AccordionTrigger>Email address</AccordionTrigger>
          <p>
            talkal153@gmail.com <Badge variant="deals">Verity</Badge>
          </p>
          <p className="text-gray-500 text-sm">
            This is the email address you use to sign in. It’s also where we
            send your booking confirmations.
          </p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Email address*</p>
              <input
                ref={refs.email}
                type="text"
                className="p-2 rounded-lg border-black border"
              />
              <p>
                We'll send a verification link to your new email address. Please
                check your inbox.
              </p>
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="p-2">
          <AccordionTrigger>Phone number</AccordionTrigger>
          <p className="text-gray-500 text-sm">Add your phone number</p>
          <p className="text-gray-500 text-sm">
            Properties or attractions you book will use this number if they need
            to contact you.
          </p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Phone number</p>
              <div className="flex gap-2">
                <select className="border rounded-lg">
                  <option value="volvo">Country</option>
                </select>
                <input
                  ref={refs.nationality}
                  placeholder="+972 |"
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="p-2">
          <AccordionTrigger>Date of birth</AccordionTrigger>
          <p className="text-gray-500 text-sm">Select the country/region you're from</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Date of birth*</p>
              <div className="grid grid-cols-3 gap-2">
                <select ref={refs.month} className="border rounded-lg p-2" aria-placeholder="Select Month">
                  <option value="" disabled selected>
                    Select Month
                  </option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
                <input
                  ref={refs.day}
                  type="number"
                  placeholder="DD"
                  max={2}
                  className="p-2 rounded-lg border-black border"
                />
                
                <input
                  ref={refs.year}
                  type="number"
                  placeholder="YYYY"
                  max={4}
                  className="p-2 rounded-lg border-black border"
                />
              </div>
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="p-2">
          <AccordionTrigger>Nationality</AccordionTrigger>
          <p className="text-gray-500 text-sm">Select the country/region you're from</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Nationality *</p>
              <div className="flex gap-2">
                <select className="border rounded-lg p-2">
                  <option value="volvo">Country</option>
                </select>
              </div>
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6" className="p-2">
          <AccordionTrigger>Gender</AccordionTrigger>
          <p className="text-gray-500 text-sm">Select your gender</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Gender*</p>
              <div className="flex gap-2">
                <select className="border rounded-lg p-2" aria-placeholder="ss">
                  <option value="volvo">Select your gender</option>
                </select>
              </div>
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7" className="p-2">
          <AccordionTrigger>Address</AccordionTrigger>
          <p className="text-gray-500 text-sm">Add your address</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Country/region</p>
              <div className="flex gap-2">
                <select className="border rounded-lg p-2" aria-placeholder="ss">
                  <option value="volvo">Select your Country</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Address</p>
                <input
                  ref={refs.address}
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
              <div className=" grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Town/city</p>
                  <input
                    ref={refs.city}
                    type="text"
                    className="p-2 rounded-lg border-black border"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Postcode</p>
                  <input
                    ref={refs.postal}
                    type="text"
                    className="p-2 rounded-lg border-black border"
                  />
                </div>
              </div>
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8" className="p-4">
          <AccordionTrigger>Passport details</AccordionTrigger>
          <p className="text-gray-500 text-sm">Not provided</p>
          <AccordionContent className="flex flex-col gap-5">
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">First name(s) *</p>
                <input
                  ref={refs.passportFirstName}
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Last name(s) *</p>
                <input
                  ref={refs.passportLastName}
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
            </div>
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Issuing country *</p>
                <select className="border rounded-lg p-2" aria-placeholder="ss">
                  <option value="volvo">Select your gender</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Passport number *</p>
                <input
                  ref={refs.passportNumber}
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
            </div>
            <div className="grid grid-cols-1">
              <p className="font-semibold">Expiry date *</p>
              <div className="grid grid-cols-3">
              <select ref={refs.passportExpireMonth} className="border rounded-lg p-2" aria-placeholder="Select Month">
                  <option value="" disabled selected>
                    Select Month
                  </option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
                <input
                  ref={refs.passportExpireDay}
                  placeholder="DD"
                  type="number"
                  className="p-2 rounded-lg border-black border"
                />
                <input
                  ref={refs.passportExpireYear}
                  placeholder="YYYY"
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" className="rounded-lg" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
              >
                I consent to Booking.com storing my passport information in
                accordance with the{" "}
                <span className="text-blue-600 cursor-pointer hover:text-blue-600 hover:underline">
                  privacy statement
                </span>
              </label>
            </div>
            <div className=" flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default PersonalDetails;

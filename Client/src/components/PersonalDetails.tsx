import React from "react";
import KidsImage from "../assets/images/kids.jpeg";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
function PersonalDetails() {
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
          <div className="border border-yellow-400 rounded-full relative w-full h-full">
            <img
              src={KidsImage}
              className="w-full h-full object-cover rounded-full"
              alt=""
            />
          </div>
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
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Last name("s") *</p>
                <input
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
              <Button>Save</Button>
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
                <input
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
                <select className="border rounded-lg p-2" aria-placeholder="ss">
                  <option value="volvo">Select your </option>
                </select>
                <input
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
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
              <div className=" grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Town/city</p>
                  <input
                    type="text"
                    className="p-2 rounded-lg border-black border"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Postcode</p>
                  <input
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
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Last name(s) *</p>
                <input
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
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
              </div>
            </div>
            <div className="grid grid-cols-1">
              <p className="font-semibold">Expiry date *</p>
              <div className="grid grid-cols-3">
                <input
                  placeholder="DD"
                  type="text"
                  className="p-2 rounded-lg border-black border"
                />
                <select className="border rounded-lg p-2" aria-placeholder="MM">
                  <option value="volvo">Select your </option>
                </select>
                <input
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

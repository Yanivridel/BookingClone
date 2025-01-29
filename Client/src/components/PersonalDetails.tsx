import React, { useRef, useState } from "react";
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
import { editProfile } from "@/utils/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlices";
import { Spinner } from "./ui/Icons";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { countryCodes } from "@/utils/staticData";


function PersonalDetails() {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;
  const refs = {
    firstName: useRef(null),
    lastName: useRef(null),
    username: useRef(null),
    email: useRef(null),
    phoneNumber: useRef(null),
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ code: "+972", label: "🇮🇱 Israel" });
  const dispatch = useDispatch();
  const initials = getInitials(
    `${currentUser.fName || ""} ${currentUser.lName || ""}`.trim()
  );
  const { toast } = useToast()

  const handleSave = async (key: string) => {
    setIsLoading(true);
    const fieldsToUpdate: any = {};
    switch (key) {
      // Complicated Keys
      case "name":
        fieldsToUpdate["fName"] = refs["firstName"].current.value;
        fieldsToUpdate["lName"] = refs["lastName"].current.value;
        break;
      case "phoneNumber":
        fieldsToUpdate[key] = selectedCountry.code + refs[key].current.value
        break;
      case "birthday":
        const birthday = fieldsToUpdate["year"] + '-' + fieldsToUpdate["day"] + '-' + fieldsToUpdate["month"]
        // fieldsToUpdate["birthday"] = new Date(, , );
        break;
      // Single Keys:
      case "username": case "email": 
        fieldsToUpdate[key] = refs[key].current.value
        break;
      default:
        break;
    }

    try {
      console.log(fieldsToUpdate);
      const user = await editProfile(fieldsToUpdate);
      if (user) dispatch(setUser(user));

      toast({
        variant: "success",
        title: "Success",
        description: "Fields Updated Successfully"
      })

    } catch(err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please Try Again Later..."
      })
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleDayInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.replace(/\D/g, '');
    if (Number(value) > 31) value = "31";
    e.currentTarget.value = value;
  };
  const handleYearInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.replace(/\D/g, '');
    if (Number(value) > new Date().getFullYear()) value = new Date().getFullYear().toString();
    if (value.length === 4 && Number(value) < 1900) value = "1900";
    e.currentTarget.value = value;
  };


  return (
    <div className="grid grid-cols-1 max-w-[1100px]">
      <div className="border-b-2 flex justify-between">
        <div className=" flex flex-col gap-2 mb-2">
          <h1 className="font-bold text-4xl">Personal details</h1>
          <p className="text-gray-500">
            Update your information and find out how it's used.
          </p>
        </div>
        <div className="p-2 min-w-[75px] h-[75px]">
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
        {/* Full Name */}
        <AccordionItem value="item-1" className="p-2">
          <AccordionTrigger>Name</AccordionTrigger>
          <p className="text-gray-500 text-sm">Let us know what to call you</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p className="font-semibold ">First name("s") *</p>
                <input
                  ref={refs.firstName}
                  defaultValue={currentUser.fName}
                  type="text"
                  maxLength={10}
                  className="p-2 rounded-lg border-black border"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Last name("s") *</p>
                <input
                  ref={refs.lastName}
                  defaultValue={currentUser.lName}
                  type="text"
                  maxLength={10}
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
              <Button disabled={isLoading} onClick={() => handleSave("name")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Username */}
        <AccordionItem value="item-2" className="p-2">
          <AccordionTrigger>Display name</AccordionTrigger>
          <p className="text-gray-500 text-sm">Choose a display name</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Display name *</p>
              <input
                ref={refs.username}
                defaultValue={currentUser.username}
                type="text"
                maxLength={15}
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
              <Button disabled={isLoading} onClick={() => handleSave("username")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Email */}
        <AccordionItem value="item-3" className="p-2">
          <AccordionTrigger>Email address</AccordionTrigger>
          <p>
            {currentUser.email} <Badge variant="deals">Verified</Badge>
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
              <Button disabled={isLoading} onClick={() => handleSave("email")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Phone Number */}
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
              <Select onValueChange={(val) => setSelectedCountry(countryCodes.find(c => c.code === val)!)}>
                <SelectTrigger className="w-48 border rounded-lg p-2 ms-3">
                  <SelectValue placeholder={selectedCountry.label}>{selectedCountry.label}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((country) => (
                    <SelectItem 
                    className={`cursor-pointer ${selectedCountry.label === country.label ? "bg-blue-500 focus:bg-blue-500" : ""}`}
                    key={country.code+country.label} value={country.code}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <input
                  ref={refs.phoneNumber}
                  type="tel"
                  maxLength={10}
                  className={`p-2 rounded-lg border-black border`}
                  style={{ paddingLeft: `${
                    selectedCountry.code.length <= 2 ? 35 : 
                    selectedCountry.code.length <= 4 ?
                    selectedCountry.code.length * 14: 65}px` }}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
                  }}
                />
                <p className="absolute top-1/2 left-2 -translate-y-1/2">{selectedCountry.code + " |"}</p>
              </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="ghost"
                className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
              >
                Cancel
              </Button>
              <Button disabled={isLoading} onClick={() => handleSave("phoneNumber")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Birthday */}
        <AccordionItem value="item-5" className="p-2">
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
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <input
                  ref={refs.day}
                  type="tel"
                  placeholder="DD"
                  maxLength={2}
                  min={1}
                  className="p-2 rounded-lg border-black border"
                  onInput={handleDayInput}
                />
                <input
                  ref={refs.year}
                  type="tel"
                  placeholder="YYYY"
                  maxLength={4}
                  min={1900}
                  max={Number(new Date().getFullYear)}
                  className="p-2 rounded-lg border-black border"
                  onInput={handleYearInput}
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
              <Button disabled={isLoading} onClick={() => handleSave("birthday")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className="p-2">
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
              <Button disabled={isLoading} onClick={() => handleSave("name")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7" className="p-2">
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
              <Button disabled={isLoading} onClick={() => handleSave("name")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8" className="p-2">
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
              <Button disabled={isLoading} onClick={() => handleSave("name")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9" className="p-4">
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
              <Button disabled={isLoading} onClick={() => handleSave("name")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default PersonalDetails;

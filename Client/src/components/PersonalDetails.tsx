import React, { useEffect, useRef, useState } from "react";
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
import { getCurrentCountry, getInitials } from "@/utils/functions";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { IUser } from "@/types/userTypes";
import { editProfile } from "@/utils/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlices";
import { Spinner } from "./ui/Icons";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
    city: useRef(null),
    zipCode: useRef(null),
    addressLine: useRef(null),
    passportExpireDay: useRef(null),
    passportExpireMonth: useRef(null),
    passportExpireYear: useRef(null),
    passportFirstName: useRef(null),
    passportLastName: useRef(null),
    passportNumber: useRef(null),
  } as any;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+1",
    label: "🇺🇸 United States",
  });
  const dispatch = useDispatch();
  const initials = getInitials(
    `${currentUser.fName || ""} ${currentUser.lName || ""}`.trim()
  );
  const { toast } = useToast();

  useEffect(() => {
    getCurrentCountry().then((countryName) => {
      if (!countryName) return;

      const foundCountry = countryCodes.find((el) =>
        el.label.toLowerCase().includes(countryName.toLowerCase())
      );

      if (foundCountry) {
        setSelectedCountry(foundCountry);
      }
    });
  }, []);

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
        fieldsToUpdate[key] = selectedCountry.code + refs[key].current.value;
        break;
      case "country":
        fieldsToUpdate["location"] = {
          country: selectedCountry.label.split(" ")[1],
        };
        break;
      case "birthday":
        const birthday =
          refs["year"].current.value +
          "-" +
          refs["month"].current.value +
          "-" +
          refs["day"].current.value +
          "T00:00:00Z";
        fieldsToUpdate["birthday"] = birthday;
        break;
      case "address":
        const location: any = { country: selectedCountry.label.split(" ")[1] };
        if (refs["city"].current.value)
          location["city"] = refs["city"].current.value;
        if (refs["addressLine"].current.value)
          location["addressLine"] = refs["addressLine"].current.value;
        if (refs["zipCode"].current.value)
          location["zipCode"] = refs["zipCode"].current.value;
        fieldsToUpdate["location"] = location;
        break;
      case "passport":
        const passport: any = { country: selectedCountry.label.split(" ")[1] };
        if (refs["passportFirstName"].current.value)
          passport["fName"] = refs["passportFirstName"].current.value;
        if (refs["passportLastName"].current.value)
          passport["lName"] = refs["passportLastName"].current.value;
        if (refs["passportNumber"].current.value)
          passport["number"] = refs["passportNumber"].current.value;
        const date =
          refs["passportExpireYear"].current.value +
          "-" +
          refs["passportExpireMonth"].current.value +
          "-" +
          refs["passportExpireDay"].current.value +
          "T00:00:00Z";
        if (date) passport["expires"] = date;
        fieldsToUpdate["passport"] = passport;
        break;

      // Single Keys:
      case "username":
      case "email":
      case "gender":
        fieldsToUpdate[key] = refs[key].current.value;
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
        description: "Fields Updated Successfully",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please Try Again Later...",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDayInput = (e: React.FormEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value.replace(/\D/g, "");
    if (Number(value) > 31) value = "31";
    e.currentTarget.value = value;
  };
  const handleYearInput = (
    e: React.FormEvent<HTMLInputElement>,
    isPassport: boolean
  ) => {
    let value = e.currentTarget.value.replace(/\D/g, "");
    if (isPassport) {
      if (
        value.length === 4 &&
        Number(value) < Number(new Date().getFullYear())
      )
        value = String(new Date().getFullYear());
      if (Number(value) > Number(new Date(new Date().getFullYear() + 10)))
        value = String(
          new Date(new Date().getFullYear() + 10, 11, 31).getFullYear()
        );
    } else {
      if (value.length === 4 && Number(value) < 1900) value = "1900";
      if (Number(value) > new Date().getFullYear())
        value = new Date().getFullYear().toString();
    }
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
              src={currentUser.user_image ? currentUser.user_image : undefined}
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
              <AccordionTrigger
                value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
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
              <AccordionTrigger
                value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
              <Button
                disabled={isLoading}
                onClick={() => handleSave("username")}
              >
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
              <AccordionTrigger
                value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
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
                <Select
                  onValueChange={(val) =>
                    setSelectedCountry(
                      countryCodes.find((c) => c.code === val)!
                    )
                  }
                >
                  <SelectTrigger className="w-48 border rounded-lg p-2 ms-3">
                    <SelectValue placeholder={selectedCountry.label}>
                      {selectedCountry.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem
                        className={`cursor-pointer ${
                          selectedCountry.label === country.label
                            ? "bg-blue-500 focus:bg-blue-500"
                            : ""
                        }`}
                        key={country.code + country.label}
                        value={country.code}
                      >
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
                    style={{
                      paddingLeft: `${
                        selectedCountry.code.length <= 2
                          ? 35
                          : selectedCountry.code.length <= 4
                          ? selectedCountry.code.length * 14
                          : 65
                      }px`,
                    }}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /\D/g,
                        ""
                      );
                    }}
                  />
                  <p className="absolute top-1/2 left-2 -translate-y-1/2">
                    {selectedCountry.code + " |"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <AccordionTrigger
                value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
              <Button
                disabled={isLoading}
                onClick={() => handleSave("phoneNumber")}
              >
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Birthday */}
        <AccordionItem value="item-5" className="p-2">
          <AccordionTrigger>Date of birth</AccordionTrigger>
          <p className="text-gray-500 text-sm">
            Select the country/region you're from
          </p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Date of birth*</p>
              <div className="grid grid-cols-3 gap-2">
                <select
                  ref={refs.month}
                  className="border rounded-lg p-2"
                  aria-placeholder="Select Month"
                >
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
                  onInput={(e) => handleYearInput(e, false)}
                />
              </div>
            </div>
            <div className=" flex justify-between">
              <AccordionTrigger
                value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
              <Button
                disabled={isLoading}
                onClick={() => handleSave("birthday")}
              >
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Country */}
        <AccordionItem value="item-6" className="p-2">
          <AccordionTrigger>Nationality</AccordionTrigger>
          <p className="text-gray-500 text-sm">
            Select the country/region you're from
          </p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Nationality *</p>
              <div className="flex gap-2">
                <Select
                  onValueChange={(val) =>
                    setSelectedCountry(
                      countryCodes.find((c) => c.label === val)!
                    )
                  }
                >
                  <SelectTrigger className="border rounded-lg p-2 ms-3 w-5/6">
                    <SelectValue placeholder={selectedCountry.label}>
                      {selectedCountry.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem
                        className={`cursor-pointer ${
                          selectedCountry.label === country.label
                            ? "bg-blue-500 focus:bg-blue-500"
                            : ""
                        }`}
                        key={country.code + country.label}
                        value={country.label}
                      >
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className=" flex justify-between">
              <AccordionTrigger
                value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
              <Button
                disabled={isLoading}
                onClick={() => handleSave("country")}
              >
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Gender */}
        <AccordionItem value="item-7" className="p-2">
          <AccordionTrigger>Gender</AccordionTrigger>
          <p className="text-gray-500 text-sm">Select your gender</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Gender*</p>
              <div className="flex gap-2">
                <select
                  ref={refs.gender}
                  className="border rounded-lg p-2 w-5/6"
                  aria-placeholder="Select Gender"
                >
                  <option value="other" disabled selected>
                    Select your gender
                  </option>
                  <option value="male">I'm a man</option>
                  <option value="female">I'm a woman</option>
                  <option value="non-binary">I'm non-binary</option>
                  <option value="other">I prefer not to say</option>
                </select>
              </div>
            </div>
            <div className=" flex justify-between">
              <AccordionTrigger
                value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
              <Button disabled={isLoading} onClick={() => handleSave("gender")}>
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Address */}
        <AccordionItem value="item-8" className="p-2">
          <AccordionTrigger>Address</AccordionTrigger>
          <p className="text-gray-500 text-sm">Add your address</p>
          <AccordionContent className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 p-2">
              <p className="font-semibold">Country/region</p>
              <div className="flex gap-2">
                <Select
                  onValueChange={(val) =>
                    setSelectedCountry(
                      countryCodes.find((c) => c.label === val)!
                    )
                  }
                >
                  <SelectTrigger className="border rounded-lg p-2 w-full">
                    <SelectValue placeholder={selectedCountry.label}>
                      {selectedCountry.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem
                        className={`cursor-pointer ${
                          selectedCountry.label === country.label
                            ? "bg-blue-500 focus:bg-blue-500"
                            : ""
                        }`}
                        key={country.code + country.label}
                        value={country.label}
                      >
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Address</p>
                <input
                  ref={refs.addressLine}
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
                  <p className="font-semibold">Zip code</p>
                  <input
                    ref={refs.zipCode}
                    type="text"
                    className="p-2 rounded-lg border-black border"
                  />
                </div>
              </div>
            </div>
            <div className=" flex justify-between">
              <AccordionTrigger
                value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
              <Button
                disabled={isLoading}
                onClick={() => handleSave("address")}
              >
                {isLoading ? <Spinner /> : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Passport */}
        <AccordionItem value="item-9" className="p-4">
          <AccordionTrigger>Passport details</AccordionTrigger>
          <p className="text-gray-500 text-sm">
            Save your passport details for use when booking your next stay,
            flight, or attraction.
          </p>
          <AccordionContent className="flex flex-col gap-5 p-2">
            {/* name */}
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
              <p className="text-gray-500 text-xs col-span-2">
                Enter the name exactly as it's written on the passport or other
                official travel document.
              </p>
            </div>
            {/* country  + num */}
            <div className=" grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Issuing country *</p>
                <Select
                  onValueChange={(val) =>
                    setSelectedCountry(
                      countryCodes.find((c) => c.label === val)!
                    )
                  }
                >
                  <SelectTrigger className="border rounded-lg p-2 w-full">
                    <SelectValue placeholder={selectedCountry.label}>
                      {selectedCountry.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country) => (
                      <SelectItem
                        className={`cursor-pointer ${
                          selectedCountry.label === country.label
                            ? "bg-blue-500 focus:bg-blue-500"
                            : ""
                        }`}
                        key={country.code + country.label}
                        value={country.label}
                      >
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            {/* expire date */}
            <div className="grid grid-cols-1">
              <p className="font-semibold">Expiry date *</p>
              <div className="grid grid-cols-3 gap-2">
                <select
                  ref={refs.passportExpireMonth}
                  className="border rounded-lg p-2"
                  aria-placeholder="Select Month"
                >
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
                  ref={refs.passportExpireDay}
                  type="tel"
                  placeholder="DD"
                  maxLength={2}
                  min={1}
                  className="p-2 rounded-lg border-black border"
                  onInput={handleDayInput}
                />
                <input
                  ref={refs.passportExpireYear}
                  type="tel"
                  placeholder="YYYY"
                  maxLength={4}
                  min={Number(new Date().getFullYear())}
                  max={Number(new Date(new Date().getFullYear() + 10))}
                  className="p-2 rounded-lg border-black border"
                  onInput={(e) => handleYearInput(e, true)}
                />
              </div>
            </div>
            <p className="text-gray-500 text-xs col-span-3 -mt-2">
              We’ll store this data safely and remove it after two years of
              inactivity.
            </p>
            {/* concent */}
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
            {/* buttons */}
            <div className=" flex justify-between">
              <AccordionTrigger
                value=""
                className="[&>svg]:hidden text-blue-600 hover:bg-sky-100 hover:text-blue-600 p-2"
              >
                Cancel
              </AccordionTrigger>
              <Button
                disabled={isLoading}
                onClick={() => handleSave("passport")}
              >
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

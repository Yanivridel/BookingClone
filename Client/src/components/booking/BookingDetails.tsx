import { RootState } from "@/store";
import { IUser } from "@/types/userTypes";
import { useSelector } from "react-redux";

import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
import BookingInput from "./BookingInput";
import { validateEmail } from "@/utils/utilsFunctions";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countryCodes } from "@/utils/staticData";
import { cn } from "@/lib/utils";
import { IconError, IconSuccess } from "../ui/Icons";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useTranslation } from "react-i18next";

interface BookingDetailsProps {
  fNameRef: MutableRefObject<HTMLInputElement | null>;
  emailRef: MutableRefObject<HTMLInputElement | null>;
  phoneNumberRef: MutableRefObject<HTMLInputElement | null>;
  companyNameRef: MutableRefObject<HTMLInputElement | null>;
  VATNumberRef: MutableRefObject<HTMLInputElement | null>;

  lName: string;
  setLName: Dispatch<SetStateAction<string>>;

  selectedCountry: {
    code: string;
    label: string;
  };

  setSelectedCountry: Dispatch<
    SetStateAction<{
      code: string;
      label: string;
    }>
  >;

  isForMe: boolean;
  setIsForMe: Dispatch<SetStateAction<boolean>>;
  setIsPaperless: Dispatch<SetStateAction<boolean>>;
  setShouldUpdateAccount: Dispatch<SetStateAction<boolean>>;
}

function BookingDetails({
  fNameRef,
  emailRef,
  phoneNumberRef,
  companyNameRef,
  VATNumberRef,
  selectedCountry,
  setSelectedCountry,
  lName,
  setLName,
  isForMe,
  setIsForMe,
  setIsPaperless,
  setShouldUpdateAccount,
}: BookingDetailsProps) {
  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;

  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState({
    code: "+972",
    label: "🇮🇱 Israel",
  });

  const [isEmailSuccess, setIsEmailSuccess] = useState(false);
  const [isFNameSuccess, setIsFNameSuccess] = useState(false);
  const [isLNameSuccess, setIsLNameSuccess] = useState(false);
  // ! need to check when  country  success and handle it
  const [isCountrySuccess, setIsCountrySuccess] = useState(false);
  const [isCompanyNameSuccess, setIsCompanyNameSuccess] = useState(false);
  const [isVATNumberSuccess, setIsVATNumberSuccess] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [fNameError, setFNameError] = useState("");
  const [lNameError, setLNameError] = useState("");
  // ! need to check if country can be error
  const [countryError, setCountryError] = useState("");

  const [isForWork, setIsForWork] = useState(false);

  const { i18n } = useTranslation();

  // * email
  const onEmailBlur = () => {
    if (emailRef.current?.value) {
      const isValid = validateEmail(emailRef.current.value);
      if (isValid) {
        // valid email
        setIsEmailSuccess(true);
        setEmailError("");
      } else {
        // not valid email
        setEmailError("Enter a valid email address");
        setIsEmailSuccess(false);
      }
    } else setEmailError("Enter your email address"); // no input
  };

  const onFNameBlur = () => {
    if (fNameRef.current?.value.length === 0) {
      setIsFNameSuccess(false);
      setFNameError("Enter your first name");
    } else {
      setIsFNameSuccess(true);
      setFNameError("");
    }
  };

  const onLNameBlur = () => {
    if (!lName) {
      setIsLNameSuccess(false);
      setLNameError("Enter your last name");
    } else {
      setIsLNameSuccess(true);
      setLNameError("");
    }
  };

  const onCompanyNameBlur = () => {
    if (companyNameRef.current?.value.length === undefined) {
      setIsCompanyNameSuccess(false);
      return;
    }
    if (companyNameRef.current?.value.length > 0) {
      setIsCompanyNameSuccess(true);
      return;
    } else setIsCompanyNameSuccess(false);
  };

  const onVATNumberBlur = () => {
    if (VATNumberRef.current?.value.length === undefined) {
      setIsVATNumberSuccess(false);
      return;
    }
    if (VATNumberRef.current?.value.length > 0) {
      setIsVATNumberSuccess(true);
      return;
    } else setIsVATNumberSuccess(false);
  };

  return (
    <div className="border-[1px] border-softGrayBorder mt-4 px-4 rounded-[8px] py-4 grid gap-3">
      <h2 className="font-bold text-xl">Enter your details</h2>
      <div className="flex flex-col signInLayoutTop:flex-row-reverse signInLayoutTop:justify-end   signInLayoutTop:gap-4">
        {/* last Name desktop */}
        <div className="signInLayoutTop:flex-grow hidden signInLayoutTop:block">
          <BookingInput
            areRequiredAsterisk={true}
            isIconSuccess={true}
            isSuccess={isLNameSuccess}
            onBlurHandler={onLNameBlur}
            name="lName"
            type="text"
            state={lName}
            setState={setLName}
            isRequired={true}
            error={lNameError}
            labelText="Last name"
          />
        </div>
        <div className="grid gap-3 signInLayoutTop:flex-grow">
          {/* first name */}
          <BookingInput
            areRequiredAsterisk={true}
            isIconSuccess={true}
            isSuccess={isFNameSuccess}
            onBlurHandler={onFNameBlur}
            ref={fNameRef}
            name="fName"
            defaultValue={currentUser.fName ? currentUser.fName : ""}
            type="text"
            isRequired={true}
            error={fNameError}
            labelText="First name"
          />

          {/* last name mobile */}
          <div className="signInLayoutTop:hidden">
            <BookingInput
              areRequiredAsterisk={true}
              isIconSuccess={true}
              isSuccess={isLNameSuccess}
              onBlurHandler={onLNameBlur}
              name="lName"
              state={lName}
              setState={setLName}
              type="text"
              isRequired={true}
              error={lNameError}
              labelText="Last name"
            />
          </div>
          {/* email */}
          <BookingInput
            areRequiredAsterisk={true}
            isIconSuccess={true}
            isSuccess={isEmailSuccess}
            successMessage="Confirmation email sent to this address"
            onBlurHandler={onEmailBlur}
            ref={emailRef}
            defaultValue={currentUser.email ? currentUser.email : ""}
            isRequired={true}
            error={emailError}
            labelText="Email address"
            name="email"
            type="text"
          />
          {/* Country/Region */}
          <div>
            <div>
              <Label className="text-sm" htmlFor="country">
                Country/Region
              </Label>
              <span className="text-redError ms-1 text-sm">*</span>
            </div>
            <Select
              onValueChange={(val) =>
                setSelectedCountry(countryCodes.find((c) => c.label === val)!)
              }
            >
              <SelectTrigger
                name="country"
                className={cn(
                  "relative",
                  countryError
                    ? "border-redError focus:border-0 text-sm"
                    : "border-black border-[1px] focus:border-0 text-sm"
                )}
              >
                <div>
                  <SelectValue placeholder={selectedCountry.label}>
                    {selectedCountry.label}
                  </SelectValue>
                  {countryError && (
                    <IconError className="h-5 w-5 fill-redError absolute top-2 end-2 " />
                  )}
                  {!countryError && isCountrySuccess && (
                    <IconSuccess className="h-5 w-5 fill-IconsGreen absolute top-2 end-8 bg-white" />
                  )}
                </div>
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
      </div>
      {/* pone number */}
      <div className="flex flex-col gap-2 signInLayoutTop:max-w-[313px]">
        <p className="text-sm font-medium">Phone number</p>
        <div className="flex justify-stretch gap-2 ">
          <Select
            onValueChange={(val) =>
              setSelectedPhoneCountry(countryCodes.find((c) => c.code === val)!)
            }
          >
            <SelectTrigger className="basis-1/3 border-[1px] h-9 border-black rounded-lg text-sm ">
              <SelectValue placeholder={selectedPhoneCountry.label}>
                {selectedPhoneCountry.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((country) => (
                <SelectItem
                  className={`cursor-pointer ${
                    selectedPhoneCountry.label === country.label
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
          <div className="basis-2/3 relative flex ">
            <input
              ref={phoneNumberRef}
              type="tel"
              maxLength={10}
              className={`rounded-lg text-sm  h-9 border-black border flex-grow`}
              style={{
                paddingLeft: `${
                  selectedPhoneCountry.code.length <= 2
                    ? 35
                    : selectedPhoneCountry.code.length <= 4
                    ? selectedPhoneCountry.code.length * 14
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
            <p className="absolute top-1/2 text-sm  left-2 -translate-y-1/2">
              {selectedPhoneCountry.code + " |"}
            </p>
          </div>
        </div>
        <span className="text-xs">
          Needed by the property to validate your booking
        </span>
      </div>

      {/* checkbox 1 - paperless */}
      <div className="py-4 flex gap-2">
        <Checkbox
          onClick={(_) => setIsPaperless((prev) => !prev)}
          id="paperlessConfirmation"
          className="rounded-md h-5 w-5"
        />
        <div className="flex flex-col ">
          <Label
            htmlFor="paperlessConfirmation"
            className="text-sm font-normal"
          >
            Yes, I want free paperless confirmation (recommended)
          </Label>
          <span className="text-xs text-[#595959]">
            We'll text you a link to download our app
          </span>
        </div>
      </div>
      {/* checkbox 2 - Update account */}
      <div className="pb-4 flex gap-2 border-b-[1px]">
        <Checkbox
          onClick={(_) => setShouldUpdateAccount((prev) => !prev)}
          id="shouldUpdateAccount"
          className="rounded-md h-5 w-5"
        />
        <div className="flex flex-col ">
          <Label htmlFor="shouldUpdateAccount" className="text-sm font-normal ">
            Update my account to include these new details
          </Label>
        </div>
      </div>
      {/* booking for ... */}
      <div>
        <div className="text-sm font-medium">
          Who are you booking for?
          <span className="text-[#595959] font-normal">(optional)</span>
        </div>
        <RadioGroup
          dir={i18n.language === "he" ? "rtl" : "ltr"}
          loop={true}
          className="py-2 flex flex-col"
          value={isForMe ? "forMe" : "forSomeone"}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={"forMe"}
              id="forMe"
              onClick={() => {
                setIsForMe(true);
              }}
            />
            <Label htmlFor="forMe" className="font-normal">
              I'm the main guest
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => {
                setIsForMe(false);
              }}
              value={"forSomeone"}
              id="forSomeone"
            />
            <Label htmlFor="forSomeone" className="font-normal">
              I'm booking for someone else
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* traveling for work option */}
      <div>
        <div className="text-sm font-medium">
          Are you traveling for work?
          <span className="text-[#595959] font-normal">(optional)</span>
        </div>
        <RadioGroup
          dir={i18n.language === "he" ? "rtl" : "ltr"}
          loop={true}
          className="py-2 flex"
          value={isForWork ? "forWork" : "notForWork"}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value={"forWork"}
              id="forWork"
              onClick={() => {
                setIsForWork(true);
              }}
            />
            <Label htmlFor="forWork" className="font-normal">
              yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              onClick={() => {
                setIsForWork(false);
                setIsCompanyNameSuccess(false);
                setIsVATNumberSuccess(false);
              }}
              value={"notForWork"}
              id="notForWork"
            />
            <Label htmlFor="notForWork" className="font-normal">
              no
            </Label>
          </div>
        </RadioGroup>
        {isForWork && (
          <div className="grid signInLayoutTop:grid-cols-2 gap-4">
            <BookingInput
              isIconSuccess={true}
              isSuccess={isCompanyNameSuccess}
              onBlurHandler={onCompanyNameBlur}
              labelText="Company Name"
              optional="(optional)"
              isRequired={false}
              name={"CompanyName"}
              type="string"
              ref={companyNameRef}
            />
            <BookingInput
              isIconSuccess={true}
              isSuccess={isVATNumberSuccess}
              onBlurHandler={onVATNumberBlur}
              labelText="VAT Number"
              isRequired={false}
              name={"VATNumber"}
              type="number"
              ref={VATNumberRef}
              optional="(optional)"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingDetails;

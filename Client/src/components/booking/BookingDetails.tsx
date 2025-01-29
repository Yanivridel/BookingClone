import { RootState } from "@/store";
import { IUser } from "@/types/userTypes";
import { useSelector } from "react-redux";

import { useRef, useState } from "react";
import BookingInput from "./BookingInput";
import { validateEmail } from "@/utils/utilsFunctions";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

function BookingDetails() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const fNameRef = useRef<HTMLInputElement | null>(null);
  const lNameRef = useRef<HTMLInputElement | null>(null);

  const [isEmailSeccess, setIsEmailSeccess] = useState(false);
  const [isFNameSeccess, setIsfNameSeccess] = useState(false);
  const [isLNameSeccess, setIsLNameSeccess] = useState(false);

  const [emailEroor, setEmailError] = useState("");
  const [fNameEroor, setfNameError] = useState("");
  const [lNameEroor, setLNameError] = useState("");

  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;

  // * email
  const onEmailBlur = () => {
    if (emailRef.current?.value) {
      const isValid = validateEmail(emailRef.current.value);
      if (isValid) {
        // valid email
        setIsEmailSeccess(true);
        setEmailError("");
      } else {
        // not valid email
        setEmailError("Enter a valid email address");
        setIsEmailSeccess(false);
      }
    } else setEmailError("Enter your email address"); // no input
  };

  const onNameBlur = () => {
    console.log(fNameRef.current?.value.length);

    if (fNameRef.current?.value.length === 0) {
      setIsfNameSeccess(false);
      setfNameError("Enter your first name");
    } else {
      setIsfNameSeccess(true);
      setfNameError("");
    }

    if (lNameRef.current?.value.length === 0) {
      setIsLNameSeccess(false);
      setLNameError("Enter your first name");
    } else {
      setIsLNameSeccess(true);
      setLNameError("");
    }
  };

  return (
    <div className="border-[1px] border-softGrayBorder mt-4 pt-2 ">
      <h2 className="font-bold">Enter your details</h2>
      <div className="flex flex-col signInLayoutTop:flex-row-reverse signInLayoutTop:justify-end   signInLayoutTop:gap-4">
        <div className="signInLayoutTop:flex-grow">
          <BookingInput
            areRequiredAsterisk={true}
            isIconSeccess={true}
            isSeccess={isLNameSeccess}
            onBlurHandler={onNameBlur}
            ref={lNameRef}
            name="lName"
            defaultValue={currentUser.lName ? currentUser.lName : ""}
            type="text"
            isRequired={true}
            error={lNameEroor}
            labalText="Last name"
          />
        </div>
        <div className="signInLayoutTop:flex-grow">
          <BookingInput
            areRequiredAsterisk={true}
            isIconSeccess={true}
            isSeccess={isFNameSeccess}
            onBlurHandler={onNameBlur}
            ref={fNameRef}
            name="fName"
            defaultValue={currentUser.fName ? currentUser.fName : ""}
            type="text"
            isRequired={true}
            error={fNameEroor}
            labalText="First name"
          />

          <BookingInput
            areRequiredAsterisk={true}
            isIconSeccess={true}
            isSeccess={isEmailSeccess}
            seccessMessage="Confirmation email sent to this address"
            onBlurHandler={onEmailBlur}
            ref={emailRef}
            defaultValue={currentUser.email ? currentUser.email : ""}
            isRequired={true}
            error={emailEroor}
            labalText="Email address"
            name="email"
            type="text"
          />
          <BookingInput
            areRequiredAsterisk={true}
            isIconSeccess={true}
            isSeccess={isEmailSeccess}
            seccessMessage="Confirmation email sent to this address"
            onBlurHandler={onEmailBlur}
            ref={emailRef}
            defaultValue={currentUser.email ? currentUser.email : ""}
            isRequired={true}
            error={emailEroor}
            labalText="Email address"
            name="email"
            type="text"
          />
        </div>
      </div>
      <div className="py-4 flex gap-2">
        <Checkbox id="paperlessConfirmation" className="rounded-md h-5 w-5" />
        <div className="flex flex-col ">
          <Label
            htmlFor="paperlessConfirmation"
            className="text-sm font-normal "
          >
            Yes, I want free paperless confirmation (recommended)
          </Label>
          <span className="text-xs text-[#595959]">
            We'll text you a link to download our app
          </span>
        </div>
      </div>
      <div className="pb-4 flex gap-2">
        <Checkbox id="shouldUpdateAccount" className="rounded-md h-5 w-5" />
        <div className="flex flex-col ">
          <Label htmlFor="shouldUpdateAccount" className="text-sm font-normal ">
            Update my account to include these new details
          </Label>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;

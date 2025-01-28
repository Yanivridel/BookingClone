import { RootState } from "@/store";
import { IUser } from "@/types/userTypes";
import { useSelector } from "react-redux";

import { useState } from "react";
import BookingInput from "./BookingInput";

function BookingDetails() {
  const [email, setEmail] = useState("");

  const currentUser = useSelector(
    (state: RootState) => state.currentUser
  ) as unknown as IUser;

  return (
    <div>
      <BookingInput
        value={email}
        setValue={setEmail}
        isRequired={true}
        name="email"
        placeholder=""
        errorMessage="Enter a valid email address"
      />
      <div>
        <h2>Enter your details</h2>
        <label htmlFor="fName">FirstName</label>
        <input
          type="text"
          id="fName"
          placeholder={
            currentUser.fName ? currentUser.fName : "enter Your First Name"
          }
        />
      </div>
      <div>
        <label htmlFor="lName">FirstName</label>
        <input
          type="text"
          id="lName"
          placeholder={
            currentUser.lName ? currentUser.lName : "enter Your Last Name"
          }
        />
      </div>
    </div>
  );
}

export default BookingDetails;

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconError } from "../ui/Icons";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface BookingInputProps {
  isRequired: boolean;
  errorMessage: string;
  placeholder: string;
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

function BookingInput({
  errorMessage,
  placeholder,
  name,
  value,
  setValue,
  isRequired,
}: BookingInputProps) {
  const [isFocus, setIsFocus] = useState<boolean>();
  const [isError, setIsError] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <div className="grid gap-2">
        <Label htmlFor={name}>Email address</Label>
        <div className="relative">
          <Input
            className={isError ? "border-redError focus:border-0" : ""}
            onChange={(e) => handleChange(e)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            required={isRequired}
          />
          {isError && !isFocus && (
            <IconError className="h-5 w-5 fill-redError absolute top-2 end-2 " />
          )}
        </div>
        {isError && <div className="text-redError text-sm">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default BookingInput;

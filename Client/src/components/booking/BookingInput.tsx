import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconError, IconSeccess } from "../ui/Icons";
import { ForwardedRef, forwardRef, MutableRefObject, useState } from "react";

interface BookingInputProps {
  isSeccess?: boolean;
  isIconSeccess?: boolean;
  seccessMessage?: string;
  onBlurHandler: () => void;
  labalText: string;
  error: string;
  isRequired: boolean;
  areRequiredAsterisk?: boolean;
  placeholder?: string;
  name: string;
  type: string;

  defaultValue: string;
}

const BookingInput = forwardRef(function BookingInput(
  {
    error,
    areRequiredAsterisk = false,
    isSeccess = false,
    seccessMessage,
    isIconSeccess = false,
    onBlurHandler,
    name,
    defaultValue,
    placeholder = "",
    isRequired,
    labalText,
    type,
  }: BookingInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [isFocus, setIsFocus] = useState<boolean>();

  return (
    <div>
      <div className="grid gap-1 ">
        <div>
          <Label className="text-sm" htmlFor={name}>
            {labalText}
          </Label>
          {areRequiredAsterisk && (
            <span className="text-redError ms-1 text-sm">*</span>
          )}
        </div>
        <div className="relative">
          <Input
            className={
              error
                ? "border-redError focus:border-0 text-sm"
                : "border-black border-[1px] focus:border-0 text-sm"
            }
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
              onBlurHandler();
            }}
            ref={ref}
            type={type}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={isRequired}
          />
          {error && !isFocus && (
            <IconError className="h-5 w-5 fill-redError absolute top-2 end-2 " />
          )}
          {!isFocus && !error && isIconSeccess && isSeccess && (
            <IconSeccess className="h-5 w-5 fill-IconsGreen absolute top-2 end-2 bg-white" />
          )}
        </div>
        {isSeccess && !error && (
          <div className="text-IconsGreen text-xs">{seccessMessage}</div>
        )}
        {error && <div className="text-redError text-sm">{error}</div>}
      </div>
    </div>
  );
});
BookingInput.displayName = "BookingInput";
export default BookingInput;

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconError, IconSuccess } from "../ui/Icons";
import { ForwardedRef, forwardRef, useState } from "react";

interface BookingInputProps {
  isSuccess?: boolean;
  isIconSuccess?: boolean;
  successMessage?: string;
  onBlurHandler: () => void;
  labelText: string;
  error?: string;
  isRequired: boolean;
  areRequiredAsterisk?: boolean;
  placeholder?: string;
  name: string;
  type: string;
  optional?: string;
  defaultValue?: string;
}

const BookingInput = forwardRef(function BookingInput(
  {
    error,
    areRequiredAsterisk = false,
    isSuccess = false,
    successMessage,
    isIconSuccess = false,
    onBlurHandler,
    name,
    defaultValue,
    placeholder = "",
    isRequired,
    labelText: labelText,
    type,
    optional,
  }: BookingInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [isFocus, setIsFocus] = useState<boolean>();

  return (
    <div>
      <div className="grid gap-1 ">
        <div>
          <Label className="text-sm" htmlFor={name}>
            {labelText}
            {optional && (
              <span className="text-[#595959] font-normal">{optional}</span>
            )}
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
          {!isFocus && !error && isIconSuccess && isSuccess && (
            <IconSuccess className="h-5 w-5 fill-IconsGreen absolute top-2 end-2 bg-white" />
          )}
        </div>
        {isSuccess && !error && (
          <div className="text-IconsGreen text-xs">{successMessage}</div>
        )}
        {error && <div className="text-redError text-sm">{error}</div>}
      </div>
    </div>
  );
});

BookingInput.displayName = "BookingInput";
export default BookingInput;

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IconError, IconSuccess } from "../ui/Icons";
import {
  ChangeEvent,
  Dispatch,
  ForwardedRef,
  forwardRef,
  SetStateAction,
  useState,
} from "react";
import { cn } from "@/lib/utils";

interface BookingInputProps<T> {
  isSuccess?: boolean;
  isIconSuccess?: boolean;
  successMessage?: string;
  onBlurHandler?: () => void;
  labelText: string;
  error?: string;
  isRequired: boolean;
  areRequiredAsterisk?: boolean;
  placeholder?: string;
  name: string;
  type: string;
  optional?: string;
  defaultValue?: string;
  state?: string;
  setState?: Dispatch<SetStateAction<string>>;
  maxLength?: number;
  labelClassName?: string;
  message?: string;
  wrapperClassName?: string;
  onInputChangeProps?: (
    e: React.ChangeEvent<HTMLInputElement>,
    params: T extends void ? void : T
  ) => void;
  onInputChangeArguments?: T;
}

//  ! if state - no default value , if ref - no value
const BookingInput = forwardRef(function BookingInput<T>(
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
    state,
    setState,
    maxLength,
    labelClassName = "",
    message,
    wrapperClassName = "",
    onInputChangeProps,
    onInputChangeArguments = undefined,
  }: BookingInputProps<T>,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const [isFocus, setIsFocus] = useState<boolean>();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (state !== undefined && setState !== undefined) {
      setState((_) => e.target.value);
    }
  };

  return (
    <div className={wrapperClassName}>
      <div className="grid gap-1 ">
        <div>
          <Label className={cn("text-sm", labelClassName)} htmlFor={name}>
            {labelText}
            {optional && (
              <span className="text-[#595959] font-normal">{` (${optional})`}</span>
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
              onBlurHandler && onBlurHandler();
            }}
            onChange={(e) => {
              if (onInputChangeProps) {
                // Type assertion to handle the conditional type
                if (onInputChangeArguments !== undefined) {
                  (
                    onInputChangeProps as (
                      e: React.ChangeEvent<HTMLInputElement>,
                      params: T
                    ) => void
                  )(e, onInputChangeArguments);
                } else {
                  (
                    onInputChangeProps as (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => void
                  )(e);
                }
              } else {
                onInputChange(e);
              }
            }}
            ref={ref}
            type={type}
            name={name}
            defaultValue={defaultValue}
            placeholder={placeholder}
            required={isRequired}
            {...(state !== undefined && { value: state })}
            maxLength={maxLength}
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
        {message && (
          <div className="text-searchGrayText text-xs">{message}</div>
        )}
      </div>
    </div>
  );
}) as <T>(
  props: BookingInputProps<T> & { ref?: ForwardedRef<HTMLInputElement> }
) => JSX.Element;

// BookingInput.displayName = "BookingInput";
export default BookingInput;

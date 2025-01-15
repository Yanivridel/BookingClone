import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TopNav from "@/components/TopNav";
import {
  IconApple,
  IconError,
  IconFacebook,
  IconGoogle,
} from "@/components/ui/Icons";
import { Card } from "@/components/ui/card";
import { ChangeEvent, FormEvent, useState } from "react";
import { sendEmailCode } from "@/utils/api/userApi";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "@/utils/utilsFunctions";

function SignIn({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const [isSubmitAllrady, setisSubmitAllrady] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isValid, setIsValid] = useState<RegExpMatchArray | null>(null);
  const [fetchingColor, setFetchingColor] = useState("");

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsValid(() => validateEmail(e.target.value));
    if (!isSubmitAllrady) return;

    isValid
      ? setError("")
      : setError("Make sure the email address you entered is correct.");
  };

  const hideErrorIcon = () => {
    setIsFocus(true);
  };

  const showErrorIcon = () => {
    setIsFocus(false);
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setisSubmitAllrady(true);
    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email"));
    // console.log(isValid);

    if (!email || !isValid) {
      setError("Make sure the email address you entered is correct.");
      return;
    }
    setFetchingColor("text-[#8c8c8c]");
    sendEmailCode(email, false)
      .then((data) => {
        console.log(data);
        data.status === "success" && navigate(`/account/email-code/${email}`);
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong - try again later!");
      });
  }

  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="">
        {/* <TopNav></TopNav> */}
      </div>
      <div
        className={cn(
          "flex flex-col items-center gap-6 flex-grow signInLayoutTop:pt-14 max-w-[369px]",
          className
        )}
        {...props}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={cn("flex flex-col gap-6")}>
            <div className="flex flex-col items-center gap-2">
              <h1 className={cn("text-[20px] font-bold ", fetchingColor)}>
                Sign in or create an account
              </h1>
              <div className={cn("text-center text-sm", fetchingColor)}>
                You can sign in using your Booking.com account to access our
                services.
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label className={fetchingColor} htmlFor="email">
                  Email address
                </Label>
                <div className="relative">
                  <Input
                    className={cn(
                      error && "border-redError focus:border-0",
                      fetchingColor
                    )}
                    onChange={(e) => handleChange(e)}
                    onFocus={hideErrorIcon}
                    onBlur={showErrorIcon}
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                  {error && !isFocus && (
                    <IconError className="h-5 w-5 fill-redError absolute top-2 end-2 " />
                  )}
                </div>
                {error && <div className="text-redError text-sm">{error}</div>}
              </div>
              <Button
                type="submit"
                className={cn(
                  "h-12 ",
                  fetchingColor && `bg-inherit ${fetchingColor}`
                )}
              >
                Continue with email
              </Button>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span
                className={cn(
                  "relative z-10 bg-background px-2 ",
                  fetchingColor
                )}
              >
                or use one of these options
              </span>
            </div>
            <div className="flex justify-center ">
              <div className="flex gap-6">
                <Card className="cursor-pointer shadow-none  rounded-md border hover:border-primary">
                  <IconGoogle
                    className={cn(
                      "h-6 w-6 m-6",
                      fetchingColor && "fill-slate-400"
                    )}
                  ></IconGoogle>
                </Card>
                <Card className="cursor-pointer shadow-none rounded-md border hover:border-primary">
                  <IconApple
                    className={cn(
                      "h-6 w-6 m-6",
                      fetchingColor && "fill-slate-400"
                    )}
                  ></IconApple>
                </Card>
                <Card className="cursor-pointer shadow-none rounded-md border hover:border-primary">
                  <IconFacebook
                    className={cn(
                      "h-6 w-6 m-6",
                      fetchingColor && "fill-slate-400"
                    )}
                  ></IconFacebook>
                </Card>
              </div>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
          </div>
        </form>
        <div className="text-balance text-center text-xs">
          By signing in or creating an account, you agree with our
          <br />
          <span className="text-primary hover:underline">
            <a href="#">Terms & Conditions </a>
          </span>
          and{" "}
          <span className="text-primary hover:underline">
            <a href="#">Privacy Statement</a>
          </span>
          .
        </div>
        <div className="text-balance text-center text-xs">
          All rights reserved.
          <br />
          Copyright (2006-2025) – Booking.com™
        </div>
      </div>
    </div>
  );
}
export default SignIn;

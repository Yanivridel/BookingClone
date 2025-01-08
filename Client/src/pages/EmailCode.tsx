import { cn } from "@/lib/utils";
import TopNav from "@/components/TopNav";
import { IconApple, IconFacebook, IconGoogle } from "@/components/ui/Icons";
import { Card } from "@/components/ui/card";
import { FormEvent, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import InputOtp from "@/components/InputOtp";
import { Button } from "@/components/ui/button";
import { signinUser } from "@/utils/api/userApi";

function EmailCode({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const isInputsFull = false;

  const params = useParams();
  const email = params.email;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const code = input1 + input2 + input3 + input4 + input5 + input6;
    console.log(code + "code");

    if (!email) {
      return;
    }

    signinUser(email, code)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setError("error");
      });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value;

    setInput(value.slice(-1).toUpperCase());
  };
  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="">
        <TopNav></TopNav>
      </div>
      <div
        className={cn(
          "flex flex-col items-center gap-6 flex-grow signInLayoutTop:pt-14 max-w-[369px]",
          className
        )}
        {...props}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-[20px] font-bold">
                Verify your email address
              </h1>
              <div className="text-center text-sm">
                We sent a verification code to
                <b>{email}</b>. Enter this code to continue.
              </div>
            </div>
            <div className="flex gap-4 text-sm font-normal">
              <input
                className="border border-gray-400 rounded-md px-2 py-1 text-center h-[60px] w-[50px]"
                type="text"
                value={input1}
                onChange={(e) => handleChange(e, setInput1)}
              />
              <input
                className="border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]"
                type="text"
                value={input2}
                onChange={(e) => handleChange(e, setInput2)}
              />
              <input
                className="border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]"
                type="text"
                value={input3}
                onChange={(e) => handleChange(e, setInput3)}
              />
              <input
                className="border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]"
                type="text"
                value={input4}
                onChange={(e) => handleChange(e, setInput4)}
              />
              <input
                className="border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]"
                type="text"
                value={input5}
                onChange={(e) => handleChange(e, setInput5)}
              />
              <input
                className="border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]"
                type="text"
                value={input6}
                onChange={(e) => handleChange(e, setInput6)}
              />
            </div>
            <Button variant={"disabled"} className="h-12">
              Verify email
            </Button>
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
export default EmailCode;

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TopNav from "@/components/TopNav";
import { IconApple, IconFacebook, IconGoogle } from "@/components/ui/Icons";
import { Card } from "@/components/ui/card";
import { FormEvent, useState } from "react";
import { sendEmailCode } from "@/utils/api/userApi";
import { useNavigate } from "react-router-dom";

function SignIn({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email"));

    if (!email) {
      return;
    }

    sendEmailCode(email, false)
      .then((data) => {
        console.log(data);
        data.status === "success" && navigate(`/account/email-code/${email}`);
      })
      .catch((err) => {
        console.log(err);
        setError("something");
      });
  }

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
                Sign in or create an account
              </h1>
              <div className="text-center text-sm">
                You can sign in using your Booking.com account to access our
                services.
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                {error && <div>{error}</div>}
              </div>
              <Button type="submit" className="h-12 ">
                Continue with email
              </Button>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 ">
                or use one of these options
              </span>
            </div>
            <div className="flex justify-center ">
              <div className="flex gap-6">
                <Card className="cursor-pointer shadow-none rounded-md border hover:border-primary">
                  <IconGoogle className="h-6 w-6 m-6 "></IconGoogle>
                </Card>
                <Card className="cursor-pointer shadow-none rounded-md border hover:border-primary">
                  <IconApple className="h-6 w-6 m-6"></IconApple>
                </Card>
                <Card className="cursor-pointer shadow-none rounded-md border hover:border-primary">
                  <IconFacebook className="h-6 w-6 m-6"></IconFacebook>
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

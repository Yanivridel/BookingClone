import { cn } from "@/lib/utils";
import TopNav from "@/components/TopNav";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { sendEmailCode, signinUser } from "@/utils/api/userApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlices";

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
  const [timer, setTimer] = useState(60);

  //   to show green before navigate to home
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();
  const email = params.email;

  //  submit button varient
  const variant =
    input1 && input2 && input3 && input4 && input5 && input6
      ? "default"
      : "disabled";

  //   for moving to the next input
  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  //   timer
  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);
  }, [timer]);

  //    for focus to next on eace input chenge
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    index: number
  ) => {
    const value = e.target.value;
    setInput(value.slice(-1).toUpperCase());

    if (value && index < inputRefs.length - 1) {
      const nextInput = inputRefs[index + 1].current;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // send a new code
  const getNewCode = () => {
    if (!email) return;
    sendEmailCode(email, false)
      .then((data) => {
        console.log("data" + data);
        data.status === "success" && setTimer(60);
      })
      .catch((err) => {
        console.log(err);
        setError("Something went wrong - try again later!");
      });
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // must fill all the inputs
    if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6) {
      return;
    }

    const code = input1 + input2 + input3 + input4 + input5 + input6;

    if (!email) {
      return;
    }

    signinUser(email, code)
      .then((data) => {
        console.log("submit data" + data);
        dispatch(setUser(data));
        setIsSuccess(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError("error");
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
                Verify your email address
              </h1>
              <div className="text-center text-sm">
                We sent a verification code to
                <b>{email}</b>. Enter this code to continue.
              </div>
            </div>
            <div className="flex gap-4 text-sm font-normal">
              <input
                ref={inputRefs[0]}
                className={cn(
                  "border border-gray-400 rounded-md px-2 py-1 text-center h-[60px] w-[50px]",
                  isSuccess && "border-green-600"
                )}
                type="text"
                value={input1}
                onChange={(e) => handleChange(e, setInput1, 0)}
              />
              <input
                ref={inputRefs[1]}
                className={cn(
                  "border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]",
                  isSuccess && "border-green-600"
                )}
                type="text"
                value={input2}
                onChange={(e) => handleChange(e, setInput2, 1)}
              />
              <input
                ref={inputRefs[2]}
                className={cn(
                  "border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]",
                  isSuccess && "border-green-600"
                )}
                type="text"
                value={input3}
                onChange={(e) => handleChange(e, setInput3, 2)}
              />
              <input
                ref={inputRefs[3]}
                className={cn(
                  "border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]",
                  isSuccess && "border-green-600"
                )}
                type="text"
                value={input4}
                onChange={(e) => handleChange(e, setInput4, 3)}
              />
              <input
                ref={inputRefs[4]}
                className={cn(
                  "border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]",
                  isSuccess && "border-green-600"
                )}
                type="text"
                value={input5}
                onChange={(e) => handleChange(e, setInput5, 4)}
              />
              <input
                ref={inputRefs[5]}
                className={cn(
                  "border border-gray-400 rounded-md px-2 py-1 text-center  h-[60px] w-[50px]",
                  isSuccess && "border-green-600"
                )}
                type="text"
                value={input6}
                onChange={(e) => handleChange(e, setInput6, 5)}
              />
            </div>
            <Button variant={variant} className="h-12">
              Verify email
            </Button>
            {timer > 0 ? (
              <div>
                Didn't get an email? Check your spam folder or request another
                code in <span>{timer}</span> seconds
              </div>
            ) : (
              <Button
                onClick={getNewCode}
                variant={"simpleLink"}
                className="h-12"
              >
                Request new code
              </Button>
            )}
            <Button type="button" variant={"simpleLink"} asChild>
              <Link to={"/account/sign-in"}>Back to sign-in</Link>
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

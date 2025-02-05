import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

function SecuritySettings() {
  return (
    <div className="grid grid-cols-1 max-w-[1100px]">
      <div className="border-b-2 flex justify-between p-4">
        <div className=" flex flex-col gap-2">
          <h1 className="font-bold text-4xl">Security settings</h1>
          <p className="text-gray-500">
            Change your security settings, set up secure authentication or
            delete your account.
          </p>
        </div>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full p-4">
          <AccordionItem value="item-1">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0 md:flex-row md:gap-6">
                <p>Two-factor authentication</p>
                <p className="text-gray-500 text-sm">
                  Increase the security of your account by setting up two-factor
                  authentication.
                </p>
              </div>
              <div>
                <AccordionTrigger>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
                  >
                    Set up
                  </Button>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent className="flex flex-col gap-10">
              <div className=" grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">
                    1. Download an authenticator app
                  </p>
                  <p className="text-gray-500 text-sm">
                    If you don’t have an authenticator app installed, please
                    download one. We recommend using Google Authenticator or
                    Microsoft Authenticator.
                  </p>
                </div>
              </div>
              <div className=" flex justify-between">
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
                >
                  Cancel
                </Button>
                <Button>Save</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full p-4">
          <AccordionItem value="item-1">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0 md:flex-row md:gap-24">
                <p>Active sessions</p>
                <p className="text-gray-500 text-sm">
                Selecting ‘Sign out’ will sign you out from all devices except this one. The process can take up to 10 minutes.
                </p>
              </div>
              <div>
                <AccordionTrigger>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
                  >
                    Sign out
                  </Button>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent className="flex flex-col gap-10"></AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible className="w-full p-4">
          <AccordionItem value="item-1">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0 md:flex-row md:gap-24">
                <p>Delete account</p>
                <p className="text-gray-500 text-sm">
                Permanently delete your Booking.com account
                </p>
              </div>
              <div>
                <AccordionTrigger>
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
                  >
                    Delete account
                  </Button>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent className="flex flex-col gap-10">
              <div className=" grid grid-cols-2 gap-4">
                <div className="flex gap-1">
                  <Checkbox className="rounded-full mt-0.5 p-2.5" />
                  <p className="text-gray-500 text-sm">
                    If you don’t have an authenticator app installed, please
                    download one. We recommend using Google Authenticator or
                    Microsoft Authenticator.
                  </p>
                </div>
              </div>
              <div className=" grid grid-cols-2 gap-4">
                <div className="flex gap-1">
                  <Checkbox className="rounded-full mt-0.5 p-2.5" />
                  <p className="text-gray-500 text-sm">
                    I want to use a different email address for my account
                    There's a faster way! Change it below or update it anytime
                    in the ‘Personal details’ section of your account settings.
                  </p>
                </div>
              </div>
              <div className=" grid grid-cols-2 gap-4">
                <div className="flex gap-1">
                  <Checkbox className="rounded-full mt-0.5 p-2.5" />
                  <p className="text-gray-500 text-sm">
                    I want to remove all my data When your Booking.com account
                    is deleted, you will no longer have access to your account
                    data, your past reservation data, your favourite
                    accommodations lists or your Genius status.For more info
                    about exercising your{" "}
                    <span className="text-blue-600 hover:text-blue-600 hover:underline cursor-pointer">
                      data subject rights
                    </span>
                    , please see our{" "}
                    <span className="text-blue-600 hover:text-blue-600 hover:underline cursor-pointer">
                      Privacy Statement
                    </span>{" "}
                    for Customers.
                  </p>
                </div>
              </div>
              <div className=" flex justify-between">
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
                >
                  Cancel
                </Button>
                <Button>Save</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default SecuritySettings;

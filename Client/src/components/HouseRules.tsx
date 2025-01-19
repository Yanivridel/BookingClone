import { IProperty } from "@/types/propertyTypes";
import {
  Bottle,
  CheckIn,
  CheckOut,
  Cigar,
  CribIcon,
  Groups,
  Information,
  Payment,
  Person,
  Persons,
  Pet,
} from "./ui/Icons";

// Images
import mastercard from "../assets/images/MasterCard.png";
import discover from "../assets/images/Discover Financial Service.png";
import visa from "../assets/images/visa.png";
import { useState } from "react";

interface propertyDataProps {
  propertyData?: IProperty;
}

function HouseRules({ propertyData }: propertyDataProps) {
  const [isCashAllowd, setIsCashAllowd] = useState(false);

  const getPaymentImage = (paymentMethod: string) => {
    if (paymentMethod === "Visa") {
      return visa;
    } else if (paymentMethod === "MasterCard") {
      return mastercard;
    } else if (paymentMethod === "Discover") {
      return discover;
    } else {
      return undefined;
    }
  };

  return (
    <div className="p-3 border-softGrayBorder border-[1px] rounded-[8px] min-w-[500px]">
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] font-bold text-base flex items-center gap-2">
            <div>
              <CheckIn className="w-5 h-5" />
            </div>
            <div>Check In</div>
          </div>
          <div className=" w-[70%] flex text-sm">
            <p className=" w-[50%]">
              From {propertyData?.houseRules.checkin.start}
            </p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] font-bold text-base flex items-center gap-2 ">
            <div>
              <CheckOut className="w-5 h-5" />
            </div>
            <div>Check Out</div>
          </div>
          <div className=" w-[70%] flex text-sm">
            <p className=" w-[50%]">
              Until {propertyData?.houseRules.checkout.start}
            </p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] font-bold text-base flex items-center gap-2">
            <div>
              <Information className="w-5 h-5" />
            </div>
            <div>Cancellation/ prepayment</div>
          </div>
          <div className=" w-[70%] flex  text-sm">
            <p className=" w-[50%]">
              {propertyData?.houseRules.cancellation_prepayment}{" "}
              <span className="text-sx text-blue-500 hover:underline cursor-pointer">
                enter the dates of your stay{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] flex items-center font-bold text-base gap-2">
            <div>
              <Persons className="w-5 h-5" />
            </div>
            <div>Children & beds</div>
          </div>
          <div className=" w-[70%] flex  text-sm">
            <div className=" w-[50%] flex flex-col gap-2">
              <div>
                <h1 className="font-bold text-base mb-3">Child policies</h1>
                <p>{propertyData?.houseRules.children_beds?.child_policy}</p>
              </div>
              <div>
                <h1 className="font-bold text-base mb-3">
                  Crib and extra bed policies
                </h1>
                <div className="border-x-[1px] border-t-[1px] border-softGrayBorder rounded-md">
                  {propertyData?.houseRules.children_beds?.bed_policy?.map(
                    (item, i) => (
                      <div key={item.age.start + i} className="">
                        <div className="px-2 py-1 grid grid-cols-2">
                          <p>Age</p>

                          <p>
                            {item.age.start}{" "}
                            {item.age.end !== item.age.start &&
                              `- ${item.age.end}`}
                          </p>
                        </div>
                        <div className="px-2 py-1 grid grid-cols-2  border-y-[1px] border-softGrayBorder">
                          <div className="flex gap-1">
                            <CribIcon className="mt-[2px] w-4 h-4 "></CribIcon>

                            <p>{item.type}</p>
                          </div>
                          {item.price_num === 0 ? (
                            <p className="text-green-600">Free</p>
                          ) : (
                            <p>
                              {item.price_num}{" "}
                              <span className="ps-[1px]">₪</span>
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] font-bold text-base flex items-center gap-2 ">
            <div>
              <Person className="w-5 h-5" />
            </div>
            <div>
              {propertyData?.houseRules.age_restriction === 0
                ? "No age restriction"
                : "Age restriction"}
            </div>
          </div>
          <div className=" w-[70%] flex items-center text-sm">
            <p className=" w-[50%]">
              {propertyData?.houseRules.age_restriction === 0
                ? "no age restriction"
                : `The minimum age for check-in is ${propertyData?.houseRules.age_restriction}`}
            </p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] font-bold text-base flex items-center gap-2 ">
            <div>
              <Groups className="w-5 h-5" />
            </div>
            <div>Groups</div>
          </div>
          <div className=" w-[70%] flex items-center text-sm">
            <p className=" w-[50%]">{propertyData?.houseRules.groups}</p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] font-bold text-base flex items-center gap-2 ">
            <div>
              <Bottle className="w-5 h-5" />
            </div>
            <div>Parties</div>
          </div>
          <div className=" w-[70%] flex items-center text-sm">
            {propertyData?.houseRules.parties ? (
              <p className=" w-[50%]">Parties/events are not allowed</p>
            ) : (
              <p className=" w-[50%]">Parties allowed</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] font-bold text-base flex items-center gap-2 ">
            <div>
              <Pet className="w-5 h-5" />
            </div>
            <div>Pets</div>
          </div>
          <div className=" w-[70%] flex items-center text-sm">
            {propertyData?.houseRules.pets ? (
              <p className=" w-[50%]">Pets are allowed</p>
            ) : (
              <p className=" w-[50%]">Pets are not allowed.</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] font-bold text-base flex items-center gap-2 ">
            <div>
              <Cigar className="w-5 h-5" />
            </div>
            <div>Smoking</div>
          </div>
          <div className=" w-[70%] flex items-center text-sm">
            <p className=" w-[50%]">Smoking is not allowd.</p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex border-b  border-softGrayBorder items-start py-3">
          <div className="w-[30%] font-bold text-base flex items-center gap-2 ">
            <div>
              <Payment className="w-5 h-5" />
            </div>
            <div>Card accepted at this property</div>
          </div>
          <div className=" w-[70%] flex items-center text-sm">
            <div className="flex gap-1 ">
              {propertyData?.houseRules.accepted_payments.map((payment) => {
                payment === "Cash" && setIsCashAllowd(true);
                return (
                  <div key={payment}>
                    {getPaymentImage(payment) !== undefined && (
                      <img
                        onError={(e) => e.currentTarget.remove()}
                        src={getPaymentImage(payment)}
                        alt="payment images"
                        className="h-8 w-12 rounded-lg overflow-hidden inline-block"
                      />
                    )}
                  </div>
                );
              })}
              {isCashAllowd && (
                <span className="border-[1px] py-1 px-2 bg-IconsGreen text-white rounded-lg">
                  Cash
                </span>
              )}
              {!isCashAllowd && (
                <span className="border-[0.9px] self-center py-[1px] text-xs border-black px-2 rounded-md">
                  Cash is not accepted
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseRules;

import { IProperty } from "@/types/propertyTypes";
import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import KidsImage from "../assets/images/kids.jpeg";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface ImagePropertyProps {
  propertyData?: IProperty;
}

function ImagesProperty({ propertyData }: ImagePropertyProps) {
  if (!propertyData) {
    return <div></div>;
  }
  // {propertyData.images.slice(0, 6).map((item, index) => (
  //     <img key={index} src={item} alt="" className="w-full h-full object-cover" />
  // ))}
  return (
    <div className="flex  p-2">
      <div className="h-[486px] w-[70%] border">
        <div className="border h-[70%] flex gap-2">
          <div className="w-[75%] border">
            {propertyData.images.slice(0, 1).map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                className="w-full h-full object-cover"
              />
            ))}
          </div>
          <div className="w-[30%] border flex flex-col ">
            <div className="h-[50%]">
              {propertyData.images.slice(1, 2).map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
            <div className="h-[50%]">
              {propertyData.images.slice(2, 3).map((item, index) => (
                <img
                  key={index}
                  src={item}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="border h-[30%] flex items-center gap-2">
          {propertyData.images.slice(3, 6).map((item, index) => (
            <img
              key={index}
              src={item}
              alt=""
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      </div>
      <div className="h-[486px] w-[30%] border flex flex-col items-center justify-between">
        <Card className="w-[263px] h-[296px]">
          <div className="h-[20%] p-2 border-b-2 flex items-center justify-end">
            <div className="flex gap-1 ">
              <div className="flex flex-col items-end">
                <CardTitle>Suberb</CardTitle>
                <CardDescription className="text-xs">
                  3,551 reviews
                </CardDescription>
              </div>
              <div className="flex gap-1 p-1  ">
                <Badge variant="rating" className="cursor-pointer h-full">
                  {propertyData.rating.cleanliness}
                </Badge>
              </div>
            </div>
          </div>
          <div className="h-[60%] border-b-2 p-2 grid gap-2">
            <div className=" max-h-[10%]">
              <p className="text-xs font-bold">Guests who stayed here loved</p>
            </div>
            <div className=" grid justify-center">
              <div className="w-40 ">
                <p className="text-xs">
                  “Check in and check out was very smooth. I arrived early and
                  they got me a room earlier than check-in time when it became
                  available. The porters...”
                </p>
              </div>
            </div>
            <div className=" flex items-center gap-1 justify-center">
              <Avatar className="w-7 h-7">
                <AvatarImage src={KidsImage}></AvatarImage>
                <AvatarFallback>Cn</AvatarFallback>
              </Avatar>
              <p className="text-xs">Wambui</p>

              <Avatar className="w-7 h-7">
                <AvatarImage src={KidsImage}></AvatarImage>
                <AvatarFallback>Cn</AvatarFallback>
              </Avatar>
              <p className="text-xs">s</p>
            </div>
          </div>
          <div className="h-[20%] flex items-center justify-between p-2">
            <div>
              <p className="font-bold">Great location!</p>
            </div>
            <div>
              <Badge variant="outline">8.9</Badge>
            </div>
          </div>
        </Card>
        <Card className="w-[261px] h-[155px] rounded-lg relative">
          <img
            src={KidsImage}
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
          <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Show On Map
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default ImagesProperty;

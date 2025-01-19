import React, { useState } from "react";
import {
  IconGuest,
  Lock,
  Persons,
  Volume,
  Payment,
  ViBorder,
} from "@/components/ui/Icons";

interface SettingsNavigateProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

function SettingsNavigate({ setPage }: SettingsNavigateProps) {
  const [colorLine, setColorLine] = useState<string>("Personal details");

  // פונקציה לעדכון הסטייט
  function handleClick(title: string) {
    setPage(title);
    setColorLine(title); // עדכון הסטייט
  }

  const arr = [
    { title: "Personal details", icon: IconGuest },
    { title: "Security settings", icon: Lock },
    { title: "Other travellers", icon: Persons },
    { title: "Customisation preferences", icon: Volume },
    { title: "Payment methods", icon: Payment },
    { title: "Privacy and data management", icon: ViBorder },
  ];

  return (
    <div className="grid max-w-[305px]">
      {arr.map((item) => (
        <div
          key={item.title}
          className="border rounded-lg flex justify-center items-center gap-2 p-2 pr-40 cursor-pointer"
          onClick={() => handleClick(item.title)}
        >
          <div className="rounded-full p-3 flex items-center bg-accent">
            <div>
              <item.icon className="w-5 h-5 text-sky-600" />
            </div>
          </div>
          <div>
            <p
              className={
                colorLine === item.title ? "text-sky-600" : "text-black"
              }
            >
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SettingsNavigate;

// hover:text-sky-600 hover:underline

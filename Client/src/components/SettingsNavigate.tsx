import React, { useState } from "react";
import { IconGuest, Lock, Persons, Volume, Payment, ViBorder } from '@/components/ui/Icons';

interface SettingsNavigateProps {
    setPage : React.Dispatch<React.SetStateAction<string>>
    category : string | undefined
}

function SettingsNavigate({setPage, category}: SettingsNavigateProps ) {
  const [colorLine, setColorLine] = useState<string>(category || "Personal details");

  function handleClick(title: string) {
    setPage(title)
    setColorLine(title);  
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
          <div className="rounded-full p-3.5 flex items-center bg-accent">
            <div>
              <item.icon className={`w-5 h-5 ${colorLine === item.title ? "fill-sky-600" : "fill-black"}`} />
            </div>
          </div>
          <div className="w-32 text-sm font-base">
            <p className={colorLine === item.title ? "text-sky-600" : "text-black"}>
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

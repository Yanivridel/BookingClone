import { useState } from "react";
import { IconGuest } from "./ui/Icons";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

function CompleteProfile() {
  const [display, setDisplay] = useState(true)
  const {t} = useTranslation()

  function handleClick() {
    setDisplay(false)
    console.log(display);
    
  }

  return (
    display && (
    <div className="p-6  flex bg-white rounded-lg">
      <div className=" w-[70%] flex flex-col gap-4">
        <h1 className="font-bold">{t("MyAccount.CompleteProfile")}</h1>
        <p className="text-sm">{t("MyAccount.CompleteProfileInformation")}</p>
        <div>
            <Button>{t("MyAccount.CompleteNow")}</Button>
            <Button onClick={handleClick} variant="ghost" className='text-blue-600 hover:bg-accent hover:text-blue-600'>{t("MyAccount.NotCompleteNow")}</Button>
            

        </div>
      </div>
      <div className=" w-[30%] flex justify-end">
        <div className=" p-9 bg-sky-100"><IconGuest className=" fill-blue-500 w-8 h-8" /></div>
      </div>
    </div>
    )
    
  );
}

export default CompleteProfile;

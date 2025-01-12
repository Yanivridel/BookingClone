import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MainStates } from "@/utils/staticData";
import { useEffect, useState } from "react";
import i18n from "@/i18n";

function Languages() {
  // const because click close the sheet
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.language === "he" ? MainStates[0] : MainStates[1]
  );
  useEffect(() => {
    setCurrentLanguage(i18n.language === "he" ? MainStates[0] : MainStates[1]);
    i18n.language === "he" ? MainStates[0] : MainStates[1];
  }, [i18n.language]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="h-[24px] w-[24px]">
          <AvatarImage
            src={currentLanguage.src}
            alt="state flag avatar for languages change"
          />
          <AvatarFallback>{currentLanguage.initial}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent
        className="top-0 bottom-0 start-0 end-0 h-full w-full"
        side={"bottom"}
      >
        <SheetHeader>
          <SheetTitle>בחרו את השפה שלכם</SheetTitle>
          <SheetDescription>מומלץ</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          {MainStates.map(() => (
            <SheetClose asChild>
              <Avatar className="h-[24px] w-[24px]">
                <AvatarImage
                  src={currentLanguage.src}
                  alt="state flag avatar for languages change"
                />
                <AvatarFallback>{currentLanguage.initial}</AvatarFallback>
              </Avatar>
            </SheetClose>
          ))}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
export default Languages;

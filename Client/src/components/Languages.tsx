import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MainStates, states } from "@/utils/staticData";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Languages() {
  const { t, i18n } = useTranslation();

  // const because click close the sheet
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.language === "he" ? MainStates[0] : MainStates[1]
  );
  const changeLanguage = (lng: string) => {
    if (i18n.changeLanguage) {
      i18n.changeLanguage(lng);
    } else {
      console.error("i18n.changeLanguage is not available.");
    }
  };

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
        className="top-0 bottom-0 start-0 end-0 h-full w-full overflow-scroll"
        side={"bottom"}
      >
        <SheetHeader>
          <SheetTitle>{t("languages.header")}</SheetTitle>
          <SheetDescription>{t("languages.subHeader")}</SheetDescription>
        </SheetHeader>
        <div className="grid  gap-2">
          {MainStates.map((state) => (
            <SheetClose asChild key={state.initial}>
              <button
                value={state.name}
                onClick={(e) => {
                  console.log(e.currentTarget.value === "Hebrew");
                  e.currentTarget.value === "English" ||
                  e.currentTarget.value === "English (US)"
                    ? changeLanguage("en")
                    : e.currentTarget.value === "Hebrew"
                    ? changeLanguage("he")
                    : "";
                }}
                className="flex gap-3 py-4"
              >
                <Avatar className="h-[24px] w-[24px]">
                  <AvatarImage
                    src={state.src}
                    alt="state flag avatar for languages change"
                  />
                  <AvatarFallback>{state.initial}</AvatarFallback>
                </Avatar>
                <span>{state.name}</span>
              </button>
            </SheetClose>
          ))}
        </div>
        <h2>{t("languages.all")}</h2>
        <div className="grid gap-2">
          {states.map((state) => (
            <SheetClose asChild key={state.src}>
              <button
                value={state.name}
                onClick={(e) => {
                  console.log(e.currentTarget.value === "Hebrew");
                  e.currentTarget.value === "English" ||
                  e.currentTarget.value === "English (US)"
                    ? changeLanguage("en")
                    : e.currentTarget.value === "Hebrew"
                    ? changeLanguage("he")
                    : "";
                }}
                className="flex gap-3 py-4"
              >
                <Avatar className="h-[24px] w-[24px]">
                  <AvatarImage
                    src={state.src}
                    alt="state flag avatar for languages change"
                  />
                  <AvatarFallback>{state.initial}</AvatarFallback>
                </Avatar>
                <span>{state.name}</span>
              </button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default Languages;

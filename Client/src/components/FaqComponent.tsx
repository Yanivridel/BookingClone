import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { IProperty } from "@/types/propertyTypes";

interface FaqComponentProps {
  propertyData?: IProperty;
}

function FaqComponent({ propertyData }: FaqComponentProps) {
  return (
    <div className="flex flex-wrap  min-h-7  border-[1px] border-[#eaf3ff] rounded-[8px] overflow-hidden ">
      <div className="min-w-[200px] basis-[30%] flex-grow bg-[#eaf3ff]">
        <h1 className="font-bold text-xl p-8 ">
          FAQs about Aparthotel Stare Miasto
        </h1>
      </div>
      <div className="min-w-[390px] flex-grow basis-[70%]">
        <Accordion type="single" collapsible className="w-full">
          {propertyData?.fqa.map((Item, index) => (
            <AccordionItem
              key={index}
              value={Item.question}
              className={
                index !== propertyData.fqa.length - 1
                  ? "border-b-[1px] border-[#eaf3ff] hover:bg-[#f2f2f2] px-3 "
                  : "border-none hover:bg-[#f2f2f2] px-3"
              }
            >
              <AccordionTrigger className="hover:no-underline text-base font-bold">
                {Item.question}
              </AccordionTrigger>
              <AccordionContent>{Item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FaqComponent;

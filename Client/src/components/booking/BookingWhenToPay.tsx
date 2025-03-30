import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { format, addDays } from "date-fns";
import { EmptyCalendarImg } from "../ui/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import MasterCardLogo from "@/assets/images/MasterCard.png";
import PayPalLogo from "@/assets/images/PayPal New 2023.png";
import AmericanExpressLogo from "@/assets/images/American Express Card.png";
import VisaLogo from "@/assets/images/visa.png";

interface BookingWhenToPayProps {
    paymentOption: string;
    setPaymentOption: Dispatch<SetStateAction<string>>;
    paymentDate: Date;
    setPaymentDate: Dispatch<SetStateAction<Date>>;
}

function BookingWhenToPay({ 
    paymentOption, 
    setPaymentOption,
    paymentDate,
    setPaymentDate
    } : BookingWhenToPayProps) {

    const [openDatePicker, setOpenDatePicker] = useState(false);

    return (
    <Card className="mb-6">
        <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">When do you want to pay?</h2>
        <RadioGroup
            value={paymentOption} 
            onValueChange={setPaymentOption}
            className="space-y-4 flex flex-col"
        >
            <div className="flex items-start gap-2">
                <RadioGroupItem value="later" id="pay-later" />
                <div className="grid gap-1.5">
                    <Label htmlFor="pay-later" className="font-medium flex gap-2 items-center">
                        Pay on
                        <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
                            <PopoverTrigger asChild>
                                <button className="flex gap-2 items-center text-buttonBlue">
                                    {format(paymentDate, "MMM dd, yyyy")}
                                    <EmptyCalendarImg className="fill-buttonBlue w-4 h-4"/>
                                </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={paymentDate}
                                onSelect={(day) => { 
                                    if(day) setPaymentDate(day);
                                    setOpenDatePicker(false);
                                }}
                                initialFocus
                                fromDate={(() => {
                                    const d = new Date();
                                    d.setDate(d.getDate() + 1);
                                    return d;
                                })()}
                            />
                        </PopoverContent>
                        </Popover>
                    </Label>
                    <p className="text-sm text-gray-600">
                    We'll automatically charge your selected card on {format(paymentDate, "MMM dd, yyyy")}.
                    </p>
                    <div className="flex gap-2 mt-1">
                        <img src={MasterCardLogo} alt="Master Card" className="h-4 w-auto" />
                        <img src={VisaLogo} alt="Visa" className="h-4 w-auto" />
                        <img src={AmericanExpressLogo} alt="American Express" className="h-4 w-auto" />
                        <img src={PayPalLogo} alt="PayPal" className="h-4 w-auto" />
                    </div>
                </div>
            </div>
            
            <div className="flex items-start gap-2">
            <RadioGroupItem value="now" id="pay-now" />
            <div className="grid gap-1.5">
                <Label htmlFor="pay-now" className="font-medium">
                Pay now
                </Label>
                <p className="text-sm text-gray-600">
                {/* You'll pay now to complete this booking. You can cancel before {format(cancellationDate, "MMMM d, yyyy")} for a full refund. */}
                </p>
                <div className="flex gap-2 mt-1">
                <img src="https://q-xx.bstatic.com/xdata/images/hotel/max500/289707488.jpg?k=ee7c124c175c9ecadcab3f952157f0a7f320eefe21510983ca577c95f30b8142&o=" alt="Credit card" className="h-6 w-auto" />
                <img src="https://cdn.icon-icons.com/icons2/674/PNG/512/PayPal_icon-icons.com_60633.png" alt="PayPal" className="h-6 w-auto" />
                <img src="https://www.mastercard.us/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg" alt="MasterCard" className="h-6 w-auto" />
                </div>
            </div>
            </div>
        </RadioGroup>
        </CardContent>
    </Card>
    )
}

export default BookingWhenToPay;
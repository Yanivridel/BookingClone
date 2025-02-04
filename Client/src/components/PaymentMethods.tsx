import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import Visa from "../assets/images/visa.png";
import MasterCard from "../assets/images/MasterCard.png";
import PayPal from "../assets/images/PayPal New 2023.png";
import Discover from "../assets/images/discover.png";
import AmericanExpress from "../assets/images/American Express Card.png";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRef, useState } from "react";

function PaymentMethods() {
  const stripe = useStripe();
  const elements = useElements();
  const [cardData, setCardData] = useState<any>(null);
  const nameRef = useRef(null);
  const cardOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#ffffff",
        borderRadius: "4px",
        boxShadow: "0px 0px 0px 2px black",
        padding: "20px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement not found.");
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating PaymentMethod: ", error);
      return;
    }

    console.log("Created PaymentMethod:", paymentMethod);
    setCardData(paymentMethod);
  };

  return (
    <div>
      <div className="grid grid-cols-1 max-w-[1100px]">
        <div className="border-b-2 flex justify-between p-2">
          <div className=" flex flex-col gap-2">
            <h1 className="font-bold text-4xl">Payment methods</h1>
            <p className="text-gray-500">
              Securely add or remove payment methods to make it easier when you
              book.
            </p>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full p-4">
          <AccordionItem value="item-1" className="p-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p>Payment cards</p>
                <p className="text-sm text-gray-500">Pay with new card</p>
              </div>
              <div>
                <AccordionTrigger >
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
                  >
                    Add card
                  </Button>
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent className="flex flex-col gap-10">
              <div className=" grid grid-cols-1 gap-2">
                <div className="flex gap-2">
                  <img src={Visa} alt="" className="h-7" />
                  <img src={Discover} alt="" className="h-7" />
                  <img src={PayPal} alt="" className="h-7" />
                  <img src={MasterCard} alt="" className="h-7" />
                  <img src={AmericanExpress} alt="" className="h-7" />
                </div>
                <form onSubmit={handleSaveCard} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <p>Cardholder's name *</p>
                    <input
                      ref={nameRef}
                      type="text"
                      className="border border-black p-2 rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p>Card number *</p>
                    <CardElement options={cardOptions} id="card-element"/>
                  </div>
                </form>
              </div>
              <div className=" flex justify-between">
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:bg-sky-100 hover:text-blue-600"
                >
                  Cancel
                </Button>
                <Button
                onClick={handleSaveCard}
                >Save</Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default PaymentMethods;

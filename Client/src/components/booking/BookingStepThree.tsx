import { Dispatch, MouseEvent, SetStateAction, useEffect, useMemo, useState } from "react";
import BookingWhenToPay from "./BookingWhenToPay";
import { BookingInfo } from "@/types/bookingTypes";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getPaymentMethod, makePayment, savePayment } from "@/utils/api/bookingApi";
import MasterCardLogo from "@/assets/images/MasterCard.png";
import AmericanExpressLogo from "@/assets/images/American Express Card.png";
import VisaLogo from "@/assets/images/visa.png";
import { scrollToTopInstant } from "@/utils/functions";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { useNavigate } from "react-router-dom";

interface BookingStepThreeProps {
  bookingInfo: BookingInfo;
  setStep: Dispatch<SetStateAction<2 | 3>>;
  bookingId: string
}

function BookingStepThree( { bookingInfo, setStep, bookingId }: BookingStepThreeProps) {
  const [paymentOption, setPaymentOption] = useState("later");
  const [ paymentDate, setPaymentDate ] = useState((() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  })());
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const amount = useMemo(() => bookingInfo.bookingDetailsData.totalPriceWithDiscount || 0, [bookingInfo]);
  const currency = useMemo(() => "USD", []);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [marketingConsent1, setMarketingConsent1] = useState(false);
  const [marketingConsent2, setMarketingConsent2] = useState(false);
  const [isSubmitting, _] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    scrollToTopInstant();
  }, [])

  function handleCompleteBooking(_: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    handlePayment(clientSecret);
  }

  // Handle the payment process
  const handlePayment = async (clientSecret: string) => {
    if (!stripe || !elements) {
        console.error("Stripe or Elements not loaded");
        return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
        console.error("CardElement not found");
        return;
    }

    try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
          setErrorMessage(error.message || "Payment failed!");
          setPaymentStatus("failed");
        } else if (paymentIntent) {
          setPaymentStatus("succeeded");
          setErrorMessage("");
          savePayment(
            paymentIntent.amount,
            paymentIntent.currency.toUpperCase(),
            paymentIntent.id,
            await getPaymentMethod(String(paymentIntent?.payment_method)), 
            bookingId
          );
          setModalOpen(true);
        }
    } catch (error) {
        setErrorMessage("An unexpected error occurred. Please try again.");
        setPaymentStatus("failed");
        console.error("Error confirming payment:", error);
    }
  };

  // Fetch the clientSecret from the backend on component mount
  useEffect(() => {
      makePayment(amount, currency)
          .then((data) => {
              setClientSecret(data.clientSecret);
          })
          .catch((error) => {
              console.error("Error creating payment intent:", error);
          });
  }, [amount, currency]);

  return (
    <div className="tab:w-2/3">
      <PaymentSuccessModal open={modalOpen} onClose={() => {
        setModalOpen(false);
        navigate("/account/TripsAndOrders")
        }} />

      <BookingWhenToPay
      maxDate={bookingInfo.bookingDetailsData.startDate}
      paymentOption={paymentOption}
      setPaymentOption={setPaymentOption}
      paymentDate={paymentDate}
      setPaymentDate={setPaymentDate}
      />

      {/* How To Pay */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <h2 className="text-xl font-bold mb-4">How do you want to pay?</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div 
              className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 ${paymentMethod === 'new_card' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaymentMethod('new_card')}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm text-center">New card</span>
            </div>
            
            <div 
              className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 ${paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaymentMethod('credit_card')}
            >
              <div className="w-12 h-12 bg-white border rounded-md flex items-center justify-center mb-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-8 w-8">
                  <path fill="#1565C0" d="M45 35c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V13c0-2.2 1.8-4 4-4h34c2.2 0 4 1.8 4 4v22z"></path>
                  <path fill="#FFF" d="M15.5 19l-2.4 6.9h-1.9l-1.1-4.4c-.1-.4-.2-.6-.5-.7-.4-.3-1-.4-1.6-.5v-.2h2.9c.4 0 .7.3.8.7l.7 3.5 1.6-4.3h2.3zm9 4.5c0-1.7-2.4-1.8-2.4-2.5 0-.2.2-.5.7-.5.4 0 .9.1 1.4.3l.3-1.4c-.4-.1-.8-.2-1.4-.2-1.5 0-2.5.8-2.5 1.9 0 .8.7 1.3 1.3 1.6.6.3.8.5.8.7 0 .3-.3.5-.9.5s-1.1-.2-1.5-.3l-.3 1.4c.3.1.9.3 1.6.3 1.5 0 2.5-.8 2.5-2.1.9 0 .4.2.4.3zm3.9 2.4h1.7l-1.5-6.9h-1.5c-.3 0-.6.2-.7.5l-2.4 6.4h1.9l.3-1h2l.2 1zm-1.8-2.3l.8-2.3.4 2.3h-1.2zm-6.6-4.6l-1.5 6.9h-1.8l1.5-6.9h1.8z"></path>
                </svg>
              </div>
              <span className="text-sm text-center">•••• 4242</span>
            </div>
            
            <div 
              className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 ${paymentMethod === 'google_pay' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaymentMethod('google_pay')}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <img src="data:image/png;base64,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" alt="Google Pay" className="w-full h-auto" />
              </div>
              <span className="text-sm text-center">Google Pay</span>
            </div>
            
            <div 
              className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setPaymentMethod('paypal')}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" className="w-full h-auto" />
              </div>
              <span className="text-sm text-center">PayPal</span>
            </div>
          </div>
          
          {paymentMethod === 'new_card' && (
            <div className="p-2 space-y-3">
                <h1>New Card</h1>
                <div className="flex gap-2 mt-1">
                    <img src={MasterCardLogo} alt="Master Card" className="h-4 w-auto" />
                    <img src={VisaLogo} alt="Visa" className="h-4 w-auto" />
                    <img src={AmericanExpressLogo} alt="American Express" className="h-4 w-auto" />
                </div>
                <div className="card-element-container space-y-4">
                    <label htmlFor="card-element">Card Details</label>
                    <CardElement id="card-element" className="border p-2"/>
                </div>

                <div className="payment-actions">
                    {paymentStatus === "failed" && (
                        <div className="error-message text-red-500 text-sm">{errorMessage}</div>
                    )}
                </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consents */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-2">
          <Checkbox 
            id="marketing1" 
            checked={marketingConsent1}
            onCheckedChange={(checked) => setMarketingConsent1(!!checked)}
          />
          <Label htmlFor="marketing1" className="text-sm">
            I consent to receiving marketing emails, including promotions, personalized
            recommendations, rewards, travel experiences, and updates about products and services.
          </Label>
        </div>
        
        <div className="flex items-start gap-2">
          <Checkbox 
            id="marketing2" 
            checked={marketingConsent2}
            onCheckedChange={(checked) => setMarketingConsent2(!!checked)}
          />
          <Label htmlFor="marketing2" className="text-sm">
            I consent to receiving marketing emails, including promotions, personalized
            recommendations, rewards, travel experiences, and updates about Transport Limited's
            products and services.
          </Label>
        </div>
      </div>
      
      {/* Terms and conditions */}
      <div className="text-sm mb-6">
        <p>
          By signing up, you let us tailor offers and consent to your interests by monitoring how you use our services.{' '}
          <a className="text-blue-600 hover:underline">Unsubscribe anytime</a>.{' '}
          Read our <a className="text-blue-600 hover:underline">privacy policy</a>.
        </p>
        <p className="mt-2">
          Your booking is directly with C Hotel and by completing this booking, you agree to the{' '}
          <a className="text-blue-600 hover:underline">booking conditions</a>,{' '}
          <a className="text-blue-600 hover:underline">general terms</a>,{' '}
          <a className="text-blue-600 hover:underline">privacy policy</a>, and{' '}
          <a className="text-blue-600 hover:underline">wallet terms</a>.
        </p>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-4">
        <Button variant="outline" className="w-full sm:w-auto"
          onClick={() => setStep(2)}
        >
          Check your booking
        </Button>
        <Button 
          onClick={(e) => handleCompleteBooking(e)}
          disabled={isSubmitting || !stripe || paymentStatus === "succeeded" || !marketingConsent1 || !marketingConsent2}
          className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Complete booking
        </Button>
      </div>
    </div>
  )
}

export default BookingStepThree;

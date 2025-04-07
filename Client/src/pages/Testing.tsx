import { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"; 
import { makePayment } from "@/utils/api/bookingApi";

const Testing = () => {
    const [clientSecret, setClientSecret] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    // @ts-ignore ridel fix
    const [amount, setAmount] = useState<number>(1000);
    // @ts-ignore ridel fix
    const [currency, setCurrency] = useState<string>("USD");
    const stripe = useStripe();
    const elements = useElements();

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
                // savePayment(paymentIntent.amount, paymentIntent.currency, paymentIntent.id, await getPaymentMethod(String(paymentIntent?.payment_method)));
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
        <div className="payment-form-container max-w-[1100px] mx-auto">
            <h2>Payment</h2>
            <form className="border-2 border-black"
            onSubmit={(e) => { e.preventDefault(); handlePayment(clientSecret); }}>
                <div className="card-element-container">
                    <label htmlFor="card-element">Card Details</label>
                    <CardElement id="card-element"/>
                </div>

                <div className="payment-actions">
                    <button type="submit" disabled={!stripe || paymentStatus === "succeeded"}>
                        {paymentStatus === "succeeded" ? "Payment Successful" : "Pay Now"}
                    </button>
                    {paymentStatus === "failed" && (
                        <div className="error-message">{errorMessage}</div>
                    )}
                </div>
            </form>
        </div>
    );
};
export default Testing;
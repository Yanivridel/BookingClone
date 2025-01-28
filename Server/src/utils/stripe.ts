import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-12-18.acacia",
});

export const createPaymentIntent = async (amount: number, currency: string, userId: string) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata: { userId },
        });
        return paymentIntent;
    } catch (error) {
        throw new Error(`Error creating payment intent: ${(error as Error).message}`);
    }
};

// createPaymentIntent(1200, "USD", "12324")
// .then(intent => console.log("INTENT", intent))


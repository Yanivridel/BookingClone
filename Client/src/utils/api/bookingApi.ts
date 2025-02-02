import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "axios";
import { getCookie } from "../cookies";

const isProduction = import.meta.env.VITE_NODE_ENV === "production";
const API_URL = isProduction
  ? import.meta.env.VITE_API_URL_CLOUD
  : import.meta.env.VITE_API_URL_LOCAL;

export async function makePayment(amount: number, currency: string) {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/payment/create`,
      {
        amount,
        currency,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Payment error:", error);
    return null;
  }
}

export async function savePayment(
  amount: number,
  currency: string,
  transactionId: string,
  paymentMethod: string
) {
  try {
    const { data } = await axios.post(
      `${API_URL}/api/payment/save`,
      {
        amount,
        currency,
        transactionId,
        paymentMethod,
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Payment error:", error);
    return null;
  }
}

export async function getPaymentMethod(paymentId: string) {
  try {
    const stripeSecret = import.meta.env.VITE_STRIPE_SECRET;
    const { data } = await axios.get(
      `https://api.stripe.com/v1/payment_methods/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${stripeSecret}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data.card.brand || "other";
  } catch (err) {
    console.log("Error fetching payment method: " + err);
    return null;
  }
}

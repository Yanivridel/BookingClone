import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"; 

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
const stripePromise = loadStripe("pk_test_51QlQ7aLnzBZ3n2kVAjUFi1clRBzORA0eVk35BnaL53NJuB2CAw5J5hAmqPw3n0qU9HoABW9l6KVGoFZtBQZM4Ei900Dw7d438A");
// console.log(clientId)

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </Provider>
  // </StrictMode>,
);

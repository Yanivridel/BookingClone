import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import './i18n';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
console.log(clientId)

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </Provider>
  // </StrictMode>,
)

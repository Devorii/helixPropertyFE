import React, { createContext, useContext, useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { loadConnectAndInitialize } from '@stripe/connect-js';

const StripeContext = createContext(null);

export const StripeProvider = ({ children }) => {
  const [connectInstance, setConnectInstance] = useState(null);
  const [checkoutClientSecret, setCheckoutClientSecret] = useState(null);
  const [paymentEmail, setPaymentEmail]=useState(null)
  const token = localStorage.getItem("token");

  const getConnectInstance = useCallback(async () => {
    if (connectInstance) return connectInstance;

    const response = await fetch(`${process.env.REACT_APP_HELIX_API}/stripe/account-session`, {
      method: "POST",
      headers: { "x-access-token": token },
    });

    const { client_secret } = await response.json();
    const instance = await loadConnectAndInitialize({
      publishableKey: process.env.REACT_APP_STRIPE_PUBLISHED_KEY,
      fetchClientSecret: () => Promise.resolve(client_secret),
    });

    setConnectInstance(instance);
    return instance;
  }, [connectInstance, token]);

  const getCheckoutSession = useCallback(async (property_id) => {
    const response = await fetch(`${process.env.REACT_APP_HELIX_API}/rent/payments`, {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ property_id }),
    });

    const { client_secret, payment_email } = await response.json();
    setPaymentEmail(payment_email)
    setCheckoutClientSecret(client_secret);
    return client_secret;
  }, [token]);

  return (
    <StripeContext.Provider value={{ getConnectInstance, getCheckoutSession, checkoutClientSecret, paymentEmail }}>
      {children}
    </StripeContext.Provider>
  );
};

export const useStripeContext = () => useContext(StripeContext);

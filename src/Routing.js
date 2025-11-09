import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from "./auth/pages/signup/Signup"
import UserInformation from './auth/pages/usersInfo/userInfo';
import LoginPage from "./auth/pages/login/login"
import './App.css';
import Home from './Dashboard/pages/home/home';
import Verification from './Dashboard/pages/verification/verificaionPage';
import ContractorsInformation from './Dashboard/pages/tenantsInfo/contractors';
import TransactionExpenses from './Dashboard/pages/Transactions/expenses/expenseReport';
import ExpenseViewer from './Dashboard/pages/Transactions/expenses/expenseView';
import PayoutViewer from './Dashboard/pages/Transactions/payouts/payout';
import RentViewer from './Dashboard/pages/rent/rent';
import { loadConnectAndInitialize } from '@stripe/connect-js';
import { ConnectComponentsProvider } from "@stripe/react-connect-js";
import { EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { StripeProvider } from './Dashboard/providers/stripeProvider';



const Routing = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const key = process.env.REACT_APP_STRIPE_PUBLISHED_KEY
  const token = localStorage.getItem("token");
  const [clientSecret, setClientSecret] = useState(null);
  const property_id = localStorage.getItem('pid')



  // const [stripeConnectInstance] = useState(() => {
  //   const fetchClientSecret = async () => {
  //     // Fetch the AccountSession client secret
  //     const response = await fetch(`${process.env.REACT_APP_HELIX_API}/stripe/account-session`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "x-access-token": token,
  //         },
  //       });
  //     if (!response.ok) {
  //       // Handle errors on the client side here
  //       const { error } = await response.json();
  //       console.error('An error occurred: ', error);
  //       setErrorMessage(error)
  //       return undefined;
  //     } else {
  //       const { client_secret: clientSecret } = await response.json();
  //       return clientSecret;
  //     }
  //   }
  //   return loadConnectAndInitialize({
  //     // This is your test publishable API key.
  //     publishableKey: key,
  //     fetchClientSecret: fetchClientSecret,
  //   })
  // });


  // useEffect(() => {
  //   // Create a Checkout Session on mount
  //   fetch(`${process.env.REACT_APP_HELIX_API}/rent/payments`, {
  //     method: "POST",
  //     headers: {
  //       "x-access-token": token,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ property_id: property_id })
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.client_secret))
  //     .catch((err) => console.error("Error creating session:", err));
  // }, []);

  // if (!clientSecret) {
  //   return <p>Loading checkout...</p>;
  // }
  // const options = { clientSecret };




  document.addEventListener("mousemove", (e) => {
    const cursor = document.querySelector(".circle-cursor");
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });


  // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHED_KEY);
  return (
    <>
      <BrowserRouter>
        <StripeProvider>
          <div className="circle-cursor"></div>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/personal-information' element={<UserInformation />} />
            <Route path='/verification/:code/:account/:token' element={<Verification />} />
            <Route path='/contractors-information' element={<ContractorsInformation />} />
            <Route path='/transaction-expenses' element={<TransactionExpenses />} />
            <Route path='/expense-view' element={<ExpenseViewer />} />
            <Route path='/payout-view' element={<PayoutViewer />} />
            <Route path="/rent-view" element={<RentViewer />} />
          </Routes>
        </StripeProvider>
      </BrowserRouter>
    </>

  )
}

export default Routing;

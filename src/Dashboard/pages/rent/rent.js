import Sidebar from "../../components/sidebar/Sidebar";
import TopNav from "../../components/topNav/topNav";
import { useEffect, useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripeContext } from "../../providers/stripeProvider";
import interact from "../../../artifacts/interac.png";
import masterCard from "../../../artifacts/mastercard.png";
import paymentIcon3d from "../../../artifacts/3dPayment.png";
import InteractCopyUserInfo from "../../components/etranser/interacCopy";
import BankGrid from "../../components/etranser/banks/banks";
import "./rent.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHED_KEY);

const RentViewer = () => {
  const themeColor = process.env.REACT_APP_THEME_COLOR;
  const { getCheckoutSession, checkoutClientSecret, paymentEmail } = useStripeContext();
  const [clientSecret, setClientSecret] = useState(checkoutClientSecret);
  const [paymentView, setPaymentView] = useState(null);
  const [stripeAvailable, setStripeAvailable] = useState(true);
  const property_id = localStorage.getItem("pid");

  const visaimageStyle = {
    width: "100px",
    height: "auto",
  };
  const imageStyle = {
    marginBottom: "10px",
    width: "71px",
    height: "auto",
  };

  useEffect(() => {
    if (!clientSecret && property_id) {
      getCheckoutSession(property_id)
        .then((secret) => {
          if (secret) {
            setClientSecret(secret);
            setStripeAvailable(true);
          } else {
            console.warn("No client secret returned from backend.");
            setStripeAvailable(false);
          }
        })
        .catch((err) => {
          console.error("Stripe unavailable:", err);
          setStripeAvailable(false);
        });
    }
  }, [property_id]);

  return (
    <>
      <Sidebar />
      <TopNav />

      <div className="dash-viewer">
        <div className="align-content-w-img">
          <div className="review-container">
            <div style={{ color: themeColor }}>Transactions - Rental Payments</div>
            <h1>Make a Payment</h1>

            <div className="info-wrapper">
              <div className="select-info-wrapper">
                <img className="threeD-element" src={paymentIcon3d} alt="3D payment icon" />
                <div>
                  <p className="improvement-text">
                    PeachStreet.io is working on more payment strategies to elevate your experience.
                  </p>
                  <h4 className="payment-selection-text">Select Payment Option</h4>

                  <div className="rprt" style={{ width: "100%", marginBottom: "50px" }}>
                    <div className="payment-methods-container">
                      {stripeAvailable && (
                        <div className="selection-container" onClick={() => setPaymentView("visa")}>
                          <img style={visaimageStyle} src={masterCard} alt="Master card icon" />
                          Pay via Credit Card
                        </div>
                      )}

                      <div className="selection-container" onClick={() => setPaymentView("interact")}>
                        <img style={imageStyle} src={interact} alt="Interac icon" />
                        Pay via E-Transfer
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="payment-options-container">
                {paymentView === "visa" && stripeAvailable && clientSecret && (
                  <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                    <EmbeddedCheckout className="stripe-promise" />
                  </EmbeddedCheckoutProvider>
                )}

                {paymentView === "interact" && (
                  <div className="align-interact-payments">
                    <div className="interac-dk-selection">
                      <InteractCopyUserInfo label="Email" value={paymentEmail} />
                      <p>Then select your vendor below.</p>
                      <BankGrid />
                    </div>
                  </div>
                )}

                {!paymentView && <p>No payment option selected.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentViewer;

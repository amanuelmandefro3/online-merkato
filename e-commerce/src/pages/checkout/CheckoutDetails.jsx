import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import styles from "./CheckoutDetails.module.scss";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddressChange = (addressType, e) => {
    const { name, value } = e.target;
    if (addressType === 'shipping') {
      setShippingAddress(prev => ({ ...prev, [name]: value }));
    } else {
      setBillingAddress(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
      dispatch(SAVE_BILLING_ADDRESS(billingAddress));
      navigate("/checkout");
    }
  };

  const renderAddressForm = (addressType, address) => (
    <>
      <h3>{addressType === 'shipping' ? 'Shipping' : 'Billing'} Address</h3>
      {Object.entries(address).map(([key, value]) => (
        key !== 'country' && (
          <div key={key} className={styles.formGroup}>
            <label htmlFor={`${addressType}-${key}`}>{key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</label>
            <input
              type="text"
              id={`${addressType}-${key}`}
              name={key}
              value={value}
              onChange={(e) => handleAddressChange(addressType, e)}
              placeholder={key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              required={key !== 'line2'}
            />
          </div>
        )
      ))}
      <div className={styles.formGroup}>
        <label htmlFor={`${addressType}-country`}>Country</label>
        <CountryDropdown
          id={`${addressType}-country`}
          valueType="short"
          value={address.country}
          onChange={(val) => handleAddressChange(addressType, { target: { name: 'country', value: val } })}
          className={styles.select}
        />
      </div>
    </>
  );

  return (
    <section className={styles.checkout}>
      <h2>Checkout Details</h2>
      <div className={styles.summary}>
        <Card cardClass={styles.card}>
          <CheckoutSummary />
        </Card>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <Card cardClass={styles.card}>
            {step === 1 ? (
              renderAddressForm('shipping', shippingAddress)
            ) : (
              renderAddressForm('billing', billingAddress)
            )}
            <div className={styles.buttonGroup}>
              {step === 2 && (
                <button type="button" className={styles.backButton} onClick={() => setStep(1)}>
                  Back to Shipping
                </button>
              )}
              <button type="submit" className={styles.submitButton}>
                {step === 1 ? 'Continue to Billing' : 'Proceed To Checkout'}
              </button>
            </div>
          </Card>
        </div>
      </form>
    </section>
  );
};

export default CheckoutDetails;
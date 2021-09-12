/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import cs from "./Checkout.module.css";

const Checkout = (props) => {
  const [formValidity, setformValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const pincodeRef = useRef();
  const cityRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isNotFiveChar = (value) => value.trim().length !== 5;
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredPostalCode = pincodeRef.current.value;
    const enteredStreet = streetRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);

    const enteredPostalCodeIsValid = !isNotFiveChar(enteredPostalCode);
    setformValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });
    const isFormValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;
    if (!isFormValid) {
      // Show Error
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };
  return (
    <form className={cs.form} onSubmit={confirmHandler}>
      <div className={`${cs.control} ${formValidity.name ? "" : cs.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formValidity.name && (
          <span className={cs.errorMsg}>Please enter valid name!</span>
        )}
      </div>
      <div className={`${cs.control} ${formValidity.street ? "" : cs.invalid}`}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formValidity.street && (
          <span className={cs.errorMsg}>Please enter valid street!</span>
        )}
      </div>
      <div
        className={`${cs.control} ${formValidity.postalCode ? "" : cs.invalid}`}
      >
        <label htmlFor="pincode">Postal Code</label>
        <input type="text" id="pincode" ref={pincodeRef} />
        {!formValidity.postalCode && (
          <span className={cs.errorMsg}>Please enter valid Postal Code!</span>
        )}
      </div>
      <div className={`${cs.control} ${formValidity.city ? "" : cs.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formValidity.city && (
          <span className={cs.errorMsg}>Please enter valid City!</span>
        )}
      </div>
      <div className={cs.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={cs.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

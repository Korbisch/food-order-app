import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    setFormInputValidity({
      name: !isEmpty(nameInputRef.current.value),
      street: !isEmpty(streetInputRef.current.value),
      postal: isFiveChars(postalInputRef.current.value),
      city: !isEmpty(cityInputRef.current.value),
    });

    const formIsValid =
      formInputValidity.name &&
      formInputValidity.street &&
      formInputValidity.postal &&
      formInputValidity.city;

    if (!formIsValid) {
      // set error and show feedback
      return;
    }

    // submit cart data to firebase
  };

  // controls css classes for invalid form inputs
  const nameClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalClasses = `${classes.control} ${
    formInputValidity.postal ? "" : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Name is invalid.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street & Number</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Street is invalid.</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postal && <p>Postal Code is invalid.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>City is invalid.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm Order</button>
      </div>
    </form>
  );
};

export default Checkout;

import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = cartContext.totalAmount.toFixed(2);
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order Now
        </button>
      )}
    </div>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      <div className={classes["cart-items"]}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>${totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onCloseCart} />}
        {!isCheckout && orderActions}
      </div>
    </Modal>
  );
};

export default Cart;

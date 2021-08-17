import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: "2", price: "12.99" }].map(
        (item) => (
          <li>{item.name}</li>
        )
      )}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      <div className={classes["cart-items"]}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>35.62</span>
        </div>
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.onCloseCart}
          >
            Close
          </button>
          <button className={classes.button}>Order Now</button>
        </div>
      </div>
    </Modal>
  );
};

export default Cart;

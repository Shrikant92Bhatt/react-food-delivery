/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import cs from "./Cart.module.css";
import CartContext from "../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$ ${cx.totalAmount.toFixed(2)}`;
  const cartItemRemoveHandler = (_id) => {
    console.log(_id);
    cx.removeItem(_id);
  };
  const cartItemAddHandler = (_item) => {
    cx.addItem({
      ..._item,
      amount: +_item.amount + 1,
    });
  };
  const orderHandler = () => {
    setShowCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    console.log(userData);
    await fetch(
      "https://react-movies-a0d77-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItem: cx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cx.clear();
  };
  const cartItem = (
    <ul className={cs["cart-items"]}>
      {cx.items.map((item) => {
        return (
          <CartItem
            {...item}
            key={item.id}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const cardContent = (
    <React.Fragment>
      {cartItem}
      <div className={cs.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!showCheckout && (
        <div className={cs.actions}>
          <button className={cs["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {cx.items.length > 0 && (
            <button className={cs.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order Data...</p>;
  const didSubmitModalConstant = (
    <React.Fragment>
      <p>Order Sent Successfully!</p>
      <div className={cs.actions}>
        <button className={cs.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cardContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalConstant}
    </Modal>
  );
};

export default Cart;

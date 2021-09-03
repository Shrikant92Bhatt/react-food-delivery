/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import cs from "./Cart.module.css";
import CartContext from "../store/cart-context";
const Cart = (props) => {
  const cx = useContext(CartContext);
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
  return (
    <Modal onClose={props.onClose}>
      {cartItem}
      <div className={cs.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={cs.actions}>
        <button className={cs["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {cx.items.length > 0 && <button className={cs.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../../UI/CartIcon";
import cs from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [buttonhilited, setButtonhilited] = useState(false);
  const cx = useContext(CartContext);
  const { items } = cx;
  const cartItems = items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const buttonStyle = `${cs.button} ${buttonhilited ? cs.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonhilited(true);

    const timer = setTimeout(() => {
      setButtonhilited(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={buttonStyle} onClick={props.onClick}>
      <span className={cs.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={cs.badge}>{cartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

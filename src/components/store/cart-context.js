/* eslint-disable no-unused-vars */
import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (_item) => {},
  removeItem: (_id) => {},
  clear: () => {},
});

export default CartContext;

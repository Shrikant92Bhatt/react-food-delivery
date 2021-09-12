/* eslint-disable no-debugger */
/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// eslint-disable-next-line no-unused-vars
const cartReducer = (_state, _action) => {
  switch (_action.type.toString()) {
    case "ADD_ITEM":
      const newTotalAmount =
        _state.totalAmount + _action.item.price * _action.item.amount;
      const isItemInCart = _state.items.findIndex(
        (item) => item.id === _action.item.id
      );
      const existingCartItem = _state.items[isItemInCart];
      let updatedItems;
      let updatedItem;
      if (existingCartItem) {
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + 1,
        };
        updatedItems = [..._state.items];
        updatedItems[isItemInCart] = updatedItem;
      } else {
        updatedItem = { ..._action.item };
        updatedItems = _state.items.concat(updatedItem);
      }
      return {
        items: updatedItems,
        totalAmount: newTotalAmount,
      };
    case "REMOVE_ITEM":
      const isItemInTheCart = _state.items.findIndex(
        (item) => item.id === _action.id
      );
      const theExistingCartItem = _state.items[isItemInTheCart];
      const resucedAmount = theExistingCartItem
        ? theExistingCartItem.amount - 1
        : 0;
      debugger;
      if (theExistingCartItem && resucedAmount > 0) {
        const reducedItem = {
          ...theExistingCartItem,
          amount: resucedAmount,
        };
        const _updateItem = [..._state.items];
        _updateItem[isItemInTheCart] = reducedItem;
        return {
          items: _updateItem,
          totalAmount: _updateItem.reduce((current, item) => {
            return current + item.amount * item.price;
          }, 0),
        };
      }
      const filteredItem = _state.items.filter((item) => item.id != _action.id);
      const newAmount = filteredItem.reduce((current, item) => {
        return current + item.amount * item.price;
      }, 0);
      return {
        items: filteredItem,
        totalAmount: newAmount,
      };
    case "CLEAR":
      return defaultCartState;
    default:
      return defaultCartState;
  }
};

const CardContextProvider = (props) => {
  const [cartState, cartDispatchAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addCartHandler = (_item) => {
    cartDispatchAction({ type: "ADD_ITEM", item: _item });
  };

  const removeCartItemHandler = (_id) => {
    cartDispatchAction({ type: "REMOVE_ITEM", id: _id });
  };
  const clearCartHandler = () => {
    cartDispatchAction({ type: "CLEAR" });
  };

  const cardContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartHandler,
    removeItem: removeCartItemHandler,
    clear: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cardContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CardContextProvider;

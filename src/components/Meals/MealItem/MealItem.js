/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import cs from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";
const MealItem = (props) => {
  const price = `$ ${props.item.price.toFixed(2)}`;
  const cx = useContext(CartContext);
  const onAddtoCartHandler = (_amount) => {
    console.log(_amount);
    cx.addItem({
      ...props.item,
      amount: _amount || 1,
    });
  };
  return (
    <li className={cs.meal}>
      <div>
        <h3>{props.item.name}</h3>
        <div className={cs.description}>{props.item.description}</div>
        <div className={cs.price}>{price}</div>
      </div>
      <div>
        <MealItemForm
          id={props.item.id}
          onAddtoCart={onAddtoCartHandler}
        ></MealItemForm>
      </div>
    </li>
  );
};
export default MealItem;

/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import cs from "./MealItemfrom.module.css";
import Input from "../../UI/Input/Input";

const MealItemForm = (props) => {
  const ref = useRef();
  const [isValidForm, setIsValidForm] = useState(false);
  const submitHandler = (event) => {
    console.log(event);
    event.preventDefault();
    const enteredAmount = ref.current.value;
    const enteredAmountNum = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setIsValidForm(true);
      return;
    }
    props.onAddtoCart(enteredAmountNum);
  };
  return (
    <form className={cs.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={ref}
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {isValidForm && <span>Please Entred value between 1-5</span>}
    </form>
  );
};

export default MealItemForm;

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import cs from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={cs.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.input.id} {...props.input} ref={ref} />
    </div>
  );
});

export default Input;

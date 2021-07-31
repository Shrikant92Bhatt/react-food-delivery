/* eslint-disable react/prop-types */
import React from "react";
import cs from "./Input.module.css";
const Input = (props) => {
  return (
    <div className={cs.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.input.id} {...props.input} />
    </div>
  );
};

export default Input;

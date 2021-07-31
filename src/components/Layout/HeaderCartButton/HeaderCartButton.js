import React from 'react';
import CartIcon from "../../UI/CartIcon";
import cs from './HeaderCartButton.module.css';
const HeaderCartButton = () => {
    return (
        <button className={cs.button}>
            <span className={cs.icon}><CartIcon></CartIcon></span>
            <span>Your Cart</span>
            <span className={cs.badge}>
                3
            </span>

        </button>
    )
}

export default HeaderCartButton;

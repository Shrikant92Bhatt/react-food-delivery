/* eslint-disable react/prop-types */
import React from 'react'
import cs from './MealItem.module.css';
import MealItemForm from './MealItemForm';
const MealItem = (props) => {
    const price = `$${props.item.price.toFixed(2)}`;
    return (
        <li className={cs.meal}>
            <div>
                <h3>{props.item.name}</h3>
                <div className={cs.description}>{props.item.description}</div>
                <div className={cs.price}>{price}</div>
            </div>
            <div><MealItemForm id={props.item.id}></MealItemForm></div>
        </li>
    )
}
export default MealItem
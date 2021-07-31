import React from 'react';
import styles from './Header.module.css';
import mealsImage from '../../../assets/meals.jpg'
import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';
const Header = () => {
    console.log(styles);
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>React Meal</h1>
                <HeaderCartButton />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="Meals img" />
            </div>
        </React.Fragment>
    )
}

export default Header;

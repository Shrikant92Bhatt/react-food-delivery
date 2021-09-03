import React, { useState } from "react";
import Headers from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import "./App.css";
import Cart from "./components/Cart/Cart";
import CardContextProvider from "./components/store/cart-provider";
const App = () => {
  const [isModelVisible, setIsModelVisible] = useState(false);

  const showCartHandler = () => {
    setIsModelVisible(true);
  };

  const hideCartHandler = () => {
    setIsModelVisible(false);
  };

  return (
    <CardContextProvider>
      {isModelVisible && <Cart onClose={hideCartHandler} />}

      <Headers onCartClicked={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CardContextProvider>
  );
};

export default App;

import React from 'react';
import Headers from "./components/Layout/Header/Header";
import Meals from './components/Meals/Meals';
import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <Headers />
      <Meals />
    </React.Fragment>
  );
}

export default App;

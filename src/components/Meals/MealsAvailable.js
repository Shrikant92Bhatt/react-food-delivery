import React, { useEffect, useState } from "react";
import cs from "./MealsAvailable.module.css";
import Card from "../UI/card/Card";
import MealItem from "./MealItem/MealItem";

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorOccured, seterrorOccured] = useState(false);
  const fetchMeals = async () => {
    try {
      setIsLoading(true);
      const data = await fetch(
        "https://react-movies-a0d77-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      ).then((res) => res.json());

      const mealsData = [];
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          mealsData.push({
            id: key,
            ...data[key],
          });
        }
      }
      setMeals([...mealsData]);
      setIsLoading(false);
    } catch (error) {
      seterrorOccured(true);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMeals();
    return () => {};
  }, []);

  if (isLoading) {
    return (
      <section className={cs.mealsLoading}>
        <p>Loading....</p>
      </section>
    );
  }
  if (errorOccured) {
    return (
      <section className={cs.mealsLoading}>
        <p>Somthing went wrong</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => <MealItem key={meal.id} item={meal} />);
  return (
    <section className={cs.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;

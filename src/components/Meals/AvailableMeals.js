import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import { useCallback, useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://react-http-requests-a84ea-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Error: unsuccessful response from firebase");
      }
      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
      setHttpError(false);
    } catch (error) {
      setHttpError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {httpError && <p>{httpError}</p>}
        {isLoading && <p>Loading Meals...</p>}
        {!isLoading && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;

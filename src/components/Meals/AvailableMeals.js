import Card from "../UI/Card";
import MealItem from "./Meal/MealItem";

import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-35c4a-default-rtdb.firebaseio.com/meals.json"
      );
      const responseData = await response.json();
      //console.log(responseData);

      //중첩 객체 배열로 꺼내기
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          key: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id} // 각 인풋 컴포넌트가 개별적으로 인식되기 위해 id 넣는게 좋음
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

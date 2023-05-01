import classes from "./Meal.module.css";
import MealForm from "./MealForm";

const Meal = (props) => {
  //소수점 두자리 수까지만 표시
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      {/* 음식 */}
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      {/* 수량 입력 및 카트 추가*/}
      <div>
        <MealForm id={props.id} />
      </div>
    </li>
  );
};

export default Meal;

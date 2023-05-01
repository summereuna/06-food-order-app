import Input from "../../UI/Input";
import classes from "./MealForm.module.css";

const MealForm = (props) => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: `amount_${props.id}`, //모든 인풋이 각자 고유한 값을 받을 수 있음
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealForm;

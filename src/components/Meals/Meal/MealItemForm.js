import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

/*
Input 컴포넌트가 사용자 정의 컴포넌트이기 때문에 ref 프롭이 작동하지 않는다. 
따라서 forwardRef()로 작업
*/
const MealItemForm = (props) => {
  //form 유효한지 관리
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    //입력된 수량 꺼내기 위해 ref 사용 / state로 양방향 바인딩 사용해도 되지만 여기서는 ref를 사용하도록 하자
    const enteredAmount = amountInputRef.current.value;
    //ref의 current.value 값은 항상 문자열이기 때문에 숫자는 숫자로 변환해야함
    const enteredAmountNumber = +enteredAmount;

    //유효성 검사
    //enteredAmount가 텍스트인지 확인하고, 공백 있으면 없애기 위해 trim()사용, length === 0 로 빈 값 입력했는지 확인
    //혹은 enteredAmountNumber가 1보다 작은지 확인: 추가된 항목 없는지 확인
    // 항목수 5개 이상 못 추가하게 > 5 인지도 확인
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    //MealItemForm 에는 수량만 있기 때문에 여기서는 ctx를 호출하지 않고 props으로 위로 보내준다.
    //추가하려는 장바구니 항목은 입력된 수량 말고도 더 많은 데이터가 필요하기 때문에..
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
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
      {!amountIsValid && <p>수량을 체크해 주세요(1-5).</p>}
    </form>
  );
};

export default MealItemForm;

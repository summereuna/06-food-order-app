import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;

// 엘리먼트에 전개연산자 사용
// {...props.input} 으로 외부 input 객체에 있는 모든 키-값을 props으로 가져올 수 있음

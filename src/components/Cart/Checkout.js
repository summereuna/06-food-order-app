//키값 얻을 때 마다 변경하지 않고 useRef로 양식 제출후에 값 얻기

import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

//도우미 함수
//비어있으면 true 반환
const isEmpty = (value) => value.trim() === "";
//포스탈코드 5개의 문자로 이루어져 있으면 true 반환
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  //폼 유효성: 처음에는 유효한 것으로 취급하여 오류 피하기
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    city: true,
    street: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    //입력된 값
    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    //유효성 검증
    //비어있지 않으면 false 반환 = !false = true
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    //5자리면 true 반환
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    // 양식 제출한 후 유효성 상태 실제로 업데이트
    //전체 상태를 완전히 새로운 객체로 오버라이드하고 있기 때문에 함수를 업데이트하는 해당 상태에 대한 함수 양식은 필요하지 않음
    setFormInputsValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
    });

    //전체 양식 유효성 검증위해 위 각각의 검증 결합
    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid;

    //상태 업데이트해 사용자에게 메시지 전달

    if (!formIsValid) {
      //유효하지 않으면 오류 표시
      return;
    }
    //양식이 유효한 경우 Cart 데이터 제출
  };

  // 스타일
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;

  const postalControlClasses = `${classes.control} ${
    formInputsValidity.postal ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">이름</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && (
          <p className={classes.invalid}>유효한 이름을 입력하세요.</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">도시</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && (
          <p className={classes.invalid}>유효한 도시를 입력하세요.</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">상세 주소</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && (
          <p className={classes.invalid}>유효한 상세 주소를 입력하세요.</p>
        )}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">우편 번호</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p className={classes.invalid}>유효한 우편 번호를 입력하세요.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          취소
        </button>
        <button className={classes.submit}>확인</button>
      </div>
    </form>
  );
};

export default Checkout;

//input type="text"
//넘버 말고 텍스트 처리해야 null 값으로 처리하지 않고 0으로 시작 가능

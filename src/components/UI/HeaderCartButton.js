import { useContext } from "react";
import classes from "./HeaderCartButton.module.css";

// icon은 이아웃에서 사용하니까 레이아웃 폴더에 저장하거나 혹은 장바구니 전용 아이콘이니 장바구니 기능(feature) 폴더인 cart 폴더에 저장해도 됌
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);

  //cartCtx.items.length 로 접근하면 아이템의 항목수만 출력할 수 있음
  //하지만 현재 우리가 가지고 싶은 값은 항목수가 아닌 실제로 장바구니에 담긴 모든 아이템 수임
  //항목수가 아닌 실제로 장바구니에 들어간 모든 아이템 수를 출력해야 하므로 reduce()메소드를 사용
  //reduce()에는 누산기가 포함되어 있기 때문에 배열의 각 요소에 대해 함수를 실행하고 누적된 값을 출력할 때 용이함 => 모든 배열의 합 구하기에 용이!
  //reduce((현재수량,살펴보는항목)=>{}, 시작 값)는 데이터 배열을 값 하나로 변환해준다.
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    //처음 값은 0이지만, 처음 이 함수가 실행되고 나면 이전 실행에서 반환되는 결과값이 된다.
    console.log(curNumber, item, item.amount);
    return curNumber + item.amount;
    //현재수량 + 항목 유형별 항목 수
  }, 0);
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

/*
버튼
 ㄴ카트 아이콘
 ㄴ텍스트
 ㄴ작은 배지(항목 수)
*/

import { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";

// icon은 이아웃에서 사용하니까 레이아웃 폴더에 저장하거나 혹은 장바구니 전용 아이콘이니 장바구니 기능(feature) 폴더인 cart 폴더에 저장해도 됌
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  //bump 클래스 조건부로 추가될 때 마다 컴포넌트 재평가하여 재랜더링 되게 하기 위해 상태 추가
  const [btnHighlighted, setBtnHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  //cartCtx.items.length 로 접근하면 아이템의 항목수만 출력할 수 있음
  //하지만 현재 우리가 가지고 싶은 값은 항목수가 아닌 실제로 장바구니에 담긴 모든 아이템 수임
  //항목수가 아닌 실제로 장바구니에 들어간 모든 아이템 수를 출력해야 하므로 reduce()메소드를 사용
  //reduce()에는 누산기가 포함되어 있기 때문에 배열의 각 요소에 대해 함수를 실행하고 누적된 값을 출력할 때 용이함 => 모든 배열의 합 구하기에 용이!
  //reduce((현재수량,살펴보는항목)=>{}, 시작 값)는 데이터 배열을 값 하나로 변환해준다.
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    //처음 값은 0이지만, 처음 이 함수가 실행되고 나면 이전 실행에서 반환되는 결과값이 된다.
    return curNumber + item.amount;
    //현재수량 + 항목 유형별 항목 수
  }, 0);

  //btnHighlighted가 true면 bump 클래스 추가
  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ""}`;

  //갹체 디스트럭처링으로 의존성에 추가할 항목 꺼내기
  const { items } = cartCtx;

  //장바구니에 추가될 때 마다 범프 효과 나타나게 사이드 이펙트 넣기
  useEffect(() => {
    //버튼 클래스가 범프 클래스 포함하도록 바꾸고
    //그리고 그 클래스 다시 삭제하는 타이머 설정
    //나중에 다시 클래스 추가되면 범프 효과 나타날수 있도록

    //항목수량이 0보다 큰 경우에만 set변경
    if (items.length === 0) {
      return;
    }
    setBtnHighlighted(true);

    //추가한 뒤 삭제해줘야 다음번에 클릭했을 때도 범프 효과 일어남
    //범프 효과 끝나면 삭제하기: css에 300ms로 설정해 뒀기 때문에 동일한 값 입력
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);

    //클린업 펑션으로 기타 사이드이펙트 정리하는 건 좋은 습관! 타이머 삭제해주자.
    //이펙트가 다시 실행될 때 먼저 타이머를 지움
    return () => {
      clearTimeout(timer);
    };

    //cartCtx의 items 배열만 이펙트 함수에 대한 의존성으로 추가
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
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

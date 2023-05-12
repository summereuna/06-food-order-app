import classes from "./HeaderCartButton.module.css";

// icon은 이아웃에서 사용하니까 레이아웃 폴더에 저장하거나 혹은 장바구니 전용 아이콘이니 장바구니 기능(feature) 폴더인 cart 폴더에 저장해도 됌
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
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

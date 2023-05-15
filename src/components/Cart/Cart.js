import { useContext } from "react";
import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  //헬퍼 상수
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          //bind()는 함수가 실행될 때 받을 인수를 미리 구성할 수 있음
          //.bind(null, item.id) 추가되거나 삭제된 item이 add핸들러로 전달됨
          onAdd={cartItemAddHandler.bind(null, item)}
          //.bind(null, item.id) 추가되거나 삭제된 item의 id가 remove핸들러로 전달됨
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseModal={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>총 결제금액</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          닫기
        </button>
        {/*장바구니에 들어있는 경우에만 주문 버튼 보이게 ! */}
        {hasItems && <button className={classes.button}>주문하기</button>}
      </div>
    </Modal>
  );
};

export default Cart;

/*
Cart: 모든 장바구니 항목 랜더링 / 토탈 

ㄴ 장바구니 항목
  ㄴ이름, 가격, 수량
  ㄴ -,+ 버튼

ㄴ 토탈 어마운트 / 클로징버튼, 올더 버튼
*/

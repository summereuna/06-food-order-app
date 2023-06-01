import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  //성공 메시지
  const [didSubmitting, setDidSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    // cartCtx.addItem(item); 으로 전달하면 아이템 추가 버튼 누르면 기존 값에 2배씩 추가되버림
    cartCtx.addItem({ ...item, amount: 1 });
    //위 처럼 작성해야 기존 아이템에 수량 +1씩 추가됨
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  //데이터가 서버로 제출되어야 할 곳은 cart 컴포넌트
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    setError(null);
    //유효한 경우 카트, 유저 데이터 모두 백엔드로 전송
    try {
      const response = await fetch(
        "https://react-http-35c4a-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        }
      );

      if (!response.ok) {
        throw new Error("오류 발생! 관리자에게 문의하세요.");
      }
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    //주문 중
    setIsSubmitting(false);
    //폼 제출 완료되면 true로
    setDidSubmitting(true);
    //카트 비우기
    cartCtx.clearCart();
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

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        닫기
      </button>
      {/*장바구니에 들어있는 경우에만 주문 버튼 보이게 ! */}
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          주문하기
        </button>
      )}
    </div>
  );

  //모달에 런데링될 컨텐츠
  //양식 작성
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>총 결제금액</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onCloseCart} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
      {error && <p>{error}</p>}
    </>
  );

  //양식 제출 중
  const isSubmitModalContent = <p>주문 중...</p>;

  //양식 제출 완료 후
  const didSubmitModalContent = (
    <>
      <p>주문 완료!</p>
      {
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onCloseCart}>
            닫기
          </button>
        </div>
      }
    </>
  );
  return (
    <Modal onCloseModal={props.onCloseCart}>
      {!isSubmitting && !didSubmitting && cartModalContent}
      {isSubmitting && isSubmitModalContent}
      {!isSubmitting && didSubmitting && didSubmitModalContent}
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

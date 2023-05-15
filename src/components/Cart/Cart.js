import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  //헬퍼 상수
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "sushi", amount: 2, price: 12.99 }].map((item) => (
        <li key={item.id}>
          <div>{item.name}</div>
          <div>{item.amount}</div>
          <div>{item.price}</div>
        </li>
      ))}
    </ul>
  );

  return (
    <Modal onCloseModal={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>총 수량</span>
        <span>35.62로 일단 하드코딩</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          닫기
        </button>
        <button className={classes.button}>
          {/*장바구니에 들어있는 경우에만 주문 버튼 보이게  */}
          주문하기
        </button>
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

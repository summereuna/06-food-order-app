import React from "react";

//자동 완성 위해 초기화
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  //컨텍스트 업데이트하는 함수 2가지
  //장바구니에 아이템 추가
  addItem: (item) => {},
  //장바구니에서 삭제해야 하는 항목 식별하여 없애기
  removeItem: (id) => {},
});

export default CartContext;

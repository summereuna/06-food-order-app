import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //totalAmount 업데이트
    //이전 state스냅샷의 이전 totalAmount에 새롭게 추가되는 (action.item.price * action.item.amount) 더한 값
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    //같은 항목은 같은 항목으로 그룹화 하여 추가, 즉 배열에 대한 항목으로 추가하기: 음식 기준으로 수량 관리
    //같은 항목은 같은 항목별로 합쳐서 반환하기위해 장바구니에 이미 그 항목이 있는지 체크하기
    //findIndex() 배열 검색 메서드: 아이템의 아이디가 액션의 아이템 아이디와 같은 항목의 **인덱스 값**을 반환함
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    //해당 항목이 존재하면 해당 항목의 인덱스를 돌려주기 때문에 state.items 배열에 해당하는 인덱스를 넣어서 이미 장바구니에 넣음 아이템이 뭔지 찾을 수 있음
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    //이미 장바구니에 추가하려는 항목이 있는 경우
    if (existingCartItem) {
      //추가하려는 아이템인 updatedItem은 존재하는 항목 복사하여 수량만 바꾼 새 객체
      const updatedItem = {
        ...existingCartItem,
        //존재하는 항목의 수량 + 새로운 액션의 수량
        amount: existingCartItem.amount + action.item.amount,
      };

      //updatedItems은 기존 항목 복사한 새 배열, 즉 새로운 항목을 더 추가하지는 않음, 그래도 immutable하게 업데이트하기
      updatedItems = [...state.items];

      //updatedItems의 existingCartItemIndex 인덱스를 새로 업데이트한 updatedItem로 덮어쓴다.
      updatedItems[existingCartItemIndex] = updatedItem;
      //그러면 기존 항목에 수량만 바꿔서 업뎃된다.
    } else {
      //장바구니에 추가하려는 항목이 없는 경우: 새롭게 항목 추가하며 수량도 추가해 줘야함
      //이 경우 업데이트할 항목은 그냥 진짜 새 항목임 ㅇㅇ..
      //updatedItem = { ...action.item };

      /*
      updatedItems 배열은 새 배열
    state.items.concat() 배열에 새 항목 추가하고 새 배열을 반환하는 concat() 메서드 사용
    - push()는 배열에 항목 추가하기 위해 배열을 편집함
    - concat()은 배열에 항목 추가 후 새로운 배열을 반환함
    state를 변경할 수 없는 방식(immutable)으로 업데이트 하기 위해 이전 스냅샷을 편집하는 것이 아닌 새로운 스냅샷을 생성하여 반환해야 함
    따라서 concat()사용
    */
      updatedItems = state.items.concat(action.item);
    }

    //항상 새로운 스냅샷 반환
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
  }
  return defaultCartState;
};

//CartContext 데이터를 관리하고, 접근하는 모든 컴포넌트에게 데이터 제공
//장바구니 데이터 관리
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  /*
    addItemToCartHandler 호출될 때마다 장바구니에 추가해야 할 항목을 얻음
    장바구니에 이미 그 항목이 있는지 확인하고, 그렇다면 기존 항목 업데이트해야 함
    아니라면 새 항목 추가하기
    음식이 이미 있는지 등도 체크해야 하므로 좀더 복잡하니까 useReducer를 사용하자
    */
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  //이 함수가 호출되는 컴포넌트들이 어딜까 ㅇㅇ!?
  // =>  장바구니 추가하는 모든 컴포넌트인 MealItemForm

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  //헬퍼 상수
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    //컨텍스트 업데이트하는 함수 2가지
    //장바구니에 아이템 추가하는 함수
    addItem: addItemToCartHandler,
    //장바구니에서 삭제해야 하는 항목 식별하여 없애는 함수
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

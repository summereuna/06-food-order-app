import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

/*
components
ㄴ UI
   ㄴ 인풋, 버튼, 모달 등
ㄴ Layout
   ㄴ Header 컴포넌트 및 헤더 관련 컴포넌트
ㄴ Meals
   ㄴ 음식 목록 및 개별 음식 항목 컴포넌트
ㄴ Cart 장바구니
  ㄴ 장바구니 관련 컴포넌트
*/

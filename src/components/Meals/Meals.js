import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
};

export default Meals;

/*
음식
 ㄴ 주문 가능한 음식 목록 (available meals): 일단 더미 데이터로 작업
 ㄴ 음식 목록 요약 (meals summary): 그냥 하드코딩한 더미 텍스트
*/

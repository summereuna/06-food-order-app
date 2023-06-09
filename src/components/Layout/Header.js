import HeaderCardButton from "../UI/HeaderCartButton";
//로컬 이미지 임포트
import mealImg from "../../assets/meals.jpeg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Ordinary Meals</h1>
        <HeaderCardButton
          onClick={props.onShowCart}
          onCloseModal={props.onHideCart}
        />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;

//{styles["main-image"]}

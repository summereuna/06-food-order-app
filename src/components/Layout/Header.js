import classes from "./Header.module.css";
//로컬 이미지 임포트
import mealImg from "../../assets/meals.jpeg";

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>Ordinary Meals</h1>
        <button>Cart</button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImg} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;

//{styles["main-image"]}

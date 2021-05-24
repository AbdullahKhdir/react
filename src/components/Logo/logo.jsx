import React from "react";
import BurgerLogo from "../../assets/images/burger-logo3.png";
import classes from "./logo.module.css";

export default function Logo(props){
  return(
      <div className={classes.Logo} style={{height: props.height}}>
          <img className={classes.img} src={BurgerLogo} alt="MyBurger"/>
      </div>
  );
}

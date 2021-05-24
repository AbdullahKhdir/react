import React from "react";
import Burger from "../../Burger/burger";
import Button from "../../UI/Button/button";
import classes from "./checkoutSummary.module.css";

const CheckoutSummary = (props) => {

  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: "100%",
                   margin: "auto"}}><Burger ingredients={props.ingredients}/></div>
      <Button btnType="Danger" clicked={props.CheckoutCancelled} > CANCEL </Button>
      <Button btnType="Success" clicked={props.Continued} > CONTINUE</Button>
    </div>
  );
}

export default CheckoutSummary;

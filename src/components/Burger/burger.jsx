import React from "react";
import classes from "./burger.module.css";
import BurgerIngredient from "./BurgerIngredient/burgerIngredient";

const Burger = props => {

  let trasformedIngredients = Object.keys(props.ingredients) //without the number only ingredients name
      .map((igName) => {

        return [...Array(props.ingredients[igName])].map((_, index) => {
          return <BurgerIngredient key={ igName + index }
                                   type={igName} />;
        })
      }).reduce((prevValue, currentValue) => {
        return prevValue.concat(currentValue);
      }, []);

  if (trasformedIngredients.length === 0) {
      trasformedIngredients = <p>Please start adding ingredients</p>
  }

  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {trasformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );

}


export default Burger;

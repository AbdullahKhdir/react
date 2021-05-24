import React from "react";
import classes from "./order.module.css";

export default function Order(props){

    const ingredients = [];
    for (var ingredientName in props.ingredients) {
        ingredients.push({name: ingredientName,
                          amount :props.ingredients[ingredientName]})

    }

    const ingredientOutput = ingredients.map(ig => {
      return <span
              style={{textTransform: "capitalize",
                      margin: "1px 8px",
                      display: "inline-block",
                      border: "1px solid #ccc",
                      padding: "5px"}}
              key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return(
      <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong></p>
        <button onClick={() => {props.onDelete(props.id)}}
                type="button"
                className={classes.Delete + " btn btn-outline-danger"}>Delete</button>
      </div>
    );
}

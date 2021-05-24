import * as actionTypes from "./constants";
import axios from "../../axios-orders";


export const addIngredient = (ingredientName) => {
    return{
      type: actionTypes.ADD_INGREDIENT,
      payload: ingredientName,
    }
};

export const removeIngredient = (ingredientName) => {
    return{
      type: actionTypes.REMOVE_INGREDIENT,
      payload: ingredientName,
    }
};
//Handling InitState
export const setIngredients = (ingredients) => {
  return{
      type: actionTypes.SET_INGREDIENTS,
      payload: ingredients
  };
};
//Handling Errors for InitState
export const fetchIngredientsFailed = () => {
  return{
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}
//fetch using thunk async code
export const initIngredients = () => {
    return dispatch => {
      axios.get("https://myburger-backend-b503e-default-rtdb.firebaseio.com/ingredients.json")
           .then( res =>{
             dispatch(setIngredients(res.data));
          })
          .catch(err => {
            dispatch(fetchIngredientsFailed());
            console.log("error:", err);
          });
    };
};

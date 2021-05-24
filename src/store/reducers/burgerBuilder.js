import * as actionTypes from "../actions/constants";
//import axios from "../../axios-orders";
import {updateObj} from "../utility.js";

let init = {
      ingredients: null,
      totalPrice: 13.30,
      error : true,
      IngsOrderNr: 1,
      bool: true,
};

const INGREDIENTS_PRICES={
  salad: 1.5,
  cheese: 2.5,
  bacon: 2.8,
  meat: 2.5
};


const fetchBurger = (state, action) => {
  return updateObj(state, {
            ingredients: action.payload,
            error: false,
            totalPrice: 4.0
        });
}

const reducer = (state = init, action) => {

  switch (action.type) {
    case "syncFetch":
    //fetch using sync code without thunk
    if (action.payload.bacon === 0 &&
        action.payload.cheese === 0 &&
        action.payload.meat === 0 &&
        action.payload.salad === 0) {

        //   return{
        //   ...state,
        //   ingredients: action.payload,
        //   error: false,
        //   totalPrice: 4.0
        // }

        return fetchBurger(state, action);

    }else {
      return{
          ...state,
          ingredients: action.payload,
          error: false,
          totalPrice: 13.30
        }
    }

    case  actionTypes.SET_INGREDIENTS:
      //fetch using async code with thunk
      return{
        ...state,
        ingredients: action.payload,
        error: false
      }

    case  actionTypes.FETCH_INGREDIENTS_FAILED:
      return{
        ...state,
        error: true
      }

    case actionTypes.ADD_INGREDIENT:
      return{
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.payload],
      }

    case actionTypes.REMOVE_INGREDIENT:
      return{
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.payload],
      }

    default:
      return state;
  }

}

export default reducer;

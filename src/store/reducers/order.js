import * as actionTypes from "../actions/constants";

const initState ={
  orders: [],
  loading: false,
  purchased: false,
  error: null,
  building: false
};

const burgerSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.Id,
  };

  return{
      ...state,
      loading: false,
      orders: state.orders.concat(newOrder),
      purchased: true,
  };
}

export const reducer = (state = initState, action) => {

  switch (action.type){

    case actionTypes.PURCHASE_BURGER_START :
    return{
        ...state,
        loading : true
    }

    case actionTypes.PURCHASE_BURGER_SUCCESS:
    return burgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAIL:
    return{
        ...state,
        loading: false,
    };

    case actionTypes.PURCHASE_INIT:
    return{
        ...state,
        purchased: false
    };

    case actionTypes.ORDER_DATA_INIT:
    return{
      ...state,
      loading : true,
    }

    case actionTypes.ORDER_DATA_SUCCESS:
    return{
        ...state,
        orders: action.orderData,
        loading: false,
    }

    case actionTypes.ORDER_DATA_FAIL:
    return{
      ...state,
      loading : false,
      error: action.error
    }

    case actionTypes.DELETE_ORDER:
      let newOrdersList = action.orderData;
          newOrdersList = Object.values(newOrdersList).filter(function(item, index){ //filter the array and compare the value of the item index with id parameter is it equals then dont return else return.
                    if(action.orderId === item.id){
                      return !item;
                    }else {
                      return item;
                    }
               });
      return {
        ...state,
        orders: newOrdersList,
        loading: false
      }

    case actionTypes.BUILDING_START:
    return{
      ...state,
      building: true,
    }

    case actionTypes.BUILDING_DONE:
    return{
      ...state,
      building: false,
    }

    default:
    return state;
  }
}

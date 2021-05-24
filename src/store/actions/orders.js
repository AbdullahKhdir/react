import * as actionTypes from "./constants";
import axios from "../../axios-orders.js";


//--------------Posting an Orders using thunk-------------------
export const purchaseBurgerSuccess = (id, orderData) => {
  return{
    type: actionTypes.PURCHASE_BURGER_SUCCESS ,
    orderData: orderData,
    Id: id
  };
}
export const purchaseBurgerFail = (err) => {
  return{
    type: actionTypes.PURCHASE_BURGER_FAIL ,
    err: err
  };
}
export const purchaseBurgerStart= () => {
  return{
    type: actionTypes.PURCHASE_BURGER_START
  }
}
export const purchaseInit = () => {
  return{
    type: actionTypes.PURCHASE_INIT,
  };
}
export const purchaseBurger = (orderData, token) => {
  return dispatch =>{ //asyncCode using Thunk

    dispatch(purchaseBurgerStart());
    //fireBase BE
    axios.post("/orders.json?auth=" + token, orderData)
         .then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData));
         }).catch(err => {
           dispatch(purchaseBurgerFail(err));
         });
  }
}

//--------------Fetching Orders using thunk---------------------
const saveOrdersData = (data) => {
  return{
    type: actionTypes.ORDER_DATA_SUCCESS,
    orderData: data
  };
};
const setStateOnErr = (err) => {
  return{
    type: actionTypes.ORDER_DATA_FAIL,
    error: err
  };
};
const initOrder = () => {
  return{
    type: actionTypes.ORDER_DATA_INIT,
  }
}
export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(initOrder());
    axios.get("/orders.json?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"')
         .then(res => {
            const fetchOrders= [];
            for (let key in res.data){
              fetchOrders.push({
                                ...res.data[key],
                                id: key});
            }
            dispatch(saveOrdersData(fetchOrders));
         })
         .catch(err => {
            dispatch(setStateOnErr(err));
         });
  };
};
//-------------------------------------------------------------

export const deleteOrderID = (id, orderData) => {
  return{
    type: actionTypes.DELETE_ORDER,
    orderId: id,
    orderData: orderData
  }
};
export const deleteOrder = (id, data) => {

  return dispatch => {
    axios.delete("/orders/"+ id + ".json")
         .then(res => {
            dispatch(deleteOrderID(id, data));
          })
         .catch(err => {
            console.log("[deleteOnErr]", err);
         });
  };
};
//-------------------------------------------------------------

export const dispatchBuildStart = () => {
  return{
    type: actionTypes.BUILDING_START,
  }
}
export const dispatchBuildDone =() => {
    return{
      type: actionTypes.BUILDING_DONE,
    }
}

export const buildStart = () => {
  return dispatch => {

    dispatch(dispatchBuildStart());
  }
}
export const buildDone = () => {
  return dispatch => {
    dispatch(dispatchBuildDone());
  }
}
//-------------------------------------------------------------

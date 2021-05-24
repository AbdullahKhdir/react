import React from "react";

//here all related variables can be initilised and defined as a reference to pass
//them later on in the app

const ContextObj = React.createContext({
      ingredients: {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                    },
      purchased: false,
      totalPrice: 2,
      orders: [],
      delete: () => {},
});

export default ContextObj;

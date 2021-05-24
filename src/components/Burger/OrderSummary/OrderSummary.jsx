import React from "react";
import Auxiliary from "../../../hoc/auxiliary";
import Button from "../../UI/Button/button";

class OrderSummary extends React.Component{

    componentDidUpdate(){
      // console.log("[OrderSummary.jsx] didUpdate"); //uncomment to test for performance optimization
    }

    render(){

      const ingredientSummary = Object.keys(this.props.ingredients);

      return(
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary.map((igName, index) => {
                  return (<li key={index}>
                              <span style={{textTransform: "capitalize"}}>
                              {igName}
                              </span>
                              : {this.props.ingredients[igName]}
                          </li>)
                })}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout!</p>
            <Button clicked={this.props.continue} btnType={"Success"}>CONTINUE</Button>
            <Button clicked={this.props.canceled} btnType={"Danger"}>CANCEL</Button>
        </Auxiliary>
      );
    }

}

export default OrderSummary;

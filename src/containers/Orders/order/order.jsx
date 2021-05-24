import React from "react";
import Auxiliary from "../../../hoc/auxiliary";
import Order from "../../../components/CheckoutOrder/order/order";
import ContextObj from "../../../context/context";
import {connect} from "react-redux";

class MapOrder extends React.PureComponent{

  static contextType = ContextObj;

  handleDelete = (id) => {

    this.context.onDelete(id, this.props.orders);

  }


  render(){
    return(
            <Auxiliary>
            {this.props.orders.map((order, index) => {
                          return <Order key={index}
                                        ingredients={order.ingredients}
                                        price={order.price}
                                        onDelete={this.handleDelete}
                                        id={order.id}/>})}
            </Auxiliary>
    );
  };

}

const mapStateToProps = (state) =>{
  return{
    orders: state.order.orders,
  };
}


export default  connect(mapStateToProps)(MapOrder);

import React from "react";
import Auxiliary from "../../hoc/auxiliary";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/spinner";
import MapOrder from "./order/order";
import ContextObj from "../../context/context";
//import {Redirect} from "react-router-dom";

class Orders extends React.PureComponent{

  constructor(props){
    super(props);
    this.state={
      orders: [],
      loading: true
    }
  }

  componentDidMount(){
    // axios.get("/orders.json")
    //      .then(res => {
    //         const fetchOrders= [];
    //         for (let key in res.data){
    //           fetchOrders.push({
    //                             ...res.data[key],
    //                             id: key});
    //         }
    //         this.setState({loading: false, orders:fetchOrders});
    //      })
    //      .catch(err => {
    //         this.setState({loading: false});
    //      });
    setTimeout(() => {
      if (this.props.token && this.props.userId) {
        this.props.onFetch(this.props.token, this.props.userId); //using thunk
      }
    }, 1);
  }

  render(){
    let order = <MapOrder/>;
    if (this.props.loading) {
      order = <Spinner/>;
      //order = <Redirect to="/"/>;
    }

    // if (this.props.error) {
    //   order = (<div>
    //               <h3 style={{textAlign: "center"}}>Could not fetching order!</h3><br/>
    //               <h2 style={{textAlign: "center"}}>Please Login!</h2>
    //           </div>);
    // }

    if (!this.props.token && !this.props.userId) {
       order = (<div>
                   <h3 style={{textAlign: "center"}}>Could not fetching order!</h3><br/>
                   <h2 style={{textAlign: "center"}}>Please Login!</h2>
               </div>);
    }


    return(
            <Auxiliary>
              <ContextObj.Provider value={{orders: this.props.orders,
                                           onDelete: this.props.onDelete}}>
                {order}
              </ContextObj.Provider>
            </Auxiliary>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    loading : state.order.loading,
    orders: state.order.orders,
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.order.error
  };
}

const mapActionsToProps = (dispatch) => {
  return{
    onFetch: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    onDelete: (id, data) => dispatch(actions.deleteOrder(id, data)),
  }
}

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(Orders, axios));

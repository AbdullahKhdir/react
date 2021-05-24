import React from "react";
import CheckoutSummary from "../../components/CheckoutOrder/checkoutSummary/checkoutSummary";
import Contactdata from "./ContactData/contactData";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
//import * as actions from "../../store/actions/index";
//import Spinner from "../../components/UI/Spinner/spinner";

class Checkout extends React.PureComponent{

  constructor(props){
      super(props);
      this.state={
          ingredients:{
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0
          },
          price : 0
      }
    }

    componentDidMount(){
      const getParams = new URLSearchParams(this.props.location.search);
      const ingredients = {};
      let price = 0;
      for (let param of getParams.entries()) {
        if (param[0] === "price") {
          price = param[1];
          this.setState({price: price});
        }else {
          ingredients[param[0]]= +param[1];  //+param[] parse to integer
          if (this.state.ingredients !== ingredients) {
            this.setState({ingredients: ingredients});
          }
        }
      }

    }

    checkoutContinue = () => {
      this.props.history.replace('/checkoutSummary/contact-data'); //first param must be a known root url to navigate to the second
    }

    checkoutCancelled = () => {
      this.props.history.goBack();
    }

  render(){
    let   summary = (<Redirect to="/"/>) //Redirect or spinner

    if (this.props.ings) {
      let purchasedState = (this.props.purchased ? <Redirect to="/"/> : null);
        summary= (<>{purchasedState}
                    <CheckoutSummary ingredients={this.props.ings}
                                     Continued={this.checkoutContinue}
                                     CheckoutCancelled={this.checkoutCancelled}/></>);
    }else {
        //summary = (<Spinner />);
        summary = (<Redirect to="/"/>);
    }
    return(
      <div>
          {summary}
          <Route path={this.props.match.path + "/contact-data"} component={Contactdata}/> {/*with redux*/}
          {/*<Route path={this.props.match.path + "/contact-data"} render={(props)=> (<Contactdata ingredients={this.props.ingredients} price={this.props.totalPrice} {...props}/>)}/>*/} {/*without redux*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  };
}

export default connect(mapStateToProps)(Checkout);

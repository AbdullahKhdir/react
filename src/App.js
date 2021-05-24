import React from "react";
import Layout from "./containers/Layout/layout";
import BurgerBuilder from "./containers/BurgerBuilder/burgerBuilder";
import {Route, Switch, Redirect, withRouter} from "react-router-dom";
import Logout from "./containers/Auth/Logout/logout";
import {connect} from "react-redux";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

//lazy Loading CheckoutSummary
const asyncCheckoutSummary = asyncComponent(() => {
  return import("./containers/Checkout/checkout");
});

//lazy Loading Orders
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/orders");
});

//lazy Loading Auth
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/auth");
});

class App extends React.PureComponent{

  componentDidMount(){
    this.props.onTryAutoSignIn();
  }
  
  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/burgerBuilder" component={BurgerBuilder}/>
            <Route path="/checkoutSummary" component={asyncCheckoutSummary}/>
            <Route path="/orders" component={asyncOrders}/>
            <Route path="/auth" component={asyncAuth}/>
            <Route path="/logout" component={Logout}/>
            <Redirect exact from="/" to="/burgerBuilder" />
            <Route  render={()=>{return(<h1 style={{textAlign: "center"}}>NOT FOUND!</h1>)}}/>
          </Switch>
         </Layout>
      </div>
    );
  }
}

const mapActionsToProps = (dispatch) => {
  return{
    onTryAutoSignIn: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(null, mapActionsToProps)(App));

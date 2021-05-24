import React from "react";
import Auxilariy from "../../hoc/auxiliary";
import classes from "./layout.module.css";
import Toolbar from "../../components/Navigation/ToolBar/toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/sideDrawer";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders.js";

class Layout extends React.PureComponent{

    constructor(props){
      super(props);
      this.state={
        showSideDrawer: false
      }
    }

    sideDrawerClosedHandler = () =>{
      this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () =>{

      this.setState(function(prevState){
          return {showSideDrawer: !prevState.showSideDrawer};
      })
    }

    render(){
      return(
        <Auxilariy>
          <Toolbar isAuth={this.props.isAuth}
                   toggleSideDrawer={this.sideDrawerToggleHandler}/>
          <SideDrawer showState={this.state.showSideDrawer}
                      closed={this.sideDrawerClosedHandler}
                      isAuth={this.props.isAuth}/>
          <main className={classes.Content}>
            {this.props.children}
          </main>
        </Auxilariy>
      );
    }
}

const mapStateToProps = (state) =>{
  return{
    isAuth: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(withErrorHandler(Layout, axios));

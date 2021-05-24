import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../../store/actions/index";


class Logout extends React.PureComponent{

  componentDidMount(){
    this.props.onLogout();

  }

  render(){
      return <Redirect to="/"/>;
  }
}


const mapActionsToProps = (dispatch) => {
  return{
    onLogout: () => dispatch(logout()),
  }
}

export default connect(null, mapActionsToProps)(Logout);

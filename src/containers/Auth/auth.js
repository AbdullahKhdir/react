import React from "react";
import {Redirect} from "react-router-dom";
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";
import WithErrHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import axios from "../../axios-orders";
import classes from "./auth.module.css";
import {Notify} from "../../components/UI/Notification/notification";
import * as actions from "../../store/actions/auth";
import * as actionsIndex from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/spinner";

class Auth extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
        controls: {
          email: {
              elementType: "input",
              elementConfig: {
                  type: "email",
                  placeholder: "Email Address",
              },
              value: "",
              validation: {
                  required: false,
                  isEmail: true
              },
              valid: true,
              touched: false
          },
          password: {
              elementType: "input",
              elementConfig: {
                  type: "password",
                  placeholder: "Password"
              },
              value: "",
              validation: {
                  required: true,
                  minLength: 6
              },
              valid: true,
              touched: false
          }
        },
        element: "",
        notify: false,
        msg: "",
        isSignup: true
    }
  }

  checkValidity(value, rules) {
      let isValid = true;
      if (!rules) {
          return true;
      }

      if (rules.required) {
          isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
          isValid = value.length >= rules.minLength && isValid
      }

      if (rules.maxLength) {
          isValid = value.length <= rules.maxLength && isValid
      }

      if (rules.isEmail) {
          const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
          isValid = pattern.test(value) && isValid
      }

      if (rules.isNumeric) {
          const pattern = /^\d+$/;
          isValid = pattern.test(value) && isValid
      }

      return isValid;
  }
  inputChangedHandler = (event) => {
        const updatedControls = {
            ...this.state.controls,
            [event.target.name]: {
                ...this.state.controls[event.target.name],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[event.target.name].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }
  handleOnSubmit = (event) => {
    event.preventDefault()
    if (!this.state.controls.email.valid ||
        this.state.controls.email.value === ""){
        this.props.notifyEmail(true, "Please insert an email address!");
          setTimeout(()=>{
            this.props.notifyEmail(false, "");
          }, 3000);
    }else if (!this.state.controls.password.valid ||
         this.state.controls.password.value === ""){
      this.props.notifyPassword(true, "Please insert a at least 6 digits password!");
        setTimeout(()=>{
          this.props.notifyPassword(false, "");
        }, 3000);
    }else{
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
  }
  switchAuthMode = () => {
    this.setState(prevState => {
      return{
        isSignup: !prevState.isSignup,
        controls:{
            email: {
                elementConfig: {
                    type: "email",
                    placeholder: "Email Address",
                },
                value: "",
                validation: {
                    required: false,
                    isEmail: true
                },
                valid: true,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: true,
                touched: false
            }
        }
      }
    });
  }

  componentDidMount(){
    if(this.props.isAuth && this.props.building)
    {
        this.props.authBuild();
    }
  }

  render(){
    const formElementsArray = [];
    for ( let key in this.state.controls ) {
            formElementsArray.push( {
                name: key,
                config: this.state.controls[key]
            });
        }
    let form = formElementsArray.map((formElement,index) => (
            <Input
                key={index}
                name={formElement.name}
                placeholder={formElement.config.elementConfig.placeholder}
                type={formElement.config.elementConfig.type}
                value={formElement.config.value}
                shouldvalidate={formElement.config.validation}
                onChange={(event) => this.inputChangedHandler(event, formElement.name)}/>
        ));

    let notify = (<Notify msg={this.props.msg}/>);

    if (this.props.loading) {
      form = (<Spinner/>);
    }

    let errMsg = null;
    if (this.props.error) {
      errMsg = (<p>{this.props.error.message}</p>);
    }

    let auth= "";

    if (this.props.isAuth && (!this.props.building && this.props.authBuild)) {
      if (this.props.resetNotify) {
        auth = (<Redirect to="/checkoutSummary/contact-data"/>);
      }else {
        auth = <Redirect to="/"/>;
      }
    }

    if(this.props.isAuth && this.props.building)
    {
        //this.props.authBuild();
        if (this.props.resetNotify) {
          auth = (<Redirect to="/checkoutSummary/contact-data"/>);
        }
    }

    if (this.props.isAuth && !this.props.authBuild && this.props.building) {
      auth = (<Redirect to="/checkoutSummary/contact-data"/>);
    }


    return(
      <div className={classes.Auth}>
          {auth}
          {errMsg}
          <form onSubmit={this.handleOnSubmit}>
            {form}
          </form>
          <Button btnType="Success" clicked={this.handleOnSubmit}>Submit</Button>
          <Button btnType="Danger" clicked={this.switchAuthMode}>
          Switch To {this.state.isSignup ? "Sign In" : "Sign Up"}</Button>
          {this.props.notify && notify}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    msg: state.auth.msg,
    notify: state.auth.notify,
    loading : state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.order.building,
    resetNotify: state.auth.resetNotify
  }
}

const mapActionsToProps = (dispatch) => {
  return{
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    setNotify: (bool) => dispatch({type: "setNotify", payload: bool}),
    notifyEmail: (bool, msg) => dispatch({type:"notifyEmail", bool: bool, msg: msg}),
    notifyPassword: (bool, msg) => dispatch({type:"notifyPassword", bool: bool, msg: msg}),
    onBuildStart: () => dispatch(actionsIndex.buildStart()),
    onBuildDone: () => dispatch(actionsIndex.buildDone()),
    authBuild : () => dispatch({type:"authBuild"}),
    UnresetNotify: () => dispatch({type:"UnresetNotify"})
  }
}


export default connect(mapStateToProps, mapActionsToProps)(WithErrHandler(Auth, axios));

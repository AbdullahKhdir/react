import React from "react";
import Button from "../../../components/UI/Button/button";
import classes from "./contactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/spinner";
import Input from "../../../components/UI/Input/input";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";


class Contactdata extends React.PureComponent{
  state={
    name: "",
    email: "",
    street: "",
    strNr: "",
    postalCode: "",
    city: "",
    country: "",
    phoneNr: "",
    deliveryNotes: "Fastest",
    loading : false
  }

  handleSubmit = () =>{
    this.setState({loading: true});
    const order = {
        ingredients: this.props.ings,
        price: Number.parseFloat(this.props.totalPrice).toFixed(2),
        customer:{
          name: this.state.name,
          email: this.state.email,
          phoneNr: this.state.phoneNr,
          address: {
            street: this.state.street,
            strNr: this.state.strNr,
            zipCode: this.state.postalCode,
            city: this.state.city,
            country: this.state.country
          },
          deliveryMethode: this.state.deliveryNotes
        },
        userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token);

    if (this.props.building) {
      //this.props.onBuilding(order);
      this.props.onBuildDone();
    }
    //fireBase BE
    // axios.post("/orders.json", order)
    //      .then(repsonse => {
    //       this.setState({loading: false});
    //       this.props.history.push("/"); //either wrappig with withRouther from react-router-dom or passing the props {...props} in the hoc
    //      }).catch(err => {
    //       this.setState({loading: false});
    //      });
  }

  handleChange = (event) => {
    //const [name, value] = event.target;
    this.setState(function(prevArr){
      return {...prevArr, [event.target.name]: event.target.value};
     });
  }

  componentDidMount(){
    if (!this.props.token) {
        this.props.onBuildStart();
    }else {
      this.props.onBuildDone();
    }

  }

  render(){
    let form = (<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                  <Input inputtype="input"  onChange={this.handleChange} type="text"   name="name"       value={this.state.name}       placeholder="Name" required/>
                  <Input inputtype="input"  onChange={this.handleChange} type="email"  name="email"      value={this.state.email}      placeholder="Email" required/>
                  <input inputtype="input"  onChange={this.handleChange} type="text"   name="street"     value={this.state.street}     placeholder="Street" required className={classes.Str}/>
                  <input inputtype="input"  onChange={this.handleChange} type="text"   name="strNr"      value={this.state.strNr}     placeholder="Nr" required className={classes.Nr} />
                  <Input inputtype="input"  onChange={this.handleChange} type="text"   name="postalCode" value={this.state.postalCode} placeholder="Postalcode" required/>
                  <Input inputtype="input"  onChange={this.handleChange} type="text"   name="city"       value={this.state.city}       placeholder="City" required/>
                  <Input inputtype="input"  onChange={this.handleChange} type="text"   name="country"    value={this.state.country}    placeholder="Country" required/>
                  <Input inputtype="input"  onChange={this.handleChange} type="number" name="phoneNr"    value={this.state.phoneNr}    placeholder="Phone Number" />
                  <Input inputtype="select" onChange={this.handleChange} name="deliveryNotes" value={this.state.deliveryNotes} />
                  <Button btnType="Success" > ORDER </Button>
                </form>);

    if (this.props.loading) {
         form = <Spinner />;
    }

    if (!this.props.token) {
        //this.props.onBuildStart();
      if (this.props.authBuild){
        setTimeout(() => {
          form=(<Redirect to="/auth"/>); //dispatch the routing and what has been build.
        }, 1000);
      }
    }else {
      //this.props.onBuildDone();
    }

    return(
      <div className={classes.Contactdata}>
          <h4>Enter your Contact Data!</h4>
          {this.props.building ? <Redirect to="/auth"/> : form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading : state.order.loading,
    token : state.auth.token,
    building: state.order.building,
    authBuild: state.auth.authBuild,
    resetNotify: state.auth.resetNotify,
    userId: state.auth.userId,
  };
}

const mapActionsToProps = (dispatch) => {
  return{
    onOrderBurger: (data, token) => dispatch(actions.purchaseBurger(data, token)),
    onBuildStart: () => dispatch(actions.buildStart()),
    onBuildDone:  () => dispatch(actions.buildDone()),
    UnresetNotify: () => dispatch({type:"UnresetNotify"})
  };
}
export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(Contactdata, axios));






/*    let form = (<form onChange={this.handleChange} onSubmit={(event) => {event.preventDefault()}}>
                  <input className={classes.Lineup} onChange={this.handleChange} type="text" name="name" value={this.state.name} placeholder="Name"></input>
                  <input className={classes.Lineup} onChange={this.handleChange} type="email" name="email" value={this.state.email} placeholder="Email"></input>
                  <input className={classes.Str} onChange={this.handleChange} type="text" name="street" value={this.state.street} placeholder="Street"></input>
                  <input className={classes.Nr} type="text" name="strNr" placeholder="Nr"></input>
                  <input className={classes.Lineup} onChange={this.handleChange} type="text" name="postalCode" value={this.state.postalCode} placeholder="Postalcode"></input>
                  <input className={classes.Lineup} onChange={this.handleChange} type="text" name="city" value={this.state.city} placeholder="City"></input>
                  <input className={classes.Lineup} onChange={this.handleChange} type="text" name="country" value={this.state.country} placeholder="Country"></input>
                  <input className={classes.Lineup} onChange={this.handleChange} type="number" name="phoneNr" value={this.state.phoneNr} placeholder="Phone Number"></input>
                  <input className={classes.Lineup} onChange={this.handleChange} type="text" name="deliveryNotes" value={this.state.deliveryNotes}></input>
                  <Button btnType="Success" clicked={this.handleSubmit} > ORDER </Button>
                </form>);
*/

import React from "react";
import Auxiliary from "../../hoc/auxiliary";
import Burger from "../../components/Burger/burger";
import BuildControlls from "../../components/BuildControlls/buildControlls";
import ContextObj from "../../context/context";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/spinner";
import ErrHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actionTypes from "../../store/actions/constants";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";


const INGREDIENTS_PRICES={
  salad: 1.5,
  cheese: 2.5,
  bacon: 2.8,
  meat: 2.5
}

export class BurgerBuilder extends React.PureComponent{
  constructor(props){
      super(props);
      this.state={
          ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
          }, //{salad: 0, bacon: 0, cheese: 0, meat: 0}
          totalPrice: 4,
          purchased: false,
          purchasing: false,
          loading: false,
          offerChanged: false,
          salad: "salad",
          bacon: "bacon",
          cheese: "cheese",
          meat: "meat",
      }
  }


  componentDidMount(){ //Fetch Offer Burger with .80 Cent offer
      if (this.props.resetNotify) {
        this.props.UnresetNotify();
      }
      axios.get("https://myburger-backend-b503e-default-rtdb.firebaseio.com/ingredients.json")
           .then( res =>{
            // this.setState({ingredients: res.data});
            // this.calIngredientsPrice(this.state.ingredients);
            // this.updatePurchaseState(this.state.ingredients);
            this.props.onSyncFetch(res.data); //fetch without thunk syncCode
          })
          .catch(err => {
            console.log("error:", err);
          });
          //this.props.onInitIngredients(); //fetch asynceCode with thunk
  }

  calIngredientsPrice = (ingredients) =>{

    const sum = Object.keys(ingredients)
                .map(igName => {
                    return INGREDIENTS_PRICES[igName] * ingredients[igName] // prices of ingredients
                }).reduce((sum, currentElement) =>{
                    return sum + currentElement
                }, 4); //initialValue price without ingredients

    this.setState({totalPrice: sum});
  }

  updatePurchaseState = (ingredients) =>{
    //const ingredients = {...this.state.ingredients}; //to edit immutable
    if (ingredients) {
    const sum = Object.keys(ingredients)
                .map(igName => {
                  return ingredients[igName] // values of ingredients
                }).reduce((sum, currentElement) =>{
                  return sum + currentElement
                }, 0);
    // this.setState({
    //   purchased: sum > 0
    // });
    return sum > 0;
    }
  }

  onAdd = (type) =>{
    this.setState({offerChanged: true});

    const oldCount = this.state.ingredients[type]; //4
    const updatedCount = oldCount + 1; //5
    let ingredients = {...this.state.ingredients};  //copy on ingredientsArray
    ingredients[type] = updatedCount;

    const ingredientsAddedPrice = INGREDIENTS_PRICES[type];
    let totalPrice = this.state.totalPrice; //4
    totalPrice = totalPrice + ingredientsAddedPrice + .2; //6 + extra charge for each ingredient

    /*this.setState((prevArr) => {
      return {...prevArr, ingredients, totalPrice};
    });*/

    this.setState({
      ingredients: ingredients,
      totalPrice: totalPrice
    });
    this.updatePurchaseState(ingredients);
  }

  onRemove = (type) =>{
      if (!this.state.offerChanged) {
        const oldCount = this.state.ingredients[type]; //4
        const updatedCount = oldCount - 1; //5
        let ingredients = {...this.state.ingredients};  //copy on ingredientsArray
        ingredients[type] = updatedCount;

        const ingredientsAddedPrice = INGREDIENTS_PRICES[type];
        let totalPrice = this.state.totalPrice; //4
        totalPrice = totalPrice - ingredientsAddedPrice ; //6

        this.setState((prevArr) => {
          return {...prevArr, ingredients, totalPrice};
        });
        this.updatePurchaseState(ingredients);
    }else {
      const oldCount = this.state.ingredients[type]; //4
      const updatedCount = oldCount - 1; //5
      let ingredients = {...this.state.ingredients};  //copy on ingredientsArray
      ingredients[type] = updatedCount;

      const ingredientsAddedPrice = INGREDIENTS_PRICES[type];
      let totalPrice = this.state.totalPrice; //4
      totalPrice = totalPrice - ingredientsAddedPrice - .2; //6
      if (totalPrice < 4) {
        totalPrice = 4;
      }
      this.setState((prevArr) => {
        return {...prevArr, ingredients, totalPrice};
      });
      this.updatePurchaseState(ingredients);
    }
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
      this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
      // this.setState({loading: true});
      // //alert("YOU CONTINUE!");
      // const order = {
      //   ingredients: this.state.ingredients,
      //   price: this.state.totalPrice.toFixed(2), //must be calculated on the server
      //   customer: {
      //     name: "Abdullah",
      //     address: {
      //       street: "Str.29",
      //       zipCode: "90510",
      //       country: "DE",
      //     },
      //     email: "email@gg.live",
      //   },
      //   deliveryMethode: "fastest"
      // }
      //
      // //fireBase BE
      // axios.post("/orders.json", order)
      //      .then(repsonse => {
      //       this.setState({loading: false, purchasing: false});
      //      }).catch(err => {
      //       this.setState({loading: false, purchasing: false});
      //      });
      // console.log(this.props);
      this.props.onInitPurchased();
      const price = this.state.totalPrice;
      const queryParams = [];
      for (var variable in this.state.ingredients) {
          queryParams.push(encodeURIComponent(variable) + "=" + encodeURIComponent(this.state.ingredients[variable]));
      }
      queryParams.push("price=" + price);
      const queryString = queryParams.join("&");
      this.props.history.push({
        pathname: "/checkoutSummary/ingredients",
        search: "?" + queryString
      });
  }

  render(){

    return(
        <Auxiliary>
          {this.props.error ? <Spinner/> : <>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {this.state.loading ? <>
                <Spinner/>
                                      </>
                                       :
                                       <>
                 <OrderSummary ingredients={this.props.ingredients}
                               continue={this.purchaseContinueHandler}
                               canceled={this.purchaseCancelHandler}
                               price={this.props.totalPrice}/>
                                       </>}
            </Modal>
            <ContextObj.Provider value={{ingredients: this.props.ingredients,
                                          totalPrice: this.props.totalPrice,
                                          purchased: this.state.purchased}}>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControlls onAdd={this.props.onAdd}
                                onRemove={this.props.onRemove}
                                /*purchased={this.state.purchased}*/
                                purchased={this.updatePurchaseState(this.props.ingredients)}
                                orderClicked={this.purchaseHandler}/>
            </ContextObj.Provider>
            </>}
        </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    IngsOrderNr: state.burgerBuilder.IngsOrderNr,
    resetNotify: state.auth.resetNotify,
  };
}

const mapActionsToProps = (dispatch) => {
  return{
    onInput: () => dispatch({type: "onInput"}),
    onSyncFetch: (data) => dispatch({type:"syncFetch", payload: data}),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onAdd: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onRemove: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, payload: ingredientName}),
    onInitPurchased : () => dispatch(actions.purchaseInit()),
    UnresetNotify: () => dispatch({type:"UnresetNotify"}),
  };
}


export default connect(mapStateToProps, mapActionsToProps)(ErrHandler(BurgerBuilder, axios));

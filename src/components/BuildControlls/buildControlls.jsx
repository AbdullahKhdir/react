import React from "react";
import classes from "./buildControlls.module.css";
import BuildControll from "./BuildControll/buildControll";
import ContextObj from "../../context/context";

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
];

function BuildControlls(props){

  const context = React.useContext(ContextObj);
  return(
    <div className={classes.BuildControlls}>
      <p>Current Price: <strong>{context.totalPrice.toFixed(2)} $</strong></p>
        {controls.map((element, index) => {
         return context.ingredients[element.type] === 0 ?
                                          <div key={index}>
                           <BuildControll label={element.label}
                                          added={() => props.onAdd(element.type)}
                                          removed={() => props.onRemove(element.type)}
                                          disabled={true}
                                          setIngOrder={props.setIngOrderNr}/>
                                          </div>
                                          :
                                          <div key={index}>
                           <BuildControll label={element.label}
                                          added={() => props.onAdd(element.type)}
                                          removed={() => props.onRemove(element.type)}
                                          disabled={false}
                                          setIngOrder={props.setIngOrderNr}
                                          handleChange={props.onInputChange}/>
                                          </div>})}
    <button className={classes.OrderButton}
            disabled={!props.purchased}
            onClick={props.orderClicked}>ORDER NOW</button>

    </div>
  );
}



export default BuildControlls;

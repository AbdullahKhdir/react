import React from "react";
import classes from "./drawerToggle.module.css";

export default function DrawerToggler(props){

  return(
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

}

// <img style={{width:"60%",
//              marginTop:"10px",
//              boxSizing: "border-box"}}
//      alt="Menu"
//      src={props.setSrc}
//      onClick={props.clicked} />

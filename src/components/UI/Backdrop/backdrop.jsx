import React from "react";
import classes from "./backdrop.module.css";

export default function BackDrop(props){

  return(
    props.show ? <div className={classes.BackDrop} onClick={props.clicked}></div> : null
  );
}

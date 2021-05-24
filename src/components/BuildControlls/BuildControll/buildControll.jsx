import React from "react";
import classes from "./buildControll.module.css";

const BuildControll = props => {
  return(
    <div className={classes.BuildControl}>
      <div className={classes.Label}> {props.label} </div>
      <button className={classes.More}
              onClick={props.added}>
              More
      </button>
      <button className={classes.Less}
              onClick={props.removed}
              disabled={props.disabled}>
              Less
      </button>
    </div>
  );
}

export default BuildControll;

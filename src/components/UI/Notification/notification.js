import React from "react";
import classes from "./notification.module.css";

export const Notify = (props) => {
  return(
    <div className={classes.FixedDiv}>
          <h3 className={classes.Notify}>
              {props.msg}
          </h3>
    </div>
  )
}

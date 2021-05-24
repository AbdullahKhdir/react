import React from "react";
import classes from "./sideDrawer.module.css";
import Logo from "../../Logo/logo";
import NavItems from "../NavItems/navItems";
import BackDrop from "../../UI/Backdrop/backdrop";
import Auxiliary from "../../../hoc/auxiliary";

export default function SideDrawer(props){

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.showState) {
      attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return(
    <Auxiliary>
      <BackDrop show={props.showState} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
          <Logo height="11%"/>
          <hr style={{backgroundColor: "#8F5C2C" ,borderBottom: "1px solid #40A4C8", width:"100%"}}/>
          <nav>
            <NavItems isAuth={props.isAuth}/>
          </nav>
      </div>
    </Auxiliary>
  );
}

import React from "react";
import NavItem from "../NavItem/navItem";
import classes from "./navItems.module.css"

export default function NavItems(props){

  return(
      <ul className={classes.NavItems}>
          <NavItem exact link="/burgerBuilder">Burger Builder</NavItem>
          {props.isAuth ? <>
                          <NavItem link="/orders">Orders</NavItem>
                          </>: null}
          {props.isAuth ?  <>
                           <NavItem link="/logout">Logout</NavItem>
                           </> :
                           <>
                           <NavItem link="/auth">Authenticate</NavItem>
                           </>}
      </ul>
  );
}

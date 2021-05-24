import React from "react";
import classes from "./toolbar.module.css";
import Logo from "../../Logo/logo";
import NavItems from "../NavItems/navItems";
//import MenuIcon from "../../../assets/images/burger-logo2.png";
import DrawerToggler from "../SideDrawer/DrawerToggle/drawerToggle";

export default function Toolbar(props){
    return(
      <header className={classes.Toolbar}>
          {/*setSrc={MenuIcon}*/}
          <DrawerToggler
                clicked={props.toggleSideDrawer}/>
          <Logo height="80%"/>
          <nav className={classes.DesktopOnly}>
              <NavItems isAuth={props.isAuth}/>
          </nav>
      </header>
    );
}

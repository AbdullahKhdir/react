 import React from "react";
import classes from "./modal.module.css";
import Auxiliary from "../../../hoc/auxiliary";
import BackDrop from "../Backdrop/backdrop";

// class-component to optimize performance with life cycle methods

class Modal extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
      if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
        return true;
      }else {
        return false;
      } //or
//      return nextProps.show !== this.props.show;
  }

  componentDidUpdate(){
    //console.log("[Modal.jsx] didUpdate"); //uncomment to test for performance optimization
  }

  render(){
    return(
      <Auxiliary>
        <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div className={classes.Modal}
             style={{transform: this.props.show ? "translateY(0)": "translateY(-100vh)",
                     opacity: this.props.show ? "1" : "0"}}>
            {this.props.children}
        </div>
      </Auxiliary>
    );
  }
}


 export default Modal;

/*import classes from "./modal.module.css";
import Auxiliary from "../../../hoc/auxiliary";
import BackDrop from "../Backdrop/backdrop";

//functional-component to optimize performance with life cycle methods
const Modal = React.memo((props) => {

    return(
      <Auxiliary>
        <BackDrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
             style={{transform: props.show ? "translateY(0)": "translateY(-100vh)",
                     opacity: props.show ? "1" : "0"}}>
            {props.children}
        </div>
      </Auxiliary>
    );
}, (prevProps, nextProps) => { /* <---- shouldComponentUpdate(){}  */
//                             if (nextProps.show !== prevProps.show) {
//                               return true;
//                             }else {
//                               return false;
//                             } //or
//                       //      return nextProps.show !== this.props.show;
//                     });
//
//
// export default Modal;

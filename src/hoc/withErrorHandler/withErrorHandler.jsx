import React from "react";
import Modal from "../../components/UI/Modal/modal";
import Auxiliary from "../auxiliary";

//Err Handle


const HandleErr = (WrappedComponent, axios) => {
   return class extends React.PureComponent{

    state={
      error: null
    }

    UNSAFE_componentWillMount(){ //before rendering  (useEffect)
      this.reqInterceptor = axios.interceptors.request.use(req =>{
                            this.setState({error: null});
                            return req;
                          });

      this.resInterceptor = axios.interceptors.response.use(res => res, err =>{
                              this.setState({error: err.message});
                            });
    }

    componentWillUnmount(){//return in useEffect
        axios.interceptors.request.eject(this.reqInterceptor);  //to prevet memory leaks
        axios.interceptors.response.eject(this.resInterceptor); //to prevet memory leaks
    }


    errConfirmedHandler = () => {
      this.setState({error: null});
    }

    render(){
      return (
          <Auxiliary>
            <Modal show={this.state.error} modalClosed={this.errConfirmedHandler}>
              {this.state.error ? this.state.error: null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Auxiliary>
        );
    }
  }
}
export default HandleErr;

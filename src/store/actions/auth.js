import * as actionTypes from "./constants";
import axios from "axios";

export const authStart = () => {
    return{
      type: actionTypes.AUTH_START,
    };
}
export const authSuccess = (token, userId) => {
    return{
      type: actionTypes.AUTH_SUCCESS,
      token: token,
      userId: userId
    };
}
export const authFail = (err) => {
    return{
      type: actionTypes.AUTH_FAIL,
      error: err
    };
}
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return{
    type: actionTypes.AUTH_LOGOUT
  }
}
export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  }
}
export const resetNotify = () => {
  return {
    type: "resetNotify",
  };
}
export const resetNotifyErr = () => {
  return {
    type: "resetNotifyErr",
  };
}
export const signedInSuccessfuly = () => {
  return{
    type: "SignedInSuccessfuly"
  }
}
export const signedInFaild = (err) => {
  return{
    type: "SignedInFaild",
    error: err
  }
}
export const signedUpSuccessfuly = () => {
  return{
    type: "SignedUpSuccessfuly"
  }
}
export const signedUpFaild = (err) => {
  return{
    type: "SignedUpFaild",
    error: err
  }
}
export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGc99xkipmCuNPg8DK674NkSC8bqqCbMs";

    if (!isSignup) {//SignIn
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGc99xkipmCuNPg8DK674NkSC8bqqCbMs";
      axios.post(url, authData)
           .then(res => {
              localStorage.setItem("token", res.data.idToken);
              const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
              localStorage.setItem("expirationTime", expirationTime);
              localStorage.setItem("userId", res.data.localId);
              dispatch(authSuccess(res.data.idToken, res.data.localId));
              dispatch(signedInSuccessfuly());
              dispatch(checkAuthTimeout(res.data.expiresIn));
              setTimeout(() => {
                dispatch(resetNotify());
              }, 3000);
           })
           .catch(err => {
            dispatch(authFail(err));
            dispatch(signedInFaild(err.response.data.error));
            setTimeout(()=>{
              dispatch(resetNotifyErr());
            }, 3000);
           });
    }else {//SignUp
      axios.post(url, authData)
           .then(res => {
              localStorage.setItem("token", res.data.idToken);
              const expirationTime = new Date(new Date().getTime() + res.data.expiresIn * 1000);
              localStorage.setItem("expirationTime", expirationTime);
              localStorage.setItem("userId", res.data.localId);
              dispatch(authSuccess(res.data.idToken, res.data.localId));
              dispatch(signedUpSuccessfuly());
              dispatch(checkAuthTimeout(res.data.expiresIn));
              setTimeout(() => {
                dispatch(resetNotify());
              }, 3000);
           })
           .catch(err => {
            dispatch(authFail(err));
            dispatch(signedUpFaild(err.response.data.error));
            setTimeout(()=>{
              dispatch(resetNotifyErr());
            }, 3000);
           });
    }
  }
}
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    }else {
      const expirationTime = new Date(localStorage.getItem("expirationTime"));
      if (expirationTime <= new Date()) {
        dispatch(logout());
      }else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout( (expirationTime.getTime() - new Date().getTime()) / 1000 ));
      }
    }
  };
}
//-------------------------------------------

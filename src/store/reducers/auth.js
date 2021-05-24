import * as actionTypes from "../actions/constants";
import {updateObj} from "../utility";

const initState = {
  notify: false,
  msg: "",
  token: null,
  userId: null,
  error: null,
  loading: false,
  authBuild: true,
  resetNotify: false
}

const authStart = (state, action) => {
  return updateObj(state, {error: null, loading: true});
}
const authSuccess = (state, action) => {
  return updateObj(state, {
                            error: null,
                            loading: false,
                            token: action.token,
                            userId: action.userId
                          });
}
const authFail = (state, action) => {
  return updateObj(state, {error: action.error,
                           loading: false
                         });
}
const authLogout = (state, action) =>{
  return updateObj(state, {
      token: null,
      userId: null
  });
}

const reducer = (state = initState, action) => {

  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);

    case "logout":
    return{
      ...state,
      token: null,
      userId: null,
      authBuild: true
    }

    case "SignedInSuccessfuly":
    return{
      ...state,
      notify: true,
      msg: "Logged in successfuly!"
    }

    case "SignedInFaild":
    return{
      ...state,
      notify: true,
      msg: "couldn't login, please try again!",
      error: action.error,
      loading: false
    }

    case "SignedUpSuccessfuly":
    return{
      ...state,
      notify: true,
      msg: "Signed up successfuly!"
    }

    case "SignedUpFaild":
    return{
      ...state,
      notify: true,
      msg: "Account already exists!",
      error: action.error,
      loading: false
    }

    case "resetNotify":
    return{
      ...state,
      notify: false,
      msg: "",
      resetNotify: true,
    }

    case "resetNotifyErr":
    return{
      ...state,
      notify: false,
      msg: "",
    }

    case "UnresetNotify":
    return{
      ...state,
      resetNotify: false,
    }

    case "setNotify":
    return{
      ...state,
      notify: action.payload,
    }

    case "notifyEmail":
    return{
      ...state,
      notify: action.bool,
      msg: action.msg
    }

    case "notifyPassword":
    return{
      ...state,
      notify: action.bool,
      msg: action.msg
    }

    case "authBuild":
    return{
      ...state,
      authBuild: false
    }

    default:
      return state;
  }
}


export default reducer;

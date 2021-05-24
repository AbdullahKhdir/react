import reducer from "./auth";
import * as actionTypes from "../actions/constants";

describe("auth reducer", ()=>{
  it("should return the initial state!", ()=>{
    expect(reducer(undefined, {})).toEqual({
      notify: false,
      msg: "",
      token: null,
      userId: null,
      error: null,
      loading: false,
      authBuild: true,
      resetNotify: false
    });
  });

  it("should store the token uppon login!", ()=>{
    expect(reducer({
      notify: false,
      msg: "",
      token: null,
      userId: null,
      error: null,
      loading: false,
      authBuild: true,
      resetNotify: false
    }, {type: actionTypes.AUTH_SUCCESS, token: "some-token", userId:"some-id"}))
      .toEqual({
      notify: false,
      msg: "",
      token: "some-token",
      userId: "some-id",
      error: null,
      loading: false,
      authBuild: true,
      resetNotify: false
    });
  });
});

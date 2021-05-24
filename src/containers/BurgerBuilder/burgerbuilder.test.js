import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { BurgerBuilder } from "./burgerBuilder";
import BuildControlls from "../../components/BuildControlls/buildControlls";
import Burger from "../../components/Burger/burger";

configure({adapter: new Adapter()});


describe("<BurgerBuilder/>", () => {

  let wrapper;
  beforeEach(()=>{
    wrapper= shallow(<BurgerBuilder onSyncFetch={()=>{}} />);
  });

  it("should render <BuildControlls/> when receiving ingredients" , ()=>{
    wrapper.setProps({ingredients: {
      salad: 0
    }});
    expect(wrapper.find(BuildControlls)).toHaveLength(1);
  });

  it("should render <Burger/> when receiving ingredients" , ()=>{
    wrapper.setProps({ingredients: {
      salad: 1,
      cheese: 1,
      meat: 1,
      bacon: 1
    }});
    expect(wrapper.find(Burger)).toHaveLength(1);
  });

});

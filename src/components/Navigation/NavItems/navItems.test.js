import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavItems from "./navItems";
import NavItem from "../NavItem/navItem";


configure({adapter: new Adapter()});

describe("<NavItems />", () => {
  let wrapper;
  beforeEach(()=>{
     wrapper = shallow(<NavItems />);
  });

  it("should render two <NavItems /> elements if not authenticated!", () => {
      expect(wrapper.find(NavItem)).toHaveLength(2);
  }); //exe one individual test

  it("should render three <NavItems /> elements if authenticated!", () => {
      //wrapper = shallow(<NavItems isAuth/>);
      wrapper.setProps({isAuth: true});
      expect(wrapper.find(NavItem)).toHaveLength(3);
  }); //exe one individual test

  it("should an exact logout button!", () => {
      wrapper.setProps({isAuth: true});
      expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true);
  }); //exe one individual test

});

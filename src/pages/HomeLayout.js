import React from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Outlet } from "react-router-dom";
// import { useGlobalContext } from "../context";

export const HomeLayout = () => {
  // const {state} = useGlobalContext();
  return (
    <div>
      <NavbarComponent />
      {/* {
        state.loggedUser ? 
        <Outlet />
        :
        "you must be loggedin to access this site"
      } */}
      <Outlet/>
    </div>
  );
};


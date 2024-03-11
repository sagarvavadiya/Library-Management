import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { useSelector, useDispatch } from "react-redux";
import { decrement } from "../../reduxStore/Reducer/counterSlice";
import { ApiCall } from "../../reduxStore/Action/action";
export default function Layout() {
  const count = useSelector((state) => state.counter.value);
  const State = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <Header logoSrc="/images/logo.svg" variant="cs_heading_color" />
      <Outlet />
      <Footer />
    </>
  );
}

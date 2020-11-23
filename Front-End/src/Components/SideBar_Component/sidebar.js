import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../Context/user_context";

import "./sidebar.css";

import Menuicon from "../../Assets/images/indor_side-2.jpg";
export default () => {
  const [val] = useContext(UserContext);
  const openNav = (ev) => {
    ev.preventDefault();
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = (ev) => {
    ev.preventDefault();
    document.getElementById("mySidenav").style.width = "0";
  };

  return (
    <div className="Nav-wraper">
      <div id="mySidenav" className="sidenav">
        <h2 className="closebtn" onClick={closeNav}>
          &times;
        </h2>
        <h5>Menu</h5>
        <ul className="navbar-nav mr-auto">
          <li onClick={closeNav}>
            <Link
              to={"/dashboard"}
              style={{ color: "black" }}
              className="nav-link"
            >
              DashBoard{" "}
            </Link>
          </li>
          {val.user.role === "admin" ? (
            <li onClick={closeNav}>
              <Link
                to={"/config"}
                style={{ color: "black" }}
                className="nav-link"
              >
                Manage Sensor
              </Link>
            </li>
          ) : (
            <></>
          )}

          {val.user.role === "admin" ? (
            <li onClick={closeNav}>
              <Link
                to={"/manage-users"}
                style={{ color: "black" }}
                className="nav-link"
              >
                Manage User
              </Link>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <p className="meue-button" onClick={openNav}>
        &#9776; Feed Me
      </p>
    </div>
  );
};

//user@mail.com
//123456

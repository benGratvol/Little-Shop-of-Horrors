import React, { useState, useContext } from "react";
import UserContext from "../../Context/user_context";

import "./login.css";
import Login_img from "../../Assets/images/indor_login.png";
import LoginView from "./login_view";

import AuthPin from "./Login_sub_comp/pinAuth";

export default () => {
  const defultState = {
    user_name: "",
    password: "",
  };
  const [postData, setPostData] = useState(defultState);

  const [, setval] = useContext(UserContext);
  const [trip_wire, setTrip_wire] = useState(0);
  const [hide_logon, setHide_logon] = useState(true);

  const Posttoserver = async (ev) => {
    ev.preventDefault();
    const post_url = "/account/login";
    try {
      const respons = await fetch(post_url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      /* not working */
      if ((await respons.status) === 500) {
        // setHide_logon(true);
      }
      /* not working */
      const jsonObj = await respons.json();
      if (jsonObj.success) {
        ///--------------------------------- set log in
        setHide_logon(false);
        setPostData(defultState);

        const user = jsonObj.user;
        const token = jsonObj.token;
        setval({ user: user, token: token });
        ///--------------------------------- End set log in
      } else {
        if (trip_wire === 3) {
          const url = `/regein/update`;
          const resposns = await fetch(url);
          console.log(resposns.json());
        } else {
          setTrip_wire(trip_wire + 1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ValueChange = (ev) => {
    setPostData({ ...postData, [ev.target.name]: ev.target.value });
  };

  return (
    <div className="login_wraper">
      {hide_logon ? (
        <LoginView
          Posttoserver={Posttoserver}
          Login_img={Login_img}
          postData={postData}
          ValueChange={ValueChange}
        ></LoginView>
      ) : (
        <>
          {" "}
          You Suck Ass
          <AuthPin></AuthPin>
        </>
      )}
    </div>
  );
};

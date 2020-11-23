import React, { useState, useMemo } from "react";
import { Route } from "react-router-dom";

import NotificationsContext from "../../Context/notifications_context";

import SideBar from "../SideBar_Component/sidebar";
import Notifications from "../Notifications_comp/notifications";

import DbConfig from "../Config_component/db_config";
import ManageUsers from "../Manage_User_components/manageUser";
import DashBoard from "../DashBoard_conponent/dashboard";

import "./main.css";

export default () => {
  const [msg, setMsg] = useState({
    type: "Sucsses",
    body: `welcome`,
  });
  const providerMsg = useMemo(() => [msg, setMsg], [msg, setMsg]);

  return (
    <div className="mainPage_wraper">
      <h1>Little Shop Of Horrors ...!</h1>
      <NotificationsContext.Provider value={providerMsg}>
        <Notifications></Notifications>
        <SideBar></SideBar>
        <div className="pages_wraper">
          <Route exact path="/config" component={DbConfig} />
          <Route exact path="/manage-users" component={ManageUsers} />
          <Route exact path="/dashboard" component={DashBoard} />
        </div>
      </NotificationsContext.Provider>
    </div>
  );
};

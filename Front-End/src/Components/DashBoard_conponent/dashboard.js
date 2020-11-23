import React, { useState, useContext, useEffect } from "react";

import NotificationsContext from "../../Context/notifications_context";
import UserContext from "../../Context/user_context";

import network from "../../Utils/networking";
import notfi from "../../Utils/notifi_util";
import Row from "./Row_component/row";

export default () => {
  const [data, setdata] = useState("");
  const [userSensors, setUserSensors] = useState([]);
  const [val] = useContext(UserContext);
  const [, setMsg] = useContext(NotificationsContext);

  useEffect(() => {
    async function setup() {
      const url = "/config/getSensor";
      try {
        const respons = await network.useFetchPost(url, val.token, val.user);
        if (respons.success) {
          const msg = notfi.Sucsses(respons.msg);
          setMsg(msg);
          setUserSensors(respons.data);
        } else {
          const msg = notfi.Fail(respons.msg);
          setMsg(msg);
        }
      } catch (err) {
        console.log(err);
      }
    }
    setup();
  }, []);

  return (
    <div className="slideInRight animated">
      <h3>DashBoard</h3>
      {/* <label>{data}</label> */}
      <table className="usertabil">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Sensor Name</th>
            <th>Celsius</th>
            <th>Fahrenheit</th>
          </tr>
        </thead>
        <tbody>
          {userSensors.map((val) => (
            <Row val={val}></Row>
          ))}
        </tbody>
      </table>
    </div>
  );
};

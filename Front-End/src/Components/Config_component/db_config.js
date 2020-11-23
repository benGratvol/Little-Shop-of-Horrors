import React, { useState, useContext, useEffect } from "react";

import NotificationsContext from "../../Context/notifications_context";
import UserContext from "../../Context/user_context";

//***************************************** */

import inputVal from "../../Utils/dataValedeter_util";
import network from "../../Utils/networking";
import notfi from "../../Utils/notifi_util";

import "./db_config.css";

export default () => {
  const defultState = {
    username: "",
    sensor_endpont: "",
    sensor_name: "",
  };

  const [paylode, setPaylode] = useState(defultState);
  const [val] = useContext(UserContext);
  const [, setMsg] = useContext(NotificationsContext);
  const [activeUsers, setActiveUser] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const url = "/config/getActivusers";
      try {
        const userObj = await network.useFetchWithToken(url, val.token);
        if (userObj.success) {
          const msg = notfi.Sucsses(userObj.msg);
          setMsg(msg);
          setActiveUser(userObj.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);
  const inputchange = (ev) =>
    setPaylode({ ...paylode, [ev.target.name]: ev.target.value });

  const sendProfile = async (ev) => {
    ev.preventDefault();
    const validinput = inputVal.notEmpty(paylode);
    if (!validinput.err) {
      const url = "/config/addSensor";
      try {
        const respons = await network.useFetchPost(url, val.token, paylode);
        if (respons.success) {
          setPaylode(defultState);
          const msg = notfi.Sucsses(respons.msg);
          setMsg(msg);
        } else {
          const msg = notfi.Fail(respons.msg);
          setMsg(msg);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const msg = notfi.Warning(validinput.errMessage);
      setMsg(msg);
    }
  };

  return (
    <div className="slideInRight animated">
      <div className="config-wraper">
        <h3>BackEnd Config </h3>
        <div>
          <label>
            Select User
            <select
              name="username"
              value={paylode.username}
              onChange={inputchange}
            >
              <option value="" disabled selected>
                No-User
              </option>
              {activeUsers.map((val) => (
                <option value={val.user_name}>{val.user_name}</option>
              ))}
            </select>
          </label>
          <label>
            Sensor Endpoint
            <input
              value={paylode.sensor_endpont}
              name="sensor_endpont"
              onChange={inputchange}
            />
          </label>
          <label>
            Sensor Name
            <input
              value={paylode.sensor_name}
              name="sensor_name"
              onChange={inputchange}
            />
          </label>
          <button onClick={sendProfile}>Add Profile</button>
        </div>
      </div>
    </div>
  );
};

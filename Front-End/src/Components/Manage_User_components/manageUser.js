import React, { useState, useContext, useEffect } from "react";

// **************** context ********************
// import UserContext from "../../context/user_context";
import NotificationsContext from "../../Context/notifications_context";
import UserContext from "../../Context/user_context";
//***************************************** */

import inputVal from "../../Utils/dataValedeter_util";
import network from "../../Utils/networking";
import notfi from "../../Utils/notifi_util";
import "./manageUser.css";

export default () => {
  const defultState = {
    username: "",
    password: "",
    role: "",
  };
  const [creatUser, setcreatUser] = useState(defultState);
  const [users, setUsers] = useState([]);
  const [val] = useContext(UserContext);
  const [, setMsg] = useContext(NotificationsContext);

  useEffect(() => {
    async function furstRun() {
      await setup();
    }
    furstRun();
  }, []);

  const setup = async () => {
    const url = "/account/users";
    try {
      const resposns = await network.useFetchWithToken(url, val.token);
      if (resposns.sucsses) {
        setUsers(resposns.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const inputchange = (ev) =>
    setcreatUser({ ...creatUser, [ev.target.name]: ev.target.value });

  const addnewUser = async (ev) => {
    ev.preventDefault();
    const validinput = inputVal.notEmpty(creatUser);
    if (!validinput.err) {
      const url = "/account/regester";
      try {
        const respons = await network.useFetchPost(url, val.token, creatUser);
        if (respons.sucsses) {
          setcreatUser(defultState);
          const msg = notfi.Sucsses(respons.msg);
          setMsg(msg);
          setup();
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
      <h3>Manage Users</h3>
      <div className="mange-user-wrpaer">
        <form className="regester-user">
          <h3>Create New User</h3>
          <p>
            Username
            <input
              type="email"
              name="username"
              placeholder="Enter Email"
              value={creatUser.username}
              onChange={inputchange}
            />
          </p>
          <p>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={creatUser.password}
              onChange={inputchange}
            />
          </p>
          <p>
            Role
            <select name="role" value={creatUser.role} onChange={inputchange}>
              <option value="" disabled selected>
                Select a Role
              </option>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </p>
          <button onClick={addnewUser}>Add user</button>
        </form>
        <div>
          <h3>Active Users</h3>
          <table className="usertabil">
            <thead>
              <tr>
                <th>Created Date</th>
                <th>User Name</th>
                <th>Role</th>
                <th>is Band</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.createdDate}</td>
                    <td>{user.user_name}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={async () => {
                          const url = "/account/ban-user";
                          const paylode = {
                            _id: user._id,
                            isband: user.isband,
                          };
                          try {
                            const respons = await network.useFetchPut(
                              url,
                              val.token,
                              paylode
                            );

                            if (respons.sucsses) {
                              const msg = notfi.Sucsses(respons.msg);
                              setMsg(msg);
                              setup();
                            } else {
                              const msg = notfi.Sucsses(respons.msg);
                              setMsg(msg);
                            }
                          } catch (err) {
                            console.log(err);
                          }
                        }}
                      >
                        {" "}
                        {user.isband ? "Yes" : "No"}{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

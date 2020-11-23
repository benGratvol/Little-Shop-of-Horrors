import React, { useState, useContext, useEffect } from "react";
import NotificationsContext from "../../Context/notifications_context";

import sucssesimage from "../../Assets/images/suscsses_indor.png";
import faileimage from "../../Assets/images/info_indor.png";
import "./notifications.css";
export default () => {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState("");
  const [msg, setMsg] = useContext(NotificationsContext);
  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (msg.type) {
      case "Sucsses":
        setStyle("sucsses");
        break;
      case "Fail":
        setStyle("fail");
        break;
      case "Warning":
        setStyle("warning");
        break;
      case "Info":
        setStyle("info");
        break;
    }
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, [msg, setMsg]); // new 13/10
  return (
    <div className={visible ? "fadeIn" : "fadeOut"}>
      {visible ? (
        // <div className="notificatio-wraper  fadeOut">
        <div className="stam  fadeOut">
          <div className={style}>
            <h4>
              <img
                alt="loginimage"
                src={msg.type === "Sucsses" ? sucssesimage : faileimage}
              />{" "}
              {msg.type}
            </h4>
            <br />
            <p>{msg.body}</p>
          </div>
        </div>
      ) : (
        // </div>
        <></>
      )}
    </div>
  );
};

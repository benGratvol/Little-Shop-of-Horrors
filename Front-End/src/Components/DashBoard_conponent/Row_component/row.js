import React, { useState, useContext, useEffect } from "react";

export default (props) => {
  const { username, sensor_name, sensor_endpont } = props.val;

  const client = new WebSocket(sensor_endpont, ["echo-protocol"]);
  const [data, setdata] = useState("");

  client.onmessage = (ev) => {
    const converter = JSON.parse(ev.data);
    setdata(converter);
  };

  useEffect(() => {
    setInterval(() => {
      client.send(["send"]);
    }, 500);

    return () => {
      client.close();
    };
  }, []);
  return (
    <tr>
      <td>{username}</td>
      <td>{sensor_name}</td>
      <td>{data.Cel}</td>
      <td>{data.Far}</td>
    </tr>
  );
};

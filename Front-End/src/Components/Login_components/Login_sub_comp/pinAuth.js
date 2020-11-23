import React from "react";
import "./pinauth.css";

export default () => {
  return (
    <form className="login_form_pin">
      <h3>a 6 diget pin was sent to your mail</h3>
      <input className="" placeholder="Please enter the pin"></input>
      <button className="pin_button">Send</button>
    </form>
  );
};

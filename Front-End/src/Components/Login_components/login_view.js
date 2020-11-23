import React from "react";

export default (props) => {
  const { Posttoserver, Login_img, postData, ValueChange } = props;
  return (
    <form className="login_form" onSubmit={Posttoserver}>
      <h3>Login - To Your Account</h3>
      <img src={Login_img} alt="loginimage" />
      <p>
        <div className="form-group row">
          <label for="staticEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-6">
            <input
              name="user_name"
              type="email"
              readonly
              className="form-control"
              id="staticEmail"
              value={postData.user_name}
              onChange={ValueChange}
            />
          </div>
        </div>
      </p>
      <p>
        <div className="form-group row">
          <label for="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-6">
            <input
              name="password"
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              value={postData.password}
              onChange={ValueChange}
            />
          </div>
        </div>
      </p>

      <button className="">Login</button>
    </form>
  );
};

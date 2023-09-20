import {
  AdaptiMartLogoCart,
  LoginFullEclipse,
  LoginLeftEclipse,
  LoginLinesGraphic,
  LoginTriangles,
} from "../../Assets";
import "./Login.css";

import React from "react";

export default function Login() {
  return (
    <>
      <div className="login_box">
        <div className="login_content_container">
          <div className="login_title_container">
            <img src={AdaptiMartLogoCart} alt="" className="login_title_logo" />

            <div className="login_title">ADMIN LOGIN</div>
          </div>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Username"
            className="login_input_box"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="login_input_box"
          />

          <button className="login_btn">Login</button>
        </div>

        <img src={LoginFullEclipse} alt="" className="login_full_ec_img" />
        <img src={LoginLeftEclipse} alt="" className="login_left_ec_img" />
        <img src={LoginLinesGraphic} alt="" className="login_lines_img" />
        <img src={LoginTriangles} alt="" className="login_triangles_img" />
      </div>
    </>
  );
}

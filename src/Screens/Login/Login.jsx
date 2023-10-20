import { useNavigate } from "react-router-dom";
import {
  AdaptiMartLogoCart,
  // LoginFullEclipse,
  LoginLeftEclipse,
  LoginLinesGraphic,
  LoginTriangles,
} from "../../Assets";
import "./Login.css";

import React from "react";
import { Fade } from "react-reveal";

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Fade top>
        <div className="login_box">
          <div className="login_content_container">
            <div className="login_title_container">
              <img
                src={AdaptiMartLogoCart}
                alt=""
                className="login_title_logo"
              />

              <div className="login_title">ADMIN LOGIN</div>
            </div>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="login_input_box"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="login_input_box"
            />

            <button
              className="login_btn"
              onClick={() => {
                navigate("/admin_dashboard");
              }}
            >
              Login
            </button>
          </div>

          {/* <img src={LoginFullEclipse} alt="" className="login_full_ec_img" /> */}
          <img src={LoginLeftEclipse} alt="" className="login_left_ec_img" />
          <img src={LoginLinesGraphic} alt="" className="login_lines_img" />
          <img src={LoginTriangles} alt="" className="login_triangles_img" />
        </div>
      </Fade>
    </>
  );
}

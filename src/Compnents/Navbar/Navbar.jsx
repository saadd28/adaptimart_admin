import "./Navbar.css";
import { Fade } from "react-reveal";
import { AdaptiMartLogo, NavbarDashboardLogout, NavbarDashboardSelected } from "../../Assets";

import React from "react";

export default function Navbar() {
  return (
    <>
      <Fade left>
        <nav className="dashboard_left_panel">
          <img
            src={AdaptiMartLogo}
            alt=""
            className="dashboard_left_panel_logo"
          />

          <div className="dashboard_navbar_links_container">
            {/* customers, products, dashboard, orders, inventory */}

            <div className="dashboard_navbar_link">
              <img
                src={NavbarDashboardSelected}
                alt=""
                className="dashboard_navbar_link_logo"
              />
              <div className="dashboard_navbar_link_title">Dashboard</div>
            </div>
            <div className="dashboard_navbar_link">
              <img
                src={NavbarDashboardSelected}
                alt=""
                className="dashboard_navbar_link_logo"
              />
              <div className="dashboard_navbar_link_title">Dashboard</div>
            </div>
            <div className="dashboard_navbar_link">
              <img
                src={NavbarDashboardSelected}
                alt=""
                className="dashboard_navbar_link_logo"
              />
              <div className="dashboard_navbar_link_title">Dashboard</div>
            </div>
            <div className="dashboard_navbar_link">
              <img
                src={NavbarDashboardSelected}
                alt=""
                className="dashboard_navbar_link_logo"
              />
              <div className="dashboard_navbar_link_title">Dashboard</div>
            </div>
            <div className="dashboard_navbar_link">
              <img
                src={NavbarDashboardSelected}
                alt=""
                className="dashboard_navbar_link_logo"
              />
              <div className="dashboard_navbar_link_title">Dashboard</div>
            </div>
            <div className="dashboard_navbar_link">
              <img
                src={NavbarDashboardSelected}
                alt=""
                className="dashboard_navbar_link_logo"
              />
              <div className="dashboard_navbar_link_title">Dashboard</div>
            </div>
          </div>

          <div className="dashboard_navbar_bottomlinks_container">
            <div className="dashboard_navbar_logout_container">
              <img
                src={NavbarDashboardLogout}
                alt=""
                className="dashboard_navbar_logout_img"
              />
              <div className="dashboard_navbar_logout_title">Logout</div>
            </div>
          </div>

          {/* dic */}
        </nav>
      </Fade>
    </>
  );
}

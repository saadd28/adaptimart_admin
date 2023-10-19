import "./Navbar.css";
import { Fade } from "react-reveal";
import {
  AdaptiMartLogo,
  NavbarDashboardLogout,
  NavbarDashboardSelected,
  NavbarDashboardUnSelected,
} from "../../Assets";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardIconSVG from "../SVGs/DashboardIconSVG";

export default function Navbar() {
  let [ActiveLink, setActiveLink] = useState(1);
  // let [tests, settests] = useState();
  // const navigate = useNavigate();

  // useEffect
  // useEffect((event) => {
  //   // window.addEventListener("scroll", () => {
  //   //   if (window.scrollY > 0) {
  //   //     setIsScrolling(true);
  //   //     setToggleMenu(false);
  //   //   } else if (window.scrollY === 0) {
  //   //     setIsScrolling(false);
  //   //   }
  //   // });
  // });


  const isActiveFunc = (match, location) => {
    // Add your custom logic here to determine when the NavLink should be active
    // For example, you might want it to be active for multiple paths
    if (location.pathname === '/manage_products' || location.pathname === '/product_details'){
      return true;
    }
    else{
      return false;
    }
  };
  
  return (
    <>
      <Fade left>
        <nav className="dashboard_left_panel">
          <div className="dashboard_upper_part">
            <img
              src={AdaptiMartLogo}
              alt=""
              className="dashboard_left_panel_logo"
            />

            <div className="dashboard_navbar_links_container">
              {/* customers, products, dashboard, orders, inventory */}

              {/* <NavLink
                to="/admin_dashboard"
                className={(isActive) =>
                  !isActive
                    ? "dashboard_navbar_link_title_unselected"
                    : "dashboard_navbar_link_title"
                }
              >
                <img
                  src={
                    (isActive) =>
                    isActive
                      ? NavbarDashboardSelected
                      : NavbarDashboardUnSelected
                  }
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <div
                  className={
                    (isActive) =>
                    isActive
                      ? "dashboard_navbar_link_title"
                      : "dashboard_navbar_link_title_unselected"
                  }
                >
                  Dashboard
                </div>
              </NavLink> */}

              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink((ActiveLink = 1));
                }}
              >
                <div className="dashboard_navbar_link_logo">
                  <DashboardIconSVG />
                </div>

                <NavLink
                  to="/admin_dashboard"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Dashboard
                </NavLink>
              </div>

              {/* <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(1);
                }}
              >
                <img
                  src={
                    ActiveLink === 1
                      ? NavbarDashboardSelected
                      : NavbarDashboardUnSelected
                  }
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <div className={
                  ActiveLink === 1
                  ? "dashboard_navbar_link_title"
                  : "dashboard_navbar_link_title_unselected"
                }>Dashboard</div>
              </div> */}
              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink((ActiveLink = 2));
                }}
              >
                <img
                  src={
                    ActiveLink === 2
                      ? NavbarDashboardSelected
                      : NavbarDashboardUnSelected
                  }
                  alt=""
                  className="dashboard_navbar_link_logo"
                />

                <NavLink
                  to="/manage_products"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                  isActive={isActiveFunc}
                  onClick={() => {
                    setActiveLink((ActiveLink = 2));
                  }}
                >
                  Manage Products
                </NavLink>
              </div>

              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(3);
                }}
              >
                <img
                  src={
                    ActiveLink === 3
                      ? NavbarDashboardSelected
                      : NavbarDashboardUnSelected
                  }
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/admin_dashboard"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Dashboard
                </NavLink>
              </div>
              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(4);
                }}
              >
                <img
                  src={
                    ActiveLink === 4
                      ? NavbarDashboardSelected
                      : NavbarDashboardUnSelected
                  }
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/admin_dashboard"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Dashboard
                </NavLink>
              </div>
              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(5);
                }}
              >
                <img
                  src={
                    ActiveLink === 5
                      ? NavbarDashboardSelected
                      : NavbarDashboardUnSelected
                  }
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/admin_dashboard"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Dashboard
                </NavLink>
              </div>
              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(6);
                }}
              >
                <img
                  src={
                    ActiveLink === 6
                      ? NavbarDashboardSelected
                      : NavbarDashboardUnSelected
                  }
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/admin_dashboard"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Dashboard
                </NavLink>
              </div>
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

import "./Navbar.css";
import { Fade } from "react-reveal";
import {
  AdaptiMartLogo,
  NavbarCardLogo,
  NavbarCartLogo,
  NavbarDashboardLogo,
  NavbarDashboardLogout,
  // NavbarDashboardSelected,
  NavbarDashboardUnSelected,
  NavbarProductLogo,
  NavbarTruckLogo,
  NavbarUserLogo,
} from "../../Assets";

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardIconSVG from "../SVGs/DashboardIconSVG";
import NavbarLogoutIconSVG from "../SVGs/NavbarLogoutIconSVG";

export default function Navbar() {
  let [ActiveLink, setActiveLink] = useState(1);
  const navigate = useNavigate();
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
    if (
      location.pathname === "/manage_products" ||
      location.pathname === "/product_details"
    ) {
      return true;
    } else {
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

              {/* <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink((ActiveLink = 1));
                }}
              >
                <img
                  src={NavbarDashboardLogo}
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
              </div> */}

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
                  src={ActiveLink === 2 ? NavbarProductLogo : NavbarProductLogo}
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
                  Products
                </NavLink>
              </div>

              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(3);
                }}
              >
                <img
                  src={ActiveLink === 3 ? NavbarUserLogo : NavbarUserLogo}
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/manage_users"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Users
                </NavLink>
              </div>
              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(4);
                }}
              >
                <img
                  src={ActiveLink === 4 ? NavbarCartLogo : NavbarCartLogo}
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/manage_orders"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Orders
                </NavLink>
              </div>
              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(5);
                }}
              >
                <img
                  src={ActiveLink === 5 ? NavbarTruckLogo : NavbarTruckLogo}
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/manage_inventory"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Inventory
                </NavLink>
              </div>
              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(6);
                }}
              >
                <img
                  src={ActiveLink === 6 ? NavbarUserLogo : NavbarUserLogo}
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/manage_supplier"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Supplier
                </NavLink>
              </div>

              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(7);
                }}
              >
                <img
                  src={ActiveLink === 7 ? NavbarCardLogo : NavbarCardLogo}
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/manage_coupons"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Coupons
                </NavLink>
              </div>

              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(8);
                }}
              >
                <img
                  src={ActiveLink === 8 ? NavbarTruckLogo : NavbarTruckLogo}
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/manage_shipments"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Shipments
                </NavLink>
              </div>

              <div
                className="dashboard_navbar_link"
                onClick={() => {
                  setActiveLink(9);
                }}
              >
                <img
                  src={ActiveLink === 9 ? NavbarCartLogo : NavbarCartLogo}
                  alt=""
                  className="dashboard_navbar_link_logo"
                />
                <NavLink
                  to="/manage_returns"
                  className={"dashboard_navbar_link_title_unselected"}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#18abb1" : "#cdcdcd",
                    };
                  }}
                >
                  Returns
                </NavLink>
              </div>
            </div>
          </div>

          <div className="dashboard_navbar_bottomlinks_container">
            <div className="dashboard_navbar_logout_container">
              {/* <img
                src={NavbarDashboardLogout}
                alt=""
                className="dashboard_navbar_logout_img"
              /> */}
              <div className="dashboard_navbar_logout_img">
                <NavbarLogoutIconSVG />
              </div>
              <div
                className="dashboard_navbar_logout_title"
                onClick={() => {
                  navigate("/");
                }}
              >
                Logout
              </div>
            </div>
          </div>

          {/* dic */}
        </nav>
      </Fade>
    </>
  );
}

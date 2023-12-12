import "./AdminDashboard.css";

import React from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import {
  AdminProfilePic,
  DashboardProductSKUIcon,
  DashboardRevenueIcon,
  DashboardSalesIcon,
} from "../../Assets";
// import { Fade } from "react-reveal";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

// const PricePredictionChart = ({ data }) => {
//   return (
//     <LineChart
//       width={800}
//       height={400}
//       data={data}
//       margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="date" />
//       <YAxis />
//       <Tooltip />
//       <Legend />
//       <Line type="monotone" dataKey="predictedPrice" stroke="#8884d8" />
//     </LineChart>
//   );
// };

export default function AdminDashboard() {
  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
          {/* Product Header */}
          {/* <Fade top> */}
          <div className="prod_head_box">
            <div className="prod_head_title_container">
              <div className="prod_head_title">Admin Dashboard</div>

              <img
                src={AdminProfilePic}
                alt=""
                className="prod_head_profile_pic_img"
              />
            </div>

            <div className="prod_head_add_prod_container">
              <div className="prod_head_dir_path_container">
                <div className="prod_head_dir_path_content">Dashboard</div>
              </div>
            </div>
          </div>
          {/* </Fade> */}

          {/* End Product Header */}

          {/* <Fade right> */}
          <div className="dashboard_statistics_row">
            <div className="dashboard_statistics_infocard">
              <img
                src={DashboardRevenueIcon}
                alt=""
                className="dashboard_statistics_infocard_img"
              />

              <div className="dashboard_statistics_infocard_title">
                Total Revenue
              </div>

              <div className="dashboard_statistics_infocard__content">
                $75,500
              </div>
            </div>
            <div className="dashboard_statistics_infocard">
              <img
                src={DashboardSalesIcon}
                alt=""
                className="dashboard_statistics_infocard_img"
              />

              <div className="dashboard_statistics_infocard_title">
                Total Orders
              </div>

              <div className="dashboard_statistics_infocard__content">1245</div>
            </div>
            <div className="dashboard_statistics_infocard">
              <img
                src={DashboardProductSKUIcon}
                alt=""
                className="dashboard_statistics_infocard_img"
              />

              <div className="dashboard_statistics_infocard_title">
                Total Product SKUs
              </div>

              <div className="dashboard_statistics_infocard__content">5465</div>
            </div>
          </div>

          <div className="dashboard_graph_row">
            <div className="dashboard_graph_input_container">
              <div className="dashboard_graph_input_label">
                Enter Product SKU ID
              </div>

              <input
                type="text"
                placeholder="Enter SKUID"
                className="dashboard_graph_input"
              />
            </div>
          </div>
          {/* </Fade> */}
        </div>
      </div>
    </>
  );
}

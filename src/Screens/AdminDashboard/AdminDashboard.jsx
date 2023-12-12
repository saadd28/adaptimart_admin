import "./AdminDashboard.css";

import React, { useEffect, useState } from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import {
  AdminProfilePic,
  DashboardProductSKUIcon,
  DashboardRevenueIcon,
  DashboardSalesIcon,
  ViewOrderCustomerIcon,
} from "../../Assets";
import { Fade } from "react-reveal";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ReferenceArea,
} from "recharts";
import {
  gettotalproductskus,
  gettotalrevenue,
  gettotalsales,
  gettotalusers,
} from "../../api/apis";

const PricePredictionChart = ({ data }) => {
  const chartStyles = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
  };

  const labelStyles = {
    fontSize: "16px",
    fontFamily: "Arial, sans-serif",
    color: "#333", // Text color
  };

  return (
    <>
      <div className="dashboard_graph_title">Price Prediction</div>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 0, right: 40, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeOpacity={0} />
        <XAxis
          dataKey="date"
          label={{
            // value: "Dates",
            position: "bottom",
            dy: 10,
          }}
          tick={{
            fontSize: "1.4rem",
            fontFamily: "var(--Roboto)",
            fill: "#555",
            angle: 0,
          }}
        />
        <YAxis
          label={{
            //  value: "Prices",
            angle: -90,
            position: "insideLeft",
          }}
          tick={{
            fontSize: "1.4rem",
            fontFamily: "var(--Roboto)",
            fill: "#555",
          }}
        />
        <Tooltip />
        <Legend verticalAlign="top" align="right" height={36} />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#FF5733"
          strokeWidth={2}
        />
        <ReferenceArea
          y1={0}
          y2={Math.max(...data.map((item) => item.price))}
          fill="url(#shadow)"
          fillOpacity={0.3}
        />
      </LineChart>
    </>
  );
};

const IncrementalNumber = ({ initialValue, finalValue, duration }) => {
  const [displayValue, setDisplayValue] = useState(initialValue);
  const steps = Math.ceil(duration / 16); // Adjusted steps for smoother animation

  useEffect(() => {
    let currentStep = 0;
    const incrementInterval = setInterval(() => {
      currentStep++;
      setDisplayValue((prevValue) => {
        const stepValue =
          Math.round((finalValue - initialValue) * (currentStep / steps)) +
          initialValue;
        return stepValue <= finalValue ? stepValue : finalValue;
      });

      if (currentStep >= steps) {
        setDisplayValue(finalValue); // Set final value after animation completes
        clearInterval(incrementInterval);
      }
    }, duration / steps);

    return () => clearInterval(incrementInterval);
  }, [finalValue, initialValue, duration, steps]);

  return <div>{displayValue}</div>;
};

export default function AdminDashboard() {
  // const [predictionData, setPredictionData] = useState([]);
  // const handleButtonClick = () => {
  //   // try {
  //   //   // Make API call to your prediction endpoint
  //   //   const response =  fetch("YOUR_PREDICTION_API_URL");
  //   //   const data =  response.json();

  //   //   // Assuming your API response has a structure like { date: 'yyyy-mm-dd', predictedPrice: 123.45 }
  //   //   setPredictionData(data);
  //   // } catch (error) {
  //   //   console.error("Error fetching data:", error);
  //   return 0;
  //   }
  // };

  // let predictionData = [
  //   {
  //     price: 1,
  //   },
  //   {
  //     price: 2,
  //   },
  //   {
  //     price: 3,
  //   },
  //   {
  //     price: 4,
  //   },
  //   {
  //     price: 5,
  //   },
  //   {
  //     price: 6,
  //   },
  // ];

  let [TotalRevenue, setTotalRevenue] = useState(0);
  let [TotalSales, setTotalSales] = useState(0);
  let [TotalProductSKUs, setTotalProductSKUs] = useState(0);
  let [TotalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    getTotalRevenue(setTotalRevenue, TotalRevenue);
    getTotalSales(setTotalSales, TotalSales);
    getTotalProductSKUs(setTotalProductSKUs, TotalProductSKUs);
    getTotalUsers(setTotalUsers, TotalUsers);
  }, []);

  let predictionData = [
    { date: "2023-12-13", price: 400 },
    { date: "2023-12-14", price: 300 },
    { date: "2023-12-15", price: 350 },
    { date: "2023-12-16", price: 450 },
    { date: "2023-12-17", price: 400 },
    { date: "2023-12-18", price: 425 },
    { date: "2023-12-19", price: 410 },
  ];
  return (
    <>
      <div className="dashboard_box">
        <Navbar />

        <div className="products_main_container">
          {/* Product Header */}
          <Fade top>
            <div className="prod_head_box">
              <div className="prod_head_title_container">
                <div className="prod_head_title">Admin Dashboard</div>

                <img
                  src={AdminProfilePic}
                  alt=""
                  className="prod_head_profile_pic_img"
                />
              </div>
            </div>
          </Fade>

          {/* End Product Header */}

          <Fade right>
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
                  <IncrementalNumber
                    initialValue={0}
                    finalValue={TotalRevenue ? TotalRevenue : 10000}
                    duration={2000}
                  />
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

                <div className="dashboard_statistics_infocard__content">
                  <IncrementalNumber
                    initialValue={0}
                    finalValue={TotalSales ? TotalSales : 10000}
                    duration={2000}
                  />
                </div>
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

                <div className="dashboard_statistics_infocard__content">
                  <IncrementalNumber
                    initialValue={0}
                    finalValue={TotalProductSKUs ? TotalProductSKUs : 10000}
                    duration={2000}
                  />
                </div>
              </div>
              <div className="dashboard_statistics_infocard">
                <img
                  src={ViewOrderCustomerIcon}
                  alt=""
                  className="dashboard_statistics_infocard_img"
                />

                <div className="dashboard_statistics_infocard_title">
                  Total Customers
                </div>

                <div className="dashboard_statistics_infocard__content">
                  <IncrementalNumber
                    initialValue={0}
                    finalValue={TotalUsers ? TotalUsers : 10000}
                    duration={2000}
                  />
                </div>
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

                <button className="dashboard_graph_btn">Predict Prices</button>
              </div>

              <div className="dashboard_graph_container">
                {predictionData.length > 0 && (
                  <PricePredictionChart data={predictionData} />
                )}
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
}

export const getTotalRevenue = (setTotalRevenue, TotalRevenue) => {
  gettotalrevenue()
    .then((res) => {
      console.log("Updated Total Revenue retrieved", res.data[0].total_price);
      setTotalRevenue((TotalRevenue = res.data[0].total_price));
    })
    .catch((err) => {
      console.log("Error fetching Total Revenue:", err);
    });
};

export const getTotalSales = (setTotalSales, TotalSales) => {
  gettotalsales()
    .then((res) => {
      console.log("Updated Total Sales retrieved", res.data[0].total_orders);
      setTotalSales((TotalSales = res.data[0].total_orders));
    })
    .catch((err) => {
      console.log("Error fetching Total Sales:", err);
    });
};

export const getTotalProductSKUs = (setTotalProductSKUs, TotalProductSKUs) => {
  gettotalproductskus()
    .then((res) => {
      console.log(
        "Updated Total Product SKUs retrieved",
        res.data[0].total_skus
      );
      setTotalProductSKUs((TotalProductSKUs = res.data[0].total_skus));
    })
    .catch((err) => {
      console.log("Error fetching Total Product SKUs:", err);
    });
};

export const getTotalUsers = (setTotalUsers, TotalUsers) => {
  gettotalusers()
    .then((res) => {
      console.log(
        "Updated Total Users retrieved",
        res.data[0].total_users
      );
      setTotalUsers((TotalUsers = res.data[0].total_users));
    })
    .catch((err) => {
      console.log("Error fetching Total Users:", err);
    });
};

import "./AdminDashboard.css";

import React, { useEffect, useState } from "react";
import Navbar from "../../Compnents/Navbar/Navbar";
import {
  AdaptiMartLogoCart,
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
  getperdictions,
  gettopproducts,
  gettotalproductskus,
  gettotalrevenue,
  gettotalsales,
  gettotalusers,
} from "../../api/apis";
import { PieChart } from "react-minimal-pie-chart";
import { useSpring, animated } from "react-spring";

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

const GaugeChart = ({ total, revenue }) => {
  const percentage = (revenue / total) * 100;

  // Calculate the angle based on the percentage, ensuring it spans only a semicircle when revenue equals the total
  const lengthAngle = 180;
  const [props, set] = useSpring(() => ({
    from: { percentage: 0 },
    percentage,
    // onRest: () => set({ percentage }), // Optional: Reset onRest to ensure it can be triggered again
    delay: 10000, // Delay in milliseconds
  }));
  useEffect(() => {
    set({ percentage });
  }, [set, percentage]);

  const data = [
    { value: percentage, color: "#18ABB1" },
    { value: 100 - percentage, color: "#a1cacb" },
  ];

  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      <PieChart
        style={{ width: "100%", height: "auto" }}
        lineWidth={15}
        data={data}
        startAngle={180}
        lengthAngle={lengthAngle}
        totalValue={100}
        animate
      />
      <animated.div className={"dashboard_guagechart_percentage"}>
        {props.percentage.interpolate((val) => `${Math.round(val)}%`)}
      </animated.div>
    </div>
  );
};

const ProductTableRow = ({ data, setProductsList, index }) => {
  return (
    <>
      <tr className="product_table_row">
        <td className="product_table_data">
          <div className="product_table_data_name_container">
            <img
              src={
                data.image
                  ? "http://localhost:4000/" + data.image
                  : AdaptiMartLogoCart
              }
              alt=""
              className="product_table_data_img"
            />
            <div>{data.product_name}</div>
          </div>
        </td>
        <td
          className="product_table_data"
          style={{
            color: "#52C1C5",
          }}
        >
          {data.product_id}
        </td>
        <td className="product_table_data">${data.price}</td>
        <td className="product_table_data">{data.total_quantity_sold}</td>
        <td className="product_table_data">${data.total_amount_sold}</td>
      </tr>
    </>
  );
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
  let [SKUID, setSKUID] = useState("");
  // let [Target, setTarget] = useState(15000);
  let Target = 40000;
  const [ProductsList, setProductsList] = useState(null);
  const [PredictionsList, setPredictionsList] = useState(null);

  useEffect(() => {
    getTotalRevenue(setTotalRevenue, TotalRevenue);
    getTotalSales(setTotalSales, TotalSales);
    getTotalProductSKUs(setTotalProductSKUs, TotalProductSKUs);
    getTotalUsers(setTotalUsers, TotalUsers);
    getTopProducts(setProductsList);
    Target = 40000;
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

  const getPerdictions = (sku_id) => {
    console.log("SKUID", sku_id);

    getperdictions(sku_id, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("resp", res.data);
          setPredictionsList((PredictionsList = res.data));
          alert("Order Status Updated Successfully");
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert("Failed to Update Order Status");
      });
  };

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
                    finalValue={TotalRevenue ? TotalRevenue : 0}
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
                    finalValue={TotalSales ? TotalSales : 0}
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
                    finalValue={TotalProductSKUs ? TotalProductSKUs : 0}
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
                    finalValue={TotalUsers ? TotalUsers : 0}
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
                  value={SKUID}
                  onChange={(event) => {
                    setSKUID((SKUID = event.target.value));
                    console.log("SKUID", SKUID);
                  }}
                />

                <button
                  className="dashboard_graph_btn"
                  onClick={() => {
                    getPerdictions(SKUID);
                  }}
                >
                  Predict Prices
                </button>

                <div className="dashboard_guagechart_caption_container">
                  <div className="dashboard_guagechart_caption">
                    <div className="dashboard_guagechart_caption_title">
                      Target
                    </div>
                    <div className="dashboard_guagechart_caption_content">
                      ${Target}
                    </div>
                  </div>
                  <div className="dashboard_guagechart_caption">
                    <div className="dashboard_guagechart_caption_title">
                      Total Revenue
                    </div>
                    <div className="dashboard_guagechart_caption_content">
                      ${TotalRevenue}
                    </div>
                  </div>
                </div>

                <div className="dashboard_guagechart_container">
                  <GaugeChart total={Target} revenue={TotalRevenue} />
                </div>
              </div>

              <div className="dashboard_graph_container">
                {predictionData.length > 0 && (
                  <PricePredictionChart data={predictionData} />
                )}
              </div>
            </div>

            <div className="dashboard_top_selling_product_container">
              <div className="dashboard_top_selling_product_title">
                Top Selling Products
              </div>
              <div className="product_table_container">
                <table
                  className="product_table"
                  style={{
                    // borderSpacing: "0 10px",
                    borderCollapse: "separate",
                  }}
                >
                  <thead>
                    <tr className="table_heading_row">
                      {/* <th className="table_heading">No.</th> */}
                      <th className="table_heading">Product Name</th>
                      <th className="table_heading">SKU_ID</th>
                      <th className="table_heading">Price</th>
                      <th className="table_heading">Total Quantity Sold</th>
                      <th className="table_heading">Total Amount Sold</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ProductsList
                      ? ProductsList.map((item, index) => (
                          <ProductTableRow
                            data={item}
                            setProductsList={setProductsList}
                            index={index}
                          />
                        ))
                      : ""}
                  </tbody>
                </table>
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
      console.log("Updated Total Users retrieved", res.data[0].total_users);
      setTotalUsers((TotalUsers = res.data[0].total_users));
    })
    .catch((err) => {
      console.log("Error fetching Total Users:", err);
    });
};

export const getTopProducts = (setProductsList) => {
  gettopproducts()
    .then((res) => {
      console.log("Updated products list retrieved");
      setProductsList(res.data);
    })
    .catch((err) => {
      console.log("Error fetching products:", err);
    });
};

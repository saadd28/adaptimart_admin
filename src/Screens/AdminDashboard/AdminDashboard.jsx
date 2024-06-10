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
  // Area,
  // ReferenceArea,
  ReferenceLine,
} from "recharts";
import {
  getperdictions,
  getpriceoptimization,
  gettopproducts,
  gettotalproductskus,
  gettotalrevenue,
  gettotalsales,
  gettotalusers,
  updateprice,
} from "../../api/apis";
import { PieChart } from "react-minimal-pie-chart";
import { useSpring, animated } from "react-spring";
import moment from "moment";
import { max } from "moment/moment";
import { format } from "date-fns";

// const PricePredictionChart = ({ data }) => {
//   const chartStyles = {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "8px",
//   };

//   const labelStyles = {
//     fontSize: "16px",
//     fontFamily: "Arial, sans-serif",
//     color: "#333", // Text color
//   };

//   return (
//     <>
//       <div className="dashboard_graph_title">Price Prediction</div>
//       <LineChart
//         width={800}
//         height={400}
//         data={data}
//         margin={{ top: 0, right: 40, left: 10, bottom: 10 }}
//       >
//         <CartesianGrid strokeOpacity={0} />
//         <XAxis
//           dataKey="date"
//           label={{
//             // value: "Dates",
//             position: "bottom",
//             dy: 10,
//           }}
//           tick={{
//             fontSize: "1.4rem",
//             fontFamily: "var(--Roboto)",
//             fill: "#555",
//             angle: 0,
//           }}
//         />
//         <YAxis
//           label={{
//             //  value: "Prices",
//             angle: -90,
//             position: "insideLeft",
//           }}
//           tick={{
//             fontSize: "1.4rem",
//             fontFamily: "var(--Roboto)",
//             fill: "#555",
//           }}
//         />
//         <Tooltip />
//         <Legend verticalAlign="top" align="right" height={36} />
//         <Line
//           type="monotone"
//           dataKey="price"
//           stroke="#FF5733"
//           strokeWidth={2}
//         />
//         <ReferenceArea
//           y1={0}
//           y2={Math.max(...data.map((item) => item.price))}
//           fill="url(#shadow)"
//           fillOpacity={0.3}
//         />
//       </LineChart>
//     </>
//   );
// };

function formatDate(dateString) {
  // Parse the date string into a Moment object
  const date = moment(dateString);

  // Format the date as desired (e.g., DD/MM/YYYY)
  const formattedDate = date.format("DD/MM/YYYY");

  return formattedDate;
}

const CustomTooltip = ({
  active,
  payload,
  label,
  // ActualList,
  PredictionsList,
}) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    // const actualDatum = ActualList.find(
    //   (item) => item.date.getTime() === date.getTime()
    // );
    const predictionDatum = PredictionsList.find(
      (item) => item.date.getTime() === date.getTime()
    );

    // if (actualDatum && !predictionDatum) {
    //   return (
    //     <div className="custom_tooltip">
    //       <p>{`Date: ${formatDate(label)}`}</p>
    //       <p>{`Actual Sales: ${actualDatum.sales}`}</p>
    //     </div>
    //   );
    // } else
    // if (!actualDatum && predictionDatum) {
    if (predictionDatum) {
      return (
        <div className="custom_tooltip">
          <p>{`Date: ${formatDate(label)}`}</p>
          {predictionDatum.flag === 1 ? (
            <p>{`Actual  Sales: ${predictionDatum.sales}`}</p>
          ) : (
            <p>{`Predicted Sales: ${predictionDatum.sales}`}</p>
          )}
        </div>
      );
    }
    // else if (actualDatum && predictionDatum) {
    //   return (
    //     <div className="custom_tooltip">
    //       <p>{`Date: ${formatDate(label)}`}</p>
    //       <p>{`Actual Sales: ${actualDatum.sales}`}</p>
    //       <p>{`Predicted Sales: ${predictionDatum.sales}`}</p>
    //     </div>
    //   );
    // }
  }

  return null;
};

const PricePredictionChart = ({
  // ActualList,
  // setActualList,
  PredictionsList,
  setPredictionsList,
  SKUID,
  Prediction_Frequency,
  // ChunkLength,
  // setChunkLength,
}) => {
  // const combinedData = [...ActualList, ...PredictionsList];
  // // Convert date strings to Date objects
  // ActualList = ActualList.map((item) => ({
  //   ...item,
  //   date: new Date(item.date),
  // }));
  console.log("PredictionsList", PredictionsList);
  PredictionsList = PredictionsList.map((item) => ({
    ...item,
    date: new Date(item.date),
  }));

  // Find the minimum and maximum dates for actual and prediction data
  // const minDate = new Date(Math.min(...combinedData.map((item) => item.date)));
  // const maxDate = new Date(Math.max(...combinedData.map((item) => item.date)));
  const minDate = new Date(Math.min(PredictionsList.map((item) => item.date)));
  const maxDate = new Date(Math.max(PredictionsList.map((item) => item.date)));

  // yaxis setting
  // Initialize min and max variables with the first element's sales value
  let minSales = PredictionsList[0].sales;
  let maxSales = PredictionsList[0].sales;
  // let actual_length = 0;
  let predicted_length = 0;

  // Iterate through the array to find min and max sales values
  for (let i = 1; i < PredictionsList.length; i++) {
    const sales = PredictionsList[i].sales;
    const flag = PredictionsList[i].flag;
    if (flag === 1) {
      predicted_length = predicted_length + 1;
    }
    if (sales < minSales) {
      minSales = sales;
    }
    if (sales > maxSales) {
      maxSales = sales;
    }
  }

  const percentage =
    100 -
    ((PredictionsList.length - predicted_length - 1) /
      (PredictionsList.length - 1)) *
      100;
  // for (let i = 1; i < ActualList.length; i++) {
  //   const sales = ActualList[i].sales;
  //   if (sales < minSales) {
  //     minSales = sales;
  //   }
  //   if (sales > maxSales) {
  //     maxSales = sales;
  //   }
  // }

  // const [view, setView] = useState("daily");
  let [PredictionFrequency, setPredictionFrequency] =
    useState(Prediction_Frequency);
  let [PredictionsButtonToggle, setPredictionsButtonToggle] = useState(0);

  const getPerdictions = (sku_id_str, prediction_frequency) => {
    console.log("SKUID", sku_id_str);
    const requestData = {
      sku_id_str: sku_id_str,
      prediction_frequency: prediction_frequency,
      // chunk: chunk_length,
    };

    getperdictions(requestData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("resp", res.data.data);
          setPredictionsList((PredictionsList = res.data.data));
          // setActualList((ActualList = res.data.last_30_data));
          // alert("Predictions Successfully");
        }
      })
      .catch((err) => {
        console.log("err", err);
        // alert("Failed to Predict Sales");
      });
  };

  useEffect(() => {
    // Call getPredictions only when both PredictionsButtonToggle and PredictionFrequency are updated
    if (PredictionsButtonToggle !== null && PredictionFrequency !== null) {
      console.log(
        "Toggle Button: ",
        SKUID,
        "  ",
        PredictionFrequency
        // "  ",
        // ChunkLength
      );
      getPerdictions(SKUID, PredictionFrequency);
    }
  }, [PredictionsButtonToggle, PredictionFrequency]); // Ensure SKUID is in the dependency array if it's being used inside useEffect

  // const [ChunkLength, setChunkLength] = useState(30);
  let DailyChunkLengthList = [10, 20, 30, 40];
  let WeeklyChunkLengthList = [2, 4, 8];
  // const [ChunkLengthList, setChunkLengthList] = useState([""]);
  // const [WeeklyFrequency, setWeeklyFrequency] = useState(4);
  // let WeeklyFrequencyList = [];

  // const handleChunkLengthChange = (event) => {
  //   setChunkLength((ChunkLength = event.target.value));
  //   // console.log("Daily Frequency", ChunkLength);
  //   // getPerdictions(SKUID, PredictionFrequency, ChunkLength);
  // };
  // const handleWeeklyFrequencyChange = (event) => {
  //   setWeeklyFrequency(event.target.value);
  //   console.log("Weekly Frequency", WeeklyFrequency);
  // };

  return (
    <>
      <div className="predictions_btn_container">
        <button
          className={
            PredictionsButtonToggle === 0
              ? "predictions_toggle_active_btn"
              : "predictions_toggle_nonactive_btn"
          }
          onClick={() => {
            setPredictionsButtonToggle(0);
            setPredictionFrequency((PredictionFrequency = "D"));
            // handleChunkLengthChange();

            // getPerdictions(SKUID, PredictionFrequency);
          }}
        >
          Daily
        </button>
        <button
          className={
            PredictionsButtonToggle === 1
              ? "predictions_toggle_active_btn"
              : "predictions_toggle_nonactive_btn"
          }
          onClick={() => {
            setPredictionsButtonToggle(1);
            setPredictionFrequency((PredictionFrequency = "W"));
            // handleChunkLengthChange();
            // getPerdictions(SKUID, PredictionFrequency);
          }}
        >
          Weekly
        </button>
      </div>
      {/* <div className="predictions_dropdown_container">
        <select
          id="dropdown"
          className=""
          value={ChunkLength}
          onChange={handleChunkLengthChange}
        >
          {PredictionsButtonToggle === 0
            ? DailyChunkLengthList
              ? DailyChunkLengthList.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))
              : null
            : WeeklyChunkLengthList
            ? WeeklyChunkLengthList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))
            : null}
        </select> */}
      {/* {PredictionsButtonToggle === 0 ? (
          <select
            id="dropdown"
            className=""
            value={ChunkLength}
            onChange={handleChunkLengthChange}
          >
            {DailyChunkLengthList
              ? DailyChunkLengthList.map((item) => (
                  <option value={item}>{item}</option>
                ))
              : ""}
          </select>
        ) : (
          <select
          id="dropdown"
          className=""
          value={ChunkLength}
          onChange={handleChunkLengthChange}
          >
          {WeeklyChunkLengthList
            ? WeeklyChunkLengthList.map((item) => (
                <option value={item}>{item}</option>
              ))
            : ""}
          </select>
        )} */}
      {/* <option value={ChunkLength}>{ChunkLength}</option> */}
      {/* </div> */}
      <div className="dashboard_graph_title">Sales Prediction</div>
      <LineChart
        width={800}
        height={400}
        margin={{ top: 0, right: 40, left: 10, bottom: 20 }}
        data={PredictionsList}
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="red" />
            <stop offset={`${percentage}%`} stopColor="red" />
            <stop offset={`${percentage}%`} stopColor="blue" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeOpacity={0} />
        <XAxis
          dataKey="date"
          type="date"
          scale="date"
          // domain={["dataMin", "dataMax"]}
          // tickFormatter={(tick) => format(new Date(tick), "yyyy/MM/dd")}
          label={{
            value: "Date",
            position: "bottom",
            // dy: 10,
            // angle: -90,
          }}
          display="none"
        />
        <YAxis
          label={{
            angle: -90,
            position: "insideLeft",
          }}
          tick={{
            fontSize: "1.4rem",
            fontFamily: "var(--Roboto)",
            fill: "#555",
          }}
          type="number" // Set type to "number" for Y-axis
          // tickFormatter={(tick) => Math.round(tick)}
          domain={[minSales, maxSales]} // Set the domain based on your data
          tickCount={maxSales - minSales + 1} // Set the tick count to cover the range
          tickFormatter={(tick) => Math.round(tick)} // Round tick values to integers
        />
        <Tooltip
          content={(props) => (
            <CustomTooltip
              // ActualList={ActualList}
              PredictionsList={PredictionsList}
              {...props}
            />
          )}
        />
        <Legend verticalAlign="top" align="right" height={36} />

        <Line
          type="monotone"
          dataKey="sales"
          data={PredictionsList}
          // stroke={predictedColor}
          stroke="url(#gradient)"
          strokeWidth={2}
          // name={none}
          dot={false}
        />

        {/* <ReferenceLine x={PredictionsList[predicted_length].date} label="iPhone" /> */}
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

const ProductTableRow = ({ data, updateOptimizedProducts }) => {
  let [approved, setApproved] = useState(false);

  const updatePrice = (id, price) => {
    updateprice(id, price)
      .then((res) => {
        console.log("Optimized Price Updated!", res.data);
        data.actual_price = data.optimal_price;
        // setTotalRevenue((TotalRevenue = res.data[0].total_price));
      })
      .catch((err) => {
        console.log("Error fetching Updating Optimized Price:", err);
      });
  };

  return (
    <>
      <tr className="product_table_row">
        <td
          className="product_table_data"
          style={{
            color: "#52C1C5",
          }}
        >
          {data.sku_id}
        </td>
        <td className="product_table_data">
          ${parseFloat(data.actual_price).toFixed(2)}
        </td>
        <td className="product_table_data">
          ${parseFloat(data.optimal_price).toFixed(2)}
        </td>
        <td className="product_table_data">
          ${parseFloat(data.max_profit).toFixed(2)}
        </td>
        <td className="product_table_data">{data.sales}</td>
        <td className="product_table_data">
          {approved ? (
            <div>New Price Approved!</div>
          ) : (
            <button
              className="price_opt_btn"
              onClick={(e) => {
                e.preventDefault();
                updateOptimizedProducts(data.sku_id, data.optimal_price);
                setApproved(true);
              }}
            >
              Approve
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default function AdminDashboard() {
  // const [PredictionsList, setPredictionsList] = useState([]);
  // const handleButtonClick = () => {
  //   // try {
  //   //   // Make API call to your prediction endpoint
  //   //   const response =  fetch("YOUR_PREDICTION_API_URL");
  //   //   const data =  response.json();

  //   //   // Assuming your API response has a structure like { date: 'yyyy-mm-dd', predictedPrice: 123.45 }
  //   //   setPredictionsList(data);
  //   // } catch (error) {
  //   //   console.error("Error fetching data:", error);
  //   return 0;
  //   }
  // };

  // let PredictionsList = [
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
  let [PredictionsList, setPredictionsList] = useState([]);
  let [ActualList, setActualList] = useState([]);
  let [PredictionFrequency, setPredictionFrequency] = useState("D");
  let [ChunkLength, setChunkLength] = useState(30);

  // let [Target, setTarget] = useState(15000);
  let Target = 40000;
  const [ProductsList, setProductsList] = useState(null);

  const options = [
    { label: "Today", value: "Day 1" },
    { label: "Day 1", value: "Day 2" },
    { label: "Day 2", value: "Day 3" },
    { label: "Day 3", value: "Day 4" },
    { label: "Day 4", value: "Day 5" },
    { label: "Day 5", value: "Day 6" },
    { label: "Day 6", value: "Day 7" },
  ];
  let [selectedOption, setSelectedOption] = useState(options[0].value);
  let [optimizedProducts, setOptimizedProducts] = useState([]);

  const handleSelect = (event) => {
    setSelectedOption((selectedOption = event.target.value));
    console.log("Selected option:", selectedOption);
    getPriceOptimization(selectedOption);
  };

  const getPriceOptimization = () => {
    let reqobj = {
      day: selectedOption,
    };
    console.log("reqobj", reqobj);
    getpriceoptimization(reqobj)
      .then((res) => {
        console.log("Optimized Price", res.data);
        setOptimizedProducts((optimizedProducts = res.data));
        // setTotalRevenue((TotalRevenue = res.data[0].total_price));
      })
      .catch((err) => {
        console.log("Error fetching Optimized Price:", err);
      });
  };

  const updateOptimizedProducts = (id, price) => {
    optimizedProducts[id].actual_price = price;
  };

  useEffect(() => {
    getTotalRevenue(setTotalRevenue, TotalRevenue);
    getTotalSales(setTotalSales, TotalSales);
    getTotalProductSKUs(setTotalProductSKUs, TotalProductSKUs);
    getTotalUsers(setTotalUsers, TotalUsers);
    getTopProducts(setProductsList);
    getPriceOptimization();
    Target = 40000;
  }, []);

  const getPerdictions = (sku_id_str, prediction_frequency) => {
    console.log(
      "Button Click: ",
      SKUID,
      "  ",
      PredictionFrequency,
      "  ",
      ChunkLength
    );
    const requestData = {
      sku_id_str: sku_id_str,
      prediction_frequency: prediction_frequency,
      // chunk: chunk_length,
    };

    getperdictions(requestData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("resp", res.data.data);
          setPredictionsList((PredictionsList = res.data.data));
          // setActualList((ActualList = res.data.last_30_data));
          // alert("Predictions Successfully");
        }
      })
      .catch((err) => {
        console.log("err", err);
        // alert("Failed to Predict Sales");
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
                    // finalValue={TotalRevenue ? TotalRevenue : 0}
                    finalValue={30000}
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
                    finalValue={80}
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
                    // finalValue={TotalProductSKUs ? TotalProductSKUs : 0}
                    finalValue={10}
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
                    // finalValue={TotalUsers ? TotalUsers : 0}
                    finalValue={40}
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
                    getPerdictions(SKUID, PredictionFrequency);
                  }}
                >
                  Predict Sales
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
                      {/* ${TotalRevenue} */}${30000}
                    </div>
                  </div>
                </div>

                <div className="dashboard_guagechart_container">
                  <GaugeChart total={Target} revenue={30000} />
                  {/* <GaugeChart total={Target} revenue={TotalRevenue} /> */}
                </div>
              </div>

              <div className="dashboard_graph_container">
                {/* {PredictionsList.length > 0 && (
                  <PricePredictionChart data={PredictionsList} />
                )} */}
                {PredictionsList.length > 0 && (
                  <PricePredictionChart
                    // ActualList={ActualList}
                    // setActualList={setActualList}
                    PredictionsList={PredictionsList}
                    setPredictionsList={setPredictionsList}
                    SKUID={SKUID}
                    PredictionFrequency={PredictionFrequency}
                    // ChunkLength={ChunkLength}
                    // setChunkLength={setChunkLength}
                  />
                )}
              </div>
            </div>

            <div className="dashboard_top_selling_product_container">
              <div className="dashboard_top_selling_product_title">
                Price Optimization
              </div>

              <div className="dropdown">
                <select
                  value={selectedOption}
                  onChange={(e) => {
                    handleSelect(e);
                  }}
                >
                  {/* <option value="d">Select an option</option> */}
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                      <th className="table_heading">SKU_ID</th>
                      <th className="table_heading">Actual Price</th>
                      <th className="table_heading">
                        {selectedOption === "Day 1"
                          ? "Today's Optimal Price"
                          : selectedOption === "Day 2"
                          ? "Day 1 Optimal Price"
                          : selectedOption === "Day 3"
                          ? "Day 2 Optimal Price"
                          : selectedOption === "Day 4"
                          ? "Day 3 Optimal Price"
                          : selectedOption === "Day 5"
                          ? "Day 4 Optimal Price"
                          : selectedOption === "Day 6"
                          ? "Day 5 Optimal Price"
                          : selectedOption === "Day 7"
                          ? "Day 6 Optimal Price"
                          : ""}
                      </th>
                      <th className="table_heading">
                        {selectedOption === "Day 1"
                          ? "Today's Max Profit"
                          : selectedOption === "Day 2"
                          ? "Day 1 Max Profit"
                          : selectedOption === "Day 3"
                          ? "Day 2 Max Profit"
                          : selectedOption === "Day 4"
                          ? "Day 3 Max Profit"
                          : selectedOption === "Day 5"
                          ? "Day 4 Max Profit"
                          : selectedOption === "Day 6"
                          ? "Day 5 Max Profit"
                          : selectedOption === "Day 7"
                          ? "Day 6 Max Profit"
                          : ""}
                      </th>
                      <th className="table_heading">
                        {selectedOption === "Day 1"
                          ? "Today's Sales"
                          : selectedOption === "Day 2"
                          ? "Day 1 Sales"
                          : selectedOption === "Day 3"
                          ? "Day 2 Sales"
                          : selectedOption === "Day 4"
                          ? "Day 3 Sales"
                          : selectedOption === "Day 5"
                          ? "Day 4 Sales"
                          : selectedOption === "Day 6"
                          ? "Day 5 Sales"
                          : selectedOption === "Day 7"
                          ? "Day 6 Sales"
                          : ""}
                      </th>
                      <th className="table_heading">Confirm Price Change</th>
                    </tr>
                  </thead>

                  <tbody>
                    {optimizedProducts
                      ? optimizedProducts.map((item, index) => (
                          <ProductTableRow
                            data={item}
                            updateOptimizedProducts={updateOptimizedProducts}
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

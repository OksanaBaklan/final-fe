import { useEffect, useState } from "react";
import axios from "axios";
import Decimal from "decimal.js";
import "./currency.css";
import LoaderComponent from "../LoaderComponent/LoaderComponent";

const Currency = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
// console.log(exchangeRates);
  const fetchData = async () => {
    // const access_key = "33f17c9d131c752a6bac77cc7c11580f";
    // const endpoint = "latest";
    const url = "https://v6.exchangerate-api.com/v6/e9b41e884028839570838fc4/latest/USD";

    try {
      const response = await axios.get(url);

      const  rates  = response.data.conversion_rates;
      // console.log(response.data);

      if (rates) {
        const filteredRates = Object.entries(rates)
          .filter(
            ([currency]) =>
              currency === "USD" ||
              currency === "CAD" ||
              currency === "JPY" ||
              currency === "CNY",
          )
          .map(([currency, rate]) => ({
            currency,
            rate: new Decimal(rate).toFixed(2),
          }));

        setExchangeRates(filteredRates);
      } else {
        console.error(
          "Error fetching exchange rates: Rates data is undefined or null",
        );
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="currency">
    <div className="currencyCard">
      {/* <div style={cardStyle}> */}
      <div>
        {exchangeRates.length > 0 ? (
          <>
            <table style={{ borderCollapse: "collapse", width: "100%", height: "210px" }}>
              <thead>
                <tr style={tableHeaderStyle}>
                  <th>Currency</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody style={tbodyStyle}>
                {exchangeRates?.map((rate) => (
                  <tr key={rate.currency} style={tableCellStyle}>
                    <td >{rate.currency}</td>
                    <td >{rate.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div>No data available
            <LoaderComponent/>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

// Define card style
// const cardStyle = {
//   backgroundColor: "#4A56E2",
//   border: "1px solid #ccc",
//   borderRadius: "10px",
//   padding: "10px",
//   margin: "auto",
//   // width: "25%",
//   height: "fit-content", // Adjusts the height based on the content
//   display: "flex", // Displays as a flex container
//   flexDirection: "column", // Aligns content in a column layout
// };


const tableHeaderStyle = {
paddingBottom: "30px",
borderRadius: "30px",
padding: "10px",
textAlign: "center",
width: "auto",
height: "60px",
margin: "0px",
backgroundColor: "rgba(255, 255, 255, 0.25)",
};


const tableCellStyle = {
  padding: "20px",
  color: "#f2f2f2",
};

const tbodyStyle = {
paddingTop: "20px",
}

export default Currency;

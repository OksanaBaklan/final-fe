import { useEffect, useState } from "react";
import axios from "axios";
import Decimal from "decimal.js";
import "./currency.css";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import { useSelector } from "react-redux";
import { getAuth } from "../../redux/auth/auth-selectors";

const Currency = () => {
  const isAuth = useSelector(getAuth);
  const [exchangeRates, setExchangeRates] = useState([]);

  const fetchData = async () => {
    const ApiKey = '73b90c77c88bb0794bbc3e61';
    const url = `https://v6.exchangerate-api.com/v6/${ApiKey}/latest/USD`;

    try {
      const response = await axios.get(url);
      const rates = response.data.conversion_rates;

      if (rates) {
        const filteredRates = Object.entries(rates)
          .filter(
            ([currency]) =>
              currency === "AED" ||
              currency === "USD" ||
              currency === "JPY" ||
              currency === "CNY"
          )
          .map(([currency, rate]) => ({
            currency,
            rate: new Decimal(rate).toFixed(2),
          }));

        if (isAuth) {
          localStorage.setItem("exchangeRates", JSON.stringify(filteredRates));
        } else {
          localStorage.removeItem("exchangeRates");
        }

        setExchangeRates(filteredRates);
      } else {
        console.error("Error fetching exchange rates: Rates data is undefined or null");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuth]);

  return (
    <div className="currency">
      <div className="currencyCard">
        <div>
          {exchangeRates.length > 0 ? (
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={tableHeaderStyle}>Currency</th>
                  <th style={tableHeaderStyle}>Rate</th>
                </tr>
              </thead>
              <tbody>
                {exchangeRates?.map((rate) => (
                  <tr key={rate.currency}>
                    <td style={tableCellStyle}>{rate.currency}</td>
                    <td style={tableCellStyle}>{rate.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              No data available
              <LoaderComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: "10px",
  textAlign: "center",
  width: "auto",
  margin: "15px",
  borderBottom: "1px solid #ddd",
  color: "#f2f2f2",
};

const tableCellStyle = {
  padding: "10px",
  color: "#f2f2f2",
};

export default Currency;

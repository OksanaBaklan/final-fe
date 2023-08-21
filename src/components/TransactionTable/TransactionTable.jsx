import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import s from "./TransactionTable.module.css";
import NoTransactions from "../NoTransactions";
import axios from "axios";
import dateConverter from "../../services/dateConverter";
import { transactionCategories } from "./transactionCategories";
import createData from "../../services/createData";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../storeContext/UserContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          table: {
            backgroundColor: "inherit",
          },
          thead: {
            backgroundColor: "#fff",
            th: { borderBottom: "none" },
          },
        },
      },
    },
  },
});

export default function TransactionTable() {
  const [transactions, setTransaction] = useState([]);

  const { balance, setBalance  } = useContext(UserContext);

  console.log(balance);

  const navigate = useNavigate()


  const token = JSON.parse(localStorage.getItem("my-app-token"));
  async function fetchData(token) {
    try {
      const { data } = await axios.get(
        `http://localhost:5555/api/transactions/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTransaction(data.transactions);
      setBalance(data.balance);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData(token);
  }, [balance]);

  const rows = transactions?.map((trans) => {
    const isIncome = trans.isIncome ? "+" : "-";
    const fullDate = dateConverter(trans.date);
    const transactionCategorieName = transactionCategories.find(
      (el) => el.id === trans.categoryId,
    );

    const arrRow = createData(
      fullDate,
      isIncome,
      transactionCategorieName.name,
      trans.comment,
      trans.amount,
      trans.balance,
      trans._id
    );

    // console.log(arrRow.id);
    return arrRow;
  });

  if (!rows) {
    return (
      <div className={s.tableWrapper}>
        <NoTransactions />
      </div>
    );
  }

  return (
    <div className={s.tableWrapper}>
      <div className={s.table}>
        <ThemeProvider theme={theme}>
          <Table aria-label="transacti table" sx={{ position: "relative" }}>
            <TableHead
              sx={{
                position: "sticky",
                top: "0",
                "& .MuiTableCell-root:first-of-type": {
                  borderTopLeftRadius: "30px",
                  borderBottomLeftRadius: "30px",
                },
                "& .MuiTableCell-root:last-of-type": {
                  borderTopRightRadius: "30px",
                  borderBottomRightRadius: "30px",
                },
              }}
            >
              <TableRow>
                <TableCell align="center">date</TableCell>
                <TableCell align="center">type</TableCell>
                <TableCell align="center">category</TableCell>
                <TableCell align="center">comment</TableCell>
                <TableCell align="center">amount</TableCell>
                <TableCell align="center">balance</TableCell>
                <TableCell align="center">delete</TableCell>
                <TableCell align="center">edit</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, _id) => (
                <TableRow
                  key={_id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">{row.comment}</TableCell>
                  <TableCell
                    sx={{
                      color: row.type === "+" ? "#24CCA7" : "#FF6596",
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    {row.amount}
                  </TableCell>
                  <TableCell align="center">{row.balance}</TableCell>
                  <TableCell align="center">
                  <button className={s.deletebtn} onClick={async()=>{ 
                      const token = JSON.parse(localStorage.getItem("my-app-token"));

      try {
      await axios.delete(`http://localhost:5555/api/transactions/${row.id}`, {
        headers:{
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("my-app-token"))}`
        }
      });
      fetchData(token);
    } catch (error) {
      console.log(error.message)
    }}}>
  {/* <FontAwesomeIcon icon={faTrash} /> */} <p>Delete</p>
</button>
</TableCell>
<TableCell align="center">
<button
  className={s.updateIcon}
  onClick={() => navigate(`/update-transaction/${row.id}`)}
> 
 {/* <FontAwesomeIcon icon={faPen} /> */} <p>Update</p>
</button>
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ThemeProvider>
      </div>
    </div>
  );
}
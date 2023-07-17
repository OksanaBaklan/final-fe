import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {  ThemeProvider } from "@mui/material/styles";

import s from "./TransactionTable.module.css";
import NoTransactions from "../NoTransactions";
import axios from "axios";
import { useEffect } from "react";



export default async function TransactionTable () {


const token = JSON.parse(localStorage.getItem("my-app-token"));

  const { data } = await axios.get(`http://localhost:5555/api/transactions/`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  const transactions = data.transactions;
  const rows = transactions?.map((trans) => {
    const isIncome = trans.isIncome ? "+" : "-";  
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
        <ThemeProvider >
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
                <TableCell>Date</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Comment</TableCell>
                <TableCell align="center">Sum</TableCell>
                <TableCell align="center">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow
                  key={idx}
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
                    {row.amount.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">{row.balance.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ThemeProvider>
      </div>
    </div>
  );
}

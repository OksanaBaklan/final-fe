import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import ButtonAddTransaction from "../ButtonAddTransactions/ButtonAddTransactions";

import { getTransactionCategories } from "redux/auth/auth-selectors";

import NoTransactions from "../NoTransactions/NoTransactions";

import dateConverter from "services/dateConverter";
import createData from "services/createData";

import s from "./TransactionTable.module.css";

const theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          tbody: {
            backgroundColor: "#fff",
          },
        },
      },
    },
  },
});

export default function TransactionTableMobile({ transactions }) {
  const transactionCategories = useSelector(getTransactionCategories);

  const column = transactions.map((trans) => {
    const isIncome = trans.isIncome ? "+" : "-";
    const fullDate = dateConverter(trans.date);

    const transactionName = transactionCategories.find(
      (el) => el.id === trans.categoryId
    );

    const arrCol = createData(
      fullDate,
      isIncome,
      transactionName.name,
      trans.comment,
      trans.amount.toFixed(2),
      trans.balance.toFixed(2)
    );

    return arrCol;
  });

  if (column[0] === undefined) {
    return (
      <div className={s.tableWrapper}>
        <NoTransactions />
      </div>
    );
  }

  return (
    <div className={s.tableWrapper}>
      <ThemeProvider theme={theme}>
        {column.map((col, idx) => (
          <Table
            key={idx}
            sx={{
              maxWidth: 480,
              mb: 10,
              borderCollapse: "initial",
              borderLeft:
                col.type === "+" ? "5px solid #24CCA7" : "5px solid #FF6596",
              borderRadius: "10px",
              margin: "0 auto 10px",
            }}
          >
            <TableBody>
              <TableRow
                sx={{
                  "& .MuiTableCell-root:last-of-type": {
                    borderTopRightRadius: "10px",
                  },
                }}
              >
                <TableCell align="left">Дата</TableCell>
                <TableCell align="right">{col.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Тип</TableCell>
                <TableCell align="right">{col.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Категория</TableCell>
                <TableCell align="right">{col.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Коментарий</TableCell>
                <TableCell align="right">{col.comment}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Сумма</TableCell>
                <TableCell
                  sx={{
                    color: col.type === "+" ? "#24CCA7" : "#FF6596",
                    fontWeight: 700,
                  }}
                  align="right"
                >
                  {col.amount}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  "& .MuiTableCell-root:last-of-type": {
                    borderBottomRightRadius: "10px",
                  },
                }}
              >
                <TableCell align="left">Баланс</TableCell>
                <TableCell align="right">{col.balance}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </ThemeProvider>
    </div>
  );
}

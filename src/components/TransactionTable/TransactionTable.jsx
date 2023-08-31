import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import s from "./TransactionTable.module.css";
import NoTransactions from "../NoTransactions";
import dateConverter from "../../services/dateConverter";
import { transactionCategories } from "./transactionCategories";
import createData from "../../services/createData";
import { Fragment, useCallback,  useEffect, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Make sure to import FontAwesome styles

// This configuration ensures proper behavior of the icon library
import { library } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from "react-redux";
import { getDetailTransaction } from "../../redux/transactions/transactions-selectors";
import { fetchDetailsTransaction } from "../../redux/transactions/transaction-operations";
import { globalAction, globalSelectors } from "../../redux/global";
import ModalEditTransaction from "../EditTransactionModal/EditTransactionModal";
import { getToggleTheme } from "../../redux/global/global-selectors";

library.add(faTrash);
library.add(faEdit);




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

export default function TransactionTable({ transactions, transactionsDeleteHandler }) {

  const [editId, setEditId] = useState('')

  const dispatch = useDispatch();

  const modal = useSelector(globalSelectors.getEditModalValue);

  const themeMode = useSelector(getToggleTheme)

  useEffect(() => {
    dispatch(fetchDetailsTransaction(editId))
  }, [dispatch, editId])

  const transactionDetails = useSelector(getDetailTransaction);
  const closeModal = useCallback(
    () => dispatch(globalAction.closeEditModal()),
    [dispatch]
  );

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

    return arrRow;
  });

  if (rows[0] === undefined || transactions === null) {
    return (
      <div className={s.tableWrapper}>
        <NoTransactions />
      </div>
    );
  }


const styleTableCell = !themeMode.isDarkMode ? s.tableCellDark : s.tableCell

  return (
    <>
      {transactions && <div className={s.tableWrapper}>
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
                  {/* <TableCell align="center">balance</TableCell> */}
                  <TableCell align="center">delete</TableCell>
                  <TableCell align="center">edit</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, _id) => (
                  <TableRow
                    key={_id}
                    
                    sx={{
                      // "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row"  >
                    <div className={styleTableCell}> {row.name}</div> 
                    </TableCell>
                    <TableCell align="center"><div className={styleTableCell}>{row.type}</div></TableCell>
                    <TableCell align="center"><div className={styleTableCell}>{row.category}</div></TableCell>
                    <TableCell align="center"><div className={styleTableCell}>{row.comment}</div></TableCell>
                    <TableCell
                      sx={{
                        color: row.type === "+" ? "#24CCA7" : "#FF6596",
                        fontWeight: 700,
                      }}
                      align="center"
                     
                    >
                      
                      <div>{row.amount}</div>
                    </TableCell>
                    <TableCell align="center">
                      <button className={s.deletebtn}

                        onClick={() => transactionsDeleteHandler(row.id)}
                      >
                        <FontAwesomeIcon icon="trash" />
                      </button>
                    </TableCell>
                    <TableCell align="center">
                      <button
                        className={s.updateIcon}
                        type="button"
                        name="editOperation"
                        onClick={
                          () => {
                            setEditId(row.id);
                            dispatch(globalAction.openEditModal())
                          }
                        }
                      >   <FontAwesomeIcon icon="edit" />
                      </button>
                      <Fragment>
                        {modal && <ModalEditTransaction modalValue={modal} editId={editId} transactionDetails={transactionDetails} modalAction={closeModal}></ModalEditTransaction>}
                      </Fragment>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ThemeProvider>
        </div>
      </div>}
    </>
  );
}

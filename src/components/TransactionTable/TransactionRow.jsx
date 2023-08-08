import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import s from "./TransactionTable.module.css";

import axios from "axios";



const TransactionRow = ({ transaction, rows, fetchData }) => {
const transactionId = transaction._id

  return (
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
      await axios.delete(`http://localhost:5555/api/transactions/${transactionId}`, {
        headers:{
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("my-app-token"))}`
        }
      });
      fetchData(token);
    } catch (error) {
      console.log(error.message)
    }}}>
  <FontAwesomeIcon icon={faTrash} />
</button>
                    </TableCell>
<TableCell align="center">
<button
  className={s.updateIcon}
  onClick={() => {}}
>  <FontAwesomeIcon icon={faPen} />
</button>
</TableCell>
                </TableRow>
              ))}
  </TableBody>
  );
};

export default TransactionRow;
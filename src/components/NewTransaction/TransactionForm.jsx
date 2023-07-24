import { Grid, Paper, TextField, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import "./TransactionForm.css";
import { transactionCategories } from "../TransactionTable/transactionCategories";
import { UserContext } from "../../storeContext/UserContext";
import axios from "axios";

const TransactionForm = (props) => {
    const [comment, setComment] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [check, setCheck] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const {setBalance}=useContext(UserContext)

    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    };

    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
    };

    const dateChangeHandler = (e) => {
        setDate(e.target.value);
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        const dateParse = Date.parse(date);

        const newTransaction = {
            isIncome: !check,
            categoryId: e.target["categoryId"]===undefined ?"321344421": e.target["categoryId"].value,
            amount:amount,
            date: dateParse,
            comment: comment,
        };
        const token = JSON.parse(localStorage.getItem("my-app-token"));

        try{
            const response = await axios.post(`http://localhost:5555/api/transactions/`, newTransaction, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            e.target.reset()
            setComment("")
            setAmount("")
            setDate("")
            console.log(response.data.balance)
      setBalance(response.data.balance)
          }
          catch(err){
            setErrorMessage(err.request.response)
          }
          
    };

    const paperStyle = {
        display: 'flex',
        textAline: 'center',
        padding: '20px',
        height: "540px",
        width: "540px",
        margin: "40px auto",
        borderRadius: "20px",
    };

    const fieldStyle = {
        margin: "30px",
    };

    const fielddStyle = {
        width: "100%",
        margin: '50px',
        marginTop: '0px'
    };

    const expensesStyle = {
        marginLeft: "40px",
    };

    return (
     
            <Paper elevation={1} style={paperStyle}>
                 <form autoComplete="off" onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <h2>Add Transaction</h2>

                    <div className="cont">
                        <div className="material-switch">
                            <label>Income</label>
                            <input id="switchy" name="isIncome" type="checkbox" onChange={(e) => setCheck(e.target.checked) } />
                            <label for="switchy" className="label-default"></label>
                            <label style={expensesStyle}>Expenses</label>
                        </div>
                    </div>


                    {check && (<label htmlFor={`category`}>
                    <select
                    //   className={s.category}
                      name='categoryId'
                      className="category"
                      required
                 >
                      <option value='0' key={"1"}>
                      select a category
                      </option>
                      {transactionCategories.map(({ name, id }) => {
                        return (
                          <option key={id} value={id} >
                            {name}
                          </option>
                        );
                      })}
                    </select>
                  </label>)}

                    <Grid item xs={6} >
                    <TextField
                        placeholder="0.00"
                            style={fieldStyle}
                            type="number"
                            value={amount}
                            onChange={amountChangeHandler}
                            variant="standard"
                        ></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            style={fieldStyle}
                            type="date"
                            value={date}
                            onChange={dateChangeHandler}
                            variant="standard"
                        ></TextField>
                    </Grid>

                    <TextField
                        style={fielddStyle}
                        placeholder="Comment"
                        variant="standard"
                        value={comment}
                        onChange={commentChangeHandler}
                    ></TextField>

                    <Grid>
                        <Button type="submit" className="buttonStyle" variant="outlined">
                            Add Transaction
                        </Button>
                        <Button className="buttonStyle" variant="outlined">
                            Close
                        </Button>
                    </Grid>
                </Grid>
                </form>
            </Paper>
     
    );
};

export default TransactionForm;

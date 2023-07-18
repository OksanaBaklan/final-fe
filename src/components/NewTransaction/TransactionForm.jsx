import { Grid, Paper, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import "./TransactionForm.css";

const TransactionForm = (props) => {
    const [comment, setComment] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const commentChangeHandler = (e) => {
        setComment(e.target.value);
    };

    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
    };

    const dateChangeHandler = (e) => {
        setDate(e.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const costData = {
            comment: comment,
            amount: amount,
            date: new Date(date),
        };

        props.onSaveCostData(costData);
        setComment("");
        setAmount("");
        setDate("");
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
                <Grid container onSubmit={submitHandler} spacing={2}>
                    <h2>Add Transaction</h2>

                    <div className="cont">
                        <div className="material-switch">
                            <label>Income</label>
                            <input id="switchy" name="someSwitchOption001" type="checkbox" />
                            <label for="switchy" class="label-default"></label>
                            <label style={expensesStyle}>Expenses</label>
                        </div>
                    </div>


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
            </Paper>
     
    );
};

export default TransactionForm;

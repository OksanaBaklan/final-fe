import './Buton.css';
import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";

const Buton = (props) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

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


  return (
    <>
      <div >
        <button className='Buton' type='submit' onClick={() => { setOpen(!open) }}></button>
      </div>

      <div className={`form ${open ? 'active' : 'inactive'}`}>
        <Paper elevation={1} style={paperStyle} >
          <Grid container onSubmit={submitHandler} spacing={2}>
            <h2>Add Transaction</h2>

            <div class="cont">
              <div class="material-switch">
                <label class="incomeLabel">Income</label>
                <input id="switchy" name="someSwitchOption001" type="checkbox" />
                <label for="switchy" class="label-default"></label>
                <label class="expensesLabel"style={expensesStyle}>Expenses</label>
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
      </div>
    </>

  )
}

export default Buton;
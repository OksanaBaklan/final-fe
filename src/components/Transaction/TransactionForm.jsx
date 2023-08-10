import { Grid, Paper, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import "./TransactionForm.css";
import './Modal.css';
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";

const TransactionForm = (props) => {
    const dispatchFunction = useDispatch();

    const colorState = useSelector((state) => state.colorstate);

    console.log("Color state: ", colorState);

    const changeColorHandler = (e) => {
        console.log('value of radio button', e.target.checked)
        if(e.target.checked)
            dispatchFunction({ type: "RED" });
        else 
            dispatchFunction({type: "GREEN"})
    };



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

        const formData = {
            comment: comment,
            amount: amount,
            date: new Date(date),
        };

        props.onSaveFormData(formData);
        setComment("");
        setAmount("");
        setDate("");
    };

    const paperStyle = {
        alignItems: "center",
        display: 'flex',
        textAline: 'center',
        justifyContent: "center",
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
        color: colorState
    };

    const ButtonStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        fontFamily: 'Cicle',
    };

    const clearIconStyle = {
        marginLeft: "530px"
    };

    return (

        <Modal onHideForm={props.onHideForm}>
            <>
                <Paper elevation={0} style={paperStyle}>
                    <Grid container onSubmit={submitHandler} spacing={2}>
                        <ClearIcon style={clearIconStyle} onClick={props.onHideForm}></ClearIcon>
                        <h2>Add Transaction</h2>

                       {console.log("value",colorState)}

                        <div class="cont">
                            <div class="material-switch">
                                <label>Income</label>
                                <input onClick={changeColorHandler} id="switchy" name="someSwitchOption001" type="checkbox" />
                                <label for="switchy" class="label-default"></label>
                                <label style={expensesStyle}>Expanses</label>
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

                        <Grid style={ButtonStyle}>
                            <Button type="submit" className="buttonStyle" variant="outlined">
                                Add Transaction
                            </Button>
                            <Button className="buttonStyle" variant="outlined" onClick={props.onHideForm}>
                                Close
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </>
        </Modal>

    );
};

export default TransactionForm;

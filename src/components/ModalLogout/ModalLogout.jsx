import { Grid, Paper, Button, Avatar } from "@mui/material";
import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import './Modal.css';
import Modal from "./Modal";
import LogoComponent from "../LogoComponent/LogoComponent";

const ModalLogout = (props) => {

  const [formIsVisible, setFormIsVisible] = useState(false);


  const showFormHandler = () => {
    setFormIsVisible(true);
  };

  const hideFormHandler = () => {
    setFormIsVisible(false);
  };


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
    };

    props.onSaveFormData(formData);
  };

  const paperStyle = {
    alignItems: "center",
    display: 'flex',
    textAline: 'center',
    justifyContent: "center",
    padding: '20px',
    height: "380px",
    width: "380px",
    margin: "40px auto",
    borderRadius: "20px",
  };

  const ButtonStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    fontFamily: 'Cicle',
    marginTop: "40px"
  };

  const clearIconStyle = {
    marginLeft: "365px"
  };

  const logoStyle = {
    marginLeft: "40px"
  }

  const avaStyle = {
    marginLeft: "170px",
    marginTop: "32px",
    width: "60px",
    height: "60px"
  }

  return (

    <Modal onHideForm={props.onHideForm}>
      <>
      {formIsVisible && <Paper elevation={0} style={paperStyle} onHideForm = {hideFormHandler}>
          <Grid container onSubmit={submitHandler} spacing={2}>
            <ClearIcon style={clearIconStyle} onClick={props.onHideForm}></ClearIcon>

            <Grid style={logoStyle}>
              <LogoComponent/>
            </Grid>

            <Grid style={avaStyle}>
              <Avatar src="/broken-image.jpg" sx={{ width: 52, height: 52 }}/>
            </Grid>

            <Grid style={ButtonStyle}>
              <Button type="submit" className="buttonStyle" variant="outlined">
                Sign In again
              </Button>
              <Button className="buttonStyle" variant="outlined" onClick={props.onHideForm}>
                Continue
              </Button>
            </Grid>
          </Grid>
        </Paper>}
    
      </>
    </Modal>

  );
};

export default ModalLogout;
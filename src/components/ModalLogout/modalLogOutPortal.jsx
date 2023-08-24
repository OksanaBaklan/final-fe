import React from 'react';
import ReactDOM from 'react-dom';
import "./modalLogOutPortal.css"
import { Grid, Paper, Button, Avatar } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import LogoComponent from "../LogoComponent/LogoComponent";

import { useSelector } from "react-redux";
import { getUserAvatar } from "../../redux/auth/auth-selectors";


export  const LogoutModalPortal = ({ closeModal, onUserLogOut }) => {

    const avatar = useSelector(getUserAvatar)


  const paperStyle = {
    position: "sticky",
    zIndex: "2",
    alignItems: "center",
    display: 'flex',
    textAline: 'center',
    justifyContent: "center",
    padding: '20px',
    height: "450px",
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
    marginTop: "40px"
  };

  const clearIconStyle = {
    // marginLeft: "340px",
    // marginTop:"30px"
    display: "block",
    position: "absolute",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    outline: "none",
    top: "20px",
    right: "20px",
  };

  const logoStyle = {
    margin: "0 auto"
  }

  const avaStyle = {
    // marginLeft: "170px",
    margin: "32px auto",
    width: "60px",
    height: "60px"
  }

  const textStyle = {
    fontFamily: "Circe, sans-serif",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: "18px",
    lineHeight: "24px",
  }


  const onBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }}

  return ReactDOM.createPortal(
    <div className="modal"  onClick={onBackdropClick}>
      <div >
        <Paper style={paperStyle}>
          <Grid container >
            <ClearIcon style={clearIconStyle} onClick={closeModal}></ClearIcon>

            <Grid style={logoStyle}>
              <LogoComponent />
            </Grid>

            <Grid style={avaStyle}>
              <Avatar src={avatar ? avatar : "/broken-image.jpg"} sx={{ width: 100, height: 100 }} />
            </Grid>

            <Grid style={ButtonStyle}>
              <p style={textStyle}>Do you really want to log out?</p>
              <Button className="buttonStyle" variant="outlined" onClick={onUserLogOut}>
                Logout
              </Button>
              <Button className="buttonStyle" variant="outlined" onClick={closeModal}>
                No
              </Button>
            </Grid>

          </Grid>

          </Paper>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
};


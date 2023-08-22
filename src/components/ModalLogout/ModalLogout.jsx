import { Grid, Paper, Button, Avatar } from "@mui/material";
import React, { useEffect } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import './Modal.css';
import LogoComponent from "../LogoComponent/LogoComponent";
import "./ModalLogout.css";
import { useSelector } from "react-redux";
import { getUserAvatar } from "../../redux/auth/auth-selectors";

const ModalLogout = ({ closeModal, onUserLogOut }) => {

  const avatar = useSelector(getUserAvatar)

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      closeModal();
    }
  };
  const onBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });


  const paperStyle = {
    marginTop: "200px",
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

  const textStyle = {
    fontFamily: "Circe, sans-serif",
    fontStyle: "normal",
    fontWeight: "100",
    fontSize: "18px",
    lineHeight: "24px",
  }

  return (

    <div className="overlay" onClick={onBackdropClick}>
      <>
        <Paper style={paperStyle}>
          <Grid container spacing={2}>
            <ClearIcon style={clearIconStyle} onClick={closeModal}></ClearIcon>

            <Grid style={logoStyle}>
              <LogoComponent />
            </Grid>

            <Grid style={avaStyle}>
              <Avatar src={avatar ? avatar : "/broken-image.jpg"} sx={{ width: 52, height: 52 }} />
            </Grid>

            <Grid style={ButtonStyle}>
              <p style={textStyle}>Do you really want to log out?</p>
              <Button type="submit" className="buttonStyle" variant="outlined" onClick={onUserLogOut}>
                Logout
              </Button>
              <Button className="buttonStyle" variant="outlined" onClick={closeModal}>
                No
              </Button>
            </Grid>

          </Grid>

        </Paper>
      </>
    </div>

  );
};

export default ModalLogout;
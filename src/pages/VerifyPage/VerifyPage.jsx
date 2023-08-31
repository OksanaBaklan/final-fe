import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

import s from "./VerifyPage.module.css";

// axios.defaults.baseURL = "http://localhost:5555/api/";
axios.defaults.baseURL = process.env.REACT_APP_BE_URL
// # REACT_APP_BE_URL=https://moneyminder-server.onrender.com/api

export default function VerifyPage() {
  let { verificationToken } = useParams();
  console.log(verificationToken);
  const verify = async (token) => {
    try {
      const response = await axios.get(`users/verify/${token}`);
      console.log(response);
      if (!response) {
        return;
      }
      return response;
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    verify(verificationToken);
  }, [verificationToken]);

  return (
    <>
      <div className={s.backdrop}>
        <div className={s.modal}>
          <p className={s.text}>You have successfully registered</p>
          <Link to={`/login`} className={s.btn}>
            Ok
          </Link>
        </div>
      </div>
    </>
  );
}



import axios from 'axios'
import React, { useState,useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../storeContext/UserContext';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction'


export default function UpdateTransaction() {

    const [check, setCheck] = React.useState(false);
    const {transactionId} = useParams()
    const [transactionDetails, setTransactionDetails] = useState({})
    const navigate = useNavigate()
    const { setBalance } = useContext(UserContext);

    const [errorMessage, setErrorMessage] = useState("")
    const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("my-app-token")
          )}`,
        },
      }
    const token = JSON.parse(localStorage.getItem("my-app-token"));

    useEffect(()=>{
        axios.get(`http://localhost:5555/api/transactions/${transactionId}`,   {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },)
        .then(response=>setTransactionDetails(response.data))
        .catch(err => console.log(err))
        }, [token])

        const submitHandler = async(e) => {
        e.preventDefault()
        const date = Date.parse(e.target["date"].value);

        const updateTansaction = {
            isIncome: !check,
            categoryId:
              e.target["categoryId"] === undefined
                ? "321344421"
                : e.target["categoryId"].value,
            amount: e.target["amount"].value,
            date: date,
            comment: e.target["comment"].value,
          };
        
        const token = JSON.parse(localStorage.getItem("my-app-token"));

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        }
        try {
            const response = await axios.patch(`http://localhost:5555/api/transactions/${transactionId}`,updateTansaction, config )
            e.target.reset();
            setBalance(response.data.balance);
            navigate("/table")
            // .then(response => navigate('/table'))
            // .catch(error => console.log(error))
            
        } catch (error) {
            setErrorMessage(error.request.response);

        }
    }

    return(
        <>
        <ModalAddTransaction submitHandler={submitHandler} setCheck = {setCheck} check= {check} transactionDetails={transactionDetails}/>
        </>
    )
}
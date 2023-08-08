

import axios from 'axios'
import React, { useState,useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../storeContext/UserContext';
import classNames from "classnames";
import s from "../ModalAddTransaction/ModalAddTransaction.module.css";
import closeIcon from "../../images/modal-transaction/close.svg";
import { transactionCategories } from "../TransactionTable/transactionCategories";


export default function UpdateTransaction() {

    const {transactionId} = useParams()

    const [check, setCheck] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const [defaultDate,setDefaultDate] = useState("")
console.log(check)
    const navigate = useNavigate()
    const { setBalance } = useContext(UserContext);

    function dateConverter(d) {
        const date = new Date(d);
      
        const months = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];
     
        const fullYear = String(date.getFullYear());
        const shortYear = String(fullYear);
      
        const month = String(months[date.getMonth()]);
        const day = date.getDate();

    if(isNaN(day)){return}
    else{const fullDate = `${shortYear}-${month}-${day}`;
    return fullDate;}
        
      }


    useEffect(()=>{
        const fetchTransaction = async()=>{
            try {
                const response = await fetch(`http://localhost:5555/api/transactions/${transactionId}`)
                const data = await response.json();
                setTransactionDetails(data)
                setDefaultDate(dateConverter(data.date)||'')
            } catch (error) {
                console.error('Error fetching Transaction:', error);
                }
            }
            fetchTransaction()

        }      
 , [])



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
            
        } catch (error) {
            setErrorMessage(error.request.response);

        }
    }

    const transactionCategorieName = transactionCategories.find(
        (el) => el.id === transactionDetails.categoryId
      );

    return (
        <div>
          <button type="button" className={s.closeBtn}>
            <img src={closeIcon} alt="" />
          </button>
          <form onSubmit={submitHandler}>
            <div className={s.form}>
              <b className={s.modalDescription}>Edit transaction</b>
              {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
    
              <div className={s.switch__container}>

              <div className={s.switch__container}>
            <div className={s.switch__control}>
              <input
                className={s.switch__toggle}
                type="checkbox"
                id={`switch-toggle`}
                name="isIncome"
                onChange={(e) => setCheck(e.target.checked)}
              />
              <label
                className={s.switch__track}
                htmlFor={`switch-toggle`}
              ></label>

              <div className={s.switch__marker}></div>
              <p className={s.switchIncome}>Income</p>
              <p className={s.switchCosts}>Expenses</p>
            </div>
          </div>

          {check && (
            <label className={s.span} htmlFor={`category`}>
              <select className={s.category} name="categoryId" required>
                <option value="0" key={"1"}>
                  select a category
                </option>
                {transactionCategories.map(({ name, id }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </label>
          )}

              </div>
    

    
              <div className={s.subBox}>
                <input
                  className={s.sum}
                  type={`number`}
                  name={`amount`}
                  placeholder={transactionDetails?.amount?transactionDetails?.amount:"0.00"}
                  required
                />
    
            <input className={s.date} type="date" name="date"  defaultValue={defaultDate} onChange={(e) => setDefaultDate(e.target.value)} required />
              </div>
    
              <input
                className={s.comment}
                name={`comment`}
                type={`text`}
                placeholder={transactionDetails?.amount?transactionDetails?.amount:"Comment"}
              />
    
              <button className={classNames(s.btn, s.btnAdd)} type={`submit`}>
                Edit Transaction
              </button>
              <button className={classNames(s.btn, s.btnCancel)} type="button">
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
}
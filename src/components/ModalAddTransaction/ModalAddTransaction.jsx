import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import * as React from "react";
import axios from "axios";

// import { addTransaction } from "redux/transactions/transaction-operations";
// import { getTransactionCategories } from "../../redux/auth/auth-selectors";
import { useContext } from "react";
import closeIcon from "../../images/modal-transaction/close.svg";

import s from "./ModalAddTransaction.module.css";
import { transactionCategories } from "../TransactionTable/transactionCategories";
import { UserContext } from "../../storeContext/UserContext";


export default function ModalAddTransaction() {
  const [check, setCheck] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("")

  const {setBalance}=useContext(UserContext)


  // const dispatch = useDispatch();
  const handleSubmit = async(e) => {
    // dispatch(addTransaction({ date, isIncome, amount, comment, categoryId }));
    const date = Date.parse(e.target["date"].value);

    e.preventDefault();

    const newTransaction = {
      isIncome: !check,
      categoryId: e.target["categoryId"]===undefined ?"321344421": e.target["categoryId"].value,
      amount: e.target["amount"].value,
      date: date,
      comment: e.target["comment"].value,
    } 
    const token = JSON.parse(localStorage.getItem("my-app-token"));

    console.log(newTransaction.categoryId);

    try{
      const response = await axios.post(`http://localhost:5555/api/transactions/`, newTransaction, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      e.target.reset()
      console.log(response.data.balance)
setBalance(response.data.balance)
      // navigate("/login")
    }
    catch(err){
      setErrorMessage(err.request.response)
    }
    

  };


  return (
<div>
<button type='button' className={s.closeBtn} >
              <img src={closeIcon} alt='' />
            </button>
            <form onSubmit={handleSubmit}>
              <div className={s.form}>
                <b className={s.modalDescription}>Add Transaction</b>

                <div className={s.switch__container}>
                  <div className={s.switch__control}>
                    <input
                      className={s.switch__toggle}
                      type='checkbox'
                  

                      id={`switch-toggle`}
                      name='isIncome'
                      // value={this.checked?'true':'false'}
                      onChange={(e) => setCheck(e.target.checked) }
                    />
                    <label
                      className={s.switch__track}
                      htmlFor={`switch-toggle`}></label>

                    <div className={s.switch__marker}></div>
                    <p className={s.switchIncome}>Income</p>
                    <p className={s.switchCosts}>Expenses</p>
                  </div>
                </div>

            
                  {check && (<label className={s.span} htmlFor={`category`}>
                    <select
                      className={s.category}
                      name='categoryId'
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
           

                <div className={s.subBox}>
                  <input
                    className={s.sum}
                    type={`number`}
                    name={`amount`}
                    placeholder='0.00'

                    
                  />

                  <input
                    className={s.date}
                    type='date'
                    name='date'

                    required
                  />
                </div>


                <input
                  className={s.comment}
                  name={`comment`}
                  type={`text`}
                  placeholder='Comment'

                />

                <button
                  className={classNames(s.btn, s.btnAdd)}
                  type={`submit`}>
                  Add Transaction
                </button>
                <button
                 
                  className={classNames(s.btn, s.btnCancel)}
                  type='button'>
                  Cancel
                </button>
              </div>
            </form>
</div>
           

  );
}

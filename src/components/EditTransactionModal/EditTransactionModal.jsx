import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import * as React from "react";
import { editTransaction } from "../../redux/transactions/transaction-operations";

import { useEffect } from "react";
import closeIcon from "../../images/modal-transaction/close.svg";
import { transactionCategories } from "../TransactionTable/transactionCategories";

import s from "./ModalAddTransaction.module.css";

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .typeError("Must be a number")
    .required("required"),
  comment: Yup.string(),
});

export default function ModalEditTransaction({ modalAction, id }) {
  console.log(id);
  const dispatch = useDispatch();
  const handleSubmit = ({ date, isIncome, amount, comment, categoryId }) => {
    dispatch(editTransaction({id:id,updateTransaction:{ date, isIncome, amount, comment, categoryId }}));
  };

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      modalAction();
    }
  };

  const onBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      modalAction();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Formik
      initialValues={{
        date: new Date().toISOString().substr(0, 10),
        isIncome: true,
        amount: "",
        comment: "",
        categoryId: "",
      }}
      validateOnBlur
      onSubmit={({ date, isIncome, ...all }, { resetForm }) => {
        date = Date.parse(date);
        console.log(date);
        console.log(typeof date);
        isIncome = !isIncome;
        handleSubmit({ date, isIncome, ...all });
        resetForm();
        modalAction();
      }}
      validationSchema={validationSchema}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        dirty,
      }) => (
        <div className={s.overlay} onClick={onBackdropClick}>
          <div className={s.formBox}>
            <button type='button' className={s.closeBtn} onClick={modalAction}>
              <img src={closeIcon} alt='' />
            </button>
            <Form>
              <div className={s.form}>
                <b className={s.modalDescription}>Update transaction</b>

                <div className={s.switch__container}>
                  <div className={s.switch__control}>
                    <input
                      className={s.switch__toggle}
                      type='checkbox'
                      id={`switch-toggle`}
                      name='isIncome'
                      onBlur={handleBlur}
                      checked={values.isIncome}
                      value={values.isIncome}
                      onChange={handleChange}
                    />
                    <label
                      className={s.switch__track}
                      htmlFor={`switch-toggle`}></label>
                    <div className={s.switch__marker}></div>
                    <p className={s.switchIncome}>Income</p>
                    <p className={s.switchCosts}>Expenses</p>
                  </div>
                </div>

                {values.isIncome === true && (
                  <label className={s.span} htmlFor={`category`}>
                    <select
                      className={s.category}
                      name='categoryId'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.categoryId}>
                      <option value='0' key={"1"}>
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

                <div className={s.subBox}>
                  <input
                    className={s.sum}
                    type={`number`}
                    name={`amount`}
                    placeholder='0.00'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.amount}
                  />
                  {touched.amount && errors.amount && (
                    <span className={s.error}>{errors.amount}</span>
                  )}
                  <input
                    className={s.date}
                    value={values.date}
                    type='date'
                    name='date'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                  />
                </div>

                {touched.comment && errors.comment && (
                  <span className={s.error}>{errors.comment}</span>
                )}
                <input
                  className={s.comment}
                  name={`comment`}
                  type={`text`}
                  placeholder='comment'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.comment}
                />

                <button
                  className={classNames(s.btn, s.btnAdd)}
                  type={`submit`}
                  disabled={!isValid || !dirty}>
                  Update
                </button>
                <button
                  onClick={modalAction}
                  className={classNames(s.btn, s.btnCancel)}
                  type='button'>
                  Cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}

import { useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../ModalAddTransaction/ModalAddTransaction";
import { globalAction, globalSelectors } from "../../redux/global";
import s from "./ButtonAddTransactions.module.css";

export default function ButtonAddTransaction() {
  const dispatch = useDispatch();

  const modal = useSelector(globalSelectors.getModalValue);

  const closeModal = useCallback(
    () => dispatch(globalAction.closeModal()),
    [dispatch]
  );

  const openModal = useCallback(
    () => dispatch(globalAction.openModal()),
    [dispatch]
  );

  return (
    <>
      <button
        className={s.buttonAdd}
        type="button"
        name="addOperation"
        onClick={openModal}
      >
        <div className={s.switch__marker}></div>
      </button>

      <Fragment>
        {modal && <Modal modalValue={modal} modalAction={closeModal}></Modal>}
      </Fragment>
    </>
  );
}

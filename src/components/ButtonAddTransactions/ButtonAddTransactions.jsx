import { useCallback, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";

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
        <AddIcon className={s.buttonIcon} fontSize="large" />
      </button>

      <Fragment>
        {modal && <Modal modalValue={modal} modalAction={closeModal}></Modal>}
      </Fragment>
    </>
  );
}

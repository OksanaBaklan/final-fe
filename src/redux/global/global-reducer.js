import { createReducer } from "@reduxjs/toolkit";

import { openModal, closeModal } from "./global-action";

const setTrue = () => true;
const setFalse = () => false;

const modalTransaction = createReducer(false, {
  [openModal]: setTrue,
  [closeModal]: setFalse,
});

export { modalTransaction };

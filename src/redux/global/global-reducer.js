import { createReducer } from "@reduxjs/toolkit";

import { openModal, closeModal,openEditModal,closeEditModal } from "./global-action";

const setTrue = () => true;
const setFalse = () => false;

export const modalTransaction = createReducer(false, {
  [openModal]: setTrue,
  [closeModal]: setFalse,
});

export const modalEditTransaction = createReducer(false, {
  [openEditModal]: setTrue,
  [closeEditModal]: setFalse,
});

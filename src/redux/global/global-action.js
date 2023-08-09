import { createAction } from "@reduxjs/toolkit";

const openModal = createAction("global/openModal");
const closeModal = createAction("global/closeModal");

export { openModal, closeModal };

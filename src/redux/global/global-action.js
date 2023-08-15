import { createAction } from "@reduxjs/toolkit";

const openModal = createAction("global/openModal");
const closeModal = createAction("global/closeModal");
const openEditModal = createAction("global/openEditModal")
const closeEditModal = createAction("global/closeEditModal")

export { openModal, closeModal, openEditModal, closeEditModal };
